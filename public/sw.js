// Service Worker 版本
const CACHE_VERSION = 'v3'
const HTML_CACHE_NAME = `html-cache-${CACHE_VERSION}`
const LOG_PREFIX = '[Service Worker]'

// 开关：是否开启 SWR (Stale-While-Revalidate)
const ENABLE_SWR = true
console.log('===========================', LOG_PREFIX);

// 开关：是否启用 HTML 缓存策略（false 时完全走网络请求）
const ENABLE_HTML_CACHE = true

// 开关：Push 后是否预加载 HTML
const ENABLE_PRELOAD_AFTER_PUSH = true


const SCOPE_PATH = new URL(self.registration.scope).pathname
const HTML_PAGES = [
  SCOPE_PATH,
  `${SCOPE_PATH}index.html`
]

// 安装
self.addEventListener('install', (event) => {
  console.log(`${LOG_PREFIX} install`, CACHE_VERSION)
  self.skipWaiting()
})

// 激活
self.addEventListener('activate', (event) => {
  console.log(`${LOG_PREFIX} activate`)
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== HTML_CACHE_NAME && cacheName.startsWith('html-cache-')) {
            console.log(`${LOG_PREFIX} remove cache`, cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  return self.clients.claim()
})

// HTML 缓存策略
self.addEventListener('fetch', (event) => {
  if (!ENABLE_HTML_CACHE) return
  const url = new URL(event.request.url)
  const isSameOrigin = url.origin === self.location.origin
  const isHtmlRequest =
    event.request.method === 'GET' &&
    isSameOrigin &&
    ( event.request.mode === 'navigate' ||
      event.request.headers.get('accept')?.includes('text/html') ||
      url.pathname.endsWith('.html') ||
      HTML_PAGES.some((page) => url.pathname === page))
  if (!isHtmlRequest) return

  console.log(`${LOG_PREFIX} fetch html`, url.pathname)
  event.respondWith(
    (async () => {
      const cache = await caches.open(HTML_CACHE_NAME)
      const cachedResponse = await cache.match(event.request)

      if (cachedResponse) {
        console.log(`${LOG_PREFIX} cache hit`, url.pathname)
        if (ENABLE_SWR) {
          console.log(`${LOG_PREFIX} swr refresh`, url.pathname)
          fetch(event.request)
            .then((response) => {
              if (response && response.status === 200) {
                cache.put(event.request, response.clone())
                console.log(`${LOG_PREFIX} swr updated`, url.pathname)
              }
            })
            .catch(() => {})
        }
        return cachedResponse
      }

      console.log(`${LOG_PREFIX} cache miss`, url.pathname)
      try {
        const networkResponse = await fetch(event.request)
        if (networkResponse && networkResponse.status === 200) {
          cache.put(event.request, networkResponse.clone())
          console.log(`${LOG_PREFIX} cached`, url.pathname)
        }
        return networkResponse
      } catch (error) {
        console.warn(`${LOG_PREFIX} fetch failed`, url.pathname, error)
        return new Response('页面加载失败，请检查网络连接', {
          status: 503,
          headers: { 'Content-Type': 'text/plain' }
        })
      }
    })()
  )
})

// Push 通知 + HTML 缓存更新
self.addEventListener('push', (event) => {
  console.log(`${LOG_PREFIX} push received`)
  let notificationData = {
    title: '新消息',
    body: '你有一条新消息！',
    icon: new URL('logo.webp', self.registration.scope).href,
    badge: new URL('logo.webp', self.registration.scope).href,
    tag: 'push-notification',
    data: {
      url: self.registration.scope,
      timestamp: Date.now()
    }
  }

  let pushData = null
  if (event.data) {
    try {
      pushData = event.data.json()
      notificationData = { ...notificationData, ...pushData }
    } catch (e) {
      const text = event.data.text()
      notificationData.body = text || notificationData.body
    }
  }

  let cacheUpdatePromise = Promise.resolve()
  if (ENABLE_HTML_CACHE && pushData && pushData.data?.action === 'FORCE_UPDATE_HTML') {
    console.log(`${LOG_PREFIX} push action FORCE_UPDATE_HTML`)
    cacheUpdatePromise = handleForceUpdateHTML(pushData)
  }

  event.waitUntil(
    Promise.all([
      self.registration.showNotification(notificationData.title, {
        body: notificationData.body,
        icon: notificationData.icon,
        badge: notificationData.badge,
        tag: notificationData.tag
      }),
      cacheUpdatePromise
    ])
  )
})

async function handleForceUpdateHTML(pushData) {
  if (!ENABLE_HTML_CACHE) return null
  const targetUrl = pushData.url || `${SCOPE_PATH}index.html`
  console.log(`${LOG_PREFIX} force update html`, targetUrl)
  try {
    const cache = await caches.open(HTML_CACHE_NAME)
    await cache.delete(new Request(targetUrl))
    if (!ENABLE_PRELOAD_AFTER_PUSH) return null
    const response = await fetch(targetUrl)
    if (response && response.status === 200) {
      await cache.put(new Request(targetUrl), response.clone())
      console.log(`${LOG_PREFIX} force cached`, targetUrl)
    }
    return response
  } catch (error) {
    console.warn(`${LOG_PREFIX} force update failed`, error)
    return null
  }
}
