import { useLayoutEffect } from "react";
import gsap from "gsap";

export function useHeroAnimations(isBooting: boolean) {
  useLayoutEffect(() => {
    if (isBooting) return;

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline();
      heroTl
        .from(".hero-title", {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        })
        .from(
          ".hero-subtitle",
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .from(
          ".hero-doodle",
          {
            scale: 0,
            rotate: -45,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        );
    });

    return () => ctx.revert();
  }, [isBooting]);
}
