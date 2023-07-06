import config from './config'

const isDev = process.env.NODE_ENV === 'development'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true }, //开发工具
  app: {
    baseURL: isDev ? '/' : '/abinWeb/',
    buildAssetsDir: 'static', //修改站点资产的文件夹名称，默认是_nuxt
    head: {
      title: '前端助手',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        },
        { name: 'description', content: config.SEO_description },
        { name: 'keywords', content: config.SEO_keywords },
        { name: 'author', content: config.author },
        {
          name: 'bytedance-verification-code',
          content: 'Z39UIZv8+Uw0Uu1UX7Ap'
        }
      ],

      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/abinWeb/favicon.ico' }
      ],
      script: [
        {
          src: 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
        }
      ]
    }
  },
  experimental: {
    payloadExtraction: false //提取使用nuxt generate生成的页面的有效负载
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            "@import '~/assets/styles/common.scss';@import '~/assets/styles/theme.scss';@import '~/assets/styles/layout.scss';"
        }
      }
    }
  },
  css: ['@/assets/styles/global.scss'],
  postcss: {
    plugins: {
      tailwindcss: {}
    }
  }
})
