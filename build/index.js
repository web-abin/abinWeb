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
  console.log('✓ 已复制 .output/public 到 dist 目录')
} else {
  console.error('✗ 错误: .output/public 目录不存在，请先运行 nuxt generate')
  process.exit(1)
}
