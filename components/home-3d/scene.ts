/* eslint-disable @typescript-eslint/no-explicit-any */
// Imperative three.js scene for the homepage smart home demo.
// This file is only ever loaded with a dynamic import() from smart-home-3d.tsx,
// so three.js never ends up in the main bundle.
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const PI = Math.PI

export type DeviceType =
  | "strip" | "fan" | "camera" | "lock" | "contact" | "motion" | "smoke" | "leak" | "th"
  | "thermo" | "ac" | "speaker" | "plug" | "hub"

export type DeviceInfo = {
  id: string
  name: string
  room: string
  type: DeviceType
  proto: string
  sim: boolean
  controllable: boolean
}

export type DeviceState = { on: boolean; speed: number; temp: number; color: number }

export type HomeScene = {
  devices: DeviceInfo[]
  getState: (id: string) => DeviceState
  setOn: (id: string, on: boolean) => void
  setSpeed: (id: string, speed: number) => void
  setTemp: (id: string, temp: number) => void
  setColor: (id: string, color: number) => void
  applyStates: (states: Record<string, Partial<DeviceState>>) => void
  select: (id: string | null, fly?: boolean) => void
  focusRoom: (room: string | null) => void
  setWallsClear: (v: boolean) => void
  resetView: () => void
  onChange: (cb: () => void) => void
  onSelect: (cb: (id: string | null) => void) => void
  onPick: (cb: (id: string) => void) => void
  dispose: () => void
}

export const ROOMS = [
  { n: "Living Room", x: 0, z: 0, w: 6, d: 5, c: 0xd8c6aa, lx: 3.5, lz: 4.15, lw: 2.6 },
  { n: "Kitchen & Dining", x: 6, z: 0, w: 6, d: 5, c: 0xcdd5d3, lx: 9, lz: 1.3, lw: 2.6 },
  { n: "Master Bedroom", x: 0, z: 5, w: 5, d: 4, c: 0xd5d1df, lx: 2.9, lz: 6.1, lw: 2.4 },
  { n: "Bathroom", x: 5, z: 5, w: 3, d: 4, c: 0xc2dadb, lx: 6.5, lz: 6.3, lw: 2.0 },
  { n: "Office", x: 8, z: 5, w: 4, d: 4, c: 0xdad0c3, lx: 10, lz: 6.2, lw: 2.6 },
]

export function createHomeScene(container: HTMLElement): HomeScene {
  const coarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200)
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "default" })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2))
  renderer.setClearColor(0x000000, 0)
  renderer.shadowMap.enabled = !coarse
  renderer.domElement.style.display = "block"
  renderer.domElement.style.width = "100%"
  renderer.domElement.style.height = "100%"
  renderer.domElement.style.touchAction = "none"
  container.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.1
  controls.maxPolarAngle = PI / 2.05
  controls.minDistance = 3
  controls.maxDistance = 40
  controls.enablePan = false
  const TARGET = new THREE.Vector3(6, 0, 4.5)

  // ---------- render on demand ----------
  let running = false
  let busyUntil = 0
  let raf = 0
  let last = 0
  let clockT = 0
  let visible = true
  let disposed = false
  let fly: { target: THREE.Vector3; dist: number } | null = null

  function invalidate(ms = 1500) {
    busyUntil = Math.max(busyUntil, performance.now() + ms)
    if (!running && visible && !disposed && !document.hidden) {
      running = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
  }
  controls.addEventListener("change", () => invalidate(120))
  controls.addEventListener("start", () => {
    fly = null
    invalidate(300)
  })

  function viewK() {
    const w = container.clientWidth || 1
    const h = container.clientHeight || 1
    return w / h < 1.1 ? 1.5 : 1
  }
  function resetView() {
    fly = null
    const k = viewK()
    camera.position.set(6 + 9.5 * k, 10.8 * k, 4.5 + 11.8 * k)
    controls.target.copy(TARGET)
    controls.update()
    invalidate()
  }
  function resize() {
    const w = container.clientWidth || 1
    const h = container.clientHeight || 1
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    invalidate(200)
  }
  const ro = new ResizeObserver(resize)
  ro.observe(container)
  const io = new IntersectionObserver((e) => {
    visible = e[0].isIntersecting
    if (visible) invalidate(300)
  })
  io.observe(container)
  const onVis = () => {
    if (!document.hidden) invalidate(300)
  }
  document.addEventListener("visibilitychange", onVis)

  // ---------- lights ----------
  scene.add(new THREE.HemisphereLight(0xfff6e8, 0x8a7d70, 1.7))
  const sun = new THREE.DirectionalLight(0xffffff, 1.9)
  sun.position.set(14, 22, 10)
  if (!coarse) {
    sun.castShadow = true
    sun.shadow.mapSize.set(1024, 1024)
    const sc = sun.shadow.camera
    sc.left = -11
    sc.right = 11
    sc.top = 11
    sc.bottom = -11
    sc.near = 1
    sc.far = 50
  }
  sun.target.position.set(6, 0, 4.5)
  scene.add(sun)
  scene.add(sun.target)

  // ---------- helpers ----------
  const M = (c: number, o?: any) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.75, metalness: 0.04, ...(o || {}) })
  const BM = (c: number, o?: any) => new THREE.MeshBasicMaterial({ color: c, ...(o || {}) })
  const bx = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d)
  const cy = (r: number, h: number, s = 20) => new THREE.CylinderGeometry(r, r, h, s)
  const cyZ = (r: number, h: number, s = 20) => {
    const g = new THREE.CylinderGeometry(r, r, h, s)
    g.rotateX(PI / 2)
    return g
  }
  function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0, parent?: THREE.Object3D, shadow = false) {
    const m = new THREE.Mesh(geo, mat)
    m.position.set(x, y, z)
    if (shadow) {
      m.castShadow = true
      m.receiveShadow = true
    }
    parent?.add(m)
    return m
  }

  // ---------- base + rooms ----------
  const slab = mesh(bx(12.8, 0.3, 9.8), M(0xb9aea0), 6, -0.27, 4.5, scene)
  slab.receiveShadow = true

  // soft glow used under every lit room
  const glowCv = document.createElement("canvas")
  glowCv.width = glowCv.height = 128
  {
    const g = glowCv.getContext("2d")!
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64)
    grad.addColorStop(0, "rgba(255,255,255,1)")
    grad.addColorStop(1, "rgba(255,255,255,0)")
    g.fillStyle = grad
    g.fillRect(0, 0, 128, 128)
  }
  const glowTex = new THREE.CanvasTexture(glowCv)

  ROOMS.forEach((r) => {
    const f = mesh(bx(r.w, 0.12, r.d), M(r.c), r.x + r.w / 2, -0.06, r.z + r.d / 2, scene)
    f.receiveShadow = true
    const cv = document.createElement("canvas")
    cv.width = 512
    cv.height = 256
    const g = cv.getContext("2d")!
    g.textAlign = "center"
    g.fillStyle = "rgba(40,34,28,.8)"
    g.font = "bold 54px -apple-system,Segoe UI,Roboto,sans-serif"
    g.fillText(r.n, 256, 120)
    g.fillStyle = "rgba(40,34,28,.5)"
    g.font = "36px -apple-system,Segoe UI,Roboto,sans-serif"
    g.fillText(r.w * r.d + " m²", 256, 172)
    const lab = mesh(
      new THREE.PlaneGeometry(r.lw, r.lw / 2),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv), transparent: true, depthWrite: false }),
      r.lx, 0.02, r.lz, scene,
    )
    lab.rotation.x = -PI / 2
  })

  // ---------- walls ----------
  const walls = new THREE.Group()
  scene.add(walls)
  const wallMat = M(0xf4f0e8)
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x9cc7ee, transparent: true, opacity: 0.3, roughness: 0.1 })
  const T = 0.18
  const H = 2.6
  function wall(axis: "x" | "z", fixed: number, a: number, b: number, ops: any[] = []) {
    const list = ops
      .map((o) => {
        const d = o.type === "door"
        return { c: o.c, w: o.w, win: !d, y0: d ? 0 : o.sill ?? 0.9, y1: d ? 2.1 : o.top ?? 2.0 }
      })
      .sort((p, q) => p.c - q.c)
    function piece(s: number, e: number, y0: number, y1: number, m?: THREE.Material) {
      if (e - s < 0.01 || y1 - y0 < 0.01) return
      const len = e - s
      const h = y1 - y0
      const mid = (s + e) / 2
      const t = m === glassMat ? 0.04 : T
      const geo = axis === "x" ? bx(len, h, t) : bx(t, h, len)
      const me = new THREE.Mesh(geo, m || wallMat)
      me.position.set(axis === "x" ? mid : fixed, y0 + h / 2, axis === "x" ? fixed : mid)
      if (m !== glassMat) {
        me.castShadow = true
        me.receiveShadow = true
        me.userData.wall = true
      }
      walls.add(me)
    }
    let cur = a
    list.forEach((o) => {
      const s = o.c - o.w / 2
      const e = o.c + o.w / 2
      piece(cur, s, 0, H)
      piece(s, e, 0, o.y0)
      piece(s, e, o.y1, H)
      if (o.win) piece(s, e, o.y0, o.y1, glassMat)
      cur = e
    })
    piece(cur, b, 0, H)
  }
  wall("x", 0, -0.09, 12.09, [{ type: "win", c: 2, w: 1.6 }, { type: "door", c: 4.5, w: 1.0 }, { type: "win", c: 9, w: 1.8, sill: 1.1 }])
  wall("x", 9, -0.09, 12.09, [{ type: "win", c: 6.5, w: 0.8, sill: 1.4 }, { type: "win", c: 10, w: 1.6 }])
  wall("z", 0, 0, 9, [{ type: "win", c: 7, w: 1.4 }])
  wall("z", 12, 0, 9, [{ type: "win", c: 2.5, w: 1.2 }, { type: "win", c: 7, w: 1.4 }])
  wall("z", 6, 0.09, 4.91, [{ type: "door", c: 2.5, w: 2.4 }])
  wall("x", 5, 0.09, 11.91, [{ type: "door", c: 2.5, w: 0.9 }, { type: "door", c: 6.5, w: 0.9 }, { type: "door", c: 10, w: 0.9 }])
  wall("z", 5, 5.09, 8.91)
  wall("z", 8, 5.09, 8.91)

  function setWallsClear(v: boolean) {
    wallMat.transparent = v
    wallMat.opacity = v ? 0.14 : 1
    wallMat.depthWrite = !v
    wallMat.needsUpdate = true
    walls.children.forEach((m) => {
      if (m.userData.wall) m.castShadow = !v
    })
    invalidate()
  }

  // ---------- front door ----------
  const doorPivot = new THREE.Group()
  doorPivot.position.set(5.0, 0, 0)
  scene.add(doorPivot)
  mesh(bx(1.0, 2.1, 0.05), M(0x7c5a3a), -0.5, 1.05, 0, doorPivot, true)
  mesh(bx(0.02, 0.02, 0.1), M(0xb8c0cc, { metalness: 0.7 }), -0.9, 1.0, 0, doorPivot)
  let doorAngle = 0

  // ---------- furniture ----------
  const furn = new THREE.Group()
  scene.add(furn)
  const box = (cx: number, cz: number, w: number, d: number, h: number, c: number, y0 = 0) =>
    mesh(bx(w, h, d), M(c), cx, y0 + h / 2, cz, furn, true)
  box(0.3, 2.5, 0.5, 1.8, 0.45, 0x5a4636)
  box(0.2, 2.5, 0.08, 1.4, 0.8, 0x14181d, 0.9)
  box(2.9, 2.5, 0.9, 2.4, 0.45, 0x8b9db3)
  box(3.25, 2.5, 0.25, 2.4, 0.5, 0x7a8da4, 0.45)
  box(1.7, 2.5, 0.7, 1.1, 0.4, 0xb08968)
  box(8.7, 0.45, 4.4, 0.7, 0.9, 0x9ca3af)
  box(11.4, 0.5, 0.8, 0.8, 1.9, 0xd1d5db)
  box(9, 2.4, 2.4, 0.9, 0.9, 0xe2e8f0)
  box(9, 4.1, 1.6, 0.9, 0.75, 0xa07850)
  box(7.8, 4.1, 0.4, 0.4, 0.45, 0x64748b)
  box(10.2, 4.1, 0.4, 0.4, 0.45, 0x64748b)
  box(2.5, 7.9, 1.8, 2.1, 0.45, 0xe2e8f0)
  box(2.5, 8.88, 1.9, 0.12, 1.0, 0x6b7280)
  box(1.95, 8.55, 0.6, 0.35, 0.12, 0xffffff, 0.45)
  box(3.05, 8.55, 0.6, 0.35, 0.12, 0xffffff, 0.45)
  box(1.2, 8.75, 0.4, 0.4, 0.5, 0x8b6f4e)
  box(3.8, 8.75, 0.4, 0.4, 0.5, 0x8b6f4e)
  box(0.35, 6.2, 0.55, 1.6, 2.0, 0x9a8268)
  box(6.9, 8.55, 1.7, 0.7, 0.55, 0xffffff)
  box(7.65, 7.6, 0.4, 0.6, 0.4, 0xffffff)
  box(5.4, 6.0, 0.5, 1.0, 0.85, 0xe2e8f0)
  mesh(bx(0.03, 0.9, 0.9), M(0xaecbd6, { metalness: 0.6, roughness: 0.15 }), 5.12, 1.5, 6.0, furn)
  box(10.4, 8.55, 2.0, 0.8, 0.75, 0x8b6f4e)
  box(10.4, 7.8, 0.5, 0.5, 0.45, 0x334155)
  box(10.4, 8.8, 0.7, 0.05, 0.4, 0x14181d, 0.8)
  box(11.7, 6.6, 0.4, 1.6, 1.8, 0x6b5b4b)

  // ---------- devices ----------
  const CAT_OF: Record<string, string> = {
    strip: "light", fan: "fan", motion: "sensor", contact: "sensor", leak: "sensor", smoke: "sensor", th: "sensor",
    camera: "camera", lock: "lock", thermo: "climate", ac: "climate", speaker: "hub", plug: "hub", hub: "hub",
  }
  const CAT_COLOR: Record<string, number> = {
    light: 0xe9a50c, fan: 0xe8772a, sensor: 0x2faa7e, camera: 0xe05252, lock: 0x8b6fe0, climate: 0x2f9fd8, hub: 0xd9549a,
  }
  const devGroup = new THREE.Group()
  scene.add(devGroup)
  const devices: any[] = []
  const tmpV = new THREE.Vector3()

  function addHit(dev: any, geo: THREE.BufferGeometry, x = 0, y = 0, z = 0) {
    const h = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ visible: false }))
    h.position.set(x, y, z)
    h.userData.dev = dev
    dev.group.add(h)
    dev.hits.push(h)
  }
  const led = (parent: THREE.Object3D, r: number, x: number, y: number, z: number) =>
    mesh(new THREE.SphereGeometry(r, 10, 8), BM(0x333333), x, y, z, parent)

  const build: Record<string, (dev: any) => void> = {}

  build.strip = (dev) => {
    const g = dev.group
    dev.segs = []
    dev.color = new THREE.Color(0xffd9a0)
    const room = ROOMS.find((r) => r.n === dev.room)!
    const glowMat = new THREE.MeshBasicMaterial({ map: glowTex, color: 0xffd9a0, transparent: true, opacity: 0, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1 })
    const glow = mesh(new THREE.PlaneGeometry(room.w * 1.05, room.d * 1.05), glowMat, room.x + room.w / 2, 0.012, room.z + room.d / 2, g)
    glow.rotation.x = -PI / 2
    dev.glowMat = glowMat
    dev.segDefs.forEach((s: any, i: number) => {
      const L = s.len
      const ax = s.ax
      const dim = ax === "x" ? [L, 0.03, 0.035] : ax === "y" ? [0.035, L, 0.035] : [0.035, 0.03, L]
      const dd = ax === "x" ? [L - 0.02, 0.016, 0.022] : ax === "y" ? [0.022, L - 0.02, 0.022] : [0.022, 0.016, L - 0.02]
      const hd = ax === "x" ? [L, 0.14, 0.14] : ax === "y" ? [0.14, L, 0.14] : [0.14, 0.14, L]
      const hh = ax === "x" ? [L + 0.2, 0.4, 0.4] : ax === "y" ? [0.4, L + 0.2, 0.4] : [0.4, 0.4, L + 0.2]
      mesh(bx(dim[0], dim[1], dim[2]), M(0x2b3340, { metalness: 0.5 }), s.x, s.y, s.z, g, true)
      const dm = new THREE.MeshStandardMaterial({ color: 0xd7dbe0, emissive: 0x000000, roughness: 0.4 })
      mesh(bx(dd[0], dd[1], dd[2]), dm, s.x + s.n[0] * 0.014, s.y, s.z + s.n[1] * 0.014, g)
      const hm = new THREE.MeshBasicMaterial({ color: 0xffd9a0, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
      mesh(bx(hd[0], hd[1], hd[2]), hm, s.x + s.n[0] * 0.05, s.y, s.z + s.n[1] * 0.05, g)
      let pl: THREE.PointLight | null = null
      if (!s.nopl) {
        pl = new THREE.PointLight(0xffd9a0, 0, 7, 2)
        pl.position.set(s.x + s.n[0] * 0.5, Math.min(s.y, 2.3) - 0.2, s.z + s.n[1] * 0.5)
        g.add(pl)
      }
      addHit(dev, bx(hh[0], hh[1], hh[2]), s.x, s.y, s.z)
      dev.segs.push({ dm, hm, pl })
      if (i === 0) {
        dev.anchor = new THREE.Object3D()
        dev.anchor.position.set(s.x, s.y, s.z)
        g.add(dev.anchor)
      }
    })
    dev.apply = () => {
      dev.glowMat.color.copy(dev.color)
      dev.glowMat.opacity = dev.on ? 0.34 : 0
      dev.segs.forEach((s: any) => {
        if (dev.on) {
          s.dm.color.copy(dev.color)
          s.dm.emissive.copy(dev.color)
          s.dm.emissiveIntensity = 1.7
          s.hm.color.copy(dev.color)
          s.hm.opacity = 0.3
          if (s.pl) {
            s.pl.color.copy(dev.color)
            s.pl.intensity = 5
          }
        } else {
          s.dm.color.setHex(0xd7dbe0)
          s.dm.emissive.setHex(0x000000)
          s.dm.emissiveIntensity = 0
          s.hm.opacity = 0
          if (s.pl) s.pl.intensity = 0
        }
      })
    }
  }

  build.fan = (dev) => {
    const g = dev.group
    mesh(cy(0.06, 0.04), M(0xe5e7eb), 0, -0.02, 0, g)
    mesh(cy(0.012, 0.28), M(0xcbd5e1), 0, -0.17, 0, g)
    mesh(cy(0.1, 0.09), M(0xf3f4f6), 0, -0.34, 0, g, true)
    const rotor = new THREE.Group()
    rotor.position.y = -0.37
    g.add(rotor)
    for (let i = 0; i < 4; i++) {
      const arm = new THREE.Group()
      arm.rotation.y = (i * PI) / 2
      rotor.add(arm)
      const b = mesh(bx(0.5, 0.012, 0.12), M(0x8b6f4e), 0.36, 0, 0, arm, true)
      b.rotation.x = 0.12
      mesh(bx(0.1, 0.01, 0.03), M(0x9ca3af), 0.1, 0, 0, arm)
    }
    dev.rotor = rotor
    dev.spin = 0
    dev.speed = 2
    dev.anchor = new THREE.Object3D()
    dev.anchor.position.y = -0.2
    g.add(dev.anchor)
    addHit(dev, new THREE.SphereGeometry(0.75, 8, 6), 0, -0.37, 0)
    dev.busy = () => dev.on || dev.spin > 0.05
    dev.tick = (dt: number) => {
      const target = dev.on ? [0, 2.5, 5, 9][dev.speed] : 0
      dev.spin += (target - dev.spin) * Math.min(1, dt * 1.5)
      if (dev.spin < 0.02 && !dev.on) dev.spin = 0
      rotor.rotation.y += dev.spin * dt
    }
  }

  build.camera = (dev) => {
    const g = dev.group
    mesh(bx(0.04, 0.04, 0.08), M(0x9ca3af), 0, 0, 0.04, g)
    mesh(cyZ(0.035, 0.14), M(0xf3f4f6), 0, 0, 0.13, g, true)
    mesh(cyZ(0.042, 0.05), M(0xe5e7eb), 0, 0, 0.18, g)
    mesh(new THREE.SphereGeometry(0.026, 12, 10), M(0x0b0f14, { roughness: 0.1, metalness: 0.8 }), 0, 0, 0.205, g)
    dev.led = led(g, 0.008, 0.03, 0.03, 0.2)
    const h = 1.8
    dev.cone = mesh(new THREE.ConeGeometry(0.6, h, 24, 1, true), new THREE.MeshBasicMaterial({ color: 0xf87171, transparent: true, opacity: 0.06, depthWrite: false, side: THREE.DoubleSide }), 0, 0, 0.2 + h / 2, g)
    dev.cone.rotation.x = -PI / 2
    dev.anchor = g
    addHit(dev, new THREE.SphereGeometry(0.28, 8, 6), 0, 0, 0.12)
    dev.apply = () => {
      dev.led.material.color.setHex(dev.on ? 0xff2a2a : 0x333333)
      dev.cone.visible = dev.on
    }
  }

  build.lock = (dev) => {
    const g = dev.group
    mesh(bx(0.06, 0.2, 0.012), M(0x2b2f36, { metalness: 0.6 }), 0, 0, 0.006, g)
    mesh(bx(0.04, 0.06, 0.006), M(0x4b5563), 0, 0.04, 0.015, g)
    const turn = new THREE.Group()
    turn.position.set(0, -0.05, 0.02)
    g.add(turn)
    mesh(cyZ(0.018, 0.02), M(0x9ca3af, { metalness: 0.7 }), 0, 0, 0, turn)
    mesh(bx(0.05, 0.012, 0.02), M(0xcbd5e1, { metalness: 0.7 }), 0, 0, 0.01, turn)
    dev.led = led(g, 0.007, 0, 0.085, 0.016)
    dev.anchor = g
    addHit(dev, new THREE.SphereGeometry(0.3, 8, 6), 0, 0, 0.05)
    dev.apply = () => dev.led.material.color.setHex(dev.on ? 0x22c55e : 0xf59e0b)
    dev.tick = (dt: number) => {
      const tg = dev.on ? 0 : PI / 2
      turn.rotation.z += (tg - turn.rotation.z) * Math.min(1, dt * 8)
    }
  }

  let doorDev: any = null
  build.contact = (dev) => {
    const g = dev.group
    dev.fixed = mesh(bx(0.04, 0.025, 0.012), M(0xf3f4f6), dev.px, dev.py, dev.pz, g)
    dev.move = mesh(bx(0.04, 0.025, 0.012), M(0xf3f4f6), dev.px, dev.py, dev.pz, g)
    dev.led = led(g, 0.005, dev.px, dev.py + 0.02, dev.pz + 0.01)
    dev.gap = 0.012
    dev.anchor = new THREE.Object3D()
    dev.anchor.position.set(dev.px, dev.py, dev.pz)
    g.add(dev.anchor)
    addHit(dev, new THREE.SphereGeometry(0.3, 8, 6), dev.px, dev.py, dev.pz)
    dev.apply = () => dev.led.material.color.setHex(dev.on ? 0xef4444 : 0x22c55e)
    dev.tick = (dt: number) => {
      if (dev.door) {
        const tg = dev.on ? 1.25 : 0
        doorAngle += (tg - doorAngle) * Math.min(1, dt * 3)
        doorPivot.rotation.y = doorAngle
        doorPivot.updateMatrixWorld()
        doorPivot.localToWorld(tmpV.set(-0.92, dev.py, 0.04))
        dev.move.position.copy(tmpV)
        dev.move.rotation.y = doorAngle
      } else {
        const gp = dev.on ? 0.07 : 0.012
        dev.gap += (gp - dev.gap) * Math.min(1, dt * 5)
        dev.move.position.set(dev.px + (dev.gx ? dev.gap : 0), dev.py, dev.pz + (dev.gx ? 0 : dev.gap))
      }
    }
  }

  build.motion = (dev) => {
    const g = dev.group
    mesh(cyZ(0.03, 0.015), M(0xf3f4f6), 0, 0, 0.008, g)
    dev.dome = mesh(new THREE.SphereGeometry(0.032, 14, 10), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x000000, roughness: 0.4 }), 0, 0, 0.02, g)
    dev.dome.scale.z = 0.7
    dev.led = led(g, 0.005, 0, 0.025, 0.045)
    const h = 3.2
    dev.cone = mesh(new THREE.ConeGeometry(1.8, h, 24, 1, true), new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.14, depthWrite: false, side: THREE.DoubleSide }), 0, 0, 0.03 + h / 2, g)
    dev.cone.rotation.x = -PI / 2
    dev.anchor = g
    addHit(dev, new THREE.SphereGeometry(0.3, 8, 6), 0, 0, 0.05)
    dev.apply = () => {
      dev.cone.visible = dev.on
      dev.dome.material.emissive.setHex(dev.on ? 0x16a34a : 0x000000)
      dev.led.material.color.setHex(dev.on ? 0x34d399 : 0x555555)
    }
  }

  build.smoke = (dev) => {
    const g = dev.group
    mesh(cy(0.085, 0.035, 24), M(0xf3f4f6), 0, -0.0175, 0, g)
    mesh(cy(0.05, 0.01, 24), M(0xd1d5db), 0, -0.04, 0, g)
    dev.led = led(g, 0.007, 0.06, -0.04, 0)
    dev.halo = mesh(new THREE.SphereGeometry(0.3, 16, 12), new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0, depthWrite: false }), 0, -0.1, 0, g)
    dev.anchor = g
    addHit(dev, new THREE.SphereGeometry(0.3, 8, 6), 0, -0.05, 0)
    dev.apply = () => {
      dev.led.material.color.setHex(dev.on ? 0xef4444 : 0x22c55e)
      if (!dev.on) dev.halo.material.opacity = 0
    }
    dev.busy = () => dev.on
    dev.tick = (_dt: number, t: number) => {
      if (!dev.on) return
      const f = Math.sin(t * 10) > 0
      dev.led.material.color.setHex(f ? 0xff2a2a : 0x550000)
      dev.halo.material.opacity = f ? 0.35 : 0.05
    }
  }

  build.leak = (dev) => {
    const g = dev.group
    mesh(cy(0.028, 0.02, 16), M(0xf3f4f6), 0, 0.01, 0, g)
    dev.led = led(g, 0.006, 0.012, 0.022, 0)
    dev.puddle = mesh(new THREE.CircleGeometry(0.55, 32), new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5, depthWrite: false }), 0.2, 0.025, 0.1, g)
    dev.puddle.rotation.x = -PI / 2
    dev.puddle.scale.setScalar(0.01)
    dev.pt = 0
    dev.anchor = g
    addHit(dev, new THREE.SphereGeometry(0.3, 8, 6), 0, 0.05, 0)
    dev.apply = () => dev.led.material.color.setHex(dev.on ? 0xef4444 : 0x22c55e)
    dev.busy = () => dev.on
    dev.tick = (dt: number, t: number) => {
      const tg = dev.on ? 1 : 0.01
      dev.pt += (tg - dev.pt) * Math.min(1, dt * 1.2)
      dev.puddle.scale.setScalar(Math.max(0.01, dev.pt))
      dev.puddle.visible = dev.pt > 0.02
      if (dev.on) dev.led.material.color.setHex(Math.sin(t * 8) > 0 ? 0xff2a2a : 0x550000)
    }
  }

  build.th = (dev) => {
    const g = dev.group
    mesh(bx(0.06, 0.06, 0.016), M(0xf3f4f6), 0, 0, 0.008, g)
    mesh(new THREE.PlaneGeometry(0.04, 0.025), BM(0x2dd4bf), 0, 0.005, 0.0165, g)
    dev.anchor = g
    addHit(dev, new THREE.SphereGeometry(0.28, 8, 6), 0, 0, 0.05)
  }

  build.thermo = (dev) => {
    const g = dev.group
    mesh(cyZ(0.065, 0.03, 32), M(0xf3f4f6), 0, 0, 0.015, g)
    dev.ring = mesh(new THREE.TorusGeometry(0.054, 0.004, 8, 40), BM(0x38bdf8), 0, 0, 0.031, g)
    const cv = document.createElement("canvas")
    cv.width = cv.height = 128
    dev.tex = new THREE.CanvasTexture(cv)
    mesh(new THREE.CircleGeometry(0.046, 32), new THREE.MeshBasicMaterial({ map: dev.tex }), 0, 0, 0.032, g)
    dev.temp = 24
    dev.draw = () => {
      const c = cv.getContext("2d")!
      c.fillStyle = "#05080d"
      c.fillRect(0, 0, 128, 128)
      if (dev.on) {
        c.fillStyle = "#e0f2fe"
        c.font = "bold 52px sans-serif"
        c.textAlign = "center"
        c.fillText(dev.temp + "°", 64, 78)
      }
      dev.tex.needsUpdate = true
    }
    dev.anchor = g
    addHit(dev, new THREE.SphereGeometry(0.28, 8, 6), 0, 0, 0.05)
    dev.apply = () => {
      dev.ring.material.color.setHex(dev.on ? 0x38bdf8 : 0x374151)
      dev.draw()
    }
  }

  build.ac = (dev) => {
    const g = dev.group
    mesh(bx(0.85, 0.27, 0.2), M(0xf3f4f6), 0, 0, 0.1, g, true)
    mesh(bx(0.85, 0.02, 0.02), M(0xe5e7eb), 0, 0.12, 0.2, g)
    const flap = new THREE.Group()
    flap.position.set(0, -0.125, 0.19)
    g.add(flap)
    mesh(bx(0.75, 0.012, 0.09), M(0xe5e7eb), 0, 0, 0.045, flap)
    dev.flap = flap
    dev.fa = 0
    dev.led = led(g, 0.007, 0.34, 0.06, 0.201)
    const air = new THREE.Group()
    air.position.set(0, -0.13, 0.2)
    air.rotation.x = 0.85
    g.add(air)
    dev.air = air
    const h = 2.2
    const cone = mesh(new THREE.ConeGeometry(0.7, h, 20, 1, true), new THREE.MeshBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.12, depthWrite: false, side: THREE.DoubleSide }), 0, 0, h / 2, air)
    cone.rotation.x = -PI / 2
    dev.anchor = g
    addHit(dev, bx(1.0, 0.45, 0.4), 0, 0, 0.15)
    dev.apply = () => {
      dev.led.material.color.setHex(dev.on ? 0x22d3ee : 0x333333)
      air.visible = dev.on
    }
    dev.tick = (dt: number) => {
      const tg = dev.on ? 0.8 : 0
      dev.fa += (tg - dev.fa) * Math.min(1, dt * 4)
      flap.rotation.x = dev.fa
    }
  }

  build.speaker = (dev) => {
    const g = dev.group
    mesh(cy(0.065, 0.2, 24), M(0x2d3340, { roughness: 0.95 }), 0, 0.1, 0, g, true)
    dev.top = mesh(new THREE.TorusGeometry(0.058, 0.004, 8, 32), BM(0x22d3ee), 0, 0.202, 0, g)
    dev.top.rotation.x = PI / 2
    dev.waves = []
    for (let i = 0; i < 3; i++) {
      const w = mesh(new THREE.TorusGeometry(0.1, 0.004, 8, 40), new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0, depthWrite: false }), 0, 0.21, 0, g)
      w.rotation.x = PI / 2
      dev.waves.push(w)
    }
    dev.anchor = new THREE.Object3D()
    dev.anchor.position.y = 0.1
    g.add(dev.anchor)
    addHit(dev, new THREE.SphereGeometry(0.3, 8, 6), 0, 0.1, 0)
    dev.apply = () => {
      dev.top.material.color.setHex(dev.on ? 0x22d3ee : 0x374151)
      if (!dev.on) dev.waves.forEach((w: any) => (w.visible = false))
    }
    dev.busy = () => dev.on
    dev.tick = (_dt: number, t: number) => {
      if (!dev.on) return
      dev.waves.forEach((w: any, i: number) => {
        const p = (t * 0.7 + i / 3) % 1
        w.visible = true
        w.scale.setScalar(1 + p * 2.2)
        w.position.y = 0.21 + p * 0.25
        w.material.opacity = 0.55 * (1 - p)
      })
    }
  }

  build.plug = (dev) => {
    const g = dev.group
    mesh(bx(0.08, 0.12, 0.008), M(0xf8fafc), 0, 0, 0.004, g)
    mesh(bx(0.055, 0.085, 0.03), M(0xf3f4f6), 0, 0, 0.023, g, true)
    dev.led = led(g, 0.006, 0, -0.022, 0.039)
    dev.anchor = g
    addHit(dev, new THREE.SphereGeometry(0.28, 8, 6), 0, 0, 0.04)
    dev.apply = () => dev.led.material.color.setHex(dev.on ? 0x22c55e : 0x4b5563)
  }

  build.hub = (dev) => {
    const g = dev.group
    mesh(bx(0.12, 0.03, 0.12), M(0x1e293b), 0, 0.015, 0, g, true)
    mesh(bx(0.1, 0.004, 0.1), M(0x0f172a), 0, 0.032, 0, g)
    dev.led = mesh(bx(0.06, 0.004, 0.008), BM(0x38bdf8), 0, 0.036, 0.04, g)
    mesh(bx(0.02, 0.012, 0.05), M(0xe5e7eb), 0.09, 0.02, 0, g)
    mesh(cy(0.004, 0.1, 6), M(0x111827), 0.09, 0.1, 0.02, g)
    dev.anchor = new THREE.Object3D()
    dev.anchor.position.y = 0.03
    g.add(dev.anchor)
    addHit(dev, new THREE.SphereGeometry(0.3, 8, 6), 0, 0.03, 0)
    dev.apply = () => dev.led.material.color.setHex(dev.on ? 0x38bdf8 : 0x374151)
  }

  const DEFS: any[] = [
    // Living
    { type: "strip", id: "light.living_room", name: "Living room light strip", room: "Living Room", proto: "Zigbee", on: true, segDefs: [
      { ax: "x", x: 3.0, y: 2.45, z: 4.89, len: 5.0, n: [0, -1] },
      { ax: "z", x: 0.11, y: 2.45, z: 2.5, len: 4.2, n: [1, 0], nopl: true }] },
    { type: "fan", id: "fan.living_room", name: "Living room ceiling fan", room: "Living Room", proto: "Wi-Fi", on: false, x: 3, y: 2.6, z: 2.5 },
    { type: "motion", id: "binary_sensor.living_room_motion", name: "Living room motion sensor", room: "Living Room", proto: "Zigbee", sim: true, on: false, x: 0.12, y: 2.3, z: 4.8, rot: (3 * PI) / 4 },
    { type: "contact", id: "binary_sensor.front_door_contact", name: "Front door sensor (opens door)", room: "Living Room", proto: "Zigbee", sim: true, on: false, door: true, px: 3.93, py: 2.05, pz: 0.1 },
    { type: "lock", id: "lock.front_door", name: "Front door smart lock", room: "Living Room", proto: "Z-Wave", on: true, x: -0.85, y: 1.05, z: 0.025, parent: "door" },
    { type: "camera", id: "camera.living_room", name: "Living room camera", room: "Living Room", proto: "Wi-Fi", on: false, x: 5.75, y: 2.3, z: 4.75, rot: (-3 * PI) / 4 },
    { type: "thermo", id: "climate.thermostat", name: "Thermostat", room: "Living Room", proto: "Wi-Fi", on: false, x: 5.91, y: 1.4, z: 4.3, rot: -PI / 2 },
    { type: "speaker", id: "media_player.living_room", name: "Smart speaker", room: "Living Room", proto: "Wi-Fi", on: false, x: 0.3, y: 0.45, z: 3.1 },
    { type: "plug", id: "switch.living_tv_plug", name: "TV smart plug", room: "Living Room", proto: "Zigbee", on: false, x: 0.09, y: 0.35, z: 1.2, rot: PI / 2 },
    // Kitchen
    { type: "strip", id: "light.kitchen", name: "Kitchen light strip", room: "Kitchen & Dining", proto: "Zigbee", on: true, segDefs: [
      { ax: "x", x: 9.0, y: 2.45, z: 4.89, len: 5.2, n: [0, -1] },
      { ax: "x", x: 9.0, y: 2.45, z: 0.11, len: 5.2, n: [0, 1], nopl: true }] },
    { type: "leak", id: "binary_sensor.kitchen_leak", name: "Kitchen leak sensor", room: "Kitchen & Dining", proto: "Zigbee", sim: true, on: false, x: 8.6, y: 0, z: 1.15 },
    { type: "smoke", id: "binary_sensor.kitchen_smoke", name: "Kitchen smoke detector", room: "Kitchen & Dining", proto: "Zigbee", sim: true, on: false, x: 9, y: 2.6, z: 3.6 },
    { type: "contact", id: "binary_sensor.kitchen_window", name: "Kitchen window sensor", room: "Kitchen & Dining", proto: "Zigbee", sim: true, on: false, px: 8.0, py: 2.05, pz: 0.12, gx: true },
    // Master
    { type: "strip", id: "light.master_bedroom", name: "Bedroom light strip", room: "Master Bedroom", proto: "Zigbee", on: false, segDefs: [
      { ax: "z", x: 0.11, y: 2.45, z: 7.0, len: 3.2, n: [1, 0] },
      { ax: "x", x: 2.5, y: 1.15, z: 8.8, len: 1.8, n: [0, -1], nopl: true }] },
    { type: "fan", id: "fan.master_bedroom", name: "Bedroom ceiling fan", room: "Master Bedroom", proto: "Wi-Fi", on: false, x: 2.5, y: 2.6, z: 7.0 },
    { type: "ac", id: "climate.master_ac", name: "Bedroom aircon", room: "Master Bedroom", proto: "Wi-Fi", on: false, x: 4.2, y: 2.15, z: 5.09 },
    { type: "th", id: "sensor.master_temperature", name: "Bedroom temperature sensor", room: "Master Bedroom", proto: "Zigbee", x: 4.91, y: 1.4, z: 8.4, rot: -PI / 2 },
    // Bath
    { type: "strip", id: "light.bathroom", name: "Bathroom light strip", room: "Bathroom", proto: "Zigbee", on: false, segDefs: [
      { ax: "z", x: 7.87, y: 2.45, z: 7.0, len: 3.0, n: [-1, 0] },
      { ax: "y", x: 5.14, y: 1.5, z: 5.5, len: 0.9, n: [1, 0], nopl: true },
      { ax: "y", x: 5.14, y: 1.5, z: 6.5, len: 0.9, n: [1, 0], nopl: true }] },
    { type: "leak", id: "binary_sensor.bathroom_leak", name: "Bathroom leak sensor", room: "Bathroom", proto: "Zigbee", sim: true, on: false, x: 7.0, y: 0, z: 7.8 },
    { type: "th", id: "sensor.bathroom_humidity", name: "Bathroom humidity sensor", room: "Bathroom", proto: "Zigbee", x: 7.91, y: 1.5, z: 5.5, rot: -PI / 2 },
    // Office
    { type: "strip", id: "light.office", name: "Office light strip", room: "Office", proto: "Zigbee", on: false, segDefs: [
      { ax: "x", x: 10, y: 2.45, z: 8.89, len: 3.2, n: [0, -1] },
      { ax: "x", x: 10.4, y: 1.2, z: 8.88, len: 0.9, n: [0, -1], nopl: true }] },
    { type: "fan", id: "fan.office", name: "Office ceiling fan", room: "Office", proto: "Wi-Fi", on: false, x: 10, y: 2.6, z: 7.0 },
    { type: "ac", id: "climate.office_ac", name: "Office aircon", room: "Office", proto: "Wi-Fi", on: false, x: 11.3, y: 2.15, z: 5.09 },
    { type: "contact", id: "binary_sensor.office_window", name: "Office window sensor", room: "Office", proto: "Zigbee", sim: true, on: false, px: 11.9, py: 2.05, pz: 6.25, gx: false },
    { type: "hub", id: "sensor.ha_hub", name: "Home Assistant hub", room: "Office", proto: "Ethernet", on: true, x: 11.7, y: 1.8, z: 6.6 },
    { type: "plug", id: "switch.office_desk_plug", name: "Desk smart plug", room: "Office", proto: "Zigbee", on: false, x: 11.91, y: 0.4, z: 8.5, rot: -PI / 2 },
    // Outside
    { type: "camera", id: "camera.front_door", name: "Front door camera", room: "Outside", proto: "Wi-Fi", on: true, x: 4.5, y: 2.4, z: -0.09, rot: PI },
  ]

  DEFS.forEach((o) => {
    const g = new THREE.Group()
    g.position.set(o.x || 0, o.y || 0, o.z || 0)
    g.rotation.y = o.rot || 0
    const dev: any = { cat: CAT_OF[o.type], group: g, hits: [], tick: null, busy: null, apply: () => {}, anchor: g, sim: !!o.sim, ...o }
    build[o.type](dev)
    ;(o.parent === "door" ? doorPivot : devGroup).add(g)
    if (o.door) doorDev = dev
    devices.push(dev)
  })
  void doorDev
  devices.forEach((d) => d.apply())

  const byId = (id: string) => devices.find((d) => d.id === id)

  // selector arrow
  const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.22, 16), BM(0x10b981))
  arrow.rotation.x = PI
  arrow.visible = false
  scene.add(arrow)

  // ---------- callbacks / state ----------
  let selected: any = null
  const changeCbs: (() => void)[] = []
  const selectCbs: ((id: string | null) => void)[] = []
  const pickCbs: ((id: string) => void)[] = []
  const emit = () => changeCbs.forEach((cb) => cb())

  function placeArrow() {
    if (selected) {
      scene.updateMatrixWorld(true)
      selected.anchor.getWorldPosition(tmpV)
      arrow.position.set(tmpV.x, tmpV.y + 0.4, tmpV.z)
      arrow.visible = true
    } else arrow.visible = false
  }

  function flyToPoint(p: THREE.Vector3, dist: number) {
    fly = { target: p.clone(), dist }
    invalidate(2500)
  }

  const api: HomeScene = {
    devices: devices.map((d) => ({
      id: d.id, name: d.name, room: d.room, type: d.type, proto: d.proto, sim: d.sim, controllable: d.type !== "th",
    })),
    getState(id) {
      const d = byId(id)
      return { on: !!d.on, speed: d.speed ?? 2, temp: d.temp ?? 24, color: d.color ? d.color.getHex() : 0xffd9a0 }
    },
    setOn(id, on) {
      const d = byId(id)
      if (!d) return
      d.on = on
      d.apply()
      invalidate(2500)
      emit()
    },
    setSpeed(id, speed) {
      const d = byId(id)
      if (!d) return
      d.speed = Math.max(1, Math.min(3, speed))
      d.on = true
      d.apply()
      invalidate(2500)
      emit()
    },
    setTemp(id, temp) {
      const d = byId(id)
      if (!d) return
      d.temp = Math.max(16, Math.min(30, temp))
      d.apply()
      invalidate()
      emit()
    },
    setColor(id, color) {
      const d = byId(id)
      if (!d) return
      d.color.setHex(color)
      d.on = true
      d.apply()
      invalidate()
      emit()
    },
    applyStates(states) {
      Object.keys(states).forEach((id) => {
        const d = byId(id)
        const s = states[id]
        if (!d) return
        if (s.speed !== undefined) d.speed = s.speed
        if (s.temp !== undefined) d.temp = s.temp
        if (s.color !== undefined && d.color) d.color.setHex(s.color)
        if (s.on !== undefined) d.on = s.on
        d.apply()
      })
      invalidate(3000)
      emit()
    },
    select(id, doFly = false) {
      selected = id ? byId(id) : null
      placeArrow()
      if (selected && doFly) {
        scene.updateMatrixWorld(true)
        selected.anchor.getWorldPosition(tmpV)
        flyToPoint(tmpV, 8)
      }
      invalidate(400)
      selectCbs.forEach((cb) => cb(selected ? selected.id : null))
    },
    focusRoom(room) {
      const r = ROOMS.find((x) => x.n === room)
      if (!r) {
        if (room === "Outside") flyToPoint(new THREE.Vector3(4.5, 1.2, 0), 9)
        else resetView()
        return
      }
      flyToPoint(new THREE.Vector3(r.x + r.w / 2, 0.5, r.z + r.d / 2), 11 * (viewK() > 1 ? 1.25 : 1))
    },
    setWallsClear,
    resetView,
    onChange(cb) { changeCbs.push(cb) },
    onSelect(cb) { selectCbs.push(cb) },
    onPick(cb) { pickCbs.push(cb) },
    dispose() {
      disposed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener("visibilitychange", onVis)
      controls.dispose()
      scene.traverse((o: any) => {
        if (o.geometry) o.geometry.dispose()
        if (o.material) {
          const mats = Array.isArray(o.material) ? o.material : [o.material]
          mats.forEach((m: any) => {
            if (m.map) m.map.dispose()
            m.dispose()
          })
        }
      })
      glowTex.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
    },
  }

  // ---------- picking ----------
  const ray = new THREE.Raycaster()
  const ndc = new THREE.Vector2()
  let down: { x: number; y: number } | null = null
  renderer.domElement.addEventListener("pointerdown", (e) => {
    down = { x: e.clientX, y: e.clientY }
  })
  renderer.domElement.addEventListener("pointerup", (e) => {
    if (!down) return
    const dx = e.clientX - down.x
    const dy = e.clientY - down.y
    down = null
    if (dx * dx + dy * dy > 36) return
    const r = renderer.domElement.getBoundingClientRect()
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
    ray.setFromCamera(ndc, camera)
    const objs: THREE.Object3D[] = []
    devices.forEach((d) => d.hits.forEach((h: any) => objs.push(h)))
    scene.updateMatrixWorld(true)
    const hits = ray.intersectObjects(objs, false)
    const id = hits.length ? hits[0].object.userData.dev.id : null
    api.select(id, false)
    if (id) pickCbs.forEach((cb) => cb(id))
  })

  // ---------- frame loop ----------
  function frame(now: number) {
    raf = 0
    if (disposed) return
    const dt = Math.min((now - last) / 1000, 0.05)
    last = now
    clockT += dt
    let cont = false
    for (const d of devices) {
      if (d.tick) d.tick(dt, clockT)
      if (d.busy && d.busy()) cont = true
    }
    if (fly) {
      const cur = camera.position.clone().sub(controls.target)
      const curDist = cur.length()
      const dl = fly.target.clone().sub(controls.target).multiplyScalar(0.12)
      controls.target.add(dl)
      const nd = curDist + (fly.dist - curDist) * 0.12
      camera.position.copy(controls.target).add(cur.normalize().multiplyScalar(nd))
      if (dl.length() < 0.003 && Math.abs(fly.dist - curDist) < 0.03) fly = null
    }
    if (selected && (selected.type === "contact" || selected.type === "fan")) placeArrow()
    controls.update()
    renderer.render(scene, camera)
    if (visible && !document.hidden && (now < busyUntil || cont || fly)) {
      raf = requestAnimationFrame(frame)
    } else {
      running = false
    }
  }

  resize()
  resetView()
  invalidate(800)
  return api
}
