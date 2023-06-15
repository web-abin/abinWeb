const isDev = process.env.NODE_ENV === "development";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    baseURL: isDev?'/':'/abinWeb/',
    head: {
        script: [
            { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' },
            { src: 'https//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js' }
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
  },
})
