import { createClient } from '@supabase/supabase-js'

const SUBSCRIBE_FLAG = 'sw-push-subscribed'

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default defineNuxtPlugin(() => {
  if (!('serviceWorker' in navigator)) return
  const { public: publicConfig } = useRuntimeConfig()
  const supabaseUrl = publicConfig.supabaseUrl
  const supabaseAnonKey = publicConfig.supabaseAnonKey
  const vapidPublicKey = publicConfig.vapidPublicKey

  const canSubscribe = Boolean(supabaseUrl && supabaseAnonKey && vapidPublicKey)
  const supabase = canSubscribe
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

  const registerServiceWorker = async () => {
    const rawBaseUrl = import.meta.env.DEV
      ? '/'
      : import.meta.env.VITE_APP_WEB_BASEURL || '/'
    const baseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl : `${rawBaseUrl}/`

    try {
      console.log('[SW] register', { baseUrl, url: `${baseUrl}sw.js` })
      const registration = await navigator.serviceWorker.register(`${baseUrl}sw.js`, {
        scope: baseUrl
      })
      console.log('[SW] registered', registration.scope)
    } catch (error) {
      console.warn('[SW] 注册失败', error)
    }
  }

  const saveSubscription = async (subscription: PushSubscription) => {
    if (!supabase) return
    const { endpoint } = subscription.toJSON()
    if (!endpoint) return
    const { error } = await supabase
      .from('sw-token')
      .upsert({ endpoint }, { onConflict: 'endpoint' })
    if (error) {
      console.warn('[SW] 订阅保存失败', error.message)
    }
  }

  const subscribePush = async () => {
    if (!canSubscribe) return
    if (Notification.permission === 'denied') return

    const permission =
      Notification.permission === 'granted'
        ? 'granted'
        : await Notification.requestPermission()

    if (permission !== 'granted') return

    const registration = await navigator.serviceWorker.ready
    const existing = await registration.pushManager.getSubscription()
    const subscription =
      existing ||
      (await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      }))

    await saveSubscription(subscription)
    localStorage.setItem(SUBSCRIBE_FLAG, '1')
  }

  window.addEventListener('load', () => {
    registerServiceWorker()
  })

  document.addEventListener(
    'click',
    async () => {
      if (localStorage.getItem(SUBSCRIBE_FLAG)) return
      await registerServiceWorker()
      await subscribePush()
    },
    { once: true }
  )
})
