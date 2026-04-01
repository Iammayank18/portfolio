import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useAboutAnimations(isBooting: boolean) {
  useLayoutEffect(() => {
    if (isBooting) return;

    const ctx = gsap.context(() => {
      // About Section Entrance
      gsap.from(".about-content", {
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".about-image", {
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Story Section Details
      gsap.from(".story-note", {
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 60%",
        },
        scale: 0.8,
        rotate: -10,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      });

      gsap.from(".skill-tag", {
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 70%",
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [isBooting]);
}
