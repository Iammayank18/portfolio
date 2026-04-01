import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useExperienceAnimations(isBooting: boolean) {
  useLayoutEffect(() => {
    if (isBooting) return;

    const ctx = gsap.context(() => {
      // Experience Timeline Line Drawing
      gsap.from(".experience-line", {
        scrollTrigger: {
          trigger: "#experience",
          start: "top 70%",
          end: "bottom 80%",
          scrub: true,
        },
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
      });

      // Experience Items Reveal
      gsap.utils.toArray(".experience-item").forEach((item: any) => {
        const card = item.querySelector(".experience-card");
        const dot = item.querySelector(".timeline-dot-outer");
        const content = item.querySelectorAll(".experience-content-stagger");
        const period = item.querySelector(".experience-period");
        const marginNote = item.querySelector(".experience-margin-note");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        if (dot) {
          tl.from(dot, {
            scale: 0,
            duration: 0.4,
            ease: "back.out(2)",
          });
        }

        if (period) {
          tl.from(
            period,
            {
              x: -20,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.2",
          );
        }

        if (card) {
          tl.from(
            card,
            {
              y: 40,
              rotate: -2,
              clipPath: "inset(0 0 100% 0)",
              duration: 1,
              ease: "elastic.out(1, 0.8)",
            },
            "-=0.4",
          );
        }

        if (content && (content as NodeList).length > 0) {
          tl.from(
            content,
            {
              y: 10,
              stagger: 0.05,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.6",
          );
        }

        if (marginNote) {
          tl.from(
            marginNote,
            {
              scale: 0,
              rotate: 15,
              opacity: 0,
              duration: 0.6,
              ease: "back.out(1.7)",
            },
            "-=0.4",
          );
        }
      });
    });

    return () => ctx.revert();
  }, [isBooting]);
}
