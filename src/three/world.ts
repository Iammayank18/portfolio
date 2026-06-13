import * as THREE from "three";

/**
 * SurvivalWorld
 * A low-poly, near-white open world rendered behind the page.
 * Exposes setPointer / setScroll so React can drive parallax + a scroll dolly.
 */
export class SurvivalWorld {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private clock = new THREE.Clock();
  private raf = 0;

  private pointer = new THREE.Vector2(0, 0);
  private pointerTarget = new THREE.Vector2(0, 0);
  private scroll = 0; // 0..1
  private scrollEased = 0;

  private fire?: THREE.PointLight;
  private embers?: THREE.Points;
  private motes?: THREE.Points;
  private treeMesh?: THREE.InstancedMesh;
  private rockMesh?: THREE.InstancedMesh;
  private terrain?: THREE.Mesh;
  private worldGroup = new THREE.Group();

  private reduceMotion = false;

  constructor(private canvas: HTMLCanvasElement) {
    this.reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xf7f8f4, 14, 52);

    this.camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    this.camera.position.set(0, 6.5, 22);
    this.camera.lookAt(0, 1.5, 0);

    this.scene.add(this.worldGroup);

    this.buildLights();
    this.buildTerrain();
    this.buildTrees();
    this.buildRocks();
    this.buildCampfire();
    this.buildMotes();

    this.resize();
    this.loop();
  }

  // ---- deterministic value noise (layered) ----
  private noise(x: number, z: number): number {
    let v = 0;
    v += Math.sin(x * 0.18 + 0.5) * Math.cos(z * 0.21) * 2.4;
    v += Math.sin(x * 0.42 + z * 0.13) * 1.1;
    v += Math.cos(z * 0.55 - x * 0.27) * 0.7;
    v += Math.sin((x + z) * 0.9) * 0.25;
    return v;
  }

  private height(x: number, z: number): number {
    // raise mountains toward the back, keep a clearing near the fire (origin)
    const ridge = this.noise(x, z);
    const dist = Math.sqrt(x * x + z * z);
    const clearing = THREE.MathUtils.clamp((dist - 4) / 6, 0, 1);
    return ridge * clearing + (z < -10 ? (-z - 10) * 0.22 : 0) * clearing;
  }

  private buildLights() {
    const hemi = new THREE.HemisphereLight(0xffffff, 0xdfe3da, 1.05);
    this.scene.add(hemi);

    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(-8, 16, 10);
    this.scene.add(key);

    const rim = new THREE.DirectionalLight(0xe8810b, 0.25);
    rim.position.set(6, 4, -10);
    this.scene.add(rim);
  }

  private buildTerrain() {
    const size = 120;
    const seg = 120;
    const geo = new THREE.PlaneGeometry(size, size, seg, seg);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, this.height(x, z));
    }
    geo.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      color: 0xfdfdfb,
      flatShading: true,
      roughness: 1,
      metalness: 0,
    });
    this.terrain = new THREE.Mesh(geo, mat);
    this.terrain.position.y = -1.2;
    this.worldGroup.add(this.terrain);

    // faint contour wireframe overlay for a "topographic map" feel
    const wire = new THREE.Mesh(
      geo.clone(),
      new THREE.MeshBasicMaterial({
        color: 0x0c0d0c,
        wireframe: true,
        transparent: true,
        opacity: 0.04,
      })
    );
    wire.position.y = -1.19;
    this.worldGroup.add(wire);
  }

  private placeOnGround(x: number, z: number, yOffset = 0): number {
    return this.height(x, z) - 1.2 + yOffset;
  }

  private buildTrees() {
    // low-poly pine = trunk merged conceptually via two cones (use one geo, instanced)
    const cone = new THREE.ConeGeometry(0.9, 2.6, 6);
    cone.translate(0, 1.3, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      flatShading: true,
      roughness: 1,
    });
    // emissive faint green tip handled by vertex colors
    const count = 90;
    this.treeMesh = new THREE.InstancedMesh(cone, mat, count);
    const dummy = new THREE.Object3D();
    let placed = 0;
    let guard = 0;
    while (placed < count && guard < count * 12) {
      guard++;
      const x = (Math.random() - 0.5) * 90;
      const z = (Math.random() - 0.5) * 90;
      const d = Math.sqrt(x * x + z * z);
      if (d < 6 || d > 48) continue; // keep clearing around the fire
      const s = 0.6 + Math.random() * 1.6;
      dummy.position.set(x, this.placeOnGround(x, z), z);
      dummy.scale.set(s, s + Math.random() * 0.6, s);
      dummy.rotation.y = Math.random() * Math.PI;
      dummy.updateMatrix();
      this.treeMesh.setMatrixAt(placed, dummy.matrix);
      // tint: most white, some faint forest
      const c = new THREE.Color(
        Math.random() > 0.78 ? 0xdfeede : 0xffffff
      );
      this.treeMesh.setColorAt(placed, c);
      placed++;
    }
    this.treeMesh.instanceMatrix.needsUpdate = true;
    if (this.treeMesh.instanceColor) this.treeMesh.instanceColor.needsUpdate = true;
    this.worldGroup.add(this.treeMesh);
  }

  private buildRocks() {
    const rock = new THREE.IcosahedronGeometry(0.7, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xf0f1ed,
      flatShading: true,
      roughness: 1,
    });
    const count = 26;
    this.rockMesh = new THREE.InstancedMesh(rock, mat, count);
    const dummy = new THREE.Object3D();
    let placed = 0;
    let guard = 0;
    while (placed < count && guard < count * 12) {
      guard++;
      const x = (Math.random() - 0.5) * 70;
      const z = (Math.random() - 0.5) * 70;
      const d = Math.sqrt(x * x + z * z);
      if (d < 4.5 || d > 40) continue;
      const s = 0.4 + Math.random() * 1.2;
      dummy.position.set(x, this.placeOnGround(x, z, 0.1), z);
      dummy.scale.set(s, s * (0.5 + Math.random() * 0.5), s);
      dummy.rotation.set(Math.random(), Math.random(), Math.random());
      dummy.updateMatrix();
      this.rockMesh.setMatrixAt(placed, dummy.matrix);
      placed++;
    }
    this.rockMesh.instanceMatrix.needsUpdate = true;
    this.worldGroup.add(this.rockMesh);
  }

  private buildCampfire() {
    const group = new THREE.Group();
    const baseY = this.placeOnGround(0, 0);

    // logs (crossed cylinders)
    const logGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.4, 6);
    const logMat = new THREE.MeshStandardMaterial({ color: 0xdddfd9, flatShading: true });
    for (let i = 0; i < 4; i++) {
      const log = new THREE.Mesh(logGeo, logMat);
      log.position.set(0, baseY + 0.12, 0);
      log.rotation.z = Math.PI / 2.4;
      log.rotation.y = (i / 4) * Math.PI * 2;
      group.add(log);
    }

    // stones ring
    const stoneGeo = new THREE.DodecahedronGeometry(0.22, 0);
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xe8e9e4, flatShading: true });
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const s = new THREE.Mesh(stoneGeo, stoneMat);
      s.position.set(Math.cos(a) * 1.05, baseY + 0.05, Math.sin(a) * 1.05);
      s.scale.setScalar(0.7 + Math.random() * 0.5);
      group.add(s);
    }

    // flame (amber cone, additive-ish)
    const flameGeo = new THREE.ConeGeometry(0.32, 1.0, 8);
    flameGeo.translate(0, 0.5, 0);
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xf6a838,
      transparent: true,
      opacity: 0.9,
    });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.set(0, baseY + 0.2, 0);
    flame.name = "flame";
    group.add(flame);

    // fire light
    this.fire = new THREE.PointLight(0xe8810b, 18, 16, 2);
    this.fire.position.set(0, baseY + 1.1, 0);
    group.add(this.fire);

    // embers
    const n = 60;
    const arr = new Float32Array(n * 3);
    const speeds = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 0.8;
      arr[i * 3 + 1] = Math.random() * 2.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
      speeds[i] = 0.4 + Math.random() * 1.2;
    }
    const eGeo = new THREE.BufferGeometry();
    eGeo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    eGeo.setAttribute("speed", new THREE.BufferAttribute(speeds, 1));
    const eMat = new THREE.PointsMaterial({
      color: 0xe8810b,
      size: 0.12,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    this.embers = new THREE.Points(eGeo, eMat);
    this.embers.position.set(0, baseY, 0);
    group.add(this.embers);

    this.worldGroup.add(group);
  }

  private buildMotes() {
    // drifting white pollen / snow across the whole scene
    const n = 280;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 80;
      arr[i * 3 + 1] = Math.random() * 26;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.14,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    this.motes = new THREE.Points(geo, mat);
    this.worldGroup.add(this.motes);
  }

  setPointer(nx: number, ny: number) {
    this.pointerTarget.set(nx, ny);
  }

  setScroll(p: number) {
    this.scroll = THREE.MathUtils.clamp(p, 0, 1);
  }

  resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  };

  private loop = () => {
    this.raf = requestAnimationFrame(this.loop);
    const t = this.clock.getElapsedTime();
    const dt = Math.min(this.clock.getDelta(), 0.05);

    // ease pointer + scroll
    this.pointer.lerp(this.pointerTarget, 0.06);
    this.scrollEased += (this.scroll - this.scrollEased) * 0.05;

    // camera: dolly forward + pan as you travel through the world
    const s = this.scrollEased;
    const px = this.reduceMotion ? 0 : this.pointer.x;
    const py = this.reduceMotion ? 0 : this.pointer.y;

    this.camera.position.x = Math.sin(s * Math.PI * 1.1) * 6 + px * 2.2;
    this.camera.position.z = 22 - s * 26;
    this.camera.position.y = 6.5 - s * 2.2 - py * 1.2;
    this.camera.lookAt(
      Math.sin(s * Math.PI) * 3,
      1.4 - s * 0.8,
      -2 - s * 10
    );

    // gentle world rotation for life
    if (!this.reduceMotion) this.worldGroup.rotation.y = px * 0.05;

    // flame flicker
    if (this.fire) {
      this.fire.intensity = 14 + Math.sin(t * 12) * 3 + Math.sin(t * 27) * 1.6;
    }
    const flame = this.worldGroup.getObjectByName("flame") as THREE.Mesh | null;
    if (flame) {
      flame.scale.y = 1 + Math.sin(t * 14) * 0.12;
      flame.scale.x = 1 + Math.cos(t * 17) * 0.06;
    }

    // embers rise
    if (this.embers) {
      const p = this.embers.geometry.attributes.position as THREE.BufferAttribute;
      const sp = this.embers.geometry.attributes.speed as THREE.BufferAttribute;
      for (let i = 0; i < p.count; i++) {
        let y = p.getY(i) + sp.getX(i) * dt;
        if (y > 3) y = 0;
        p.setY(i, y);
        p.setX(i, p.getX(i) + Math.sin(t * 2 + i) * dt * 0.05);
      }
      p.needsUpdate = true;
    }

    // motes drift
    if (this.motes) {
      this.motes.rotation.y = t * 0.015;
      const p = this.motes.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < p.count; i++) {
        let y = p.getY(i) - dt * 0.5;
        if (y < 0) y = 26;
        p.setY(i, y);
      }
      p.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  };

  dispose() {
    cancelAnimationFrame(this.raf);
    this.scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      const mat = (m as THREE.Mesh).material;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else if (mat) (mat as THREE.Material).dispose();
    });
    this.renderer.dispose();
  }
}
