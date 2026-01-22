<template>
  <div ref="containerRef" class="particle-container"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, onUnmounted, ref } from 'vue'

const containerRef = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let particles: THREE.Points
let particleSystem: THREE.BufferGeometry
let mouse = { x: 0, y: 0 }
let targetMouse = { x: 0, y: 0 }
let animationId: number

// 粒子配置
const particleCount = 2000
const particleSize = 2
const particleSpeed = 0.5
const attractionRadius = 100

// 初始化 Three.js 场景
const initScene = () => {
  if (!containerRef.value) return

  // 创建场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a0a0a)

  // 创建相机
  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 500

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  containerRef.value.appendChild(renderer.domElement)

  // 创建粒子系统
  createParticles()

  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  // 添加点光源
  const pointLight = new THREE.PointLight(0x1e80ff, 1, 1000)
  pointLight.position.set(0, 0, 500)
  scene.add(pointLight)
}

// 创建粒子
const createParticles = () => {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const sizes = new Float32Array(particleCount)

  const color1 = new THREE.Color(0x1e80ff) // 主色调
  const color2 = new THREE.Color(0x00d4ff) // 亮蓝色
  const color3 = new THREE.Color(0xffffff) // 白色

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3

    // 随机位置（在球体内）
    const radius = Math.random() * 400
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = radius * Math.cos(phi)

    // 随机颜色
    const colorChoice = Math.random()
    let color: THREE.Color
    if (colorChoice < 0.5) {
      color = color1.clone()
    } else if (colorChoice < 0.8) {
      color = color2.clone()
    } else {
      color = color3.clone()
    }

    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b

    // 随机大小
    sizes[i] = Math.random() * particleSize + 1
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  // 创建材质
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      mouse: { value: new THREE.Vector2(0, 0) }
    },
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      uniform float time;
      uniform vec2 mouse;
      
      void main() {
        vColor = color;
        vec3 pos = position;
        
        // 鼠标吸引效果
        vec2 mousePos = (mouse - vec2(pos.x, pos.y)) * 0.001;
        float dist = length(mousePos);
        float attraction = 1.0 / (1.0 + dist * 10.0);
        pos.xy += mousePos * attraction * 50.0;
        
        // 波动效果
        pos.z += sin(time * 0.5 + pos.x * 0.01) * 10.0;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      
      void main() {
        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
        float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    vertexColors: true,
    blending: THREE.AdditiveBlending
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)
  particleSystem = geometry
}

// 鼠标移动事件
const onMouseMove = (event: MouseEvent) => {
  if (!containerRef.value) return

  const rect = containerRef.value.getBoundingClientRect()
  targetMouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  targetMouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  // 转换为场景坐标
  targetMouse.x *= 500
  targetMouse.y *= 500
}

// 鼠标点击事件 - 创建爆炸效果
const onMouseClick = (event: MouseEvent) => {
  if (!containerRef.value || !particleSystem) return

  const rect = containerRef.value.getBoundingClientRect()
  const clickX = ((event.clientX - rect.left) / rect.width) * 2 - 1
  const clickY = -((event.clientY - rect.top) / rect.height) * 2 + 1

  const positions = particleSystem.attributes.position.array as Float32Array

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    const x = positions[i3]
    const y = positions[i3 + 1]
    const z = positions[i3 + 2]

    const dx = clickX * 500 - x
    const dy = clickY * 500 - y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < attractionRadius) {
      const force = (attractionRadius - distance) / attractionRadius
      positions[i3] += dx * force * 0.1
      positions[i3 + 1] += dy * force * 0.1
      positions[i3 + 2] += (Math.random() - 0.5) * force * 50
    }
  }

  particleSystem.attributes.position.needsUpdate = true
}

// 动画循环
const animate = () => {
  animationId = requestAnimationFrame(animate)

  // 平滑鼠标移动
  mouse.x += (targetMouse.x - mouse.x) * 0.05
  mouse.y += (targetMouse.y - mouse.y) * 0.05

  // 更新材质时间
  if (particles && particles.material instanceof THREE.ShaderMaterial) {
    particles.material.uniforms.time.value += 0.01
    particles.material.uniforms.mouse.value.set(mouse.x, mouse.y)
  }

  // 旋转粒子系统
  if (particles) {
    particles.rotation.y += 0.001
    particles.rotation.x += 0.0005
  }

  // 更新相机位置（轻微跟随鼠标）
  if (camera) {
    camera.position.x += (mouse.x * 0.1 - camera.position.x) * 0.05
    camera.position.y += (mouse.y * 0.1 - camera.position.y) * 0.05
    camera.lookAt(scene.position)
  }

  renderer.render(scene, camera)
}

// 窗口大小调整
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

  if (containerRef.value) {
    containerRef.value.addEventListener('mousemove', onMouseMove)
    containerRef.value.addEventListener('click', onMouseClick)
  }
  window.addEventListener('resize', onWindowResize)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  if (containerRef.value) {
    containerRef.value.removeEventListener('mousemove', onMouseMove)
    containerRef.value.removeEventListener('click', onMouseClick)
  }
  window.removeEventListener('resize', onWindowResize)

  if (renderer) {
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
.particle-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: crosshair;
  overflow: hidden;
}
</style>
