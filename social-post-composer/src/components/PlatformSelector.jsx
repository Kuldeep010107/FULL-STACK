import { PLATFORMS } from "../platformConfig";
import "./PlatformSelector.css";

export default function PlatformSelector({ selected, onChange }) {
  const toggle = (pid) => {
    onChange(
      selected.includes(pid)
        ? selected.filter((p) => p !== pid)
        : [...selected, pid]
    );
  };

  return (
    <div className="platform-selector">
      <label className="field-label">Publish to</label>
      <div className="platform-list">
        {Object.entries(PLATFORMS).map(([pid, p]) => (
          <button
            key={pid}
            type="button"
            className={`platform-btn ${selected.includes(pid) ? "active" : ""}`}
            onClick={() => toggle(pid)}
          >
            <span className="platform-icon">{p.icon}</span>
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
