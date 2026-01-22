const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')
const { URL } = require('url')

// 要检查的文件
const filesToCheck = [
  'pages/tools/tools.ts',
  'pages/notes/index.vue',
  'pages/games/index.vue',
  'pages/relax/index.vue',
  'layouts/default.vue'
]

// 存储所有链接
const links = new Set()
const deadLinks = []
const checkedLinks = new Map()

// 从文件中提取链接
function extractLinks(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  
  // 匹配所有HTTP/HTTPS链接
  const urlRegex = /https?:\/\/[^\s"'<>)\],;]+/g
  const matches = content.match(urlRegex) || []
  
  matches.forEach(url => {
    // 清理URL（移除可能的尾随字符）
    let cleanUrl = url.replace(/[.,;:!?)\]}>]+$/, '')
    // 移除可能的引号
    cleanUrl = cleanUrl.replace(/^["']|["']$/g, '')
    if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
      links.add(cleanUrl)
    }
  })
  
  // 检查href属性中的链接
  const hrefRegex = /href=["']([^"']+)["']/g
  let match
  while ((match = hrefRegex.exec(content)) !== null) {
    const href = match[1]
    if (href.startsWith('http://') || href.startsWith('https://')) {
      links.add(href)
    }
  }
  
  // 检查src属性中的链接
  const srcRegex = /src=["']([^"']+)["']/g
  while ((match = srcRegex.exec(content)) !== null) {
    const src = match[1]
    if (src.startsWith('http://') || src.startsWith('https://')) {
      links.add(src)
    }
  }
}

// 检查单个链接
function checkLink(url) {
  return new Promise((resolve) => {
    if (checkedLinks.has(url)) {
      resolve(checkedLinks.get(url))
      return
    }

    try {
      const urlObj = new URL(url)
      const client = urlObj.protocol === 'https:' ? https : http
      
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: 'HEAD',
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0)'
        }
      }

      const req = client.request(options, (res) => {
        const status = res.statusCode
        const result = {
          url,
          status,
          alive: status >= 200 && status < 400
        }
        checkedLinks.set(url, result)
        resolve(result)
      })

      req.on('error', (error) => {
        const result = {
          url,
          status: 'ERROR',
          error: error.message,
          alive: false
        }
        checkedLinks.set(url, result)
        resolve(result)
      })

      req.on('timeout', () => {
        req.destroy()
        const result = {
          url,
          status: 'TIMEOUT',
          error: 'Request timeout',
          alive: false
        }
        checkedLinks.set(url, result)
        resolve(result)
      })

      req.setTimeout(10000)
      req.end()
    } catch (error) {
      const result = {
        url,
        status: 'ERROR',
        error: error.message,
        alive: false
      }
      checkedLinks.set(url, result)
      resolve(result)
    }
  })
}

// 主函数
async function main() {
  console.log('🔍 开始检查死链...\n')
  
  // 提取所有链接
  filesToCheck.forEach(file => {
    const filePath = path.join(__dirname, '..', file)
    if (fs.existsSync(filePath)) {
      console.log(`📄 检查文件: ${file}`)
      extractLinks(filePath)
    } else {
      console.log(`⚠️  文件不存在: ${file}`)
    }
  })

  console.log(`\n📊 共找到 ${links.size} 个链接需要检查\n`)

  // 检查所有链接
  const linkArray = Array.from(links)
  let checked = 0
  
  for (const url of linkArray) {
    checked++
    process.stdout.write(`\r⏳ 检查进度: ${checked}/${linkArray.length}`)
    
    const result = await checkLink(url)
    
    if (!result.alive) {
      deadLinks.push(result)
    }
    
    // 添加延迟避免请求过快
    await new Promise(resolve => setTimeout(resolve, 200))
  }

  console.log('\n\n📋 检查结果:\n')
  
  if (deadLinks.length === 0) {
    console.log('✅ 所有链接都正常！')
  } else {
    console.log(`❌ 发现 ${deadLinks.length} 个死链:\n`)
    deadLinks.forEach((link, index) => {
      console.log(`${index + 1}. ${link.url}`)
      console.log(`   状态: ${link.status}`)
      if (link.error) {
        console.log(`   错误: ${link.error}`)
      }
      console.log('')
    })
  }

  // 保存结果到文件
  const reportPath = path.join(__dirname, '..', 'dead-links-report.json')
  fs.writeFileSync(reportPath, JSON.stringify({
    totalLinks: links.size,
    deadLinks: deadLinks.length,
    checkedAt: new Date().toISOString(),
    deadLinksList: deadLinks
  }, null, 2))
  
  console.log(`\n📝 详细报告已保存到: ${reportPath}`)
}

main().catch(console.error)
