import os

from openai import AzureOpenAI


class Executor:
    def __init__(self, deployment: str):
        self.deployment = deployment

        self.client = AzureOpenAI(
            api_key=os.environ["AZURE_OPENAI_API_KEY"],
            azure_endpoint=os.environ["AZURE_OPENAI_ENDPOINT"],
            api_version=os.environ["AZURE_OPENAI_API_VERSION"],
        )

    def execute(
        self,
        system_prompt: str,
        user_input: str,
    ) -> str:
        response = self.client.responses.create(
            model=self.deployment,
            instructions=system_prompt,
            input=user_input,
        )

        return response.output_text