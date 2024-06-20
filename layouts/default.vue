<template>
  <header class="header">
    <NuxtLink class="navigation-link" to="/tools">工具</NuxtLink>
    <NuxtLink class="navigation-link" to="/notes">文档</NuxtLink>
    <NuxtLink class="navigation-link" to="/games">游戏</NuxtLink>
    <NuxtLink class="navigation-link" to="/relax">摸鱼</NuxtLink>
    <NuxtLink class="navigation-link" to="/demos">样例</NuxtLink>
    <NuxtLink class="navigation-link" to="/comment">评论</NuxtLink>

    <!-- <NuxtLink class="navigation-link" to="/link2">友链</NuxtLink> -->
  </header>
  <main class="content">
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

<script setup>
import { reactive, ref } from 'vue'
import Home from '~/components/Home.vue'

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
  justify-content: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background-color: $--color-header;

  .navigation-link {
    position: relative;
    display: flex;
    padding: 12px 18px;
    flex-direction: row;
    align-items: center;
    flex: 0 0 auto;
    transition: color 200ms ease;
    color: #546681;
    font-size: 16px;
    text-decoration: none;

    &:hover {
      color: #333333;
    }

    &:hover::before {
      content: '';
      position: absolute;
      top: auto;
      right: 0;
      bottom: 0;
      left: 1rem;
      height: 2px;
      background-color: #1e80ff;
      width: calc(100% - 2rem);
    }
  }

  .router-link-active {
    color: $--color-menu-active;
    font-weight: bold;
  }
}

.content {
  width: 100%;
  height: fit-content;
  padding-top: calc($--header-height + 20px);
  padding-bottom: 40px;
  padding-left: $--padding-side;
  padding-right: $--padding-side;
  background: $--color-body;
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
  background: #fff;
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

    &::-webkit-scrollbar {
      display: none;
    }
  }

  footer {
    display: none;
  }
}
</style>
