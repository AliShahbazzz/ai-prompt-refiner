import json
from pathlib import Path
from datetime import datetime


def save_result(
    result,
    initial_prompt: str,
    output_dir: str,
):
    directory = Path(output_dir)
    directory.mkdir(
        parents=True,
        exist_ok=True,
    )

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    best_prompt = result.best_candidate

    prompt_path = directory / f"optimized_prompt_{timestamp}.txt"

    prompt_path.write_text(
        best_prompt,
        encoding="utf-8",
    )

    metadata = {
        "best_score": result.best_score,
        "total_evals": result.total_evals,
        "best_prompt_file": str(prompt_path),
    }

    metadata_path = directory / f"optimization_{timestamp}.json"

    metadata_path.write_text(
        json.dumps(
            metadata,
            indent=2,
            default=str,
        ),
        encoding="utf-8",
    )

    return prompt_path, metadata_path
