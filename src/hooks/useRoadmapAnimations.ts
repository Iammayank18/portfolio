import { useLayoutEffect } from "react";
import type React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useRoadmapAnimations(
  isBooting: boolean,
  roadmapRef: React.RefObject<HTMLDivElement | null>,
  horizontalRef: React.RefObject<HTMLDivElement | null>,
) {
  useLayoutEffect(() => {
    if (isBooting) return;

    const ctx = gsap.context(() => {
      // Roadmap Horizontal Scroll
      if (horizontalRef.current && roadmapRef.current) {
        const horizontalSection = horizontalRef.current;
        const roadmapSection = roadmapRef.current;

        // Reset position
        gsap.set(horizontalSection, { x: 0 });

        const getScrollAmount = () => {
          const totalWidth = horizontalSection.scrollWidth;
          const viewportWidth = window.innerWidth;
          return Math.max(0, totalWidth - viewportWidth + 100);
        };

        const roadmapTween = gsap.to(horizontalSection, {
          x: () => -getScrollAmount(),
          ease: "none",
          id: "roadmapScroll",
          scrollTrigger: {
            trigger: roadmapSection,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            fastScrollEnd: true,
            onUpdate: (self) => {
              gsap.to(".roadmap-progress-bar", {
                width: `${self.progress * 100}%`,
                duration: 0.1,
                overwrite: true,
              });
            },
          },
        });

        // Animate individual items as they come into view
        const items = gsap.utils.toArray(".roadmap-item");
        items.forEach((item: any) => {
          const year = item.querySelector(".roadmap-year");
          const title = item.querySelector(".roadmap-title");
          const desc = item.querySelector(".roadmap-desc");
          const skills = item.querySelectorAll(".roadmap-skill-item");

          if (!year && !title && !desc && (!skills || (skills as NodeList).length === 0))
            return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              containerAnimation: roadmapTween,
              start: "left 80%",
              toggleActions: "play none none reverse",
            },
          });

          if (year) {
            tl.from(year, { opacity: 0, x: -20, duration: 0.5 });
          }

          const textElements = [title, desc].filter(Boolean);
          if (textElements.length > 0) {
            tl.from(
              textElements,
              {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                duration: 0.6,
                ease: "rough({ template: power1.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false })",
              },
              "-=0.3",
            );
          }

          if (skills && (skills as NodeList).length > 0) {
            tl.from(
              skills,
              { opacity: 0, y: 10, stagger: 0.05, duration: 0.4 },
              "-=0.2",
            );
          }
        });
      }
    });

    return () => ctx.revert();
  }, [isBooting]);
}
