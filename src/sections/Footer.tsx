import { SURVIVOR } from "../data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative px-5 sm:px-8 pb-10 pt-6">
      <div className="mx-auto w-full max-w-[1400px]">
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="flex items-center gap-2.5">
            <span className="inline-block h-2 w-2 rotate-45" style={{ background: "var(--amber)" }} />
            <span className="hud-label">© {year} {SURVIVOR.name.toUpperCase()}</span>
          </div>
          <span className="hud-label" style={{ color: "var(--ash)" }}>
            BUILT WITH REACT · THREE.JS · GSAP · MOTION
          </span>
          <a href="#top" className="hud-label link-underline">
            RETURN TO CAMP ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
