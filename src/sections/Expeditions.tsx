import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "../components/SectionHeader";
import { EXPERIENCE, REGION_META } from "../data";

gsap.registerPlugin(ScrollTrigger);

export function Expeditions() {
  const root = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // draw the trail line as you scroll the section
      if (trail.current) {
        gsap.fromTo(
          trail.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 60%",
              end: "bottom 70%",
              scrub: true,
            },
          }
        );
      }

      // reveal each expedition card
      gsap.utils.toArray<HTMLElement>(".expedition").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 48,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
        const node = el.querySelector(".node");
        if (node) {
          gsap.from(node, {
            scale: 0,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: { trigger: el, start: "top 78%" },
          });
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="expeditions" ref={root} className="relative px-5 sm:px-8 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px]">
        <SectionHeader
          index="02"
          kicker="EXPEDITIONS"
          title="Regions explored, terrain survived."
          sub="Each role was a different biome — fintech highlands, a founder's basin, realtime lowlands. Here's where I've been deployed and what I brought back."
        />

        <div className="relative pl-8 sm:pl-12">
          {/* trail track */}
          <div
            className="absolute left-[7px] sm:left-[15px] top-2 bottom-2 w-px"
            style={{ background: "var(--line)" }}
          />
          <div
            ref={trail}
            className="absolute left-[7px] sm:left-[15px] top-2 bottom-2 w-px origin-top"
            style={{ background: "var(--ink)" }}
          />

          <div className="flex flex-col gap-16 sm:gap-20">
            {EXPERIENCE.map((exp) => {
              const meta = REGION_META[exp.company] ?? {
                region: exp.company.toUpperCase(),
                biome: "",
                coord: "",
              };
              return (
                <div key={exp.company} className="expedition relative">
                  {/* node on the trail */}
                  <span
                    className="node absolute -left-8 sm:-left-12 top-1.5 grid place-items-center h-4 w-4"
                    style={{ background: "var(--paper)" }}
                  >
                    <span className="h-2.5 w-2.5 rotate-45" style={{ background: "var(--amber)" }} />
                  </span>

                  {/* panel-soft keeps the log readable over the 3D world */}
                  <div className="panel-soft ticked max-w-3xl p-5 sm:p-7">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                      <span className="font-mono text-[11px]" style={{ color: "var(--amber)" }}>
                        {meta.coord}
                      </span>
                      <span className="hud-label" style={{ color: "var(--ash)" }}>
                        {exp.period}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                      {meta.region}
                    </h3>
                    <p className="mt-1 font-mono text-xs" style={{ color: "var(--ash)" }}>
                      {exp.role} · {exp.company}
                      {meta.biome ? ` · ${meta.biome}` : ""}
                    </p>

                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed">
                      {exp.description}
                    </p>

                    <ul className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                      {exp.achievements.map((a, i) => (
                        <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rotate-45"
                            style={{ background: "var(--forest)" }}
                          />
                          <span style={{ color: "var(--ash)" }}>{a}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] tracking-wide px-2 py-1 border"
                          style={{ borderColor: "var(--line)", color: "var(--ash)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
