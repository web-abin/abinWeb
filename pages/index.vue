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
          <NuxtLink 
            class="enter-btn" 
            to="/tools"
            @mouseenter="onButtonEnter"
            @mouseleave="onButtonLeave"
          >
            <span class="btn-text">开始探索</span>
            <span class="btn-icon">→</span>
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
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
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

.enter-btn {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #1e80ff 0%, #00d4ff 100%);
  border: 2px solid transparent;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(30, 128, 255, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(30, 128, 255, 0.5);
    
    &::before {
      left: 100%;
    }
    
    .btn-icon {
      transform: translateX(5px);
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  .btn-text {
    position: relative;
    z-index: 1;
  }
  
  .btn-icon {
    position: relative;
    z-index: 1;
    transition: transform 0.3s ease;
    font-size: 1.5rem;
  }
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
  padding: 0.75rem 1.1rem;
  min-width: 96px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  transition: all 0.25s ease;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  }
  
  .feature-icon {
    font-size: 1.6rem;
  }
  
  .feature-text {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 500;
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
  0%, 100% {
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
  
  .enter-btn {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
  
  .features {
    gap: 0.8rem;
  }
  
  .feature-item {
    padding: 0.65rem 0.9rem;
    
    .feature-icon {
      font-size: 1.4rem;
    }
    
    .feature-text {
      font-size: 0.78rem;
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
