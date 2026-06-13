import { useEffect, useRef } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Group,
  IcosahedronGeometry,
  OctahedronGeometry,
  TorusGeometry,
  EdgesGeometry,
  WireframeGeometry,
  LineSegments,
  LineBasicMaterial,
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  PointsMaterial,
  Color,
} from "three";

interface SketchSceneProps {
  className?: string;
}

const INK = new Color("#1a1a1a");
const ACCENT = new Color("#f5b301"); // warm sketch yellow

/**
 * A WebGL centerpiece that reads as a large 3D ink sketch on paper:
 * concentric wireframe shells with a glowing accent core, a tilted orbit
 * ring, and a faint graphite particle field. The whole rig rotates with
 * the pointer for a tactile, focal feel.
 *
 * Disabled on reduced-motion and paused while the tab is hidden.
 */
export const SketchScene = ({ className }: SketchSceneProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const mount = mountRef.current;
    if (!mount || reduced) return;

    const width = () => mount.clientWidth || window.innerWidth;
    const height = () => mount.clientHeight || window.innerHeight;

    const scene = new Scene();
    const camera = new PerspectiveCamera(50, width() / height(), 0.1, 100);
    camera.position.z = 8.5;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // WebGL unavailable — silently skip.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width(), height());
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const disposables: Array<{ dispose: () => void }> = [];
    const lines = (
      geo: BufferGeometry,
      mode: "edges" | "wire",
      color: Color,
      opacity: number,
    ): LineSegments => {
      const src =
        mode === "edges" ? new EdgesGeometry(geo) : new WireframeGeometry(geo);
      const mat = new LineBasicMaterial({ color, transparent: true, opacity });
      disposables.push(geo, src, mat);
      return new LineSegments(src, mat);
    };

    const rig = new Group();
    scene.add(rig);

    // Outer shell
    const outer = lines(
      new IcosahedronGeometry(2.9, 1),
      "edges",
      INK,
      0.18,
    );
    rig.add(outer);

    // Main shell — the hero of the scene
    const main = lines(new IcosahedronGeometry(2.2, 1), "edges", INK, 0.5);
    rig.add(main);

    // Accent core
    const core = lines(new OctahedronGeometry(1.05, 0), "edges", ACCENT, 0.95);
    rig.add(core);

    // Tilted orbit ring
    const ring = lines(
      new TorusGeometry(3.4, 0.02, 8, 120),
      "wire",
      INK,
      0.35,
    );
    ring.rotation.x = Math.PI / 2.3;
    rig.add(ring);

    // Graphite particle field
    const COUNT = 180;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 4 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi) - 2;
    }
    const pGeo = new BufferGeometry();
    pGeo.setAttribute("position", new Float32BufferAttribute(positions, 3));
    const pMat = new PointsMaterial({
      color: INK,
      size: 0.045,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
    });
    const points = new Points(pGeo, pMat);
    scene.add(points);
    disposables.push(pGeo, pMat);

    // Pointer parallax
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    const onPointer = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const onResize = () => {
      camera.aspect = width() / height();
      camera.updateProjectionMatrix();
      renderer.setSize(width(), height());
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    let paused = false;
    const onVisibility = () => {
      paused = document.hidden;
      if (!paused) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVisibility);

    const start = performance.now();
    const loop = () => {
      if (paused) return;
      const t = (performance.now() - start) / 1000;

      curX += (targetX - curX) * 0.05;
      curY += (targetY - curY) * 0.05;

      // Whole rig tilts toward the pointer
      rig.rotation.y = t * 0.08 + curX * 0.6;
      rig.rotation.x = curY * 0.4;

      // Independent shell rotations
      outer.rotation.y = -t * 0.05;
      outer.rotation.x = t * 0.03;
      main.rotation.y = t * 0.12;
      main.rotation.z = t * 0.04;
      core.rotation.x = -t * 0.5;
      core.rotation.y = -t * 0.35;
      const pulse = 1 + Math.sin(t * 1.4) * 0.06;
      core.scale.setScalar(pulse);
      ring.rotation.z = t * 0.15;

      points.rotation.y = t * 0.02 + curX * 0.2;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden />;
};
