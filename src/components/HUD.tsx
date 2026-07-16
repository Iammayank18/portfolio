import { VITALS } from "../data";
import { useScrollProgress } from "../hooks/useScrollProgress";

// same ramp as the 3D world / page theme
const nightProgress = (p: number) => {
  const x = Math.min(Math.max((p - 0.45) / (0.88 - 0.45), 0), 1);
  return x * x * (3 - 2 * x);
};

/** Always-on survival HUD overlay: corners, vitals, coordinates, travel meter. */
export function HUD() {
  const p = useScrollProgress();
  const deg = Math.round(p * 360);

  // in-world clock: 07:00 at the top of the page → 23:40 at the signal fire
  const night = nightProgress(p);
  const minutes = Math.round(420 + p * 1000);
  const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mm = String(minutes % 60).padStart(2, "0");
  const phase = night < 0.1 ? "DAY" : night < 0.85 ? "DUSK" : "NIGHT";

  return (
    <div className="hud-frame">
      <div className="hud-corner tl" />
      <div className="hud-corner tr" />
      <div className="hud-corner bl" />
      <div className="hud-corner br" />

      {/* vitals — bottom left */}
      <div className="absolute bottom-7 left-7 hidden sm:flex flex-col gap-2">
        {VITALS.map((v) => (
          <div key={v.label} className="flex items-center gap-2.5">
            <span className="hud-label w-16" style={{ color: "var(--ash)" }}>
              {v.label}
            </span>
            <div className={`meter meter--${v.accent}`}>
              <span style={{ transform: `scaleX(${v.value / 100})` }} />
            </div>
          </div>
        ))}
      </div>

      {/* coordinates / compass — bottom right */}
      <div className="absolute bottom-7 right-7 hidden sm:flex flex-col items-end gap-1.5">
        <span className="hud-label" style={{ color: "var(--ash)" }}>
          {hh}:{mm} · {phase}
        </span>
        <span className="hud-label" style={{ color: "var(--ash)" }}>
          BEARING {String(deg).padStart(3, "0")}°
        </span>
        <span className="hud-label" style={{ color: "var(--ash)" }}>
          26.9°N · 75.8°E
        </span>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full pulse"
            style={{ background: "var(--forest)" }}
          />
          <span className="hud-label" style={{ color: "var(--ash)" }}>
            EXPLORED {Math.round(p * 100)}%
          </span>
        </div>
      </div>

      {/* travel meter — center bottom */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[min(40vw,360px)]">
        <div className="h-[2px] w-full" style={{ background: "var(--line)" }}>
          <div
            className="h-full"
            style={{ width: `${p * 100}%`, background: "var(--ink)" }}
          />
        </div>
      </div>
    </div>
  );
}
