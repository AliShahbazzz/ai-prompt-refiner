import os

from openai import AzureOpenAI


class AzureReflectionLM:
    def __init__(self, deployment: str):
        self.deployment = deployment

        self.client = AzureOpenAI(
            api_key=os.environ["AZURE_OPENAI_API_KEY"],
            azure_endpoint=os.environ["AZURE_OPENAI_ENDPOINT"],
            api_version=os.environ["AZURE_OPENAI_API_VERSION"],
        )

    def __call__(self, prompt: str) -> str:
        response = self.client.responses.create(
            model=self.deployment,
            input=prompt,
        )

        return response.output_text