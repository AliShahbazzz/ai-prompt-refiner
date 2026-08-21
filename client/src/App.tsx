import { useState, type ReactNode } from "react";
import { DUMMY_DATASET, DUMMY_PROMPT, DUMMY_PURPOSE } from "./defaults";

interface CopyButtonProps {
  value: string;
}

function CopyButton({ value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button type="button" className="copy-btn" onClick={handleCopy}>
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

interface OptimizeDatasetItem {
  id: string;
  input: string;
  expected?: Record<any, any>;
}

interface OptimizeRequest {
  purpose: string;
  initial_prompt: string;
  dataset: OptimizeDatasetItem[];
  target: string;
}

interface FieldProps {
  label: string;
  description?: string;
  children: ReactNode;
  value: string;
  className?: string;
}

function Field({
  label,
  description,
  children,
  value,
  className = "",
}: FieldProps) {
  return (
    <div className={`field ${className}`.trim()}>
      <div className="field-header">
        <div className="field-heading">
          <label>{label}</label>
          {description && <p className="field-description">{description}</p>}
        </div>
        <CopyButton value={value} />
      </div>
      {children}
    </div>
  );
}

export default function App() {
  const [purpose, setPurpose] = useState(DUMMY_PURPOSE);
  const [initialPrompt, setInitialPrompt] = useState(DUMMY_PROMPT);
  const [dataset, setDataset] = useState(DUMMY_DATASET);
  const [optimisedPrompt, setOptimisedPrompt] = useState("");
  const [target, setTarget] = useState("gpt-5.4-mini");
  const [logs, setLogs] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);

  const canOptimize =
    purpose.trim() !== "" &&
    initialPrompt.trim() !== "" &&
    dataset.trim() !== "" &&
    target.trim() !== "";

  const MAX_LOG_LINES = 500;

  const appendLog = (line: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => {
      const next = `[${timestamp}] ${line}\n${prev}`;
      const lines = next.split("\n");
      if (lines.length <= MAX_LOG_LINES) return next;
      return lines.slice(0, MAX_LOG_LINES).join("\n");
    });
  };

  const handleOptimize = async () => {
    let parsedDataset: OptimizeDatasetItem[];
    try {
      parsedDataset = JSON.parse(JSON.stringify(dataset));
    } catch (err) {
      appendLog(`Failed to parse dataset JSON: ${(err as Error).message}`);
      return;
    }

    const payload: OptimizeRequest = {
      purpose,
      initial_prompt: initialPrompt,
      dataset: parsedDataset,
      target,
    };

    setIsOptimizing(true);
    setLogs("");
    setOptimisedPrompt("");
    appendLog("Connecting to optimisation stream...");

    try {
      const response = await fetch("http://localhost:8000/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";

        for (const rawEvent of events) {
          const dataLines = rawEvent
            .split("\n")
            .filter((line) => line.startsWith("data:"))
            .map((line) => line.slice(5).trim());

          if (dataLines.length === 0) continue;
          const data = dataLines.join("\n");
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            if (typeof parsed?.optimized_prompt === "string") {
              setOptimisedPrompt((prev) => prev + parsed.optimized_prompt);
            } else if (typeof parsed?.log === "string") {
              appendLog(parsed.log);
            } else if (typeof parsed?.message === "string") {
              appendLog(parsed.message);
            } else {
              appendLog(data);
            }
          } catch {
            appendLog(data);
          }
        }
      }

      appendLog("Optimisation complete.");
    } catch (err) {
      appendLog(`Optimisation failed: ${(err as Error).message}`);
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="page">
      <h1>AI Prompt Refiner</h1>

      <div className="columns">
        <div className="column column-wide">
          <Field
            label="Purpose"
            description="What is this prompt for?"
            value={purpose}
          >
            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              rows={8}
            />
          </Field>

          <Field
            label="Initial Prompt"
            description="The starting prompt before optimisation."
            value={initialPrompt}
          >
            <textarea
              value={initialPrompt}
              onChange={(e) => setInitialPrompt(e.target.value)}
              rows={8}
            />
          </Field>

          <Field
            label="Dataset (JSON)"
            description='Example input/output pairs, e.g. [{ "input": "...", "output": "..." }]'
            value={dataset}
          >
            <textarea
              className="mono"
              value={dataset}
              onChange={(e) => setDataset(e.target.value)}
              rows={8}
            />
          </Field>

          <Field
            label="Target"
            description="Target model or metric to optimise for."
            value={target}
          >
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </Field>

          <button
            type="button"
            className="optimize-btn"
            disabled={!canOptimize || isOptimizing}
            onClick={handleOptimize}
          >
            {isOptimizing ? "Optimizing..." : "Optimize"}
          </button>
        </div>

        <div className="column column-wide column-stack">
          <Field
            label="Optimised Prompt"
            description="The refined prompt produced by optimisation."
            value={optimisedPrompt}
            className="field"
          >
            <textarea
              className="fill"
              value={optimisedPrompt}
              onChange={(e) => setOptimisedPrompt(e.target.value)}
              rows={25}
            />
          </Field>

          <Field
            label="Logs"
            description="Output from the optimisation run."
            value={logs}
            className="field"
          >
            <textarea
              className="fill mono"
              value={logs}
              rows={12}
              readOnly
            />
          </Field>
        </div>
      </div>
    </div>
  );
}
