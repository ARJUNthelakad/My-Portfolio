/* Arjun T — portfolio behaviour. Plain JavaScript, no build step. */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------- Header: scroll state + progress bar ---------- */

const headerBar = document.querySelector('[data-header-bar]')
const progressBar = document.querySelector('[data-progress]')

function onScroll() {
  const scrolled = window.scrollY > 20
  headerBar?.classList.toggle('scrolled', scrolled)

  if (progressBar) {
    const max = document.documentElement.scrollHeight - window.innerHeight
    const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0
    progressBar.style.transform = `scaleX(${ratio})`
  }
}

window.addEventListener('scroll', onScroll, { passive: true })
window.addEventListener('resize', onScroll)
onScroll()

/* ---------- Mobile menu ---------- */

const menuToggle = document.querySelector('[data-menu-toggle]')
const mobileMenu = document.querySelector('[data-mobile-menu]')
const openIcon = document.querySelector('[data-icon-menu]')
const closeIcon = document.querySelector('[data-icon-close]')

function setMenu(open) {
  if (!menuToggle || !mobileMenu) return

  mobileMenu.hidden = !open
  menuToggle.setAttribute('aria-expanded', String(open))
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
  openIcon?.toggleAttribute('hidden', open)
  closeIcon?.toggleAttribute('hidden', !open)
}

menuToggle?.addEventListener('click', () => {
  setMenu(mobileMenu?.hidden ?? true)
})

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false))
})

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false)
})

/* ---------- Scroll reveals ---------- */

const revealItems = document.querySelectorAll('.reveal')

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('visible'))
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px -70px 0px', threshold: 0.05 },
  )

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 6, 5) * 40}ms`
    observer.observe(item)
  })
}

/* ---------- Project tilt + glare ---------- */

document.querySelectorAll('[data-tilt]').forEach((card) => {
  const glare = document.createElement('div')
  glare.className = 'glare'
  glare.setAttribute('aria-hidden', 'true')
  card.appendChild(glare)

  if (reduceMotion) return

  const reset = () => {
    card.style.transform = ''
  }

  card.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return

    const rect = card.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    card.style.transform = `perspective(1200px) rotateX(${((0.5 - py) * 7).toFixed(2)}deg) rotateY(${((px - 0.5) * 7).toFixed(2)}deg)`
    glare.style.setProperty('--gx', `${(px * 100).toFixed(2)}%`)
    glare.style.setProperty('--gy', `${(py * 100).toFixed(2)}%`)
  })

  card.addEventListener('pointerleave', reset)
  card.addEventListener('pointercancel', reset)
})

/* ---------- Copy email ---------- */

const copyButton = document.querySelector('[data-copy-email]')
const copyLabel = document.querySelector('[data-copy-label]')
const copyIcon = document.querySelector('[data-icon-copy]')
const checkIcon = document.querySelector('[data-icon-check]')
const EMAIL = 'thelakkadarjun86@gmail.com'

copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(EMAIL)
    copyLabel && (copyLabel.textContent = 'Copied')
    copyIcon?.setAttribute('hidden', '')
    checkIcon?.removeAttribute('hidden')

    window.setTimeout(() => {
      copyLabel && (copyLabel.textContent = 'Copy email')
      copyIcon?.removeAttribute('hidden')
      checkIcon?.setAttribute('hidden', '')
    }, 2000)
  } catch {
    window.location.href = `mailto:${EMAIL}`
  }
})

/* ---------- Footer year ---------- */

const year = document.querySelector('[data-year]')
if (year) year.textContent = String(new Date().getFullYear())

/* ---------- Hero 3D scene ---------- */

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

async function initScene() {
  const mount = document.querySelector('[data-scene]')
  if (!mount) return

  let THREE
  try {
    THREE = await import('https://unpkg.com/three@0.187.0/build/three.module.js')
  } catch (error) {
    console.warn('3D scene unavailable:', error)
    return
  }

  let renderer
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

  group.add(new THREE.Points(geometry, material))

  const rings = new THREE.Group()
  const ringGeometry = new THREE.TorusGeometry(2.72, 0.0055, 6, 220)
  const ringColors = ['#ff9a6b', '#7f9dff', '#f5f1ea']
  const ringMaterials = ringColors.map(
    (color, index) =>
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: [0.35, 0.3, 0.12][index] }),
  )

  ringMaterials.forEach((ringMaterial, index) => {
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.rotation.x = Math.PI / 2 + index * 0.55
    ring.rotation.y = index * 0.7
    ring.scale.setScalar(1 + index * 0.13)
    rings.add(ring)
  })
  group.add(rings)

  const coreGeometry = new THREE.IcosahedronGeometry(0.62, 1)
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: '#ffb38d',
    wireframe: true,
    transparent: true,
    opacity: 0.38,
  })
  const core = new THREE.Mesh(coreGeometry, coreMaterial)
  group.add(core)

  const glowCanvas = document.createElement('canvas')
  glowCanvas.width = 256
  glowCanvas.height = 256
  const glowContext = glowCanvas.getContext('2d')
  let glowTexture = null

  if (glowContext) {
    const gradient = glowContext.createRadialGradient(128, 128, 0, 128, 128, 128)
    gradient.addColorStop(0, 'rgba(255, 181, 138, 0.9)')
    gradient.addColorStop(0.3, 'rgba(255, 122, 69, 0.35)')
    gradient.addColorStop(1, 'rgba(255, 122, 69, 0)')
    glowContext.fillStyle = gradient
    glowContext.fillRect(0, 0, 256, 256)

    glowTexture = new THREE.CanvasTexture(glowCanvas)
    glowTexture.colorSpace = THREE.SRGBColorSpace

    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )
    glow.scale.setScalar(3.4)
    group.add(glow)
  }

  const pointer = new THREE.Vector2(0, 0)
  const pointerTarget = new THREE.Vector2(0, 0)

  const handlePointerMove = (event) => {
    pointerTarget.set((event.clientX / window.innerWidth) * 2 - 1, (event.clientY / window.innerHeight) * 2 - 1)
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

  if (typeof ResizeObserver === 'function') {
    new ResizeObserver(resize).observe(mount)
  } else {
    window.addEventListener('resize', resize)
  }

  window.addEventListener('pointermove', handlePointerMove, { passive: true })

  const start = performance.now()
  let frame = 0
  let spin = 0

  const render = () => {
    pointer.lerp(pointerTarget, 0.045)
    uniforms.uPointer.value.copy(pointer)
    uniforms.uTime.value = (performance.now() - start) / 1000

    spin += reduceMotion ? 0 : 0.0014
    group.rotation.y = spin + pointer.x * 0.35
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -pointer.y * 0.22, 0.05)

    rings.rotation.z = spin * 0.6
    rings.rotation.x = pointer.y * 0.12
    core.rotation.y -= reduceMotion ? 0 : 0.004
    core.rotation.x += reduceMotion ? 0 : 0.002

    renderer.render(scene, camera)
    if (!reduceMotion) frame = requestAnimationFrame(render)
  }

  render()

  if (!reduceMotion) {
    document.addEventListener('visibilitychange', () => {
      cancelAnimationFrame(frame)
      if (!document.hidden) frame = requestAnimationFrame(render)
    })
  }
}

initScene()
