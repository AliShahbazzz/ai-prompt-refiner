import asyncio
import io
import json
import queue
import threading
from contextlib import redirect_stdout
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from .main import run_optimization

app = FastAPI()

ROOT = Path(__file__).resolve().parent.parent


class OptimizeRequest(BaseModel):
    purpose: str
    initial_prompt: str
    dataset: list[dict]
    target: str


class QueueWriter(io.TextIOBase):
    def __init__(self, output_queue: queue.Queue):
        self.output_queue = output_queue

    def write(self, message: str):
        if message:
            self.output_queue.put(message)
        return len(message)

    def flush(self):
        pass


@app.post("/optimize")
async def optimize(request: OptimizeRequest):
    output_queue = queue.Queue()

    # Update input files
    (ROOT / "purpose.txt").write_text(
        request.purpose,
        encoding="utf-8",
    )

    (ROOT / "prompt.txt").write_text(
        request.initial_prompt,
        encoding="utf-8",
    )

    (ROOT / "dataset.json").write_text(
        json.dumps(
            request.dataset,
            indent=2,
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )

    def run():
        writer = QueueWriter(output_queue)

        try:
            with redirect_stdout(writer):
                run_optimization(
                    target=request.target,
                )
        except Exception as exc:
            output_queue.put(f"[ERROR] {exc}")
        finally:
            output_queue.put(None)

    thread = threading.Thread(target=run)
    thread.start()

    async def stream():
        while True:
            try:
                message = output_queue.get_nowait()
            except queue.Empty:
                await asyncio.sleep(0.05)
                continue

            if message is None:
                break

            # Split output so each print line becomes an SSE event
            for line in message.splitlines():
                yield f"data: {line}\n\n"

    return StreamingResponse(
        stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
