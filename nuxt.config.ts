import config from './config'

const isDev = process.env.NODE_ENV === 'development'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true }, //开发工具
  app: {
    baseURL: isDev ? '/' : '/abinWeb/',
    buildAssetsDir: 'static', //修改站点资产的文件夹名称，默认是_nuxt
    head: {
      title: config.title,
      titleTemplate: '%s',
      htmlAttrs: {
        lang: 'zh-CN'
      },
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
          name: 'robots',
          content:
            'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'bingbot', content: 'index, follow' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#1e80ff' },
        {
          name: 'bytedance-verification-code',
          content: 'Z39UIZv8+Uw0Uu1UX7Ap'
        },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: config.title },
        { property: 'og:locale', content: 'zh_CN' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:creator', content: '@' + config.author }
      ],

      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: isDev ? '/favicon.ico' : '/abinWeb/favicon.ico'
        },
        {
          rel: 'apple-touch-icon',
          href: isDev ? '/favicon.ico' : '/abinWeb/favicon.ico'
        }
      ],
      script: [
        {
          defer: true,
          src: isDev ? '/js/busuanzi.js' : '/abinWeb/js/busuanzi.js'
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
          // 使用 @import 在 additionalData 中全局注入变量（功能正常，虽然会警告）
          // 对于全局注入场景，@import 是合适的，因为变量需要在所有文件中可用
          // 同时注入 math 模块供 relax/index.vue 使用
          additionalData:
            "@use 'sass:math';@import '~/assets/styles/theme.scss';@import '~/assets/styles/layout.scss';",
          silenceDeprecations: ['legacy-js-api', 'import'] // 静默弃用警告
        }
      }
    }
  },
  css: ['@/assets/styles/common.scss'],
  postcss: {
    plugins: {
      tailwindcss: {}
    }
  }
})
