import { useEffect, useRef, useState } from "react";

/**
 * A hand-drawn "ink nib" cursor for desktop pointers.
 * - A solid ink dot tracks the pointer 1:1.
 * - A sketch-bordered ring lags behind with easing and grows over
 *   interactive elements (anything matching the selector below, or
 *   elements tagged with `data-cursor="hover"`).
 *
 * Falls back to the native cursor on touch / coarse-pointer devices
 * and when the user prefers reduced motion.
 */

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, label, [role="button"], [data-cursor="hover"]';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  // 1) Decide whether the custom cursor should be active.
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reduced) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");
    return () => {
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  // 2) Wire up the animation loop *after* the elements have rendered.
  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Target (true pointer) and the eased ring position.
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let hovering = false;
    let down = false;
    let raf = 0;

    const render = () => {
      // Dot snaps to the pointer; ring eases toward it.
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;

      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;

      const scale = (hovering ? 1.9 : 1) * (down ? 0.8 : 1);
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) rotate(${rx * 0.05}deg) scale(${scale})`;

      raf = requestAnimationFrame(render);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      const target = e.target as Element | null;
      hovering = !!target?.closest(INTERACTIVE_SELECTOR);
      ring.classList.toggle("cursor-ring--hover", hovering);
    };
    const onDown = () => {
      down = true;
    };
    const onUp = () => {
      down = false;
    };
    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
};
