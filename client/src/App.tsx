import { useState, type ReactNode } from "react";
import { DUMMY_DATASET, DUMMY_LOGS, DUMMY_PROMPT, DUMMY_PURPOSE } from "./defaults";

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

interface FieldProps {
  label: string;
  description?: string;
  children: ReactNode;
  value: string;
  className?: string;
}

function Field({ label, description, children, value, className = "" }: FieldProps) {
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
  const [optimisedPrompt, setOptimisedPrompt] = useState(
    "You are an expert customer support triage assistant.\n\nRead the ticket below and classify it into exactly one category: billing, technical, account, or general.\n\nRules:\n- billing: payments, charges, invoices, refunds\n- technical: bugs, crashes, errors, performance\n- account: login, password, profile, access\n- general: anything that doesn't clearly fit the above\n\nRespond with only the category name in lowercase.\n\nTicket: {{input}}",
  );
  const [target, setTarget] = useState("gpt-5.4-mini");
  const [logs] = useState(DUMMY_LOGS);

  const canOptimize =
    purpose.trim() !== "" &&
    initialPrompt.trim() !== "" &&
    dataset.trim() !== "" &&
    target.trim() !== "";

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

          <button type="button" className="optimize-btn" disabled={!canOptimize}>
            Optimize
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
            <textarea className="fill mono" value={logs} rows={12} readOnly />
          </Field>
        </div>
      </div>
    </div>
  );
}
