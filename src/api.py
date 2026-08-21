import asyncio
import io
import json
import queue
import re
import threading
from contextlib import redirect_stdout
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .main import run_optimization

app = FastAPI()


class QueueWriter(io.TextIOBase):
    def __init__(self, output_queue: queue.Queue):
        self.output_queue = output_queue

    def write(self, message: str):
        if message:
            self.output_queue.put(message)
        return len(message)

    def flush(self):
        pass

INVALID_JSON_ESCAPE_RE = re.compile(r'\\(?!["\\/bfnrtu])')


def parse_dataset(raw: str) -> list:
    """Parse a dataset string that may contain stray backslashes (e.g. `\\@`)
    which are not valid JSON escape sequences, by treating them as literal
    backslashes instead of failing to parse."""
    sanitized = INVALID_JSON_ESCAPE_RE.sub(r"\\\\", raw)
    return json.loads(sanitized, strict=False)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ROOT = Path(__file__).resolve().parent.parent


class OptimizeRequest(BaseModel):
    purpose: str
    initial_prompt: str
    dataset: str
    target: str


@app.post("/optimize")
async def optimize(request: OptimizeRequest):

    print("[API] Received optimization request", flush=True)

    print(
        f"[API] Purpose length: {len(request.purpose)}",
        flush=True,
    )

    print(
        f"[API] Initial prompt length: {len(request.initial_prompt)}",
        flush=True,
    )

    try:
        dataset = parse_dataset(request.dataset)
    except json.JSONDecodeError as exc:
        raise HTTPException(
            status_code=400,
            detail=f"dataset must be a JSON-stringified array: {exc}",
        ) from exc

    if not isinstance(dataset, list):
        raise HTTPException(
            status_code=400,
            detail="dataset must be a JSON-stringified array",
        )

    print(
        f"[API] Dataset size: {len(dataset)}",
        flush=True,
    )

    print(
        f"[API] Target: {request.target}",
        flush=True,
    )

    output_queue = queue.Queue()

    # -----------------------------------------
    # Write input files
    # -----------------------------------------

    purpose_path = ROOT / "purpose.txt"
    prompt_path = ROOT / "prompt.txt"
    dataset_path = ROOT / "dataset.json"

    try:
        print(
            f"[API] Writing purpose to {purpose_path}",
            flush=True,
        )

        purpose_path.write_text(
            request.purpose,
            encoding="utf-8",
        )

        print(
            f"[API] Writing prompt to {prompt_path}",
            flush=True,
        )

        prompt_path.write_text(
            request.initial_prompt,
            encoding="utf-8",
        )

        print(
            f"[API] Writing dataset to {dataset_path}",
            flush=True,
        )

        dataset_path.write_text(
            json.dumps(
                dataset,
                indent=2,
                ensure_ascii=False,
            ),
            encoding="utf-8",
        )

        print("[API] Input files written successfully", flush=True)

    except Exception as exc:
        print(
            f"[API] Failed to write input files: {exc}",
            flush=True,
        )
        raise

    # -----------------------------------------
    # Optimization thread
    # -----------------------------------------

    def run():
        print(
            "[OPTIMIZER THREAD] Thread started",
            flush=True,
        )

        writer = QueueWriter(output_queue)

        try:
            print(
                f"[OPTIMIZER THREAD] Starting optimization with target={request.target}",
                flush=True,
            )

            with redirect_stdout(writer):
                optimized_prompt = run_optimization(
                    target=request.target,
                )

            print(
                "[OPTIMIZER THREAD] Optimization finished successfully",
                flush=True,
            )

            output_queue.put(
                json.dumps({"optimized_prompt": optimized_prompt})
            )

        except Exception as exc:
            print(
                f"[OPTIMIZER THREAD] ERROR: {type(exc).__name__}: {exc}",
                flush=True,
            )

            output_queue.put(f"[ERROR] {type(exc).__name__}: {exc}")

        finally:
            print(
                "[OPTIMIZER THREAD] Sending stream termination signal",
                flush=True,
            )

            output_queue.put(None)

    print(
        "[API] Creating optimization thread",
        flush=True,
    )

    thread = threading.Thread(
        target=run,
        daemon=True,
    )

    thread.start()

    print(
        f"[API] Optimization thread started: {thread.ident}",
        flush=True,
    )

    # -----------------------------------------
    # SSE stream
    # -----------------------------------------

    async def stream():
        print(
            "[SSE] Stream started",
            flush=True,
        )

        while True:
            try:
                message = output_queue.get_nowait()

            except queue.Empty:
                await asyncio.sleep(0.05)
                continue

            if message is None:
                print(
                    "Received termination signal",
                    flush=True,
                )
                break

            for line in message.splitlines():
                if not line:
                    continue

                print(
                    f"{line[:150]}",
                    flush=True,
                )

                yield f"data: {line}\n\n"

        print(
            "Stream completed",
            flush=True,
        )

    return StreamingResponse(
        stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
