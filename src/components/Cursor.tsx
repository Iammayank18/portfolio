import { useEffect, useRef } from "react";

/** A survival "reticle" cursor with a lagging amber dot. */
export function Cursor() {
  const reticle = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    document.documentElement.classList.add("cursor-on");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx;
    let dy = my;
    let raf = 0;

    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (reticle.current) {
        reticle.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
      const t = e.target as HTMLElement;
      const interactive = !!t.closest("a, button, [role='button'], input, textarea, .slot");
      if (reticle.current) {
        reticle.current.style.opacity = interactive ? "1" : "0.6";
        reticle.current.style.scale = interactive ? "1.5" : "1";
      }
    };

    const loop = () => {
      dx += (mx - dx) * 0.18;
      dy += (my - dy) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${dx}px, ${dy}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    loop();

    return () => {
      document.documentElement.classList.remove("cursor-on");
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={reticle} className="reticle" aria-hidden />
      <div ref={dot} className="reticle-dot" aria-hidden />
    </>
  );
}
