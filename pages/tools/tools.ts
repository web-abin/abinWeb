//动态图片用本地相对路径访问有问题，暂时改用线上地址
const remoteImg = (name: string | number) => {
  return `https://web-abin.github.io/abinWeb/icons/${name}.png`
}

// 工具分类枚举
export enum ToolCategory {
  OFTEN = 'often', // 常用工具
  IMG = 'img', // 图片处理
  SEO = 'seo', // SEO优化
  CSS = 'css', // css工具
  COOL = 'cool', // UI灵感
  ICON = 'icon', // 图标
  CHATGPT = 'chatGPT', // chatGPT
  CHROME = 'chrome', // Chrome插件
  VSCODE = 'vscode', // vscode插件
  SITE = 'site' // 网站
}

// 分类名称映射
const categoryNames: Record<ToolCategory, string> = {
  [ToolCategory.OFTEN]: '通用工具',
  [ToolCategory.IMG]: '图片处理',
  [ToolCategory.SEO]: 'SEO优化',
  [ToolCategory.CSS]: 'css工具',
  [ToolCategory.COOL]: 'UI灵感',
  [ToolCategory.ICON]: '图标字体',
  [ToolCategory.CHATGPT]: 'AI工具',
  [ToolCategory.CHROME]: 'Chrome插件',
  [ToolCategory.VSCODE]: 'vscode插件',
  [ToolCategory.SITE]: '编程导航'
}

// 工具项类型定义
interface ToolItem {
  icon: string
  name: string
  link: string
  class: ToolCategory
}

// 扁平化的工具列表（新工具直接在这里添加，只需配置 class 分类）
const toolsFlat: ToolItem[] = [
  // 常用工具
  {
    icon: 'https://github.githubassets.com/favicons/favicon.svg',
    name: 'Github Trending',
    link: 'https://github.com/trending',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://caniuse.com/img/favicon-128.png',
    name: '兼容性查询',
    link: 'https://caniuse.com/',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://www.bootcdn.cn/assets/ico/favicon.ico?1644166305141',
    name: 'BootCDN',
    link: 'https://www.bootcdn.cn/',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://www.jsdelivr.com/icons/favicon.svg',
    name: 'jsDelivr CDN服务',
    link: 'https://www.jsdelivr.com/',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://cdnjs.com/favicon.png',
    name: 'cdnjs CDN服务',
    link: 'https://cdnjs.com/',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://unpkg.com/favicon.ico',
    name: 'unpkg CDN服务',
    link: 'https://unpkg.com/',
    class: ToolCategory.OFTEN
  },
  {
    icon: '../icons/56.png',
    name: 'json在线解析',
    link: 'https://www.sojson.com/',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://static.clewm.net/static/images/favicon.ico',
    name: '草料二维码',
    link: 'https://cli.im/',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://www.hlcode.cn/favicon.ico',
    name: '互联二维码',
    link: 'https://www.hlcode.cn/',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://excalidraw.com/apple-touch-icon.png',
    name: 'Excalidraw思维导图',
    link: 'https://excalidraw.com/',
    class: ToolCategory.OFTEN
  },
  {
    icon: remoteImg(15),
    name: '正则表达式测试',
    link: 'http://www.jsons.cn/reg/',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://any86.github.io/any-rule/icon.png',
    name: '正则大全',
    link: 'https://any86.github.io/any-rule/',
    class: ToolCategory.OFTEN
  },
  {
    icon: remoteImg(16),
    name: '文件格式转换',
    link: 'https://convertio.co/zh/',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://www.aconvert.com/favicon.ico',
    name: '文件格式转换',
    link: 'https://www.aconvert.com/cn/audio/',
    class: ToolCategory.OFTEN
  },
  {
    icon: remoteImg(17),
    name: '中文简繁体转换',
    link: 'https://tool.lu/zhconvert',
    class: ToolCategory.OFTEN
  },
  {
    icon: remoteImg(18),
    name: '字数统计',
    link: 'https://www.eteste.com/',
    class: ToolCategory.OFTEN
  },
  {
    icon: remoteImg(19),
    name: '时间戳转换',
    link: 'https://www.epochconverter.com/',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://datav.aliyun.com/favicon.ico',
    name: '阿里云地图',
    link: 'https://datav.aliyun.com/portal/school/atlas/area_selector',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://csstools.chinaz.com/favicon.ico',
    name: '站长工具',
    link: 'https://tool.chinaz.com/',
    class: ToolCategory.SEO
  },

  {
    icon: 'https://app.netlify.com/favicon.ico',
    name: 'netlify网站托管',
    link: 'https://app.netlify.com/',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico',
    name: 'vercel网站托管',
    link: 'https://vercel.com/dashboard',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico',
    name: '微信公众平台',
    link: 'https://mp.weixin.qq.com/',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://kaifa.baidu.com/assets/favicon.ico',
    name: '开发者搜索',
    link: 'https://kaifa.baidu.com/',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://product.mdnice.com/favicon-32x32.png?v=00d29966e3863b53e83a585435f6a6fc',
    name: '墨滴文章同步',
    link: 'https://product.mdnice.com/',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://a.disquscdn.com/1718305934/img/favicon16-32.ico',
    name: 'disqus评论',
    link: 'https://https-web-abin-github-io-abinweb-tools.disqus.com/admin/settings/install/',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://www.mujicv.com/favicon.ico',
    name: '木及简历',
    link: 'https://www.mujicv.com/',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://www.gstatic.com/pagespeed/insights/ui/logo/favicon_48.png',
    name: 'Pagespeed',
    link: 'https://pagespeed.web.dev/?hl=zh_CN',
    class: ToolCategory.OFTEN
  },
  {
    icon: 'https://www.gstatic.com/search-console/scfe/search_console-32.png',
    name: 'Search Console',
    link: 'https://search.google.com/search-console',
    class: ToolCategory.SEO
  },
  {
    icon: 'https://www.xml-sitemaps.com/images/logo-trans.png',
    name: 'sitemap验证',
    link: 'https://www.xml-sitemaps.com/validate-xml-sitemap.html',
    class: ToolCategory.SEO
  },
  {
    icon: 'https://ahrefs.com/favicon.ico',
    name: 'Ahrefs',
    link: 'https://ahrefs.com/backlink-checker/?input=https%3A%2F%2Fwww.clipzap.ai%2F&mode=subdomains',
    class: ToolCategory.SEO
  },
  {
    icon: 'https://static-app.ahrefs.com/favicon.ico?version=release-20250212-bk225368-56fef11be0625',
    name: 'Ahrefs Blacklink',
    link: 'https://app.ahrefs.com/dashboard',
    class: ToolCategory.SEO
  },
  {
    icon: 'https://moz.com/favicon.ico',
    name: 'MOZ Blacklink',
    link: 'https://moz.com/link-explorer',
    class: ToolCategory.SEO
  },
  {
    icon: 'https://collectui.com/img/favicon.ico',
    name: 'Collect UI',
    link: 'https://collectui.com/challenges/sign-up',
    class: ToolCategory.COOL
  },
  {
    icon: 'https://cloudconvert.com/favicon.ico',
    name: 'CloudConvert',
    link: 'https://cloudconvert.com/mov-to-gif',
    class: ToolCategory.IMG
  },
  {
    icon: 'https://ezgif.com/favicon.png',
    name: 'ezgif',
    link: 'https://ezgif.com/video-to-gif',
    class: ToolCategory.IMG
  },
  {
    icon: 'https://app.neilpatel.com/favicon.ico',
    name: 'neilpatel',
    link: 'https://app.neilpatel.com/en/traffic_analyzer/overview?domain=https%3A%2F%2Fcrushon.ai&lang=en&locId=2702&mode=domain',
    class: ToolCategory.SEO
  },
  {
    icon: 'https://skywork.ai/favicon.ico',
    name: 'skywork.ai',
    link: 'https://skywork.ai/project/1980553300111826944?from=recent_project',
    class: ToolCategory.CHATGPT
  },
  {
    icon: 'https://ai-bot.cn/favicon.ico',
    name: 'AI 工具集',
    link: 'https://ai-bot.cn/ai-ui-generation-tools/',
    class: ToolCategory.SITE
  },
  {
    icon: 'https://audiomass.co/favicon.ico',
    name: 'audiomass.co',
    link: 'https://audiomass.co/',
    class: ToolCategory.IMG
  },
  {
    icon: 'https://devtool.tech/favicon.ico',
    name: 'devtool.tech',
    link: 'https://devtool.tech/',
    class: ToolCategory.SITE
  },

  // 图片处理
  {
    icon: 'https://tinypng.com/images/favicon.ico',
    name: '图片压缩',
    link: 'https://tinypng.com/',
    class: ToolCategory.IMG
  },
  {
    icon: 'https://jakearchibald.github.io/svgomg/imgs/icon.png',
    name: 'SVG优化压缩',
    link: 'https://jakearchibald.github.io/svgomg/',
    class: ToolCategory.IMG
  },
  {
    icon: 'https://www.svgviewer.dev/favicon.ico',
    name: 'SVG预览',
    link: 'https://www.svgviewer.dev/',
    class: ToolCategory.IMG
  },
  {
    icon: 'https://www.toptal.com/developers/css/sprite-generator/static/images/favicon.png',
    name: '生成精灵图',
    link: 'https://www.toptal.com/developers/css/sprite-generator',
    class: ToolCategory.IMG
  },
  {
    icon: remoteImg(20),
    name: '视频转GIF',
    link: 'https://www.tutieshi.com/',
    class: ToolCategory.IMG
  },
  {
    icon: remoteImg(21),
    name: '在线SVG制作',
    link: 'https://51tools.info/svg/',
    class: ToolCategory.IMG
  },
  {
    icon: 'https://c.runoob.com/more/svgeditor/images/favicon.svg',
    name: 'SVG编辑器',
    link: 'https://c.runoob.com/more/svgeditor/',
    class: ToolCategory.IMG
  },
  {
    icon: remoteImg(1),
    name: '趣作图',
    link: 'https://www.pickwant.com/home',
    class: ToolCategory.IMG
  },
  {
    icon: 'https://www.toptal.com/developers/css/sprite-generator/static/images/favicon.png',
    name: '图片背景消除',
    link: 'https://www.remove.bg/zh',
    class: ToolCategory.IMG
  },
  {
    icon: remoteImg(22),
    name: '图片在线编辑',
    link: 'https://www.iloveimg.com/zh-cn',
    class: ToolCategory.IMG
  },
  {
    icon: remoteImg(23),
    name: '在线PS',
    link: 'https://www.uupoop.com/#/',
    class: ToolCategory.IMG
  },
  {
    icon: remoteImg(24),
    name: '图片加水印',
    link: 'https://www.onlinedo.cn/img-shuiyin',
    class: ToolCategory.IMG
  },
  {
    icon: remoteImg(25),
    name: '图片去水印',
    link: 'https://www.apowersoft.cn/image-watermark-remover',
    class: ToolCategory.IMG
  },
  {
    icon: remoteImg(26),
    name: '图片合并切割',
    link: 'http://www.zuohaotu.com/',
    class: ToolCategory.IMG
  },
  {
    icon: remoteImg(27),
    name: '生成透明Icon',
    link: 'http://www.ico51.cn/',
    class: ToolCategory.IMG
  },
  {
    icon: remoteImg(28),
    name: 'logo设计',
    link: 'https://www.designevo.com/cn/logo-maker/',
    class: ToolCategory.IMG
  },
  {
    icon: remoteImg(29),
    name: '搞怪图片生成',
    link: 'https://c.tianhezulin.com/',
    class: ToolCategory.IMG
  },
  {
    icon: remoteImg(30),
    name: '表情包',
    link: 'https://www.fabiaoqing.com/',
    class: ToolCategory.IMG
  },
  {
    icon: remoteImg(31),
    name: '表情包制作器',
    link: 'https://www.wakatool.com/maker',
    class: ToolCategory.IMG
  },
  {
    icon: remoteImg(32),
    name: '朋克图片生成器',
    link: 'https://photomosh.com/',
    class: ToolCategory.IMG
  },
  {
    icon: remoteImg(33),
    name: 'Pexels图片素材',
    link: 'https://www.pexels.com/zh-cn/',
    class: ToolCategory.IMG
  },
  {
    icon: remoteImg(34),
    name: 'Pixabay图片素材',
    link: 'https://pixabay.com/',
    class: ToolCategory.IMG
  },
  {
    icon: remoteImg(35),
    name: 'Pxhere图片素材',
    link: 'https://pxhere.com/',
    class: ToolCategory.IMG
  },
  {
    icon: 'https://www.3gbizhi.com/assets/mobile/images/favicon.ico',
    name: '3G壁纸',
    link: 'https://www.3gbizhi.com/',
    class: ToolCategory.IMG
  },
  {
    icon: 'https://huatu.98youxi.com/favicon.ico',
    name: '流程图/思维导图',
    link: 'https://huatu.98youxi.com/home/myfile/',
    class: ToolCategory.IMG
  },
  {
    icon: 'https://boardmix.cn/app/pwa/pwa-icons/ios/144.png',
    name: 'boardmix流程图',
    link: 'https://boardmix.cn/app/home',
    class: ToolCategory.IMG
  },
  {
    icon: 'https://www.superbed.cn/favicon.ico',
    name: '聚合图床',
    link: 'https://www.superbed.cn/',
    class: ToolCategory.IMG
  },

  // web艺术
  {
    icon: 'https://css-only.art/fav.png',
    name: 'css-only',
    link: 'https://css-only.art/',
    class: ToolCategory.CSS
  },
  {
    icon: 'https://css-only.art/fav.png',
    name: 'CSS Tip',
    link: 'https://css-tip.com/',
    class: ToolCategory.CSS
  },
  {
    icon: 'https://www.smashingmagazine.com/images/favicon/favicon.svg',
    name: 'smashing杂志',
    link: 'https://www.smashingmagazine.com/',
    class: ToolCategory.CSS
  },
  {
    icon: 'https://www.gstatic.com/devrel-devsite/prod/v2a398f8757b82183cb182aec0e7c4771ac1123a40d36fc97c8783f6df9b3c672/web/images/favicon.png',
    name: 'web.dev',
    link: 'https://web.dev/blog?hl=zh-cn',
    class: ToolCategory.CSS
  },
  {
    icon: 'https://res.cloudinary.com/practicaldev/image/fetch/s--E8ak4Hr1--/c_limit,f_auto,fl_progressive,q_auto,w_32/https://dev-to.s3.us-east-2.amazonaws.com/favicon.ico',
    name: 'DEV Community',
    link: 'https://dev.to/',
    class: ToolCategory.CSS
  },

  // css工具
  {
    icon: 'https://css-shape.com/fav.png',
    name: 'CSS Generators',
    link: 'https://css-generators.com/',
    class: ToolCategory.CSS
  },
  {
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAY1BMVEX///8AAADr+fr////1/PwAqrsAprgKrr5hy9XU8fQUssH0+/xQxdEitsUwusg/v8zE7PAds8P////p+Pqw5eqp4+mN2eH3/P2h4OeQ2+I2vMra8/a86e2b3uRrzthKw89Ewc0z3iepAAAABXRSTlPwAO/g70YqzXQAAADSSURBVDjLhdNLbsMwDARQuqlGjqiv/3HaJPc/ZWUHBYwWpGdH8GGkDak5CTUXog8hn0QXaohbKyQMHVVwgxEC12+g/QVHCOzT9QicL+4da12Myf4F6/h4+pqXnzLPfP8HbHmXr7kf2hjc8YljJl7K/gMBLLPftwLAyLGOIsCjq3sZIHbboDTkEUYB8BxUYO8TjALQsjMKqNMNGkDioINhhFEAAq86+P6C0UDgpIJaYIKVAdKc/BJkEPucXk+5AVMuBtofit22MhBzPb+s09s8ve4fJkoXyynCJe4AAAAASUVORK5CYII=',
    name: '贝塞尔曲线',
    link: 'https://cubic-bezier.com/#.17,.67,.83,.67',
    class: ToolCategory.CSS
  },
  {
    icon: 'https://www.bezier-curve.com/favicon.ico',
    name: '贝塞尔曲线',
    link: 'https://www.bezier-curve.com/',
    class: ToolCategory.CSS
  },
  {
    icon: '	https://cssgradient.io/images/favicon-23859487.png',
    name: 'css渐变色',
    link: 'https://cssgradient.io/',
    class: ToolCategory.CSS
  },
  {
    icon: 'https://static.mybrandnewlogo.com/images/favicon.ico',
    name: '色彩搭配',
    link: 'https://mybrandnewlogo.com/color-palette-generator',
    class: ToolCategory.CSS
  },
  {
    icon: 'https://s.techbrood.com/themes/techbrood/image/favicon.ico',
    name: 'border-radius',
    link: 'https://wow.techbrood.com/fiddle/40829',
    class: ToolCategory.CSS
  },
  {
    icon: 'https://shadows.brumm.af/favicon.svg',
    name: 'css阴影',
    link: 'https://shadows.brumm.af/',
    class: ToolCategory.CSS
  },
  {
    icon: 'https://box-shadow.art/wp-content/uploads/2021/10/logo-icon-150x150.png',
    name: 'box-shadow案例',
    link: 'https://box-shadow.art/',
    class: ToolCategory.CSS
  },
  {
    icon: remoteImg(36),
    name: '在线clip-path',
    link: 'http://tools.jb51.net/code/css3path',
    class: ToolCategory.CSS
  },
  {
    icon: '	https://cssgrid-generator.netlify.app/favicon.ico',
    name: 'Grid网格布局',
    link: 'https://cssgrid-generator.netlify.app/',
    class: ToolCategory.CSS
  },
  {
    icon: 'https://layout.bradwoods.io/favicon.ico',
    name: '布局生成器',
    link: 'https://layout.bradwoods.io/',
    class: ToolCategory.CSS
  },
  {
    icon: '	https://animxyz.com/assets/static/animxyz-logo.ce0531f.39f3bde368e480505b70778acaa2ac74.png',
    name: 'animxyz',
    link: 'https://animxyz.com/',
    class: ToolCategory.CSS
  },
  {
    icon: 'https://www.transition.style/favicon.png',
    name: '过渡动画',
    link: 'https://www.transition.style/',
    class: ToolCategory.CSS
  },
  {
    icon: 'https://getwaves.io/favicon-32x32.png',
    name: 'svg波浪生成器',
    link: 'https://getwaves.io/',
    class: ToolCategory.CSS
  },
  {
    icon: 'https://img2.baidu.com/it/u=3541918504,2197745291&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=287',
    name: 'svg生成器',
    link: 'https://app.haikei.app/',
    class: ToolCategory.CSS
  },

  // UI灵感
  {
    icon: 'https://web-abin.github.io/css-tips/favicon.ico',
    name: 'CSS-Tips',
    link: 'https://web-abin.github.io/css-tips/',
    class: ToolCategory.COOL
  },
  {
    icon: 'https://whirl.netlify.app/favicon.ico',
    name: 'whirl加载动效',
    link: 'https://whirl.netlify.app/',
    class: ToolCategory.COOL
  },
  {
    icon: 'https://css-loaders.com/fav.png',
    name: '最全loading',
    link: 'https://css-loaders.com/wobbling/',
    class: ToolCategory.COOL
  },
  {
    icon: 'https://css-loaders.com/fav.png',
    name: 'css形状',
    link: 'https://css-shape.com/',
    class: ToolCategory.COOL
  },
  {
    icon: 'https://uiverse.io/favicon-32x32.png',
    name: 'uiverse按钮',
    link: 'https://uiverse.io/buttons',
    class: ToolCategory.COOL
  },
  {
    icon: 'https://www.handsome-css.com/favicon/favicon.ico',
    name: 'AwA-UI小组件',
    link: 'https://www.handsome-css.com/buttons',
    class: ToolCategory.COOL
  },
  {
    icon: remoteImg(36),
    name: 'css动画',
    link: 'http://www.bootstrapmb.com/tag/cssdonghua',
    class: ToolCategory.COOL
  },
  {
    icon: remoteImg(2),
    name: 'CSS Tricks',
    link: 'https://qishaoxuan.github.io/css_tricks/',
    class: ToolCategory.COOL
  },
  {
    icon: 'https://css-tricks.com/favicon.svg',
    name: 'CSS Tricks',
    link: 'https://css-tricks.com/archives/',
    class: ToolCategory.COOL
  },
  {
    icon: 'https://csscoco.com/inspiration/logo2.png',
    name: 'CSS Inspiration',
    link: 'https://csscoco.com/inspiration/#/',
    class: ToolCategory.COOL
  },
  {
    icon: 'https://shiroi.netlify.app/favicon.ico',
    name: 'Shiro',
    link: 'https://shiroi.netlify.app/',
    class: ToolCategory.COOL
  },
  {
    icon: 'https://cssdesignawards.com/images/favicons/favicon.ico',
    name: 'CssDesignAwards',
    link: 'https://cssdesignawards.com/',
    class: ToolCategory.COOL
  },
  {
    icon: 'https://webdesignclip.com/favicon.ico',
    name: 'WebDesignClip',
    link: 'https://webdesignclip.com/',
    class: ToolCategory.COOL
  },
  {
    icon: 'http://360ab.cn/favicon.ico',
    name: '文字创意代码',
    link: 'http://360ab.cn/code?game',
    class: ToolCategory.COOL
  },
  {
    icon: 'https://bennettfeely.com/gradients/img/favicon.png',
    name: '混合模式创意',
    link: 'https://bennettfeely.com/gradients/',
    class: ToolCategory.COOL
  },

  // 图标
  {
    icon: 'https://img.alicdn.com/imgextra/i2/O1CN01ZyAlrn1MwaMhqz36G_!!6000000001499-73-tps-64-64.ico',
    name: 'iconfont',
    link: 'https://www.iconfont.cn/',
    class: ToolCategory.ICON
  },
  {
    icon: 'https://unpkg.byted-static.com/byted/arco-config/1.0.9/assets/icon-box.ico',
    name: 'iconBox',
    link: 'https://arco.design/iconbox/libs',
    class: ToolCategory.ICON
  },
  {
    icon: 'https://lf1-cdn2-tos.bytegoofy.com/bydesign/iconparksite/logo.svg',
    name: 'iconPark',
    link: 'https://iconpark.oceanengine.com/official',
    class: ToolCategory.ICON
  },
  {
    icon: 'https://iconsvg.xyz/favicon-32.png',
    name: '自定义icon',
    link: 'https://iconsvg.xyz/',
    class: ToolCategory.ICON
  },
  {
    icon: '	https://www.fonts.net.cn/favicon.ico',
    name: '字体天下',
    link: 'https://www.fonts.net.cn/',
    class: ToolCategory.ICON
  },
  {
    icon: '	https://www.googlefonts.cn/Public/google/zh-cn/gstatic/google_fonts_lodp.ico',
    name: '字体下载',
    link: 'https://www.emojiall.com/zh-hans',
    class: ToolCategory.ICON
  },
  {
    icon: '	https://www.emojiall.com/favicon.ico',
    name: 'emojiall',
    link: 'https://www.emojiall.com/zh-hans',
    class: ToolCategory.ICON
  },
  {
    icon: 'https://www.webfx.com/wp-content/uploads/2023/05/icon-ux.svg',
    name: 'md-emoji',
    link: 'https://www.webfx.com/tools/emoji-cheat-sheet/',
    class: ToolCategory.ICON
  },

  // chatGPT
  {
    icon: 'https://cdn.oaistatic.com/_next/static/media/favicon-32x32.be48395e.png',
    name: 'chatGPT',
    link: 'https://chat.openai.com/',
    class: ToolCategory.CHATGPT
  },
  {
    icon: 'https://cdn.aidutu.cn/res/head/ai.png',
    name: 'AiDuTu',
    link: 'https://chat.aidutu.cn/',
    class: ToolCategory.CHATGPT
  },
  {
    icon: remoteImg(53),
    name: 'AI EDU',
    link: 'https://ai.aigcfun.com/',
    class: ToolCategory.CHATGPT
  },
  {
    icon: remoteImg(54),
    name: 'chatbot',
    link: 'https://chatbot.theb.ai/#/chat',
    class: ToolCategory.CHATGPT
  },

  // Chrome插件
  {
    icon: remoteImg(38),
    name: 'OneTab标签管理',
    link: 'https://chrome.google.com/webstore/category/extensions?hl=zh-CN',
    class: ToolCategory.CHROME
  },
  {
    icon: 'https://tabbiy.top/favicon.ico',
    name: 'Tabbiy网页分组',
    link: 'https://tabbiy.top/',
    class: ToolCategory.CHROME
  },
  {
    icon: remoteImg(39),
    name: '前端助手插件',
    link: 'http://www.itmind.net/1470.html',
    class: ToolCategory.CHROME
  },
  {
    icon: remoteImg(40),
    name: 'Postman网页版',
    link: 'http://www.itmind.net/1334.html',
    class: ToolCategory.CHROME
  },
  {
    icon: 'https://cdn.kjj8.com/images/2021/11/20211638043297-unnamed-6.png',
    name: '请求mock插件',
    link: 'https://www.jianshu.com/p/9278207cdc62',
    class: ToolCategory.CHROME
  },
  {
    icon: 'https://addons.mozilla.org/user-media/addon_icons/1022/1022438-64.png?modified=533cac64',
    name: '跨域代理插件',
    link: 'https://www.0z.gs/webDevelopment/1736.html',
    class: ToolCategory.CHROME
  },
  {
    icon: remoteImg(41),
    name: 'GitHub加速插件',
    link: 'http://www.itmind.net/217.html',
    class: ToolCategory.CHROME
  },
  {
    icon: remoteImg(42),
    name: '视频下载插件',
    link: 'http://www.itmind.net/3092.html',
    class: ToolCategory.CHROME
  },
  {
    icon: remoteImg(43),
    name: 'Vue.js devtools',
    link: 'http://www.itmind.net/6438.html',
    class: ToolCategory.CHROME
  },
  {
    icon: remoteImg(51),
    name: '广告拦截器',
    link: 'https://extfans.com/productivity/bgnkhhnnamicmpeenaelnjfhikgbkllg/',
    class: ToolCategory.CHROME
  },
  {
    icon: remoteImg(52),
    name: '密码管理',
    link: 'https://extfans.com/productivity/hdokiejnpimakedhajhdlcegeplioahd/',
    class: ToolCategory.CHROME
  },

  // vscode插件
  {
    icon: 'https://techer.gallerycdn.vsassets.io/extensions/techer/open-in-browser/2.0.0/1534049617896/Microsoft.VisualStudio.Services.Icons.Default',
    name: 'open in browser',
    link: 'https://marketplace.visualstudio.com/items?itemName=techer.open-in-browser',
    class: ToolCategory.VSCODE
  },
  {
    icon: remoteImg(44),
    name: 'Git Graph',
    link: 'https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph',
    class: ToolCategory.VSCODE
  },
  {
    icon: remoteImg(45),
    name: 'GitLens',
    link: 'https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens',
    class: ToolCategory.VSCODE
  },
  {
    icon: remoteImg(46),
    name: 'Git History',
    link: 'https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory',
    class: ToolCategory.VSCODE
  },
  {
    icon: remoteImg(47),
    name: 'Git Blame',
    link: 'https://marketplace.visualstudio.com/items?itemName=waderyan.gitblame',
    class: ToolCategory.VSCODE
  },
  {
    icon: 'https://kisstkondoros.gallerycdn.vsassets.io/extensions/kisstkondoros/vscode-gutter-preview/0.30.0/1644076638771/Microsoft.VisualStudio.Services.Icons.Default',
    name: '图片预览',
    link: 'https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview',
    class: ToolCategory.VSCODE
  },
  {
    icon: 'https://cipchk.gallerycdn.vsassets.io/extensions/cipchk/cssrem/3.1.0/1677827217157/Microsoft.VisualStudio.Services.Icons.Default',
    name: 'px to rem/rpx/vw',
    link: 'https://marketplace.visualstudio.com/items?itemName=cipchk.cssrem',
    class: ToolCategory.VSCODE
  },
  {
    icon: 'https://chendm.gallerycdn.vsassets.io/extensions/chendm/translate/0.1.0/1631010008171/Microsoft.VisualStudio.Services.Icons.Default',
    name: '生成英文变量名',
    link: 'https://marketplace.visualstudio.com/items?itemName=chendm.translate',
    class: ToolCategory.VSCODE
  },
  {
    icon: 'https://formulahendry.gallerycdn.vsassets.io/extensions/formulahendry/auto-close-tag/0.5.14/1644313109985/Microsoft.VisualStudio.Services.Icons.Default',
    name: '自动闭合标签',
    link: 'https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag',
    class: ToolCategory.VSCODE
  },
  {
    icon: remoteImg(48),
    name: '代码美化',
    link: 'https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify',
    class: ToolCategory.VSCODE
  },
  {
    icon: remoteImg(49),
    name: '代码书签',
    link: 'https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks',
    class: ToolCategory.VSCODE
  },
  {
    icon: remoteImg(50),
    name: 'FileSize',
    link: 'https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks',
    class: ToolCategory.VSCODE
  },
  {
    icon: remoteImg(55),
    name: 'Markdown预览',
    link: 'https://marketplace.visualstudio.com/items?itemName=mdickin.markdown-shortcuts',
    class: ToolCategory.VSCODE
  },
  {
    icon: 'https://www.aitop100.cn/assets/nav_logo_light-87e7faf5.png',
    name: 'AI Top 100',
    link: 'https://www.aitop100.cn/',
    class: ToolCategory.CHATGPT
  },
  {
    icon: 'https://www.toptal.com/favicon.ico',
    name: '精灵兔',
    link: 'https://www.toptal.com/developers/css/sprite-generator',
    class: ToolCategory.CSS
  },
  {
    icon: 'https://www.bootstrapmb.com/favicon.ico',
    name: 'bootstrapmb.com',
    link: 'https://www.bootstrapmb.com/',
    class: ToolCategory.COOL
  },
  {
    icon: 'https://www.gamer520.com/favicon.ico',
    name: 'gamer520.com',
    link: 'https://www.gamer520.com/',
    class: ToolCategory.OFTEN
  }
]

// 将扁平数组转换为嵌套结构
function transformTools(flatList: ToolItem[]) {
  // 定义分类显示顺序
  const categoryOrder: ToolCategory[] = [
    ToolCategory.OFTEN, // 常用工具
    ToolCategory.IMG, // 图片处理
    ToolCategory.CHATGPT, // AI工具
    ToolCategory.COOL, // UI灵感
    ToolCategory.CSS, // UI工具
    ToolCategory.ICON, // 图标字体
    ToolCategory.SEO, // SEO优化
    ToolCategory.SITE, // 编程导航
    ToolCategory.CHROME, // chrome插件
    ToolCategory.VSCODE // vscode插件
  ]

  // 按分类分组
  const grouped = flatList.reduce((acc, item) => {
    const category = item.class
    if (!acc[category]) {
      acc[category] = []
    }
    // 移除 class 属性，只保留 icon, name, link
    const { class: _, ...toolItem } = item
    acc[category].push(toolItem)
    return acc
  }, {} as Record<ToolCategory, Omit<ToolItem, 'class'>[]>)

  // 按照定义的顺序转换为最终格式
  return categoryOrder
    .filter(
      (categoryId) => grouped[categoryId] && grouped[categoryId].length > 0
    ) // 只包含有数据的分类
    .map((categoryId) => ({
      id: categoryId,
      name: categoryNames[categoryId],
      collection: grouped[categoryId]
    }))
}

// 导出处理后的工具列表（保持原有格式）
const tools = transformTools(toolsFlat)

export default tools
