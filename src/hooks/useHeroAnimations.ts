import { useLayoutEffect } from "react";
import gsap from "gsap";

export function useHeroAnimations(isBooting: boolean) {
  useLayoutEffect(() => {
    if (isBooting) return;

    const ctx = gsap.context(() => {
      // The hero name is revealed word-by-word by <RevealText>; this
      // timeline only choreographs the subtitle fade-up.
      gsap.from(".hero-subtitle", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      });
    });

    return () => ctx.revert();
  }, [isBooting]);
}
