import json
from pathlib import Path

from .config import Config
from .evaluator import Evaluator
from .executor import Executor
from .optimizer import PromptOptimizer

config = Config()

ROOT = Path(__file__).resolve().parent.parent


def run_optimization(target: str):

    prompt_path = ROOT / "prompt.txt"
    purpose_path = ROOT / "purpose.txt"
    dataset_path = ROOT / "dataset.json"

    initial_prompt = prompt_path.read_text(encoding="utf-8")

    purpose = purpose_path.read_text(encoding="utf-8")

    with open(dataset_path, encoding="utf-8") as f:
        dataset = json.load(f)

    print(f"Target model: {target}")
    print(f"Dataset size: {len(dataset)}")
    print("Starting optimization...")

    if len(dataset) < 2:
        raise ValueError("Dataset must contain at least 2 examples.")

    # Deterministic 80/20 split for the first version.
    split_index = max(
        1,
        int(len(dataset) * 0.8),
    )

    trainset = dataset[:split_index]
    valset = dataset[split_index:]

    if not valset:
        raise ValueError(
            "Dataset must contain enough examples " "to create a validation set."
        )

    print(f"Total examples : {len(dataset)}")
    print(f"Training       : {len(trainset)}")
    print(f"Validation     : {len(valset)}")
    print()

    executor = Executor(deployment=target or config.target["deployment"])
    evaluator = Evaluator(
        model=config.evaluator["deployment"],
        weights=config.evaluation["weights"],
    )

    optimizer = PromptOptimizer(
        config=config,
        executor=executor,
        evaluator=evaluator,
    )

    print("Starting GEPA optimization...")
    print()

    result = optimizer.optimize(
        initial_prompt=initial_prompt,
        target=target,
        purpose=purpose,
        trainset=trainset,
        valset=valset,
    )

    print()
    print("=" * 60)
    print("OPTIMIZATION COMPLETE")
    print("=" * 60)

    print()
    print("Best prompt:")
    print("-" * 60)
    print(result.best_candidate)
    print("-" * 60)

    print()
    best_score = result.val_aggregate_scores[result.best_idx]

    print(f"Best score: {best_score}")

    output_dir = Path("results")
    output_dir.mkdir(exist_ok=True)

    best_prompt_path = output_dir / "optimized_prompt.txt"

    best_prompt_path.write_text(
        result.best_candidate,
        encoding="utf-8",
    )

    metadata = {
        "best_score": best_score,
        "total_evals": result.total_metric_calls,
        "initial_prompt": prompt,
        "optimized_prompt": result.best_candidate,
    }

    metadata_path = output_dir / "optimization.json"

    metadata_path.write_text(
        json.dumps(
            metadata,
            indent=2,
            ensure_ascii=False,
            default=str,
        ),
        encoding="utf-8",
    )

    print()
    print(f"Saved prompt: {best_prompt_path}")

    print(f"Saved metadata: {metadata_path}")


if __name__ == "__main__":
    run_optimization(
        target=config.target["deployment"],
    )
