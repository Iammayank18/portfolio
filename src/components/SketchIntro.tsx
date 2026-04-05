import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";

/**
 * Letter paths for "MAYANK" in a 400×200 viewBox.
 * Each stroke is drawn separately so the pencil can follow each one.
 */
const PATHS = [
  // M — single continuous stroke: bottom-left → top-left → V-notch → top-right → bottom-right
  { id: "lm",   d: "M 50,140 L 50,60 L 70,100 L 90,60 L 90,140",  dur: 0.55 },
  // A — left leg, right leg, crossbar
  { id: "la1",  d: "M 120,60 L 100,140",                            dur: 0.23 },
  { id: "la2",  d: "M 120,60 L 140,140",                            dur: 0.23 },
  { id: "la3",  d: "M 108,114 L 132,114",                           dur: 0.12 },
  // Y — two arms then stem
  { id: "ly1",  d: "M 152,60 L 170,100",                            dur: 0.17 },
  { id: "ly2",  d: "M 188,60 L 170,100",                            dur: 0.17 },
  { id: "ly3",  d: "M 170,100 L 170,140",                           dur: 0.12 },
  // A (second)
  { id: "la4",  d: "M 220,60 L 200,140",                            dur: 0.23 },
  { id: "la5",  d: "M 220,60 L 240,140",                            dur: 0.23 },
  { id: "la6",  d: "M 208,114 L 232,114",                           dur: 0.12 },
  // N — single continuous: bottom-left → top-left → bottom-right → top-right
  { id: "ln",   d: "M 252,140 L 252,60 L 290,140 L 290,60",         dur: 0.54 },
  // K — vertical stem, upper arm, lower arm
  { id: "lk1",  d: "M 308,60 L 308,140",                            dur: 0.21 },
  { id: "lk2",  d: "M 308,100 L 348,60",                            dur: 0.19 },
  { id: "lk3",  d: "M 308,100 L 348,140",                           dur: 0.19 },
  // Decorative wavy underline
  { id: "ul",   d: "M 48,158 Q 120,167 196,158 T 344,158",          dur: 0.42 },
];

const STARS = [
  { cx: 18,  cy: 56,  size: 14, fill: "#f59e0b", char: "✦" },
  { cx: 362, cy: 62,  size: 10, fill: "#f59e0b", char: "★" },
  { cx: 374, cy: 152, size: 8,  fill: "#94a3b8", char: "·" },
  { cx: 10,  cy: 148, size: 8,  fill: "#94a3b8", char: "·" },
];

export const SketchIntro = ({
  onComplete,
}: {
  onComplete: () => void;
  key?: string;
}) => {
  const svgRef      = useRef<SVGSVGElement>(null);
  const pencilRef   = useRef<SVGGElement>(null);
  const sparklesRef = useRef<SVGGElement>(null);
  const starsRef    = useRef<SVGGElement>(null);
  const onDoneRef   = useRef(onComplete);
  const mountedRef  = useRef(true);

  const [showBubble, setShowBubble] = useState(false);
  const [showRole,   setShowRole]   = useState(false);

  useEffect(() => { onDoneRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    mountedRef.current = true;
    const svg = svgRef.current;
    if (!svg) return;

    // Hide all letter paths (full dashoffset = invisible)
    PATHS.forEach(({ id }) => {
      const el = svg.querySelector<SVGPathElement>(`#${id}`);
      if (!el) return;
      const len = el.getTotalLength();
      el.style.strokeDasharray  = String(len);
      el.style.strokeDashoffset = String(len);
    });

    // Tiny random jitter so the pencil tip feels like a real hand
    const j = () => (Math.random() - 0.5) * 0.9;

    const tl = gsap.timeline();

    // ── Pencil enters at the start of the first stroke ──────────────────────
    const firstEl = svg.querySelector<SVGPathElement>(`#${PATHS[0].id}`);
    if (firstEl && pencilRef.current) {
      const p0 = firstEl.getPointAtLength(0);
      pencilRef.current.setAttribute("transform", `translate(${p0.x}, ${p0.y})`);
    }
    tl.fromTo(pencilRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });

    // ── Draw each stroke, pencil follows via getPointAtLength ────────────────
    PATHS.forEach(({ id, dur }) => {
      const el = svg.querySelector<SVGPathElement>(`#${id}`);
      if (!el) return;
      const totalLen = el.getTotalLength();
      const startPt  = el.getPointAtLength(0);

      // Instant teleport to this stroke's start (pencil lifts between letters)
      tl.call(() => {
        pencilRef.current?.setAttribute(
          "transform",
          `translate(${startPt.x}, ${startPt.y})`
        );
      });

      const state = { p: 0 };
      tl.to(state, {
        p: 1,
        duration: dur,
        ease: "power1.inOut",
        onUpdate() {
          const len = state.p * totalLen;
          const pt  = el.getPointAtLength(len);

          // Reveal path up to current progress
          el.style.strokeDashoffset = String(totalLen * (1 - state.p));

          // Move pencil tip to current drawing point + subtle hand jitter
          pencilRef.current?.setAttribute(
            "transform",
            `translate(${pt.x + j()}, ${pt.y + j()})`
          );

          // Graphite dust particles
          if (sparklesRef.current && Math.random() < 0.10) {
            const g   = sparklesRef.current;
            const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            dot.setAttribute("cx",      String(pt.x + (Math.random() - 0.5) * 6));
            dot.setAttribute("cy",      String(pt.y + (Math.random() - 0.5) * 6));
            dot.setAttribute("r",       String(0.3 + Math.random() * 1.3));
            dot.setAttribute("fill",    "#888");
            dot.setAttribute("opacity", "0.55");
            g.appendChild(dot);
            gsap.to(dot, {
              opacity: 0,
              duration: 0.5 + Math.random() * 0.4,
              delay: 0.08,
              onComplete: () => { try { g.removeChild(dot); } catch (_) {/* already removed */} },
            });
          }
        },
      });
    });

    // ── Pencil floats away ───────────────────────────────────────────────────
    const lastEl = svg.querySelector<SVGPathElement>(`#${PATHS[PATHS.length - 1].id}`);
    const endPt  = lastEl
      ? lastEl.getPointAtLength(lastEl.getTotalLength())
      : { x: 200, y: 158 };
    tl.to(pencilRef.current, {
      attr:     { transform: `translate(${endPt.x + 30}, ${endPt.y - 65})` },
      opacity:  0,
      duration: 0.45,
      ease:     "power2.out",
    });

    // ── Stars pop in ─────────────────────────────────────────────────────────
    if (starsRef.current) {
      tl.fromTo(
        Array.from(starsRef.current.children),
        { scale: 0, opacity: 0, transformOrigin: "0 0" },
        { scale: 1, opacity: 1, duration: 0.22, stagger: 0.09, ease: "back.out(2.5)" },
        "-=0.05"
      );
    }

    // ── Speech bubble + role text ────────────────────────────────────────────
    tl.call(() => {
      if (mountedRef.current) {
        setShowBubble(true);
        setTimeout(() => { if (mountedRef.current) setShowRole(true); }, 420);
      }
    });

    // ── Hold, then hand off to portfolio ─────────────────────────────────────
    tl.to({}, { duration: 1.8, onComplete: () => onDoneRef.current() });

    return () => {
      mountedRef.current = false;
      tl.kill();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.75 }}
      className="fixed inset-0 bg-[#fdfcf8] z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Ruled notebook lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(transparent 27px, #e3dfd6 27px, #e3dfd6 28px, transparent 28px)",
          backgroundSize: "100% 28px",
          opacity: 0.5,
        }}
      />

      {/* ── Sketchpad card ───────────────────────────────────────────────────── */}
      <div className="relative bg-white/85 sketch-border shadow-2xl p-6 md:p-8 mx-6 max-w-[520px] w-full rotate-[-0.5deg]">
        {/* Binding holes at top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-28 pointer-events-none">
          <div className="w-5 h-5 rounded-full bg-[#fdfcf8] border border-gray-200 shadow-inner" />
          <div className="w-5 h-5 rounded-full bg-[#fdfcf8] border border-gray-200 shadow-inner" />
        </div>

        {/* Red left-margin line */}
        <div className="absolute left-10 top-0 bottom-0 w-px bg-red-200/70 pointer-events-none" />

        <svg
          ref={svgRef}
          viewBox="0 0 400 200"
          className="w-full"
          fill="none"
          overflow="visible"
        >
          <defs>
            {/* feTurbulence + feDisplacementMap gives paths a hand-drawn wobble */}
            <filter id="sk-hand" x="-8%" y="-25%" width="116%" height="150%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.04 0.065"
                numOctaves="3"
                seed="12"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="1.6"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>

          {/* Letter strokes (filter adds the hand-drawn wobble) */}
          <g filter="url(#sk-hand)" strokeLinecap="round" strokeLinejoin="round">
            {PATHS.map(({ id, d }) => (
              <path key={id} id={id} d={d} stroke="#1a1a2e" strokeWidth="3.6" />
            ))}
          </g>

          {/* Decorative stars — pop in after drawing is done */}
          <g ref={starsRef}>
            {STARS.map(({ cx, cy, size, fill, char }) => (
              <g
                key={`${cx}-${cy}`}
                transform={`translate(${cx}, ${cy})`}
                style={{ opacity: 0 }}
              >
                <text x={-size / 2} y={size / 3} fontSize={size} fill={fill}>
                  {char}
                </text>
              </g>
            ))}
          </g>

          {/* Graphite dust particles — imperatively managed by GSAP */}
          <g ref={sparklesRef} />

          {/* ── Pencil ─────────────────────────────────────────────────────────
               Outer <g> is positioned at the current drawing point.
               Inner <g> has a fixed 30° tilt (natural right-hand writing angle).
               The pencil tip (graphite point) is at the outer <g>'s origin (0,0).
          ─────────────────────────────────────────────────────────────────── */}
          <g ref={pencilRef} opacity="0">
            <g transform="rotate(30)">
              {/* graphite tip — narrow vertex at (0,0) = paper contact point */}
              <polygon points="-1.5,-3 0,0 1.5,-3" fill="#4a4a4a" />
              {/* wood cone */}
              <polygon
                points="-3.5,-3 0,-13 3.5,-3"
                fill="#D4904A"
                stroke="#2d2d2d"
                strokeWidth="0.6"
              />
              {/* yellow body */}
              <rect
                x="-4.5" y="-34" width="9" height="21" rx="1"
                fill="#F7E05A" stroke="#2d2d2d" strokeWidth="0.7"
              />
              {/* wood grain */}
              <line x1="-2" y1="-32" x2="-2" y2="-15" stroke="#E0C830" strokeWidth="0.9" opacity="0.4" />
              <line x1="2"  y1="-32" x2="2"  y2="-15" stroke="#E0C830" strokeWidth="0.9" opacity="0.4" />
              {/* metal ferrule */}
              <rect
                x="-4.5" y="-38" width="9" height="4"
                fill="#ADADAD" stroke="#666" strokeWidth="0.5"
              />
              {/* eraser */}
              <rect
                x="-4" y="-44" width="8" height="6" rx="2"
                fill="#F4AEAD" stroke="#aaa" strokeWidth="0.5"
              />
            </g>
          </g>
        </svg>

        {/* "Frontend Engineer" fades in below the name */}
        <AnimatePresence>
          {showRole && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center font-mono text-xs text-gray-400 tracking-[0.22em] uppercase mt-3"
            >
              Frontend Engineer
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── Speech bubble ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 7 }}
            transition={{ type: "spring", stiffness: 280, damping: 16 }}
            className="absolute top-[8%] right-[4%] md:right-[10%] bg-white sketch-border px-5 py-3 font-sketch text-xl shadow-xl z-50"
          >
            Hi! I'm Mayank 👋
            {/* Speech bubble tail */}
            <div className="absolute -bottom-2 left-5 w-4 h-4 bg-white border-b-2 border-r-2 border-black rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Progress bar ─────────────────────────────────────────────────────── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-56">
        <div className="h-1 w-full bg-gray-100 sketch-border overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 5.8, ease: "linear" }}
            className="h-full bg-black"
          />
        </div>
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="text-center font-sketch mt-2 text-gray-400 text-sm"
        >
          Sketching the portfolio...
        </motion.p>
      </div>
    </motion.div>
  );
};
