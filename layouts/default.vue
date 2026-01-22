<template>
  <header class="header">
    <div class="topbar-left">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
      <span class="branch">main</span>
    </div>

    <nav class="nav-links">
      <NuxtLink class="navigation-link" to="/tools">工具</NuxtLink>
      <NuxtLink class="navigation-link" to="/notes">文档</NuxtLink>
      <NuxtLink class="navigation-link" to="/games">游戏</NuxtLink>
      <NuxtLink class="navigation-link" to="/relax">摸鱼</NuxtLink>
      <NuxtLink class="navigation-link" to="/demos">样例</NuxtLink>
      <NuxtLink class="navigation-link" to="/comment">留言</NuxtLink>
    </nav>

    <button id="theme-btn" class="theme-toggle" type="button" @click="onToggleTheme">
      <span v-if="theme === 'dark'">🌙</span>
      <span v-else>☀️</span>
      <span class="toggle-text">{{ theme === 'dark' ? 'Dark' : 'Light' }}</span>
    </button>
  </header>
  <main class="content">
    <div class="content-rail"></div>
    <slot />
  </main>

  <NuxtLink class="btn-home" to="/">
    <Home />
  </NuxtLink>

  <footer>
    <div class="site-links">
      <a
        href="https://github.com/web-abin/abinWeb"
        target="_blank"
        rel="nofollow external"
        >源码链接</a
      >、
      <a
        href="https://github.com/web-abin"
        target="_blank"
        rel="nofollow external"
        >GitHub主页</a
      >、
      <a href="https://juejin.cn/user/994399097982728" target="_blank"
        >掘金主页</a
      >、
      <a href="https://blog.csdn.net/qq_38974163?type=blog" target="_blank"
        >CSDN主页</a
      >、 <a href="http://web-abin.gitee.io/blog" target="_blank">个人博客</a>、
      <NuxtLink class="navigation-link" to="/links">友情链接</NuxtLink>
    </div>

    <div class="site-data">
      <span
        >建站第<span style="color: #1e80ff">{{ siteCreateDays }}</span
        >天</span
      >&nbsp;|&nbsp;
      <span id="busuanzi_container_site_pv"
        >浏览量<span id="busuanzi_value_site_pv" style="color: #1e80ff">{{
          siteData.site_pv
        }}</span></span
      >&nbsp;|&nbsp;
      <span id="busuanzi_container_site_uv"
        >访客数<span id="busuanzi_value_site_uv" style="color: #1e80ff">{{
          siteData.site_uv
        }}</span></span
      >
    </div>
  </footer>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import Home from '~/components/Home.vue'

const { theme, applyTheme } = useTheme()

let siteData = reactive({
  site_pv: 0,
  site_uv: 0
})
if (process.client && window.localStorage.getItem('ABIN_SITE_DATA')) {
  siteData = window.localStorage.getItem('ABIN_SITE_DATA')
}
const siteCreateDays = (function () {
  return Math.floor(
    (Date.now() - new Date('2023-05-28').getTime()) / (1000 * 60 * 60 * 24)
  )
})()

if (process.client) {
  var script = document.createElement('script')
  script.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
  document.body.appendChild(script)
}

const onToggleTheme = (event: MouseEvent) => {
  const nextTheme = theme.value === 'dark' ? 'light' : 'dark'
  if (typeof document === 'undefined' || !('startViewTransition' in document)) {
    applyTheme(nextTheme)
    return
  }

  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    applyTheme(nextTheme)
    return
  }

  const target = event.currentTarget as HTMLElement | null
  const rect = target?.getBoundingClientRect()
  const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
  const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2
  const maxRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

  const transition = document.startViewTransition(() => {
    applyTheme(nextTheme)
  })

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`
        ]
      },
      {
        duration: 480,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  })
}
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  height: $--header-height;
  padding: 0 $--padding-side;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  box-shadow: none;
  border-bottom: 1px solid $--color-border;
  background-color: $--color-header;

.topbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--app-muted);
  font-size: 12px;
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
  border: 1px solid $--color-border;
  color: var(--app-muted);
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.navigation-link {
    position: relative;
    display: flex;
    padding: 12px 18px;
    flex-direction: row;
    align-items: center;
    flex: 0 0 auto;
    transition: color 200ms ease;
    color: var(--app-muted);
    font-size: 16px;
    text-decoration: none;

    &:hover {
      color: var(--app-fg);
    }

    &:hover::before {
      content: '';
      position: absolute;
      top: auto;
      right: 0;
      bottom: 0;
      left: 1rem;
      height: 2px;
      background-color: var(--app-accent-2);
      width: calc(100% - 2rem);
    }
  }

  .router-link-active {
    color: $--color-menu-active;
    font-weight: bold;
  }
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid $--color-border;
  background: rgba(255, 255, 255, 0.05);
  color: var(--app-fg);
  cursor: pointer;
  font-size: 12px;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.theme-toggle:hover {
  border-color: var(--app-accent-2);
  color: var(--app-accent-2);
}

.toggle-text {
  letter-spacing: 0.1em;
}

.content {
  width: 100%;
  height: fit-content;
  padding-top: calc($--header-height + 20px);
  padding-bottom: 40px;
  padding-left: calc($--padding-side + 40px);
  padding-right: $--padding-side;
  background: $--color-body;
  position: relative;
}

.content-rail {
  position: absolute;
  left: calc($--padding-side + 16px);
  top: calc($--header-height + 30px);
  bottom: 30px;
  width: 2px;
  background: linear-gradient(180deg, transparent, var(--app-accent), transparent);
  opacity: 0.5;
}

.btn-home {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 999;
  width: 40px;
  height: 40px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
}

footer {
  position: relative;
  width: 100%;
  padding: 10px 0;
  background: transparent;
  border-top: 1px solid $--color-border;
  .site-links {
    display: flex;
    justify-content: center;
    a {
      line-height: 25px;
      font-size: 14px;
    }
  }
  .site-data {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  header {
    bottom: 0;
    top: unset !important;
    box-shadow: 0 -1px 2px 0 rgba(0, 0, 0, 0.05);
    flex-wrap: wrap;
  }

  .navigation-link-pc {
    display: none !important;
  }
  .btn-home {
    display: none;
  }

  .content {
    padding-top: 20px;
    padding-bottom: calc($--header-height + 20px);
    padding-left: $--padding-side;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  footer {
    display: none;
  }

  .content-rail {
    display: none;
  }
}
</style>
