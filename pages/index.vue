<script setup lang="ts">
  import config from '~/config'
  
  definePageMeta({
    layout: false,
  });
  
  // SEO优化 - 使用 useHead 和 useSeoMeta 直接设置，避免 useSeo 中的 ufo 模块问题
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
  const homeImg = '/images/home.jpg' // 直接使用 public 目录路径，避免导入时的 ufo 模块问题
  
  onMounted(() => {
    const bg = new Image()
    bg.src = homeImg
    bg.onload =() => {
      isLoading.value = false
    }
    bg.onerror =() => {
      isLoading.value = false
    }
    setTimeout(() => {
      isLoading.value = false
    }, 2000);
  })
  
  </script>
  
  <template>
    <div class="load-box" v-if="isLoading">
      <loading/>
    </div>
    
    <div class="page" v-else>
      <img :src="homeImg" class="bg" alt="">
      <img src="/images/logo-text.png" alt="前端助手" class="img-title">
      <NuxtLink class="enter" to="/tools">进入</NuxtLink>
    </div>
  </template>
  
  <style lang="scss" scoped>
  .load-box{
    background: #639;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .page{
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .bg{
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .img-title{
      height: 130px;
    }
    h1{
      font-size: 40px;
    }
    .enter{
      color: #fff;
      font-size: 20px;
      margin-top: 30px;
    }
  }
  
  
  .enter {
    --b: 3px;
     /* border thickness */
    --s: .45em;
   /* size of the corner */
    --color: #e2e2e2;
    font-weight: bold;
    padding: calc(.5em + var(--s)) calc(.9em + var(--s));
    color: var(--color);
    --_p: var(--s);
    background: conic-gradient(from 90deg at var(--b) var(--b),#0000 90deg,var(--color) 0)
      var(--_p) var(--_p)/calc(100% - var(--b) - 2*var(--_p)) calc(100% - var(--b) - 2*var(--_p));
    transition: .3s linear, color 0s, background-color 0s;
    outline: var(--b) solid #0000;
    outline-offset: .6em;
    font-size: 16px;
    border: 0;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }
  
  .enter:hover,
  .enter:focus-visible {
    --_p: 0px;
    outline-color: #ffffff;
    outline-offset: .05em;
  }
  
  .enter:active {
    background: #ffffff;
    color: #000000;
  }
  
  @media (max-width: 480px) {
    .page{
      .img-title{
        max-width: 80vw;
        height: 26vw;
      }
      .enter{
        font-size: 16px;
      }
    }
  }
  </style>