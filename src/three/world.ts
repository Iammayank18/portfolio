import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

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

  // day→night cycle
  private night = 0; // 0 = day, 1 = night (derived from scroll)
  private hemi?: THREE.HemisphereLight;
  private key?: THREE.DirectionalLight;
  private rim?: THREE.DirectionalLight;
  private stars?: THREE.Points;
  private brightStars?: THREE.Points;
  private auroras: THREE.Mesh[] = [];
  private fireflies?: THREE.Points;
  private meteors: Array<{
    mesh: THREE.Mesh;
    active: boolean;
    life: number;
    dir: THREE.Vector3;
  }> = [];
  private nextMeteorAt = 0;

  // real-day atmosphere
  private skyMat?: THREE.ShaderMaterial;
  private sun?: THREE.Sprite;
  private clouds: Array<{ mesh: THREE.Mesh; speed: number }> = [];
  private cloudMat?: THREE.MeshStandardMaterial;

  // living touches
  private birds: Array<{
    group: THREE.Group;
    wingL: THREE.Mesh;
    wingR: THREE.Mesh;
    cx: number;
    cz: number;
    r: number;
    h: number;
    speed: number;
    phase: number;
  }> = [];
  private smoke: THREE.Sprite[] = [];
  private smokeBaseY = 0;

  // trekker story: hikes the trail to camp as the page scrolls
  private trail!: THREE.CatmullRomCurve3;
  private trailPts2D: THREE.Vector2[] = [];
  private trekker?: THREE.Group;
  private trekkerLimbs?: {
    legL: THREE.Mesh;
    legR: THREE.Mesh;
    armL: THREE.Mesh;
    armR: THREE.Mesh;
  };
  private walkAmp = 0;
  private prevWalkT = 0;

  private reduceMotion = false;

  // trail waypoints (x, z): far ridge → down the valley → campfire
  private static TRAIL_PTS: Array<[number, number]> = [
    [-18, -26],
    [-12, -16],
    [-4, -8],
    [4, -2],
    [1.8, 1.2],
  ];

  // palette endpoints for the cycle
  private static DAY_FOG = new THREE.Color(0xdfe9f5);
  private static NIGHT_FOG = new THREE.Color(0x0d1220);
  private static NIGHT_SKY = new THREE.Color(0x0d1220);
  private static DAY_HEMI_SKY = new THREE.Color(0xf2f8ff);
  private static NIGHT_HEMI_SKY = new THREE.Color(0x8fa3c8);
  private static DAY_HEMI_GROUND = new THREE.Color(0xcfd8c2);
  private static NIGHT_HEMI_GROUND = new THREE.Color(0x1a2233);
  private static DAY_KEY = new THREE.Color(0xfff3dc); // warm sunlight
  private static NIGHT_KEY = new THREE.Color(0xbcd0ff);
  private static DAY_SKY_TOP = new THREE.Color(0x6fb2ef);
  private static DAY_SKY_BOTTOM = new THREE.Color(0xeef6ff);
  private static NIGHT_SKY_TOP = new THREE.Color(0x070b16);
  private static NIGHT_SKY_BOTTOM = new THREE.Color(0x141c30);
  private static DAY_CLOUD = new THREE.Color(0xffffff);
  private static NIGHT_CLOUD = new THREE.Color(0x232c3e);

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
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xdfe9f5, 24, 100);

    // trail curve (y resolved against terrain when used)
    this.trail = new THREE.CatmullRomCurve3(
      SurvivalWorld.TRAIL_PTS.map(([x, z]) => new THREE.Vector3(x, 0, z))
    );
    this.trailPts2D = this.trail
      .getPoints(80)
      .map((p) => new THREE.Vector2(p.x, p.z));

    this.camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    this.camera.position.set(0, 6.5, 22);
    this.camera.lookAt(0, 1.5, 0);

    this.scene.add(this.worldGroup);

    this.buildSky();
    this.buildSun();
    this.buildClouds();
    this.buildLights();
    this.buildTerrain();
    this.buildTrees();
    this.buildRocks();
    this.buildCampfire();
    this.buildMotes();
    this.buildStars();
    this.buildAurora();
    this.buildFireflies();
    this.buildMeteors();
    this.buildTrekker();
    this.buildBirds();
    this.buildSmoke();

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

  // ridged noise -> sharp natural mountain crests (0..~1.6)
  private ridges(x: number, z: number): number {
    const a = Math.sin(x * 0.085 + z * 0.045 + 1.3);
    const b = Math.cos(z * 0.075 - x * 0.04 + 0.4);
    const c = Math.sin(x * 0.17 - z * 0.12);
    let r = (1 - Math.abs(a)) * (1 - Math.abs(b));
    r += (1 - Math.abs(c)) * 0.45;
    return r;
  }

  private height(x: number, z: number): number {
    const dist = Math.sqrt(x * x + z * z);
    // flat clearing around the campfire, then gentle rolling hills
    const clearing = THREE.MathUtils.clamp((dist - 5) / 7, 0, 1);
    let h = this.noise(x, z) * clearing;

    // mountain belt: rises with distance, taller toward the back (−z)
    const far = THREE.MathUtils.clamp((dist - 20) / 26, 0, 1);
    const back = 0.45 + THREE.MathUtils.clamp((-z - 4) / 42, 0, 1) * 0.55;
    h += far * far * back * this.ridges(x, z) * 14;

    return h;
  }

  // ---- gradient sky dome: real blue day, deep navy night ----
  private buildSky() {
    this.skyMat = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: SurvivalWorld.DAY_SKY_TOP.clone() },
        bottomColor: { value: SurvivalWorld.DAY_SKY_BOTTOM.clone() },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPosition = wp.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + vec3(0.0, 24.0, 0.0)).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, pow(max(h, 0.0), 0.65)), 1.0);
        }`,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
    });
    const sky = new THREE.Mesh(new THREE.SphereGeometry(160, 24, 12), this.skyMat);
    sky.renderOrder = -2;
    this.scene.add(sky);
  }

  // soft radial glow texture generated on a canvas — no external assets
  private makeGlowTexture(
    stops: Array<[number, string]>
  ): THREE.CanvasTexture {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    stops.forEach(([at, color]) => g.addColorStop(at, color));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }

  private buildSun() {
    const sunTex = this.makeGlowTexture([
      [0, "rgba(255, 252, 240, 1)"],
      [0.16, "rgba(255, 248, 224, 0.95)"],
      [0.3, "rgba(255, 228, 170, 0.35)"],
      [0.6, "rgba(255, 210, 140, 0.08)"],
      [1, "rgba(255, 200, 120, 0)"],
    ]);
    this.sun = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: sunTex,
        transparent: true,
        depthWrite: false,
        fog: false,
      })
    );
    this.sun.position.set(17, 18, -78);
    this.sun.scale.setScalar(30);
    this.sun.renderOrder = -1;
    this.scene.add(this.sun);
  }

  // ---- drifting low-poly clouds ----
  private makeCloud(): THREE.BufferGeometry {
    const parts: THREE.BufferGeometry[] = [];
    const blobs = 3 + Math.floor(Math.random() * 3);
    let x = 0;
    for (let i = 0; i < blobs; i++) {
      const b = new THREE.IcosahedronGeometry(1, 0);
      const s = 1.6 + Math.random() * 1.8;
      b.scale(s, s * (0.4 + Math.random() * 0.2), s * (0.6 + Math.random() * 0.3));
      b.translate(x, (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 1.4);
      x += s * (1 + Math.random() * 0.4);
      parts.push(b);
    }
    const geo = mergeGeometries(parts, false)!;
    geo.center();
    return geo;
  }

  private buildClouds() {
    this.cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      flatShading: true,
      roughness: 1,
      transparent: true,
      opacity: 0.92,
    });
    for (let i = 0; i < 7; i++) {
      const mesh = new THREE.Mesh(this.makeCloud(), this.cloudMat);
      mesh.position.set(
        (Math.random() - 0.5) * 110,
        19 + Math.random() * 8,
        -34 - Math.random() * 30
      );
      const s = 1.2 + Math.random() * 1.6;
      mesh.scale.setScalar(s);
      this.clouds.push({ mesh, speed: 0.25 + Math.random() * 0.5 });
      this.scene.add(mesh);
    }
  }

  private buildLights() {
    this.hemi = new THREE.HemisphereLight(0xffffff, 0xcfd8c2, 1.05);
    this.scene.add(this.hemi);

    this.key = new THREE.DirectionalLight(0xffffff, 1.5);
    this.key.position.set(-14, 16, 10);
    this.key.castShadow = true;
    this.key.shadow.mapSize.set(2048, 2048);
    this.key.shadow.camera.left = -45;
    this.key.shadow.camera.right = 45;
    this.key.shadow.camera.top = 45;
    this.key.shadow.camera.bottom = -45;
    this.key.shadow.camera.near = 0.5;
    this.key.shadow.camera.far = 90;
    this.key.shadow.bias = -0.0005;
    this.key.shadow.normalBias = 0.6;
    this.scene.add(this.key);

    this.rim = new THREE.DirectionalLight(0xe8810b, 0.25);
    this.rim.position.set(6, 4, -10);
    this.scene.add(this.rim);
  }

  // shortest distance from (x, z) to the sampled trail polyline
  private trailDist(x: number, z: number): number {
    let best = Infinity;
    for (let i = 0; i < this.trailPts2D.length - 1; i++) {
      const a = this.trailPts2D[i];
      const b = this.trailPts2D[i + 1];
      const abx = b.x - a.x;
      const aby = b.y - a.y;
      const len2 = abx * abx + aby * aby || 1;
      const t = THREE.MathUtils.clamp(
        ((x - a.x) * abx + (z - a.y) * aby) / len2,
        0,
        1
      );
      const dx = x - (a.x + abx * t);
      const dz = z - (a.y + aby * t);
      const d = dx * dx + dz * dz;
      if (d < best) best = d;
    }
    return Math.sqrt(best);
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

    // altitude-based diorama palette: meadow → dry grass → rock → snow,
    // with a sandy dirt trail baked in along the trekker's route
    const meadow = new THREE.Color(0xa9c98b);
    const dry = new THREE.Color(0xc9cdb8);
    const rock = new THREE.Color(0xa8a49a);
    const slate = new THREE.Color(0x8b93a0); // high alpine rock, cool blue-grey
    const snow = new THREE.Color(0xf4f7fa);
    const dirt = new THREE.Color(0xd9c29a);
    const colors = new Float32Array(pos.count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const h = pos.getY(i);
      // snow only crowns the summits — mountains read as rock, not white blobs
      c.copy(meadow)
        .lerp(dry, THREE.MathUtils.smoothstep(h, 0.6, 3.2))
        .lerp(rock, THREE.MathUtils.smoothstep(h, 3.2, 6))
        .lerp(slate, THREE.MathUtils.smoothstep(h, 6, 10))
        .lerp(snow, THREE.MathUtils.smoothstep(h, 10.5, 14));
      const td = this.trailDist(x, z);
      if (td < 1.7 && h < 8) {
        c.lerp(dirt, (1 - td / 1.7) * 0.85);
      }
      // subtle patchiness so the meadow isn't a flat green sheet
      const v = 0.95 + Math.sin(x * 0.9 + z * 1.3) * 0.03 + Math.cos(x * 1.7 - z * 0.6) * 0.03;
      colors[i * 3] = c.r * v;
      colors[i * 3 + 1] = c.g * v;
      colors[i * 3 + 2] = c.b * v;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      flatShading: true,
      roughness: 1,
      metalness: 0,
    });
    this.terrain = new THREE.Mesh(geo, mat);
    this.terrain.position.y = -1.2;
    this.terrain.receiveShadow = true;
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

  // a single low-poly pine: trunk + 3 stacked foliage tiers, merged into one geo
  private makePine(): THREE.BufferGeometry {
    const parts: THREE.BufferGeometry[] = [];
    const paint = (g: THREE.BufferGeometry, hex: number) => {
      const col = new THREE.Color(hex);
      const n = g.attributes.position.count;
      const arr = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        arr[i * 3] = col.r;
        arr[i * 3 + 1] = col.g;
        arr[i * 3 + 2] = col.b;
      }
      g.setAttribute("color", new THREE.BufferAttribute(arr, 3));
      return g;
    };

    const trunk = new THREE.CylinderGeometry(0.07, 0.11, 0.55, 5);
    trunk.translate(0, 0.27, 0);
    parts.push(paint(trunk, 0x8a6f52)); // brown bark

    const tiers: Array<[number, number, number, number]> = [
      // [radius, height, baseY, color] — darker green at the base, lighter up top
      [0.62, 0.9, 0.55, 0x4c8a5c],
      [0.48, 0.8, 1.05, 0x5f9e6b],
      [0.32, 0.7, 1.55, 0x6faf7d],
    ];
    tiers.forEach(([r, h, y, hex]) => {
      const c = new THREE.ConeGeometry(r, h, 7);
      c.translate(0, y + h / 2 - 0.1, 0);
      parts.push(paint(c, hex));
    });

    return mergeGeometries(parts, false)!;
  }

  private buildTrees() {
    const pine = this.makePine();
    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      flatShading: true,
      roughness: 1,
    });
    const count = 120;
    this.treeMesh = new THREE.InstancedMesh(pine, mat, count);
    const dummy = new THREE.Object3D();
    let placed = 0;
    let guard = 0;
    while (placed < count && guard < count * 12) {
      guard++;
      const x = (Math.random() - 0.5) * 96;
      const z = (Math.random() - 0.5) * 96;
      const d = Math.sqrt(x * x + z * z);
      if (d < 9 || d > 38) continue; // forest the valley + foothills only
      const s = 0.45 + Math.random() * 0.85;
      dummy.position.set(x, this.placeOnGround(x, z), z);
      dummy.scale.set(s, s + Math.random() * 0.5, s);
      dummy.rotation.y = Math.random() * Math.PI;
      dummy.updateMatrix();
      this.treeMesh.setMatrixAt(placed, dummy.matrix);
      // subtle per-tree tint variation over the painted greens
      const c = new THREE.Color().setHSL(
        0.2 + Math.random() * 0.12,
        0.15 + Math.random() * 0.2,
        0.88 + Math.random() * 0.12
      );
      this.treeMesh.setColorAt(placed, c);
      placed++;
    }
    this.treeMesh.instanceMatrix.needsUpdate = true;
    if (this.treeMesh.instanceColor) this.treeMesh.instanceColor.needsUpdate = true;
    this.treeMesh.castShadow = true;
    this.treeMesh.receiveShadow = true;
    this.worldGroup.add(this.treeMesh);
  }

  private buildRocks() {
    const rock = new THREE.IcosahedronGeometry(0.7, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xb0aa9c,
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
    this.rockMesh.castShadow = true;
    this.rockMesh.receiveShadow = true;
    this.worldGroup.add(this.rockMesh);
  }

  private buildCampfire() {
    const group = new THREE.Group();
    const baseY = this.placeOnGround(0, 0);

    // logs (crossed cylinders)
    const logGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.4, 6);
    const logMat = new THREE.MeshStandardMaterial({ color: 0x8a6f52, flatShading: true });
    for (let i = 0; i < 4; i++) {
      const log = new THREE.Mesh(logGeo, logMat);
      log.position.set(0, baseY + 0.12, 0);
      log.rotation.z = Math.PI / 2.4;
      log.rotation.y = (i / 4) * Math.PI * 2;
      log.castShadow = true;
      group.add(log);
    }

    // stones ring
    const stoneGeo = new THREE.DodecahedronGeometry(0.22, 0);
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xa8a294, flatShading: true });
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const s = new THREE.Mesh(stoneGeo, stoneMat);
      s.position.set(Math.cos(a) * 1.05, baseY + 0.05, Math.sin(a) * 1.05);
      s.scale.setScalar(0.7 + Math.random() * 0.5);
      s.castShadow = true;
      group.add(s);
    }

    // tent — the camp's destination marker (low-poly pyramid, canvas + forest flap)
    const tentY = this.placeOnGround(-2.7, 1.6);
    const tent = new THREE.Mesh(
      new THREE.ConeGeometry(1.15, 1.25, 4),
      new THREE.MeshStandardMaterial({ color: 0xe8dcc8, flatShading: true })
    );
    tent.position.set(-2.7, tentY + 0.62, 1.6);
    tent.rotation.y = Math.PI / 4 + 0.5;
    tent.castShadow = true;
    tent.receiveShadow = true;
    group.add(tent);
    const flap = new THREE.Mesh(
      new THREE.ConeGeometry(0.34, 0.62, 4),
      new THREE.MeshStandardMaterial({ color: 0x2f6b3f, flatShading: true })
    );
    flap.position.set(-2.15, tentY + 0.31, 2.1);
    flap.rotation.y = tent.rotation.y;
    group.add(flap);

    // log pile beside the tent
    const pileMat = new THREE.MeshStandardMaterial({ color: 0x7d6449, flatShading: true });
    const pileGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.8, 5);
    const pileBase = this.placeOnGround(-1.4, 2.6);
    [
      [-1.5, 0.09, 2.55],
      [-1.3, 0.09, 2.7],
      [-1.4, 0.24, 2.62],
    ].forEach(([px, py, pz]) => {
      const p = new THREE.Mesh(pileGeo, pileMat);
      p.position.set(px, pileBase + py, pz);
      p.rotation.z = Math.PI / 2;
      p.rotation.y = 0.4 + Math.random() * 0.3;
      p.castShadow = true;
      group.add(p);
    });

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

  // ---- night sky: two star layers (different twinkle phase) on a far dome ----
  private makeStarLayer(count: number, size: number): THREE.Points {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // upper hemisphere shell, kept above the mountain line
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(0.25 + Math.random() * 0.75); // bias toward zenith
      const r = 85 + Math.random() * 8;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = Math.abs(r * Math.cos(phi)) + 6;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xdce7ff,
      size,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      fog: false,
    });
    const points = new THREE.Points(geo, mat);
    points.renderOrder = -1;
    return points;
  }

  private buildStars() {
    this.stars = this.makeStarLayer(520, 0.34);
    this.brightStars = this.makeStarLayer(90, 0.6);
    this.scene.add(this.stars, this.brightStars);
  }

  // ---- aurora: additive-blended ribbons waving over the back mountain belt ----
  private buildAurora() {
    const configs: Array<{ hex: number; y: number; z: number; tilt: number }> = [
      { hex: 0x2f9e68, y: 22, z: -46, tilt: -0.12 },
      { hex: 0x1f8f7a, y: 27, z: -52, tilt: 0.08 },
      { hex: 0x2a7f8f, y: 32, z: -58, tilt: -0.05 },
    ];
    configs.forEach(({ hex, y, z, tilt }) => {
      const geo = new THREE.PlaneGeometry(110, 13, 32, 6);
      // vertex colors fade to black at top/bottom edges — with additive
      // blending black renders as fully transparent, giving soft curtains
      const base = new THREE.Color(hex);
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const colors = new Float32Array(pos.count * 3);
      for (let i = 0; i < pos.count; i++) {
        const v = pos.getY(i) / 13 + 0.5; // 0..1 bottom→top
        const edge = Math.sin(v * Math.PI); // 0 at edges, 1 mid
        colors[i * 3] = base.r * edge;
        colors[i * 3 + 1] = base.g * edge;
        colors[i * 3 + 2] = base.b * edge;
      }
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const mat = new THREE.MeshBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        fog: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(0, y, z);
      mesh.rotation.z = tilt;
      mesh.renderOrder = -1;
      this.auroras.push(mesh);
      this.scene.add(mesh);
    });
  }

  // ---- fireflies: warm points wandering around the campfire clearing ----
  private buildFireflies() {
    const n = 40;
    const arr = new Float32Array(n * 3);
    const seeds = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 2 + Math.random() * 5.5;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = this.placeOnGround(Math.cos(a) * r, Math.sin(a) * r, 0.6 + Math.random() * 1.4);
      arr[i * 3 + 2] = Math.sin(a) * r;
      seeds[i] = Math.random() * Math.PI * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    geo.setAttribute("base", new THREE.BufferAttribute(arr.slice(), 3));
    geo.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));
    const mat = new THREE.PointsMaterial({
      color: 0xd8f0a0,
      size: 0.16,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.fireflies = new THREE.Points(geo, mat);
    this.worldGroup.add(this.fireflies);
  }

  // ---- shooting stars: small pooled streaks fired across the night sky ----
  private buildMeteors() {
    for (let i = 0; i < 3; i++) {
      const geo = new THREE.PlaneGeometry(4.5, 0.07);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xeaf2ff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        fog: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      this.scene.add(mesh);
      this.meteors.push({
        mesh,
        active: false,
        life: 0,
        dir: new THREE.Vector3(),
      });
    }
  }

  private spawnMeteor(t: number) {
    const m = this.meteors.find((x) => !x.active);
    if (!m) return;
    m.active = true;
    m.life = 0;
    const x = (Math.random() - 0.5) * 90;
    const y = 34 + Math.random() * 18;
    const z = -30 - Math.random() * 30;
    m.mesh.position.set(x, y, z);
    m.dir
      .set(-(0.5 + Math.random()), -(0.25 + Math.random() * 0.3), 0)
      .normalize()
      .multiplyScalar(34 + Math.random() * 14);
    if (Math.random() > 0.5) m.dir.x *= -1;
    m.mesh.rotation.z = Math.atan2(m.dir.y, m.dir.x);
    m.mesh.visible = true;
    this.nextMeteorAt = t + 4 + Math.random() * 5;
  }

  // ---- the trekker: a low-poly hiker who walks the trail to camp ----
  private buildTrekker() {
    const g = new THREE.Group();
    const flat = (hex: number) =>
      new THREE.MeshStandardMaterial({ color: hex, flatShading: true, roughness: 1 });
    const JACKET = flat(0x3a3f3a); // charcoal
    const PANTS = flat(0x4a4f4a);
    const SKIN = flat(0xe0b89a);
    const BEANIE = flat(0xe8810b); // brand amber
    const PACK = flat(0x2f6b3f); // brand forest

    // legs pivot at the hip (geometry hangs downward from origin)
    const legGeo = new THREE.CylinderGeometry(0.05, 0.06, 0.42, 5);
    legGeo.translate(0, -0.21, 0);
    const legL = new THREE.Mesh(legGeo, PANTS);
    legL.position.set(-0.08, 0.42, 0);
    const legR = new THREE.Mesh(legGeo, PANTS);
    legR.position.set(0.08, 0.42, 0);

    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.42, 0.2), JACKET);
    torso.position.y = 0.63;

    const head = new THREE.Mesh(new THREE.IcosahedronGeometry(0.11, 1), SKIN);
    head.position.y = 0.95;
    const beanie = new THREE.Mesh(new THREE.ConeGeometry(0.115, 0.14, 6), BEANIE);
    beanie.position.y = 1.05;

    const pack = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.32, 0.14), PACK);
    pack.position.set(0, 0.66, -0.17);

    // arms pivot at the shoulder
    const armGeo = new THREE.CylinderGeometry(0.04, 0.045, 0.36, 5);
    armGeo.translate(0, -0.18, 0);
    const armL = new THREE.Mesh(armGeo, JACKET);
    armL.position.set(-0.2, 0.82, 0);
    const armR = new THREE.Mesh(armGeo, JACKET);
    armR.position.set(0.2, 0.82, 0);

    g.add(legL, legR, torso, head, beanie, pack, armL, armR);
    g.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).castShadow = true;
    });
    g.scale.setScalar(1.1);

    this.trekker = g;
    this.trekkerLimbs = { legL, legR, armL, armR };
    this.worldGroup.add(g);
  }

  private updateTrekker(t: number, dt: number) {
    if (!this.trekker || !this.trekkerLimbs) return;
    const walkT = THREE.MathUtils.smoothstep(this.scrollEased, 0.02, 0.82);
    const arrived = walkT > 0.995;

    // position on the trail, snapped to the terrain
    const p = this.trail.getPoint(walkT);
    const y = this.placeOnGround(p.x, p.z);
    this.trekker.position.set(p.x, y, p.z);

    // face along the trail while hiking, face the fire once arrived
    if (arrived) {
      this.trekker.rotation.y = Math.atan2(-p.x, -p.z);
    } else {
      const tan = this.trail.getTangent(walkT);
      this.trekker.rotation.y = Math.atan2(tan.x, tan.z);
    }

    // limb swing scales with actual scroll velocity so he stops when you stop
    const v = dt > 0 ? Math.abs(walkT - this.prevWalkT) / dt : 0;
    this.prevWalkT = walkT;
    const target = this.reduceMotion ? 0 : THREE.MathUtils.clamp(v * 30, 0, 1);
    this.walkAmp += (target - this.walkAmp) * 0.08;

    const { legL, legR, armL, armR } = this.trekkerLimbs;
    if (arrived) {
      // warming hands by the fire
      const idle = this.reduceMotion ? 0 : Math.sin(t * 1.6) * 0.04;
      armL.rotation.x = -0.95 + idle;
      armR.rotation.x = -0.95 - idle;
      legL.rotation.x = 0;
      legR.rotation.x = 0;
      this.trekker.position.y = y;
    } else {
      const swing = Math.sin(t * 8) * 0.6 * this.walkAmp;
      legL.rotation.x = swing;
      legR.rotation.x = -swing;
      armL.rotation.x = -swing * 0.7;
      armR.rotation.x = swing * 0.7;
      this.trekker.position.y = y + Math.abs(Math.sin(t * 8)) * 0.035 * this.walkAmp;
    }
  }

  // ---- birds: small flapping silhouettes circling the valley by day ----
  private buildBirds() {
    if (this.reduceMotion) return;
    const wingGeo = new THREE.BufferGeometry();
    wingGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([0, 0, 0.16, 0, 0, -0.16, 0.55, 0.06, 0]),
        3
      )
    );
    wingGeo.computeVertexNormals();
    const mat = new THREE.MeshBasicMaterial({
      color: 0x3a3f3a,
      side: THREE.DoubleSide,
    });

    const flocks: Array<[number, number, number]> = [
      // [centerX, centerZ, baseHeight] — low enough to cross the visible sky band
      [-16, -18, 9],
      [18, -26, 11],
    ];
    for (let i = 0; i < 6; i++) {
      const [cx, cz, h] = flocks[i % flocks.length];
      const group = new THREE.Group();
      const wingL = new THREE.Mesh(wingGeo, mat);
      wingL.scale.x = -1;
      const wingR = new THREE.Mesh(wingGeo, mat);
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.05, 0.3), mat);
      group.add(wingL, wingR, body);
      group.scale.setScalar(1.4);
      this.scene.add(group);
      this.birds.push({
        group,
        wingL,
        wingR,
        cx: cx + (Math.random() - 0.5) * 4,
        cz: cz + (Math.random() - 0.5) * 4,
        r: 6 + Math.random() * 7,
        h: h + Math.random() * 3,
        speed: 0.18 + Math.random() * 0.14,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  // ---- campfire smoke: soft puffs rising and dissolving ----
  private buildSmoke() {
    if (this.reduceMotion) return;
    const tex = this.makeGlowTexture([
      [0, "rgba(158, 163, 168, 0.5)"],
      [0.5, "rgba(158, 163, 168, 0.16)"],
      [1, "rgba(158, 163, 168, 0)"],
    ]);
    this.smokeBaseY = this.placeOnGround(0, 0);
    for (let i = 0; i < 6; i++) {
      const s = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          opacity: 0,
          depthWrite: false,
        })
      );
      s.position.set(0, this.smokeBaseY + 1, 0);
      this.worldGroup.add(s);
      this.smoke.push(s);
    }
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

  private lastT = 0;

  private loop = () => {
    this.raf = requestAnimationFrame(this.loop);
    const t = this.clock.getElapsedTime();
    // getElapsedTime() consumes getDelta() internally, so derive dt from t
    const dt = Math.min(t - this.lastT, 0.05);
    this.lastT = t;

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

    // ---- day→night cycle (dusk over the middle, full night at the signal) ----
    this.night = THREE.MathUtils.smoothstep(this.scrollEased, 0.45, 0.88);
    const night = this.night;
    // the world dims ahead of the page-text flip so light text never sits
    // on a still-bright scene mid-transition
    const dark = 1 - (1 - night) * (1 - night);

    this.renderer.setClearColor(SurvivalWorld.NIGHT_SKY, dark);

    // sky dome crossfades blue day → navy night
    if (this.skyMat) {
      (this.skyMat.uniforms.topColor.value as THREE.Color)
        .copy(SurvivalWorld.DAY_SKY_TOP)
        .lerp(SurvivalWorld.NIGHT_SKY_TOP, dark);
      (this.skyMat.uniforms.bottomColor.value as THREE.Color)
        .copy(SurvivalWorld.DAY_SKY_BOTTOM)
        .lerp(SurvivalWorld.NIGHT_SKY_BOTTOM, dark);
    }

    // the sun sinks behind the peaks as night rises
    if (this.sun) {
      this.sun.position.y = 18 - dark * 22;
      (this.sun.material as THREE.SpriteMaterial).opacity = Math.pow(
        1 - dark,
        1.4
      );
    }

    // clouds drift and dim into silhouettes at night
    if (this.cloudMat) {
      this.cloudMat.color
        .copy(SurvivalWorld.DAY_CLOUD)
        .lerp(SurvivalWorld.NIGHT_CLOUD, dark);
      this.cloudMat.opacity = 0.92 - night * 0.35;
    }
    if (!this.reduceMotion) {
      for (const c of this.clouds) {
        c.mesh.position.x += c.speed * dt;
        if (c.mesh.position.x > 70) c.mesh.position.x = -70;
      }
    }

    if (this.scene.fog instanceof THREE.Fog) {
      this.scene.fog.color
        .copy(SurvivalWorld.DAY_FOG)
        .lerp(SurvivalWorld.NIGHT_FOG, dark);
      this.scene.fog.near = 24 - dark * 14;
      this.scene.fog.far = 100 - dark * 58;
    }
    if (this.hemi) {
      this.hemi.intensity = THREE.MathUtils.lerp(1.05, 0.22, dark);
      this.hemi.color
        .copy(SurvivalWorld.DAY_HEMI_SKY)
        .lerp(SurvivalWorld.NIGHT_HEMI_SKY, dark);
      this.hemi.groundColor
        .copy(SurvivalWorld.DAY_HEMI_GROUND)
        .lerp(SurvivalWorld.NIGHT_HEMI_GROUND, dark);
    }
    if (this.key) {
      this.key.intensity = THREE.MathUtils.lerp(1.5, 0.14, dark);
      this.key.color
        .copy(SurvivalWorld.DAY_KEY)
        .lerp(SurvivalWorld.NIGHT_KEY, dark);
    }
    if (this.rim) this.rim.intensity = 0.25 + dark * 0.35;

    // stars fade in and twinkle
    const twinkle = this.reduceMotion ? 0 : Math.sin(t * 2.3) * 0.12;
    if (this.stars) {
      (this.stars.material as THREE.PointsMaterial).opacity =
        night * (0.75 + twinkle);
    }
    if (this.brightStars) {
      (this.brightStars.material as THREE.PointsMaterial).opacity =
        night * (0.9 - twinkle);
      if (!this.reduceMotion) this.brightStars.rotation.y = t * 0.004;
    }

    // aurora curtains wave over the mountains
    this.auroras.forEach((a, ai) => {
      (a.material as THREE.MeshBasicMaterial).opacity =
        night * (0.34 - ai * 0.07);
      if (this.reduceMotion || night <= 0) return;
      const pos = a.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        pos.setZ(
          i,
          Math.sin(x * 0.09 + t * (0.5 + ai * 0.18) + ai * 2.1) * 2.2 +
            Math.sin(x * 0.23 - t * 0.32) * 0.9
        );
      }
      pos.needsUpdate = true;
    });

    // fireflies wander + pulse around the camp
    if (this.fireflies) {
      (this.fireflies.material as THREE.PointsMaterial).opacity =
        night * (this.reduceMotion ? 0.75 : 0.55 + Math.sin(t * 2.1) * 0.3);
      if (!this.reduceMotion && night > 0) {
        const p = this.fireflies.geometry.attributes.position as THREE.BufferAttribute;
        const base = this.fireflies.geometry.attributes.base as THREE.BufferAttribute;
        const seed = this.fireflies.geometry.attributes.seed as THREE.BufferAttribute;
        for (let i = 0; i < p.count; i++) {
          const s = seed.getX(i);
          p.setX(i, base.getX(i) + Math.sin(t * 0.7 + s * 3) * 0.6);
          p.setY(i, base.getY(i) + Math.sin(t * 1.1 + s * 5) * 0.35);
          p.setZ(i, base.getZ(i) + Math.cos(t * 0.6 + s * 4) * 0.6);
        }
        p.needsUpdate = true;
      }
    }

    // shooting stars (night only, respects reduced motion)
    if (!this.reduceMotion && night > 0.6) {
      if (this.nextMeteorAt === 0) this.nextMeteorAt = t + 2;
      if (t >= this.nextMeteorAt) this.spawnMeteor(t);
    }
    for (const m of this.meteors) {
      if (!m.active) continue;
      m.life += dt;
      const k = m.life / 1.2; // 0..1 over lifespan
      if (k >= 1 || night <= 0.1) {
        m.active = false;
        m.mesh.visible = false;
        continue;
      }
      m.mesh.position.addScaledVector(m.dir, dt);
      (m.mesh.material as THREE.MeshBasicMaterial).opacity =
        Math.sin(k * Math.PI) * 0.9 * night;
    }

    // the trekker hikes toward camp as the day passes
    this.updateTrekker(t, dt);

    // birds circle the valley by day and roost at night
    for (const b of this.birds) {
      b.group.visible = night < 0.55;
      if (!b.group.visible) continue;
      const a = t * b.speed + b.phase;
      b.group.position.set(
        b.cx + Math.cos(a) * b.r,
        b.h + Math.sin(t * 0.9 + b.phase) * 0.6,
        b.cz + Math.sin(a) * b.r
      );
      b.group.rotation.y = -a; // face along the circle's tangent
      const flap = Math.sin(t * 9 + b.phase) * 0.65;
      b.wingL.rotation.z = -flap;
      b.wingR.rotation.z = flap;
    }

    // campfire smoke drifts up and dissolves
    for (let i = 0; i < this.smoke.length; i++) {
      const s = this.smoke[i];
      const k = (t * 0.22 + i / this.smoke.length) % 1;
      s.position.set(
        Math.sin(k * 6 + i * 1.7) * 0.25 + k * 0.9,
        this.smokeBaseY + 0.9 + k * 3.4,
        Math.cos(k * 5 + i) * 0.2
      );
      const grow = 0.5 + k * 2.1;
      s.scale.set(grow, grow, 1);
      (s.material as THREE.SpriteMaterial).opacity =
        Math.sin(k * Math.PI) * 0.4 * (1 - night * 0.35);
    }

    // flame flicker — the fire becomes the hero light at night
    if (this.fire) {
      this.fire.intensity =
        (14 + Math.sin(t * 12) * 3 + Math.sin(t * 27) * 1.6) *
        (1 + night * 0.9);
      this.fire.distance = 16 + night * 8;
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

    // motes drift (fade back at night so they don't fight the stars)
    if (this.motes) {
      (this.motes.material as THREE.PointsMaterial).opacity =
        THREE.MathUtils.lerp(0.55, 0.15, this.night);
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
