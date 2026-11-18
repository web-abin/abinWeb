const fs = require('fs-extra')
const { resolve } = require('path')

// Nuxt 3 输出到 .output/public，需要复制到 dist 目录供部署使用
const outputDir = resolve(__dirname, '../.output/public')
const distDir = resolve(__dirname, '../dist')

// 确保 dist 目录存在
if (fs.existsSync(distDir)) {
  fs.removeSync(distDir)
}
fs.ensureDirSync(distDir)

// 复制 .output/public 到 dist
if (fs.existsSync(outputDir)) {
  fs.copySync(outputDir, distDir)
  // Pages uses static files; the public sitemap takes precedence over the server route.
  // Add missing question URLs after each clean copy so new questions stay discoverable.
  const questions = require('../data/interview/questions.json')
  const sitemapPath = resolve(distDir, 'sitemap.xml')
  const baseURL = 'https://web-abin.github.io/abinWeb/interview/'
  let sitemap = fs.readFileSync(sitemapPath, 'utf8')
  const urls = [baseURL, ...questions.map(question => `${baseURL}${encodeURIComponent(question.id)}/`)]
  const entries = urls.filter(url => !sitemap.includes(`<loc>${url}</loc>`)).map(url =>
    `  <url><loc>${url}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
  ).join('\n')
  sitemap = sitemap.replace('</urlset>', `${entries}\n</urlset>`)
  fs.writeFileSync(sitemapPath, sitemap)
  console.log('✓ 已复制 .output/public 到 dist 目录，并更新面试题站点地图')
} else {
  console.error('✗ 错误: .output/public 目录不存在，请先运行 nuxt generate')
  process.exit(1)
}
