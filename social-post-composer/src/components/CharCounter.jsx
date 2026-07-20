import { PLATFORMS } from "../platformConfig";
import "./CharCounter.css";

export default function CharCounter({ text, selectedPlatforms }) {
  if (!selectedPlatforms.length) return null;

  return (
    <div className="char-counters">
      {selectedPlatforms.map((pid) => {
        const p = PLATFORMS[pid];
        const used = text.length;
        const pct = Math.min((used / p.charLimit) * 100, 100);
        const remaining = p.charLimit - used;
        const status = remaining < 0 ? "over" : remaining < p.charLimit * 0.1 ? "warn" : "ok";

        return (
          <div key={pid} className={`counter-item ${status}`}>
            <span className="counter-label">{p.icon} {p.name}</span>
            <div className="counter-bar-wrap">
              <div
                className="counter-bar"
                style={{ width: `${pct}%`, backgroundColor: status === "over" ? "#fff" : status === "warn" ? "#aaa" : "#666" }}
              />
            </div>
            <span className="counter-num">
              {remaining < 0 ? `−${Math.abs(remaining)}` : remaining}
            </span>
          </div>
        );
      })}
    </div>
  );
}
