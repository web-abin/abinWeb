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

  // 默认值
  const title = options.title || siteConfig.SEO_title || '前端助手'
  const description = options.description || siteConfig.SEO_description || ''
  const keywords = options.keywords || siteConfig.SEO_keywords || ''
  const image = options.image || `${siteURL}/images/logo-text.png`
  const url = options.url || currentUrl.value
  const type = options.type || 'website'
  const author = options.author || siteConfig.author || '前端阿彬'

  // 设置页面标题
  useHead({
    title,
    htmlAttrs: {
      lang: 'zh-CN'
    }
  })

  // 设置SEO Meta标签
  useSeoMeta({
    // 基础SEO
    title,
    description,
    keywords,
    author,
    robots: 'index, follow',
    
    // Open Graph (Facebook, LinkedIn等)
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:url': url,
    'og:type': type,
    'og:site_name': siteConfig.title || '前端助手',
    'og:locale': 'zh_CN',
    
    // Twitter Card
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
    
    // 其他
    'theme-color': '#1e80ff',
    'format-detection': 'telephone=no',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  })

  // 设置Canonical URL
  useHead({
    link: [
      {
        rel: 'canonical',
        href: url
      }
    ]
  })

  // 添加结构化数据 (JSON-LD)
  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'article' ? 'Article' : 'WebSite',
          name: title,
          description: description,
          url: url,
          image: image,
          author: {
            '@type': 'Person',
            name: author
          },
          publisher: {
            '@type': 'Organization',
            name: siteConfig.title || '前端助手',
            logo: {
              '@type': 'ImageObject',
              url: image
            }
          },
          ...(type === 'article' ? {
            datePublished: new Date().toISOString(),
            dateModified: new Date().toISOString()
          } : {
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteURL}/search?q={search_term_string}`
              },
              'query-input': 'required name=search_term_string'
            }
          })
        })
      }
    ]
  })
}
