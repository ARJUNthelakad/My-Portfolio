import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec2 uPointer;

  attribute float aRandom;

  varying float vRandom;
  varying float vDepth;

  void main() {
    vRandom = aRandom;

    vec3 p = position;
    float wave =
      sin(p.x * 1.7 + uTime * 0.55) *
      cos(p.y * 2.1 - uTime * 0.45) *
      sin(p.z * 1.9 + uTime * 0.35);

    p *= 1.0 + wave * 0.15;
    p.xy += uPointer * 0.2 * (0.35 + aRandom);

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mvPosition.z;

    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * uPixelRatio * (0.45 + aRandom) * (7.0 / -mvPosition.z);
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  varying float vRandom;
  varying float vDepth;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.0, dist);
    float depthFade = 1.0 - smoothstep(5.0, 11.0, vDepth);
    vec3 color = mix(uColorA, uColorB, smoothstep(0.15, 0.9, vRandom));

    gl_FragColor = vec4(color, alpha * (0.22 + depthFade * 0.65));
  }
`

function makeGlowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const context = canvas.getContext('2d')
  if (!context) return new THREE.Texture()

  const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128)
  gradient.addColorStop(0, 'rgba(255, 181, 138, 0.9)')
  gradient.addColorStop(0.3, 'rgba(255, 122, 69, 0.35)')
  gradient.addColorStop(1, 'rgba(255, 122, 69, 0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, 256, 256)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export function Scene3D() {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return
    }

    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 0, 7)

    const group = new THREE.Group()
    scene.add(group)

    // Particle shell: a fibonacci sphere that breathes and leans with the pointer.
    const COUNT = 9000
    const positions = new Float32Array(COUNT * 3)
    const randoms = new Float32Array(COUNT)
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < COUNT; i += 1) {
      const t = (i + 0.5) / COUNT
      const phi = Math.acos(1 - 2 * t)
      const theta = goldenAngle * i
      const radius = 2.25 + Math.random() * 0.14

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      randoms[i] = Math.random()
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

    const uniforms = {
      uTime: { value: 0 },
      uSize: { value: 2.6 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color('#ff7a45') },
      uColorB: { value: new THREE.Color('#7f9dff') },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(geometry, material)
    group.add(points)

    // Orbit rings give the cloud a sense of scale.
    const rings = new THREE.Group()
    const ringGeometry = new THREE.TorusGeometry(2.72, 0.0055, 6, 220)
    const ringMaterials = [
      new THREE.MeshBasicMaterial({ color: '#ff9a6b', transparent: true, opacity: 0.35 }),
      new THREE.MeshBasicMaterial({ color: '#7f9dff', transparent: true, opacity: 0.3 }),
      new THREE.MeshBasicMaterial({ color: '#f5f1ea', transparent: true, opacity: 0.12 }),
    ]

    ringMaterials.forEach((ringMaterial, index) => {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.rotation.x = Math.PI / 2 + index * 0.55
      ring.rotation.y = index * 0.7
      ring.scale.setScalar(1 + index * 0.13)
      rings.add(ring)
    })
    group.add(rings)

    // Glowing core.
    const coreGeometry = new THREE.IcosahedronGeometry(0.62, 1)
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: '#ffb38d',
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    })
    const core = new THREE.Mesh(coreGeometry, coreMaterial)
    group.add(core)

    const glowTexture = makeGlowTexture()
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const glow = new THREE.Sprite(glowMaterial)
    glow.scale.setScalar(3.4)
    group.add(glow)

    const pointer = new THREE.Vector2(0, 0)
    const pointerTarget = new THREE.Vector2(0, 0)

    const handlePointerMove = (event: PointerEvent) => {
      pointerTarget.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        (event.clientY / window.innerHeight) * 2 - 1,
      )
    }

    const resize = () => {
      const width = mount.clientWidth || 1
      const height = mount.clientHeight || 1
      const dpr = Math.min(window.devicePixelRatio, 2)

      renderer.setPixelRatio(dpr)
      renderer.setSize(width, height, false)

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      uniforms.uPixelRatio.value = dpr

      const wide = width >= 960
      group.position.set(wide ? 2.25 : 0, wide ? 0.1 : 0.85, 0)
      group.scale.setScalar(wide ? 1 : 0.85)
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(mount)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    const start = performance.now()
    let frame = 0
    let spin = 0

    const render = () => {
      pointer.lerp(pointerTarget, 0.045)
      uniforms.uPointer.value.copy(pointer)
      uniforms.uTime.value = (performance.now() - start) / 1000

      spin += reducedMotion ? 0 : 0.0014
      group.rotation.y = spin + pointer.x * 0.35
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -pointer.y * 0.22, 0.05)

      rings.rotation.z = spin * 0.6
      rings.rotation.x = pointer.y * 0.12
      core.rotation.y -= reducedMotion ? 0 : 0.004
      core.rotation.x += reducedMotion ? 0 : 0.002

      renderer.render(scene, camera)
      if (!reducedMotion) frame = requestAnimationFrame(render)
    }

    render()

    const handleVisibility = () => {
      if (reducedMotion) return
      cancelAnimationFrame(frame)
      if (!document.hidden) frame = requestAnimationFrame(render)
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('visibilitychange', handleVisibility)
      geometry.dispose()
      material.dispose()
      ringGeometry.dispose()
      ringMaterials.forEach((ringMaterial) => ringMaterial.dispose())
      coreGeometry.dispose()
      coreMaterial.dispose()
      glowTexture.dispose()
      glowMaterial.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={mountRef} aria-hidden className="pointer-events-none h-full w-full" />
}
