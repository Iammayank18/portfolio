import { motion } from "motion/react";
import { SURVIVOR } from "../data";

const MARQUEE = "SEND A SIGNAL · AVAILABLE FOR DEPLOYMENT · LET'S BUILD · ";

export function Signal() {
  return (
    <section id="signal" className="relative px-5 sm:px-8 pt-24 sm:pt-32 pb-16">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* marquee */}
        <div
          className="overflow-hidden border-y py-4 mb-16"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <span
                key={k}
                className="font-display text-2xl sm:text-3xl font-bold whitespace-nowrap pr-6"
              >
                {MARQUEE.repeat(2)}
              </span>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <span className="eyebrow">06 · SIGNAL</span>
            <h2 className="display-lg mt-4">
              Fire a flare.
              <br />
              <span className="text-outline">I'll find you.</span>
            </h2>
            <p
              className="mt-5 max-w-md text-[15px] leading-relaxed"
              style={{ color: "var(--ash)" }}
            >
              Building something that needs to survive real traffic? I'm
              available for frontend and full-stack work. Send a signal and I'll
              respond.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={SURVIVOR.links.email} className="btn-ink">
                SEND A SIGNAL ✶
              </a>
              <a
                href={SURVIVOR.resume}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                FIELD LOG / CV
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 w-full"
          >
            <div className="panel ticked p-6 flex flex-col gap-1">
              {[
                ["EMAIL", SURVIVOR.email, SURVIVOR.links.email],
                ["GITHUB", "github.com/iammayank18", SURVIVOR.github],
                [
                  "LINKEDIN",
                  "linkedin.com/in/iammayank18",
                  SURVIVOR.links.linkedin,
                ],
              ].map(([label, val, href]) => (
                <a
                  key={label}
                  href={href}
                  target={label === "EMAIL" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center justify-between py-4 border-t first:border-t-0"
                  style={{ borderColor: "var(--line)" }}
                >
                  <span className="hud-label" style={{ color: "var(--ash)" }}>
                    {label}
                  </span>
                  <span className="font-mono text-[13px] link-underline">
                    {val}
                  </span>
                </a>
              ))}
              <div
                className="flex items-center justify-between pt-4 mt-2 border-t"
                style={{ borderColor: "var(--line)" }}
              >
                <span className="hud-label" style={{ color: "var(--ash)" }}>
                  STATUS
                </span>
                <span
                  className="inline-flex items-center gap-1.5 hud-label"
                  style={{ color: "var(--forest)" }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full pulse"
                    style={{ background: "var(--forest)" }}
                  />
                  ONLINE · OPEN TO WORK
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
