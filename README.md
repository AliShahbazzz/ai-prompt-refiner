# Prompt Optimizer

A standalone Python application for automatically optimizing an AI
agent's system prompt using [GEPA](https://github.com/gepa-ai/gepa).

The optimizer does not connect to the production LangGraph application.
It directly executes the selected target LLM for each test input,
evaluates the responses, and lets GEPA iteratively improve the system
prompt.

## How it works

``` text
Existing system prompt
        +
Agent purpose
        +
Sample input dataset
        +
Target LLM
        |
        v
   GEPA optimizer
        |
        v
 Candidate system prompt
        |
        v
   Target LLM
        |
        v
     Response
        |
        v
   LLM evaluator
        |
        +--> Correctness
        +--> Response format
        +--> Hallucination
        +--> Task completion
        |
        v
 Score + diagnostic feedback
        |
        v
      GEPA
        |
        v
 Improved candidate
        |
        +------ repeat
```

GEPA uses the evaluator's score and diagnostic feedback to guide
subsequent prompt candidates.

## Requirements

-   Python 3.10+
-   An Azure/OpenAI-compatible LLM configuration
-   Access to the target model
-   Access to an evaluator/reflection model
-   GEPA 0.1.4 for the code in this repository

## Project structure

``` text
prompt-optimizer/
├── requirements.txt
├── .env
├── config.yaml
├── dataset.json
├── prompt.txt
├── src/
│   ├── __init__.py
│   ├── main.py
│   ├── config.py
│   ├── executor.py
│   ├── evaluator.py
│   └── optimizer.py
└── results/
```

## 1. Create a virtual environment

``` bash
python3 -m venv .venv
source .venv/bin/activate
```

On Windows:

``` powershell
python -m venv .venv
.venv\Scripts\activate
```

## 2. Install dependencies

``` bash
pip install -r requirements.txt
```

The project currently uses:

``` text
gepa==0.1.4
openai
python-dotenv
pyyaml
pydantic
```

If `requirements.txt` does not pin GEPA yet, install the version used by
this project explicitly:

``` bash
pip install gepa==0.1.4
```

Verify:

``` bash
pip show gepa
```

Expected:

``` text
Name: gepa
Version: 0.1.4
```

## 3. Configure Azure OpenAI

Create a `.env` file in the project root.

Example:

``` env
AZURE_OPENAI_API_KEY=your-api-key
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_VERSION=2025-04-01-preview

AZURE_TARGET_DEPLOYMENT=gpt-5.4-mini
AZURE_EVALUATOR_DEPLOYMENT=gpt-5.4
AZURE_REFLECTION_DEPLOYMENT=gpt-5.4
```

The deployment values must be the actual **Azure deployment names**
configured in your Azure OpenAI resource.

Do not commit `.env` to Git.

Add this to `.gitignore`:

``` gitignore
.env
.venv/
__pycache__/
results/
```

## 4. Configure the target model

Update `config.yaml`:

``` yaml
target:
  deployment: gpt-5.4-mini

evaluator:
  deployment: gpt-5.4

optimization:
  reflection_deployment: gpt-5.4
```

The target deployment is the model whose system prompt is being
optimized.

The evaluator evaluates the target model's responses.

The reflection model is used by GEPA to analyze evaluation feedback and
generate improved candidates.

## 5. Add the existing system prompt

Put the current production system prompt in:

``` text
prompt.txt
```

Example:

``` text
You are a customer analytics assistant.

Your purpose is to answer questions about customer analytics accurately.

Understand the user's request before responding.

Never invent information.

Keep responses concise and directly relevant to the user's request.
```

This becomes the seed prompt from which GEPA starts optimization.

## 6. Prepare the dataset

Create `dataset.json`.

Example:

``` json
[
  {
    "id": "case-001",
    "input": "Which customers have the highest outstanding amounts?",
    "expected": {
      "requirements": [
        "Identify customers with the highest outstanding amounts",
        "Do not invent customer data",
        "Answer directly"
      ]
    }
  },
  {
    "id": "case-002",
    "input": "Show me customers whose outstanding amount is above 100000.",
    "expected": {
      "requirements": [
        "Identify customers above the requested threshold",
        "Do not include unsupported customers",
        "Clearly answer the user's request"
      ]
    }
  }
]
```

Each test case should contain:

-   `id`
-   `input`
-   optional `expected`

If you have an expected answer, include it:

``` json
{
  "id": "case-003",
  "input": "What is the outstanding amount for ABC Traders?",
  "expected": {
    "answer": "125000",
    "requirements": [
      "Return the outstanding amount for ABC Traders"
    ]
  }
}
```

Expected answers and requirements give the evaluator stronger
information for judging correctness.

## 7. Configure the agent purpose

In `config.yaml`:

``` yaml
agent:
  name: customer-analytics-agent

  purpose: |
    Answer user questions about customer analytics accurately.
    Understand the user's intent and provide a concise answer.
    Never invent information.
```

The purpose is provided to the evaluator and GEPA so the optimizer
understands what the agent is supposed to accomplish.

## 8. Configure optimization

Example:

``` yaml
optimization:
  reflection_model: openai/gpt-5.4
  max_metric_calls: 100
  max_workers: 8
  cache_evaluation: true
  candidate_selection_strategy: pareto
```

### `max_metric_calls`

Controls the optimization budget.

For example:

``` yaml
max_metric_calls: 100
```

means GEPA can make up to the configured evaluation budget while
searching for better candidates.

Start small while testing:

``` yaml
max_metric_calls: 20
```

Then increase it once the pipeline is working.

### `max_workers`

Controls concurrent evaluation work.

``` yaml
max_workers: 8
```

Lower this if you encounter rate limits.

### `cache_evaluation`

``` yaml
cache_evaluation: true
```

Keeps repeated evaluations from unnecessarily calling the target model
again.

### `candidate_selection_strategy`

The current configuration uses:

``` yaml
candidate_selection_strategy: pareto
```

This allows GEPA to retain candidates that are strong in different
evaluation dimensions rather than relying only on a single scalar score.

## 9. Run the optimizer

From the project root:

``` bash
python -m src.main
```

The application will:

1.  Load `prompt.txt`.
2.  Load `dataset.json`.
3.  Split the dataset into training and validation sets.
4.  Generate candidate prompts through GEPA.
5.  Execute each candidate against the target LLM.
6.  Evaluate the target-model responses.
7.  Return scores and diagnostic feedback to GEPA.
8.  Generate additional candidates.
9.  Continue until the configured optimization budget is reached.
10. Save the best prompt.

## 10. Evaluation criteria

The evaluator currently scores four dimensions from 0 to 5.

### Correctness

Measures whether the response is factually and logically correct.

### Response format

Measures whether the response follows the expected format, style, and
requirements.

### Hallucination

Measures whether the response makes unsupported claims.

### Task completion

Measures whether the response actually satisfies the user's request.

The weighted score is configured in `config.yaml`:

``` yaml
evaluation:
  weights:
    correctness: 0.35
    response_format: 0.15
    hallucination: 0.30
    task_completion: 0.20
```

The weights should sum to `1.0`.

The evaluator produces a 0--5 score for each criterion. The weighted
result is normalized to 0--1 before being returned to GEPA.

## 11. Training and validation data

The current implementation uses an 80/20 split:

``` text
dataset.json
    |
    +-- 80% --> optimization
    |
    +-- 20% --> validation
```

The optimization examples are used during GEPA's search.

The validation examples are used to compare candidate prompts and help
avoid optimizing only for the training examples.

For a serious evaluation, use a sufficiently diverse dataset rather than
a handful of examples.

## 12. Output

After optimization, the application writes:

``` text
results/
├── optimized_prompt.txt
└── optimization.json
```

`optimized_prompt.txt` contains the best system prompt found by GEPA.

`optimization.json` contains information such as:

``` json
{
  "best_score": 0.86,
  "total_evals": 100,
  "initial_prompt": "...",
  "optimized_prompt": "..."
}
```

## 13. Recommended first run

Do not start with a large optimization budget.

Use:

``` yaml
optimization:
  max_metric_calls: 20
  max_workers: 4
  cache_evaluation: true
  candidate_selection_strategy: pareto
```

Use around 20--50 representative test cases.

Run:

``` bash
python -m src.main
```

Inspect:

``` text
results/optimized_prompt.txt
```

and compare it manually with the original `prompt.txt`.

Once the pipeline is working correctly, increase the budget:

``` yaml
max_metric_calls: 100
```

or higher.

## 14. Cost considerations

Every evaluation can involve two LLM calls:

``` text
Target LLM
    +
Evaluator LLM
```

Therefore, optimization can become expensive as the dataset and
evaluation budget increase.

For example, a rough upper bound of:

``` text
100 metric evaluations
×
1 target-model call
×
1 evaluator-model call
```

can result in approximately:

``` text
100 target calls
100 evaluator calls
```

GEPA may evaluate individual examples/candidates according to its search
strategy rather than simply running every candidate over the entire
dataset each time.

Start with a small budget and inspect the resulting quality before
scaling up.

## 15. Troubleshooting

### Azure authentication error

If you see:

``` text
AuthenticationError: 401
Incorrect API key provided
```

make sure the executor and evaluator use `AzureOpenAI`, not the standard
`OpenAI` client, and verify:

``` env
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_VERSION=...
```

### Azure deployment error

If the model cannot be found, verify that:

``` yaml
target:
  deployment: gpt-5.4-mini
```

matches the exact deployment name in Azure.

The deployment name does not necessarily have to match the underlying
model name.

### GEPA API mismatch

This project currently targets:

``` text
gepa 0.1.4
```

Check the installed version:

``` bash
pip show gepa
```

If you upgrade GEPA, some configuration/result APIs may differ.

### `EngineConfig` errors

If you see errors such as:

``` text
TypeError: EngineConfig.__init__() got an unexpected keyword argument ...
```

check the installed GEPA version first:

``` bash
pip show gepa
```

Do not mix examples from different GEPA releases.

## 16. Important limitations of the current version

This first version intentionally does **not** include:

-   tool calling
-   LangGraph execution
-   production API execution
-   streaming
-   multi-agent optimization
-   retrieval
-   deterministic domain-specific evaluators
-   automatic production deployment of optimized prompts

The target execution is simply:

``` text
system prompt
+
user input
        |
        v
target LLM
        |
        v
text response
```

This keeps the first experiment focused on determining whether GEPA can
improve your system prompts.

## 17. Next improvements

Once the basic optimizer works, the most useful improvements are:

1.  Add deterministic evaluators where possible.
2.  Add larger and more representative datasets.
3.  Add a separate held-out test set.
4.  Store every prompt candidate and evaluation result.
5.  Add prompt versioning.
6.  Add cost/token tracking.
7.  Add failure clustering.
8.  Compare the optimized prompt against the original on the same test
    set.
9.  Add support for multiple target models.
10. Add tool-call evaluation later if the agents start using tools.

## References

-   [GEPA documentation](https://gepa-ai.github.io/gepa/)
-   [GEPA `optimize_anything`
    API](https://gepa-ai.github.io/gepa/api/optimize_anything/optimize_anything/)
-   [GEPA GitHub repository](https://github.com/gepa-ai/gepa)