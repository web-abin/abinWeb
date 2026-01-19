<script setup lang="ts">
import config from '~/config'

definePageMeta({
  layout: false
})

// SEO优化
const isDev = process.env.NODE_ENV === 'development'
const baseURL = isDev ? 'http://localhost:3000' : 'https://web-abin.github.io'
const siteURL = `${baseURL}${isDev ? '' : '/abinWeb'}`

useHead({
  title: config.title,
  htmlAttrs: {
    lang: 'zh-CN'
  },
  meta: [
    { name: 'description', content: config.SEO_description },
    { name: 'keywords', content: config.SEO_keywords },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: config.title },
    { property: 'og:description', content: config.SEO_description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: config.title },
    { property: 'og:locale', content: 'zh_CN' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: config.title },
    { name: 'twitter:description', content: config.SEO_description },
    { name: 'theme-color', content: '#1e80ff' },
    { name: 'format-detection', content: 'telephone=no' }
  ],
  link: [
    {
      rel: 'canonical',
      href: siteURL
    }
  ]
})

const isLoading = ref(true)
const showContent = ref(false)
const particleRef = ref<{ setGatherProgress: (progress: number) => void } | null>(null)

// 鼠标移入按钮 - 粒子聚集成风车
const onButtonEnter = () => {
  if (particleRef.value) {
    particleRef.value.setGatherProgress(1)
  }
}

// 鼠标移出按钮 - 粒子散落
const onButtonLeave = () => {
  if (particleRef.value) {
    particleRef.value.setGatherProgress(0)
  }
}

onMounted(() => {
  // 延迟显示内容，等待粒子效果加载
  setTimeout(() => {
    isLoading.value = false
    setTimeout(() => {
      showContent.value = true
    }, 500)
  }, 1500)
})
</script>

<template>
  <div class="home-page">
    <!-- 粒子背景 -->
    <LogoParticles ref="particleRef" />

    <!-- 加载状态 -->
    <Transition name="fade">
      <div class="load-box" v-if="isLoading">
        <div class="loader">
          <div class="loader-ring"></div>
          <div class="loader-ring"></div>
          <div class="loader-ring"></div>
        </div>
      </div>
    </Transition>

    <!-- 主要内容 -->
    <Transition name="slide-up">
      <div class="content" v-if="showContent">
        <div class="title-section">
          <h1 class="main-title">
            <span class="title-line">前端导航</span>
            <span class="title-line highlight">超好用</span>
          </h1>
          <p class="subtitle">面向前端开发工程师的资源分享平台</p>
        </div>

        <div class="action-section">
          <NuxtLink class="uiverse" to="/tools" @mouseenter="onButtonEnter" @mouseleave="onButtonLeave">
            <div class="wrapper">
              <span>开始探索</span>
              <div class="circle circle-12"></div>
              <div class="circle circle-11"></div>
              <div class="circle circle-10"></div>
              <div class="circle circle-9"></div>
              <div class="circle circle-8"></div>
              <div class="circle circle-7"></div>
              <div class="circle circle-6"></div>
              <div class="circle circle-5"></div>
              <div class="circle circle-4"></div>
              <div class="circle circle-3"></div>
              <div class="circle circle-2"></div>
              <div class="circle circle-1"></div>
            </div>
          </NuxtLink>
        </div>

        <!-- 功能标签 -->
        <div class="features">
          <NuxtLink to="/tools" class="feature-item">
            <span class="feature-icon">🛠️</span>
            <span class="feature-text">工具</span>
          </NuxtLink>
          <NuxtLink to="/notes" class="feature-item">
            <span class="feature-icon">📚</span>
            <span class="feature-text">文档</span>
          </NuxtLink>
          <NuxtLink to="/games" class="feature-item">
            <span class="feature-icon">🎮</span>
            <span class="feature-text">游戏</span>
          </NuxtLink>
          <NuxtLink to="/relax" class="feature-item">
            <span class="feature-icon">🎨</span>
            <span class="feature-text">摸鱼</span>
          </NuxtLink>
        </div>
      </div>
    </Transition>

    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

// 加载动画
.load-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(10, 10, 10, 0.95);
  z-index: 100;
  backdrop-filter: blur(10px);
}

.loader {
  position: relative;
  width: 80px;
  height: 80px;
}

.loader-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top-color: #1e80ff;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;

  &:nth-child(2) {
    width: 70%;
    height: 70%;
    top: 15%;
    left: 15%;
    border-top-color: #00d4ff;
    animation-duration: 1s;
    animation-direction: reverse;
  }

  &:nth-child(3) {
    width: 40%;
    height: 40%;
    top: 30%;
    left: 30%;
    border-top-color: #ffffff;
    animation-duration: 0.8s;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

// 内容区域
.content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  pointer-events: auto;
}

.title-section {
  margin-bottom: 3rem;
}

.main-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .title-line {
    display: block;
    background: linear-gradient(135deg, #ffffff 0%, #1e80ff 50%, #00d4ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradient-shift 3s ease infinite;
    background-size: 200% 200%;

    &.highlight {
      background: linear-gradient(135deg, #1e80ff 0%, #00d4ff 50%, #ffffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      background-size: 200% 200%;
    }
  }
}

@keyframes gradient-shift {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

.subtitle {
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
  letter-spacing: 0.1em;
}

.action-section {
  margin-bottom: 4rem;
}

.uiverse {
  --duration: 7s;
  --easing: linear;
  --c-color-1: rgba(30, 128, 255, 0.6);
  --c-color-2: #1e80ff;
  --c-color-3: #00d4ff;
  --c-color-4: rgba(0, 212, 255, 0.6);
  --c-shadow: rgba(30, 128, 255, 0.35);
  --c-shadow-inset-top: rgba(0, 212, 255, 0.45);
  --c-shadow-inset-bottom: rgba(15, 20, 40, 0.8);
  --c-radial-inner: #1e80ff;
  --c-radial-outer: #0f1a3a;
  --c-color: #fff;
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  position: relative;
  cursor: pointer;
  border: none;
  display: table;
  border-radius: 28px;
  padding: 0;
  margin: 0 auto;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 0.02em;
  line-height: 1.5;
  color: var(--c-color);
  text-decoration: none;
  background: radial-gradient(circle, var(--c-radial-inner), var(--c-radial-outer) 80%);
  box-shadow: 0 0 18px var(--c-shadow);
}

.uiverse::before {
  content: "";
  pointer-events: none;
  position: absolute;
  z-index: 3;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: 28px;
  box-shadow:
    inset 0 3px 12px var(--c-shadow-inset-top),
    inset 0 -3px 4px var(--c-shadow-inset-bottom);
}

.uiverse .wrapper {
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  mask-image: radial-gradient(white, black);
  overflow: hidden;
  position: relative;
  border-radius: 28px;
  min-width: 180px;
  padding: 16px 0;
}

.uiverse .wrapper span {
  display: inline-block;
  position: relative;
  z-index: 1;
}

.uiverse:hover {
  --duration: 1600ms;
}

.uiverse .wrapper .circle {
  position: absolute;
  left: 0;
  top: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  filter: blur(var(--blur, 8px));
  background: var(--background, transparent);
  transform: translate(var(--x, 0), var(--y, 0)) translateZ(0);
  animation: var(--animation, none) var(--duration) var(--easing) infinite;
}

.uiverse .wrapper .circle.circle-1,
.uiverse .wrapper .circle.circle-9,
.uiverse .wrapper .circle.circle-10 {
  --background: var(--c-color-4);
}

.uiverse .wrapper .circle.circle-3,
.uiverse .wrapper .circle.circle-4 {
  --background: var(--c-color-2);
  --blur: 14px;
}

.uiverse .wrapper .circle.circle-5,
.uiverse .wrapper .circle.circle-6 {
  --background: var(--c-color-3);
  --blur: 16px;
}

.uiverse .wrapper .circle.circle-2,
.uiverse .wrapper .circle.circle-7,
.uiverse .wrapper .circle.circle-8,
.uiverse .wrapper .circle.circle-11,
.uiverse .wrapper .circle.circle-12 {
  --background: var(--c-color-1);
  --blur: 12px;
}

.uiverse .wrapper .circle.circle-1 {
  --x: 0;
  --y: -40px;
  --animation: circle-1;
}

.uiverse .wrapper .circle.circle-2 {
  --x: 122px;
  --y: 8px;
  --animation: circle-2;
}

.uiverse .wrapper .circle.circle-3 {
  --x: -12px;
  --y: -12px;
  --animation: circle-3;
}

.uiverse .wrapper .circle.circle-4 {
  --x: 140px;
  --y: -12px;
  --animation: circle-4;
}

.uiverse .wrapper .circle.circle-5 {
  --x: 12px;
  --y: -4px;
  --animation: circle-5;
}

.uiverse .wrapper .circle.circle-6 {
  --x: 56px;
  --y: 16px;
  --animation: circle-6;
}

.uiverse .wrapper .circle.circle-7 {
  --x: 8px;
  --y: 28px;
  --animation: circle-7;
}

.uiverse .wrapper .circle.circle-8 {
  --x: 28px;
  --y: -4px;
  --animation: circle-8;
}

.uiverse .wrapper .circle.circle-9 {
  --x: 20px;
  --y: -12px;
  --animation: circle-9;
}

.uiverse .wrapper .circle.circle-10 {
  --x: 64px;
  --y: 16px;
  --animation: circle-10;
}

.uiverse .wrapper .circle.circle-11 {
  --x: 4px;
  --y: 4px;
  --animation: circle-11;
}

.uiverse .wrapper .circle.circle-12 {
  --blur: 14px;
  --x: 52px;
  --y: 4px;
  --animation: circle-12;
}

.features {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.6rem;
  min-width: auto;
  background: transparent;
  border: none;
  border-radius: 0;
  transition: all 0.2s ease;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
  }

  .feature-icon {
    font-size: 1.6rem;
  }

  .feature-text {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.75);
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
}

// 背景装饰
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: float 20s ease-in-out infinite;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #1e80ff 0%, transparent 70%);
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #00d4ff 0%, transparent 70%);
  bottom: -150px;
  right: -150px;
  animation-delay: 5s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #ffffff 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 10s;
}

@keyframes float {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  33% {
    transform: translate(30px, -30px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.8s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

// 响应式设计
@media (max-width: 768px) {
  .content {
    padding: 1rem;
  }

  .main-title {
    font-size: 2.5rem;
  }

  .uiverse {
    font-size: 16px;
  }

  .features {
    gap: 0.8rem;
  }

  .feature-item {
    padding: 0.35rem 0.5rem;

    .feature-icon {
      font-size: 1.4rem;
    }

    .feature-text {
      font-size: 0.75rem;
    }
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .enter-btn {
    padding: 0.9rem 1.5rem;
    font-size: 0.9rem;
  }

  .features {
    gap: 0.5rem;
  }
}
</style>
