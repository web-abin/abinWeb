const https = require('https')
const http = require('http')
const { URL } = require('url')
const fs = require('fs')
const path = require('path')

// 要抓取的网站列表
const sites = [
  'https://ahrefs.com/backlink-checker/?input=https%3A%2F%2Fwww.clipzap.ai%2F&mode=subdomains',
  'https://moz.com/link-explorer',
  'https://collectui.com/challenges/sign-up',
  'https://cloudconvert.com/mov-to-gif',
  'https://ezgif.com/video-to-gif',
  'https://app.neilpatel.com/en/traffic_analyzer/overview?domain=https%3A%2F%2Fcrushon.ai&lang=en&locId=2702&mode=domain',
  'https://skywork.ai/project/1980553300111826944?from=recent_project',
  'https://ai-bot.cn/ai-ui-generation-tools/',
  'https://www.iloveimg.com/zh-cn',
  'https://audiomass.co/',
  'https://devtool.tech/'
]

function loadSitesFromFile() {
  const filePath = path.join(__dirname, '..', 'data', '新工具.txt')
  if (!fs.existsSync(filePath)) return []
  const content = fs.readFileSync(filePath, 'utf-8')
  return content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'))
}

// 提取域名
function getDomain(url) {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch (e) {
    return url
  }
}

// 获取基础URL
function getBaseUrl(url) {
  try {
    const urlObj = new URL(url)
    return `${urlObj.protocol}//${urlObj.hostname}`
  } catch (e) {
    return url
  }
}

// 尝试获取favicon的多个可能路径
function getFaviconPaths(baseUrl) {
  const paths = [
    '/favicon.ico',
    '/favicon.png',
    '/favicon.svg',
    '/apple-touch-icon.png',
    '/apple-touch-icon-precomposed.png',
    '/icon.png',
    '/logo.png',
    '/logo.svg',
    '/images/favicon.ico',
    '/static/favicon.ico',
    '/assets/favicon.ico'
  ]
  return paths.map(path => `${baseUrl}${path}`)
}

// 检查URL是否可访问
function checkUrl(url) {
  return new Promise((resolve) => {
    try {
      const urlObj = new URL(url)
      const client = urlObj.protocol === 'https:' ? https : http
      
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: 'HEAD',
        timeout: 5000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; FaviconChecker/1.0)'
        }
      }

      const req = client.request(options, (res) => {
        resolve({
          url,
          status: res.statusCode,
          contentType: res.headers['content-type'],
          alive: res.statusCode >= 200 && res.statusCode < 400
        })
      })

      req.on('error', () => {
        resolve({ url, status: 'ERROR', alive: false })
      })

      req.on('timeout', () => {
        req.destroy()
        resolve({ url, status: 'TIMEOUT', alive: false })
      })

      req.setTimeout(5000)
      req.end()
    } catch (e) {
      resolve({ url, status: 'ERROR', alive: false, error: e.message })
    }
  })
}

// 从HTML中提取favicon链接
function extractFaviconFromHtml(html, baseUrl) {
  const faviconRegex = /<link[^>]+rel=["'](?:shortcut )?icon["'][^>]+href=["']([^"']+)["']/i
  const appleIconRegex = /<link[^>]+rel=["']apple-touch-icon["'][^>]+href=["']([^"']+)["']/i
  
  let favicon = null
  
  const faviconMatch = html.match(faviconRegex)
  if (faviconMatch) {
    favicon = faviconMatch[1]
    if (!favicon.startsWith('http')) {
      favicon = new URL(favicon, baseUrl).href
    }
  } else {
    const appleMatch = html.match(appleIconRegex)
    if (appleMatch) {
      favicon = appleMatch[1]
      if (!favicon.startsWith('http')) {
        favicon = new URL(favicon, baseUrl).href
      }
    }
  }
  
  return favicon
}

// 获取HTML内容
function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    try {
      const urlObj = new URL(url)
      const client = urlObj.protocol === 'https:' ? https : http
      
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: 'GET',
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; FaviconChecker/1.0)'
        }
      }

      const req = client.request(options, (res) => {
        let data = ''
        res.on('data', chunk => { data += chunk })
        res.on('end', () => resolve(data))
      })

      req.on('error', reject)
      req.on('timeout', () => {
        req.destroy()
        reject(new Error('Timeout'))
      })

      req.setTimeout(10000)
      req.end()
    } catch (e) {
      reject(e)
    }
  })
}

// 查找favicon
async function findFavicon(url) {
  const baseUrl = getBaseUrl(url)
  console.log(`\n🔍 查找 ${getDomain(url)} 的 favicon...`)
  
  // 方法1: 尝试常见的favicon路径
  const commonPaths = getFaviconPaths(baseUrl)
  for (const faviconUrl of commonPaths) {
    const result = await checkUrl(faviconUrl)
    if (result.alive) {
      console.log(`  ✅ 找到: ${faviconUrl}`)
      return faviconUrl
    }
  }
  
  // 方法2: 从HTML中提取
  try {
    const html = await fetchHtml(baseUrl)
    const favicon = extractFaviconFromHtml(html, baseUrl)
    if (favicon) {
      const result = await checkUrl(favicon)
      if (result.alive) {
        console.log(`  ✅ 从HTML找到: ${favicon}`)
        return favicon
      }
    }
  } catch (e) {
    // 忽略错误，继续尝试其他方法
  }
  
  // 方法3: 使用Google的favicon服务作为备选
  const domain = getDomain(url)
  const googleFavicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
  console.log(`  ⚠️  使用Google服务: ${googleFavicon}`)
  return googleFavicon
}

// 主函数
async function main() {
  console.log('🚀 开始抓取网站 favicon...\n')
  
  const results = []
  const customSites = loadSitesFromFile()
  const sitesToFetch = customSites.length ? customSites : sites
  
  for (const url of sitesToFetch) {
    try {
      const domain = getDomain(url)
      const favicon = await findFavicon(url)
      
      results.push({
        domain,
        name: domain,
        link: url,
        icon: favicon
      })
      
      // 添加延迟避免请求过快
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      const domain = getDomain(url)
      console.log(`  ❌ 错误: ${error.message}`)
      results.push({
        domain,
        name: domain,
        link: url,
        icon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
      })
    }
  }
  
  console.log('\n📋 结果:\n')
  console.log(JSON.stringify(results, null, 2))
  
  // 保存到文件
  const outputPath = path.join(__dirname, '..', 'new-tools.json')
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2))
  console.log(`\n💾 结果已保存到: ${outputPath}`)
}

main().catch(console.error)
