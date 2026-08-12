from typing import Any

from pydantic import BaseModel, Field


class ToolCall(BaseModel):
    name: str
    arguments: dict[str, Any] = Field(
        default_factory=dict
    )


class ToolResult(BaseModel):
    name: str
    result: Any = None


class ExecutionResult(BaseModel):
    response: str

    tool_calls: list[ToolCall] = Field(
        default_factory=list
    )

    tool_results: list[ToolResult] = Field(
        default_factory=list
    )

    raw_response: Any = None

    latency_ms: float | None = None

    suggestions: list[str] = Field(
        default_factory=list
    )