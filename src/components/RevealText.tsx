import { useLayoutEffect, useRef, createElement, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  children: string;
  /** Element tag to render (e.g. "h1", "p", "span"). */
  as?: keyof HTMLElementTagNameMap;
  className?: string;
  /** Stagger between words, in seconds. */
  stagger?: number;
  /** Initial delay before the reveal starts. */
  delay?: number;
  /** "load" plays immediately; "scroll" plays when scrolled into view. */
  trigger?: "load" | "scroll";
}

/**
 * Splits text into words and reveals each from behind a clipping mask —
 * the classic editorial "lines rising into place" effect — using GSAP.
 * Respects reduced-motion by rendering the text statically.
 */
export const RevealText = ({
  children,
  as = "span",
  className,
  stagger = 0.08,
  delay = 0,
  trigger = "load",
}: RevealTextProps) => {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const words = el.querySelectorAll<HTMLElement>(".reveal-word");
    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 120 });
      gsap.to(words, {
        yPercent: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger,
        delay,
        ...(trigger === "scroll"
          ? { scrollTrigger: { trigger: el, start: "top 85%" } }
          : {}),
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, delay, trigger]);

  const maskStyle = {
    display: "inline-block",
    overflow: "hidden",
    verticalAlign: "top",
  } as const;

  const content: ReactNode = children.split(" ").map((word, i, arr) => (
    <span key={`${word}-${i}`}>
      <span style={maskStyle}>
        <span className="reveal-word" style={{ display: "inline-block" }}>
          {word}
        </span>
      </span>
      {i < arr.length - 1 ? " " : ""}
    </span>
  ));

  return createElement(as, { ref, className }, content);
};
