import { useEffect, useRef } from "react";
import { SurvivalWorld } from "../three/world";

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
      return;
    }

    const onPointer = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      world?.setPointer(nx, ny);
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      world?.setScroll(max > 0 ? window.scrollY / max : 0);
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
      world?.dispose();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="world-canvas" aria-hidden />
      {/* soft white wash so text stays readable over the 3D world */}
      <div
        className="world-canvas"
        aria-hidden
        style={{
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(120% 80% at 50% 30%, rgba(251,252,249,0) 40%, rgba(251,252,249,0.55) 100%)",
        }}
      />
    </>
  );
}
