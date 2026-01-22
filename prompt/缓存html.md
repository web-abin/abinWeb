@sw.js 按照 service-workers 这个目录里的service-workers 缓存html的方案，给我在github-abinweb网站实现下，至于订阅通知，可以在用户点击任意位置时就开启订阅push通知。  至于服务端接口，你用 supabase 实现吧，这是@.env (1-4) 需要的key。

这是参考代码：import { createClient } from '@supabase/supabase-js'

// 你的项目 URL 和 匿名 Key (在项目设置的 API 选项里找)
const supabase = createClient('https://your-project.id.supabase.co', 'your-anon-key')

async function saveSubscription(sub) {
  // sub 是你通过 pushManager.subscribe 拿到的对象
  const { endpoint, keys } = sub.toJSON();

  const { data, error } = await supabase
    .from('push_subscriptions') // 对应刚才建的表名
    .insert([
      { 
        endpoint: endpoint, 
        p256dh: keys.p256dh, 
        auth: keys.auth 
      }
    ])

  if (error) console.error('存储失败:', error)
  else console.log('存储成功:', data)
}

目前数据库表名：sw-token
字段有：
- id:int8
- create_at:timestamp
- endpoint:text
