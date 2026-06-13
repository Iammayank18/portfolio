import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticOptions {
  /** How far the element travels toward the pointer (0–1 of the offset). */
  strength?: number;
  /** Padding (px) added around the element's hit area. */
  padding?: number;
}

/**
 * Makes an element subtly "pull" toward the pointer when hovered, then
 * spring back on leave. Great for CTAs, nav links, and icon buttons.
 * Disabled automatically on coarse pointers / reduced-motion.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(
  options: MagneticOptions = {},
) {
  const ref = useRef<T>(null);
  const { strength = 0.4, padding = 0 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reduced) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      const within =
        Math.abs(relX) < rect.width / 2 + padding &&
        Math.abs(relY) < rect.height / 2 + padding;
      if (within) {
        xTo(relX * strength);
        yTo(relY * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength, padding]);

  return ref;
}
