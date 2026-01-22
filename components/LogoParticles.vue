<template>
  <div ref="containerRef" class="logo-particles-container"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { getRemoteImg } from '~/utils/common'

const containerRef = ref<HTMLDivElement | null>(null)

let targetProgress = 0
let currentProgress = 0
const gatherOffset = new THREE.Vector3(0, 0, 0)
let gatherScale = 1

const setGatherProgress = (progress: number) => {
  targetProgress = progress
}

const setGatherOffset = (x: number, y: number) => {
  gatherOffset.set(x, y, 0)
  if (particles && particles.material instanceof THREE.ShaderMaterial) {
    particles.material.uniforms.gatherOffset.value.copy(gatherOffset)
  }
}

const setGatherScale = (scale: number) => {
  gatherScale = scale
  if (particles && particles.material instanceof THREE.ShaderMaterial) {
    particles.material.uniforms.gatherScale.value = gatherScale
  }
}

defineExpose({
  setGatherProgress,
  setGatherOffset,
  setGatherScale
})

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let particles: THREE.Points | null = null
let animationId: number
let mouse = new THREE.Vector2(9999, 9999)
let targetMouse = new THREE.Vector2(9999, 9999)
let logoScale = 1
const { theme } = useTheme()
let tintMix = 0.0
let tintColor = new THREE.Color(0.05, 0.05, 0.05)

const imageSrc = getRemoteImg('/logo.webp')
const threshold = 30
const sampleStep = 2

const createParticlesFromImage = (image: HTMLImageElement) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = image.width
  canvas.height = image.height
  ctx.drawImage(image, 0, 0)

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data

  const positions: number[] = []
  const scatterPositions: number[] = []
  const colors: number[] = []
  const sizes: number[] = []

  const width = canvas.width
  const height = canvas.height
  const centerX = width / 2
  const centerY = height / 2

  const containerWidth = containerRef.value?.clientWidth || 1200
  const containerHeight = containerRef.value?.clientHeight || 800
  logoScale = Math.min(containerWidth / width, containerHeight / height) * 1.35

  const scatterScale = 1.8
  const scatterWidth = containerWidth * scatterScale
  const scatterHeight = containerHeight * scatterScale

  for (let y = 0; y < height; y += sampleStep) {
    for (let x = 0; x < width; x += sampleStep) {
      const idx = (y * width + x) * 4
      const r = imgData[idx]
      const g = imgData[idx + 1]
      const b = imgData[idx + 2]
      const a = imgData[idx + 3]

      if (a < 10) continue
      if (r + g + b < threshold * 3) continue

      const px = (x - centerX) * logoScale
      const py = (centerY - y) * logoScale

      positions.push(px, py, (Math.random() - 0.5) * 20)
      scatterPositions.push(
        (Math.random() - 0.5) * scatterWidth,
        (Math.random() - 0.5) * scatterHeight,
        (Math.random() - 0.5) * 200
      )

      colors.push(r / 255, g / 255, b / 255)
      sizes.push(3 + Math.random() * 3)
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(scatterPositions), 3))
  geometry.setAttribute('logoPosition', new THREE.BufferAttribute(new Float32Array(positions), 3))
  geometry.setAttribute('scatterPosition', new THREE.BufferAttribute(new Float32Array(scatterPositions), 3))
  geometry.setAttribute('particleColor', new THREE.BufferAttribute(new Float32Array(colors), 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(new Float32Array(sizes), 1))

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      progress: { value: 0 },
      mouse: { value: new THREE.Vector2(9999, 9999) },
      tintMix: { value: tintMix },
      tintColor: { value: tintColor },
      gatherOffset: { value: gatherOffset },
      gatherScale: { value: gatherScale }
    },
    vertexShader: `
      attribute float size;
      attribute vec3 particleColor;
      attribute vec3 logoPosition;
      attribute vec3 scatterPosition;
      varying vec3 vColor;
      varying float vTwinkle;
      uniform float time;
      uniform float progress;
      uniform vec2 mouse;
      uniform vec3 gatherOffset;
      uniform float gatherScale;

      void main() {
        vColor = particleColor;

        vec3 pos = mix(scatterPosition, logoPosition * gatherScale + gatherOffset, progress);

        // 轻微流动
        pos.xy += vec2(
          sin(time * 0.2 + pos.y * 0.01) * 2.0,
          cos(time * 0.2 + pos.x * 0.01) * 2.0
        ) * (1.0 - progress);
        pos.xy += vec2(
          sin(time * 0.15 + pos.y * 0.005) * 6.0,
          cos(time * 0.12 + pos.x * 0.005) * 6.0
        ) * (1.0 - progress);
        pos.z += sin(time * 0.1 + pos.x * 0.01 + pos.y * 0.01) * 8.0 * (1.0 - progress);

        // 鼠标排斥
        vec2 diff = pos.xy - mouse;
        float dist = length(diff);
        float force = smoothstep(200.0, 0.0, dist);
        pos.xy += normalize(diff) * force * 25.0 * (1.0 - progress);

        vTwinkle = 0.6 + 0.4 * sin(time * 0.6 + pos.x * 0.02 + pos.y * 0.02);
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        float sizeBoost = mix(1.1, 1.0, progress);
        gl_PointSize = size * (420.0 / -mvPosition.z) * sizeBoost;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vTwinkle;
      uniform float tintMix;
      uniform vec3 tintColor;
      uniform float progress;

      void main() {
        float dist = distance(gl_PointCoord, vec2(0.5));
        float alpha = 1.0 - smoothstep(0.0, 0.55, dist);
        alpha *= mix(1.0, vTwinkle, 1.0 - progress);
        vec3 tinted = mix(vColor, tintColor, tintMix);
        gl_FragColor = vec4(tinted, alpha);
      }
    `,
    transparent: true,
    depthTest: false,
    blending: THREE.AdditiveBlending
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)
}

const initScene = () => {
  if (!containerRef.value) return

  scene = new THREE.Scene()
  scene.background = null

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000)
  camera.position.z = 700

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  containerRef.value.appendChild(renderer.domElement)

  const image = new Image()
  image.crossOrigin = 'anonymous'
  image.src = imageSrc
  image.onload = () => createParticlesFromImage(image)
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  targetMouse.x += (mouse.x - targetMouse.x) * 0.15
  targetMouse.y += (mouse.y - targetMouse.y) * 0.15

  if (particles && particles.material instanceof THREE.ShaderMaterial) {
    particles.material.uniforms.time.value += 0.01
    particles.material.uniforms.mouse.value.set(targetMouse.x, targetMouse.y)

    if (Math.abs(targetProgress - currentProgress) > 0.01) {
      currentProgress += (targetProgress - currentProgress) * 0.08
      particles.material.uniforms.progress.value = currentProgress
    }
  }

  renderer.render(scene, camera)
}

const onMouseMove = (event: MouseEvent) => {
  if (!containerRef.value || !camera) return
  const rect = containerRef.value.getBoundingClientRect()
  const ndcX = ((event.clientX - rect.left) / rect.width) * 2 - 1
  const ndcY = -((event.clientY - rect.top) / rect.height) * 2 + 1
  const viewHeight = camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 2
  const viewWidth = viewHeight * camera.aspect
  mouse.x = ndcX * (viewWidth / 2)
  mouse.y = ndcY * (viewHeight / 2)
}

const onWindowResize = () => {
  if (!containerRef.value || !camera || !renderer) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

onMounted(() => {
  initScene()
  animate()
  window.addEventListener('resize', onWindowResize)
  if (renderer) {
    renderer.domElement.addEventListener('mousemove', onMouseMove)
  }

  watch(
    () => theme.value,
    (value) => {
      const isLight = value === 'light'
      tintMix = isLight ? 0.85 : 0.0
      if (particles && particles.material instanceof THREE.ShaderMaterial) {
        particles.material.uniforms.tintMix.value = tintMix
        particles.material.uniforms.tintColor.value = tintColor
      }
    },
    { immediate: true }
  )
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  window.removeEventListener('resize', onWindowResize)

  if (renderer) {
    renderer.domElement.removeEventListener('mousemove', onMouseMove)
    renderer.dispose()
  }
  if (particles) {
    particles.geometry.dispose()
    if (particles.material instanceof THREE.Material) {
      particles.material.dispose()
    }
  }
})
</script>

<style scoped>
.logo-particles-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: default;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
}
</style>
