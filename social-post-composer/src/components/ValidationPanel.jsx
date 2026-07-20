import { PLATFORMS } from "../platformConfig";
import "./ValidationPanel.css";

export default function ValidationPanel({ errors, warnings }) {
  const hasErrors = Object.keys(errors).length > 0;
  const hasWarnings = Object.keys(warnings).length > 0;

  if (!hasErrors && !hasWarnings) return null;

  return (
    <div className="validation-panel">
      {hasErrors && (
        <div className="validation-section errors">
          <strong>❌ Errors</strong>
          {Object.entries(errors).map(([pid, msgs]) => (
            <div key={pid} className="validation-group">
              <span className="v-platform">{PLATFORMS[pid].name}</span>
              {msgs.map((m, i) => <div key={i} className="v-msg">{m}</div>)}
            </div>
          ))}
        </div>
      )}
      {hasWarnings && (
        <div className="validation-section warnings">
          <strong>⚠️ Warnings</strong>
          {Object.entries(warnings).map(([pid, msgs]) => (
            <div key={pid} className="validation-group">
              <span className="v-platform">{PLATFORMS[pid].name}</span>
              {msgs.map((m, i) => <div key={i} className="v-msg">{m}</div>)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
