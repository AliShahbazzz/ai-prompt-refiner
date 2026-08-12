import json
from typing import Any

from openai import AzureOpenAI
import os

EVALUATOR_INSTRUCTIONS = """
You are an expert evaluator of AI assistant responses.

Your job is to evaluate how well an AI assistant followed its
system prompt and completed the user's request.

Evaluate exactly these four dimensions.

1. CORRECTNESS

5 = Completely correct
4 = Minor non-material error
3 = Partially correct
2 = Significant incorrect information
1 = Mostly incorrect
0 = Completely incorrect

2. RESPONSE_FORMAT

5 = Fully follows the requested format and style
4 = Minor formatting issue
3 = Partially follows requirements
2 = Significant formatting problems
1 = Mostly fails the format requirements
0 = Completely fails the required format

3. HALLUCINATION

5 = No unsupported claims
4 = Very minor unsupported inference
3 = Some unsupported claims
2 = Significant unsupported claims
1 = Severe hallucination
0 = Response is primarily fabricated

A claim is hallucinated when it is presented as fact but is
not supported by the user input, expected information, or
other information explicitly available to the assistant.

4. TASK_COMPLETION

5 = Completely satisfies the request
4 = Nearly complete
3 = Partially complete
2 = Major requirements are missing
1 = Barely addresses the request
0 = Does not complete the task

IMPORTANT:

Do not reward an answer merely because it sounds plausible.

Evaluate whether the response actually satisfies the request.

If expected information is provided, use it when evaluating
correctness.

Return ONLY valid JSON.

The JSON must have this structure:

{
  "correctness": {
    "score": 0,
    "feedback": "..."
  },
  "response_format": {
    "score": 0,
    "feedback": "..."
  },
  "hallucination": {
    "score": 0,
    "feedback": "..."
  },
  "task_completion": {
    "score": 0,
    "feedback": "..."
  },
  "critical_failures": [],
  "improvement_suggestions": []
}
"""


class Evaluator:
    def __init__(
        self,
        model: str,
        weights: dict[str, float],
    ):
        self.client = AzureOpenAI(
            api_key=os.environ["AZURE_OPENAI_API_KEY"],
            azure_endpoint=os.environ["AZURE_OPENAI_ENDPOINT"],
            api_version=os.environ["AZURE_OPENAI_API_VERSION"],
        )
        self.model = model
        self.weights = weights

    def evaluate(
        self,
        purpose: str,
        system_prompt: str,
        example: dict[str, Any],
        response: str,
    ) -> tuple[float, dict[str, Any]]:

        payload = {
            "agent_purpose": purpose,
            "system_prompt": system_prompt,
            "user_input": example["input"],
            "expected": example.get("expected"),
            "assistant_response": response,
        }

        response = self.client.responses.create(
            model=self.model,
            instructions=EVALUATOR_INSTRUCTIONS,
            input=json.dumps(
                payload,
                indent=2,
                ensure_ascii=False,
            ),
        )

        evaluation = json.loads(response.output_text)

        score = self._calculate_score(evaluation)

        side_info = {
            "input": example["input"],
            "response": response,
            "scores": {
                "correctness": evaluation["correctness"]["score"],
                "response_format": evaluation["response_format"]["score"],
                "hallucination": evaluation["hallucination"]["score"],
                "task_completion": evaluation["task_completion"]["score"],
            },
            "feedback": {
                "correctness": evaluation["correctness"]["feedback"],
                "response_format": evaluation["response_format"]["feedback"],
                "hallucination": evaluation["hallucination"]["feedback"],
                "task_completion": evaluation["task_completion"]["feedback"],
            },
            "critical_failures": evaluation.get(
                "critical_failures",
                [],
            ),
            "improvement_suggestions": evaluation.get(
                "improvement_suggestions",
                [],
            ),
        }

        return score, side_info

    def _calculate_score(
        self,
        evaluation: dict[str, Any],
    ) -> float:

        scores = {
            "correctness": evaluation["correctness"]["score"],
            "response_format": evaluation["response_format"]["score"],
            "hallucination": evaluation["hallucination"]["score"],
            "task_completion": evaluation["task_completion"]["score"],
        }

        weighted_score = sum(scores[name] * self.weights[name] for name in scores)

        # Convert 0-5 → 0-1.
        return weighted_score / 5.0
