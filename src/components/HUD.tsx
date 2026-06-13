import { VITALS } from "../data";
import { useScrollProgress } from "../hooks/useScrollProgress";

/** Always-on survival HUD overlay: corners, vitals, coordinates, travel meter. */
export function HUD() {
  const p = useScrollProgress();
  const deg = Math.round(p * 360);

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
          BEARING {String(deg).padStart(3, "0")}°
        </span>
        <span className="hud-label" style={{ color: "var(--ash)" }}>
          28.6°N · 77.2°E
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
