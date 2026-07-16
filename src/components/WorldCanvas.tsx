import { useEffect, useRef } from "react";
import { SurvivalWorld } from "../three/world";

// mirror of the world's night ramp — dusk starts mid-page, full night by the signal
const nightProgress = (p: number) => {
  const x = Math.min(Math.max((p - 0.45) / (0.88 - 0.45), 0), 1);
  return x * x * (3 - 2 * x); // smoothstep
};

export function WorldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let world: SurvivalWorld | null = null;
    try {
      world = new SurvivalWorld(canvas);
    } catch {
      // WebGL unavailable — fail silently, page still works
      // (scroll listener below still drives the page's day→night theme)
    }

    const onPointer = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      world?.setPointer(nx, ny);
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      world?.setScroll(p);
      document.documentElement.style.setProperty(
        "--night",
        nightProgress(p).toFixed(3)
      );
    };

    const onResize = () => world?.resize();

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.documentElement.style.removeProperty("--night");
      world?.dispose();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="world-canvas" aria-hidden />
      {/* soft white wash so text stays readable over the 3D world by day;
          fades out as night falls so the dark sky reads true */}
      <div
        className="world-canvas"
        aria-hidden
        style={{
          zIndex: 1,
          pointerEvents: "none",
          opacity: "calc(1 - var(--pnight, 0))",
          background:
            "radial-gradient(120% 80% at 50% 30%, rgba(251,252,249,0) 55%, rgba(251,252,249,0.22) 100%)",
        }}
      />
    </>
  );
}
