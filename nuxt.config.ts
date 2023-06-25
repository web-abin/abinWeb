const isDev = process.env.NODE_ENV === "development";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true }, //开发工具
  app: {
    baseURL: isDev?'/':'/abinWeb/',
    buildAssetsDir: 'nuxt',
    head: {
        title: '前端助手',
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: 'My awesome app' }
        ],
        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/abinWeb/favicon.ico' }
        ],
        script: [
          { src: 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js' }
        ]
    },
  },
  vite: {
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: "@import '~/assets/styles/common.scss';@import '~/assets/styles/theme.scss';@import '~/assets/styles/layout.scss';"	
            }
        }
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
    },
  }
})
