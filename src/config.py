import json
from pathlib import Path
from typing import Any

import yaml
from dotenv import load_dotenv

load_dotenv()


class Config:
    def __init__(self, path: str = "config.yaml"):
        with open(path, "r", encoding="utf-8") as file:
            self.data: dict[str, Any] = yaml.safe_load(file)

    @property
    def agent(self):
        return self.data["agent"]

    @property
    def target(self):
        return self.data["target"]

    @property
    def evaluator(self):
        return self.data["evaluator"]

    @property
    def optimization(self):
        return self.data["optimization"]

    @property
    def evaluation(self):
        return self.data["evaluation"]

    @property
    def dataset(self):
        return self.data["dataset"]

    @property
    def prompt(self):
        return self.data["prompt"]

    def load_prompt(self) -> str:
        return Path(self.prompt["path"]).read_text(encoding="utf-8")

    def load_dataset(self) -> list[dict]:
        with open(
            self.dataset["path"],
            "r",
            encoding="utf-8",
        ) as file:
            return json.load(file)
