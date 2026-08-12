from typing import Any

from gepa.optimize_anything import (
    optimize_anything,
    GEPAConfig,
    EngineConfig,
    ReflectionConfig,
)

from .evaluator import Evaluator
from .executor import Executor


class PromptOptimizer:
    def __init__(
        self,
        config,
        executor: Executor,
        evaluator: Evaluator,
    ):
        self.config = config
        self.executor = executor
        self.evaluator = evaluator

    def evaluate(
        self,
        candidate: str,
        example: dict[str, Any],
    ):
        response = self.executor.execute(
            system_prompt=candidate,
            user_input=example["input"],
        )

        score, side_info = self.evaluator.evaluate(
            purpose=self.config.agent["purpose"],
            system_prompt=candidate,
            example=example,
            response=response,
        )

        return score, side_info

    def optimize(
        self,
        initial_prompt: str,
        trainset: list[dict],
        valset: list[dict],
    ):
        objective = f"""
Optimize the system prompt for the following AI agent.

Agent purpose:

{self.config.agent["purpose"]}

Target model:

{self.config.target["deployment"]}

The optimized prompt should maximize:

- correctness
- response format compliance
- avoidance of hallucinations
- task completion

The target model itself must not be changed.

The optimized artifact must be a complete system prompt.

Preserve useful behavior from the existing prompt.

Do not optimize merely for shorter or more sophisticated
wording.

Use the evaluator feedback to identify recurring behavioral
failures and improve the instructions that cause those failures.
"""

        background = """
This is a production-oriented system prompt.

The evaluator runs the candidate prompt against multiple
realistic user inputs.

The evaluator provides:

- target-model response
- correctness score and feedback
- response-format score and feedback
- hallucination score and feedback
- task-completion score and feedback
- critical failures
- improvement suggestions

Use these diagnostics to make targeted improvements.

Do not invent capabilities that the agent does not have.

Do not introduce tools, APIs, data sources, or capabilities
that are not present.

Do not solve individual examples by adding hardcoded answers.

The prompt should generalize to unseen inputs.
"""

        result = optimize_anything(
            seed_candidate=initial_prompt,
            evaluator=self.evaluate,
            dataset=trainset,
            valset=valset,
            objective=objective,
            background=background,
            config=GEPAConfig(
                engine=EngineConfig(
                    max_metric_calls=(self.config.optimization["max_metric_calls"]),
                    max_workers=(self.config.optimization["max_workers"]),
                    parallel=True,
                    cache_evaluation=(self.config.optimization["cache_evaluation"]),
                    candidate_selection_strategy=(
                        self.config.optimization["candidate_selection_strategy"]
                    ),
                    display_progress_bar=True,
                ),
                reflection=ReflectionConfig(
                    reflection_lm=(self.config.optimization["reflection_deployment"]),
                ),
            ),
        )

        return result
