import siteConfig from '~/config'

export interface SeoOptions {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  author?: string
}

export const useSeo = (options: SeoOptions = {}) => {
  const route = useRoute()
  const isDev = process.env.NODE_ENV === 'development'
  const baseURL = isDev ? 'http://localhost:3000' : 'https://web-abin.github.io'
  const siteURL = `${baseURL}${isDev ? '' : '/abinWeb'}`
  
  // 获取当前页面的完整URL
  const currentUrl = computed(() => {
    const path = route.path === '/' ? '' : route.path
    return `${siteURL}${path}`
  })

  const normalizeUrl = (value: string) => {
    if (!value) return value
    if (value.startsWith('http://') || value.startsWith('https://')) return value
    if (value.startsWith('/')) return `${siteURL}${value}`
    return `${siteURL}/${value}`
  }

  // 默认值（响应式）
  const title = computed(() => options.title || siteConfig.SEO_title || siteConfig.title || '前端助手')
  const description = computed(() => options.description || siteConfig.SEO_description || '')
  const keywords = computed(() => options.keywords || siteConfig.SEO_keywords || '')
  const image = computed(() => normalizeUrl(options.image || '/images/logo-text.png'))
  const url = computed(() => options.url || currentUrl.value)
  const type = computed(() => options.type || 'website')
  const author = computed(() => options.author || siteConfig.author || '前端阿彬')

  useHead({
    title,
    htmlAttrs: {
      lang: 'zh-CN'
    },
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: author },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'theme-color', content: '#1e80ff' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: siteConfig.title || '前端助手' },
      { property: 'og:locale', content: 'zh_CN' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
    ],
    link: [
      { rel: 'canonical', href: url },
      { rel: 'sitemap', type: 'application/xml', href: `${siteURL}/sitemap.xml` }
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: siteConfig.title || '前端助手',
          url: siteURL,
          logo: image.value
        })
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type.value === 'article' ? 'Article' : 'WebPage',
          name: title.value,
          description: description.value,
          url: url.value,
          inLanguage: 'zh-CN',
          isPartOf: {
            '@type': 'WebSite',
            name: siteConfig.title || '前端助手',
            url: siteURL
          },
          author: {
            '@type': 'Person',
            name: author.value
          }
        })
      }
    ]
  })
}
