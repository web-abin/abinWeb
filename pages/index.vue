<script setup lang="ts">
import config from '~/config'

definePageMeta({
  layout: false
})

// SEO优化
const isDev = process.env.NODE_ENV === 'development'
const siteURL = isDev ? '' : import.meta.env.VITE_APP_WEB_BASEURL

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
    { property: 'og:image', content: `${siteURL}/images/logo-text.png` },
    { property: 'og:url', content: siteURL },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: config.title },
    { property: 'og:locale', content: 'zh_CN' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: config.title },
    { name: 'twitter:description', content: config.SEO_description },
    { name: 'twitter:image', content: `${siteURL}/images/logo-text.png` },
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
const particleRef = ref<{
  setGatherProgress: (progress: number) => void
  setGatherOffset: (x: number, y: number) => void
  setGatherScale: (scale: number) => void
} | null>(null)
const cardRef = ref<HTMLDivElement | null>(null)
const { theme, toggleTheme } = useTheme()
const searchValue = ref('')
const router = useRouter()

const runSearch = async () => {
  const keyword = searchValue.value.trim()
  if (!keyword) return
  await router.push({
    path: '/tools',
    query: { q: keyword }
  })
}

// 鼠标移入按钮 - 粒子聚集成风车
const onButtonEnter = () => {
  if (!particleRef.value) return
  particleRef.value.setGatherProgress(1)
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  const offsetX = rect.width  - 240
  const offsetY = -rect.height  + 240
  particleRef.value.setGatherOffset(offsetX, offsetY)
  particleRef.value.setGatherScale(0.5)
}

// 鼠标移出按钮 - 粒子散落
const onButtonLeave = () => {
  if (!particleRef.value) return
  particleRef.value.setGatherProgress(0)
  particleRef.value.setGatherOffset(0, 0)
  particleRef.value.setGatherScale(1)
}

onMounted(() => {
  // 延迟显示内容，等待粒子效果加载
  setTimeout(() => {
    isLoading.value = false
    showContent.value = true
  }, 100)
})
</script>

<template>
  <div class="home-page">

    <div class="topbar">
      <div class="topbar-left">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
        <span class="branch">main</span>
      </div>
      <button class="theme-toggle" type="button" @click="toggleTheme">
        <span v-if="theme === 'dark'">🌙</span>
        <span v-else>☀️</span>
        <span class="toggle-text">{{ theme === 'dark' ? 'Dark' : 'Light' }}</span>
      </button>
    </div>

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
        <div class="ide-shell" ref="cardRef">
          <div class="card-particles">
            <LogoParticles ref="particleRef" />
          </div>
          <div class="ide-main">
            <div class="title-section git-section">
              <h1 class="main-title">
                前端助手
                <span class="title-accent">Frontend Companion</span>
              </h1>
              <p class="subtitle">面向前端开发工程师的资源分享平台</p>
            </div>

            <div class="search-section git-section">
              <div class="terminal-search">
                <span class="terminal-path">~/abinweb</span>
                <span class="terminal-symbol">$</span>
                <input type="text" placeholder="Search / grep..." aria-label="Search" v-model="searchValue"
                  @keydown.enter.prevent="runSearch" />
              </div>
              <p class="hint">高效聚合 · 按需检索 · 即开即用</p>
            </div>

            <div class="action-section git-section">
              <NuxtLink class="primary-btn" to="/tools" @mouseenter="onButtonEnter" @mouseleave="onButtonLeave">
                开始探索 →
              </NuxtLink>
            </div>

            <div class="features git-section">
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
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: var(--app-bg);
  color: var(--app-fg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.topbar {
  position: absolute;
  top: 24px;
  right: 24px;
  left: 24px;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: auto;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--app-muted);
  font-size: 0.8rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot-red {
  background: #ff6b6b;
}

.dot-yellow {
  background: #facc15;
}

.dot-green {
  background: #22c55e;
}

.branch {
  margin-left: 6px;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid var(--app-border);
  color: var(--app-muted);
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--app-border);
  background: rgba(255, 255, 255, 0.05);
  color: var(--app-fg);
  cursor: pointer;
  font-size: 0.85rem;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.theme-toggle:hover {
  border-color: var(--app-accent-2);
  color: var(--app-accent-2);
}

.toggle-text {
  letter-spacing: 0.08em;
}

// 加载动画
.load-box {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(10, 12, 20, 0.92);
  z-index: 100;
  backdrop-filter: blur(8px);
}

.loader {
  position: relative;
  width: 72px;
  height: 72px;
}

.loader-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  border-top-color: var(--app-accent);
  border-radius: 50%;
  animation: spin 1.4s linear infinite;

  &:nth-child(2) {
    width: 70%;
    height: 70%;
    top: 15%;
    left: 15%;
    border-top-color: var(--app-accent-2);
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

:global(html[data-theme='light'] .home-page .load-box) {
  background: rgba(248, 250, 252, 0.95);
}

:global(html[data-theme='light'] .home-page .loader-ring) {
  border-top-color: #2563eb;
}

:global(html[data-theme='light'] .home-page .loader-ring:nth-child(2)) {
  border-top-color: #0ea5e9;
}

:global(html[data-theme='light'] .home-page .loader-ring:nth-child(3)) {
  border-top-color: #0f172a;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.content {
  position: relative;
  z-index: 10;
  padding: 2rem;
  width: 100%;
  max-width: 1100px;
  pointer-events: auto;
}

.ide-shell {
  background: rgba(10, 12, 20, 0.35);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: var(--app-shadow);
  border: 1px solid var(--app-border);
  position: relative;
  overflow: hidden;
}

:global(html[data-theme='light'] .home-page .ide-shell) {
  background: rgba(255, 255, 255, 0.88);
  border-color: rgba(59, 130, 246, 0.12);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
}

.ide-main {
  position: relative;
  padding-left: 56px;
  z-index: 2;
}

.card-particles {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.ide-main::before {
  content: '';
  position: absolute;
  left: 16px;
  top: 12px;
  bottom: 12px;
  width: 2px;
  background: linear-gradient(180deg, transparent, var(--app-accent), transparent);
  opacity: 0.6;
}

.git-section {
  position: relative;
  padding: 18px 0;
}

.git-section::before {
  content: '';
  position: absolute;
  left: -48px;
  top: 32px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--app-accent-2);
  box-shadow: 0 0 10px rgba(34, 211, 238, 0.6);
}

.git-section::after {
  content: '';
  position: absolute;
  left: -38px;
  top: 36px;
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, var(--app-accent-2), transparent);
  opacity: 0.8;
}

.main-title {
  font-size: clamp(2.6rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.title-accent {
  font-size: 1rem;
  color: var(--app-accent-2);
  letter-spacing: 0.4em;
  text-transform: uppercase;
}

.subtitle {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: var(--app-muted);
  letter-spacing: 0.1em;
}

.terminal-search {
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  padding: 14px 16px;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid var(--app-border);
  color: var(--app-accent-3);
}

.terminal-path {
  color: var(--app-accent-2);
}

.terminal-symbol {
  color: var(--app-accent);
}

.terminal-search input {
  flex: 0 0 240px;
  width: 440px;
  background: transparent;
  border: none;
  color: var(--app-fg);
  font-size: 0.95rem;
  outline: none;
}

.terminal-search input::placeholder {
  color: var(--app-muted);
}

:global(html[data-theme='light'] .home-page .terminal-search) {
  background: rgba(248, 250, 252, 0.95);
  border-color: rgba(59, 130, 246, 0.2);
  color: #1e3a8a;
}

:global(html[data-theme='light'] .home-page .terminal-search input) {
  color: #0f172a;
}

:global(html[data-theme='light'] .home-page .terminal-search input::placeholder) {
  color: rgba(100, 116, 139, 0.7);
}

:global(html[data-theme='light'] .home-page .logo-particles-container canvas) {
  mix-blend-mode: normal;
  opacity: 1;
  filter: drop-shadow(0 0 16px rgba(0, 0, 0, 0.25));
}

.hint {
  margin-top: 0.6rem;
  color: var(--app-muted);
  font-size: 0.85rem;
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 10px;
  background: linear-gradient(120deg, var(--app-accent), var(--app-accent-2));
  color: #0b1018;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px rgba(34, 211, 238, 0.35);
}

.features {
  display: flex;
  gap: 1.6rem;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 6px 0;
  text-decoration: none;
  color: var(--app-fg);
  border-bottom: 1px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: var(--app-accent-2);
    border-color: var(--app-accent-2);
  }

  .feature-icon {
    font-size: 1.4rem;
  }

  .feature-text {
    font-size: 0.9rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
}

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

@media (max-width: 900px) {
  .ide-shell {
    padding: 2rem 1.5rem;
  }

  .ide-main {
    padding-left: 46px;
  }
}

@media (max-width: 600px) {
  .topbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .features {
    gap: 1rem;
  }
}
</style>
