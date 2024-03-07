<template>
  <div class="page" @click="showPanel = false">
    <div class="box">
      <div class="item-box" v-for="item in list" :key="item.id">
        <div class="item" @click.stop="onLookPanel(item)">
          <span class="actual-text"
            >&nbsp;&nbsp;{{ item.name }}&nbsp;&nbsp;</span
          >
          <span class="hover-text" aria-hidden="true"
            >&nbsp;&nbsp;{{ item.name }}&nbsp;&nbsp;</span
          >
        </div>
      </div>

      <!-- <div class="item-box" v-for="item in list" :key="item.id" @click.stop="onLookPanel(item)">
        <span class="item">{{ item.name }}</span>
      </div> -->
    </div>

    <div class="popup" v-if="showPanel" @click.stop>
      <h3>【 {{ activeDocs.name }} 】</h3>
      <p>官方文档</p>
      <a
        target="_blank"
        rel="nofollow external"
        :href="link1.link"
        v-for="(link1, link1Index) in activeDocs.official"
        :key="link1.link"
        >{{
          link1.name
            ? link1.name
            : `${activeDocs.name} 官方文档${
                activeDocs.official.length > 1 ? link1Index + 1 : ''
              }`
        }}</a
      >
      <p v-if="activeDocs.others && activeDocs.others.length">相关文档</p>
      <a
        target="_blank"
        rel="nofollow external"
        :href="link2.link"
        v-for="link2 in activeDocs.others"
        :key="link2.link"
        >{{ link2.name }}</a
      >
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import config from '~/config'

useSeoMeta({
  description: config.NOTES_description
})

const list = ref([
  {
    id: 'animate.js',
    name: 'Animate.js',
    official: [
      {
        link: 'http://www.animate.net.cn/',
        name: 'Animate中文网'
      }
    ],
    others: []
  },
  {
    id: 'anime.js',
    name: 'anime.js',
    official: [
      {
        link: 'http://blog.fer-link.com/demo/20220915111146/index2.html',
        name: 'anime.js 中文文档'
      },
      {
        link: 'https://github.com/juliangarnier/anime',
        name: 'github'
      }
    ],
    others: []
  },
  {
    id: 'antd',
    name: 'antd',
    official: [
      {
        link: 'https://ant.design/components/overview-cn',
        name: 'Ant Design官方文档'
      },
      {
        link: 'https://2x.antdv.com/components/overview-cn/',
        name: 'Ant Design Vue官方文档'
      }
    ],
    others: []
  },
  {
    id: 'ArcoDesign',
    name: 'ArcoDesign',
    icon: 'https://unpkg.byted-static.com/byted/arco-config/1.0.11/assets/arco_arcopro.ico',
    official: [
      {
        link: 'https://pro.arco.design/',
        name: 'ArcoDesign Pro官方文档'
      }
    ],
    others: []
  },
  {
    id: 'Annie2x',
    name: 'Annie2x',
    official: [
      {
        link: 'http://annie2x.com/',
        name: 'Annie2x官网'
      }
    ],
    others: []
  },
  {
    id: 'a标签',
    name: 'a标签协议',
    official: [
      {
        link: 'https://www.w3school.com.cn/tags/att_a_href.asp',
        name: 'HTML <a> 标签---W3school'
      }
    ],
    others: [
      {
        link: 'http://xiaodongxier.com/824.html',
        name: 'H5中a标签的电话和邮件功能'
      },
      {
        link: 'https://blog.csdn.net/sipallan/article/details/51049925',
        name: 'html <a>标签属性总结'
      }
    ]
  },
  {
    id: '@property',
    name: '@property',
    official: [
      {
        link: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/@property/syntax',
        name: '@property 可选类型'
      }
    ]
  },
  {
    id: 'Babylon.js',
    name: 'Babylon.js',
    official: [
      {
        link: 'https://www.babylonjs.com/',
        name: 'Babylon中文官网'
      }
    ]
  },
  {
    id: 'css',
    name: 'css',
    official: [
      {
        link: 'https://www.w3.org/Style/CSS/',
        name: 'css官网-最新资讯'
      },
      {
        link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        name: 'MDN css所有属性速查'
      },
      {
        link: 'https://www.w3cschool.cn/moresource/cssreference/index.html',
        name: 'cssreference/.io 一个免费的视觉引导css 学习神器'
      }
    ]
  },
  {
    id: 'canvas',
    name: 'canvas',
    official: [
      {
        link: 'https://www.w3school.com.cn/tags/html_ref_canvas.asp',
        name: 'HTML Canvas 参考手册(w3school)'
      }
    ],
    others: [
      {
        link: 'https://www.runoob.com/w3cnote/html5-canvas-intro.html',
        name: '学习 HTML5 Canvas 这一篇文章就够了'
      }
    ]
  },
  {
    id: 'createjs',
    name: 'create.js',
    official: [
      {
        link: 'https://createjs.com/',
        name: 'createjs 官方文档'
      }
    ]
  },
  {
    id: 'cocos',
    name: 'cocos',
    official: [
      {
        link: 'https://docs.cocos.com/creator/manual/zh/',
        name: 'cocos 官方文档'
      },
      {
        link: 'https://www.bookstack.cn/read/creator3d-1.2/%E6%96%B0%E6%89%8B%E5%85%A5%E9%97%A8.md',
        name: 'Cocos Creator 3D 用户手册'
      }
    ],
    others: [
      {
        link: 'https://docs.cocos.com/creator3d/api/zh/modules/event.html',
        name: 'Creator3dAPI API文档'
      }
    ]
  },
  {
    id: 'Color-UI',
    name: 'Color-UI',
    official: [
      {
        link: 'http://demo.color-ui.com/',
        name: ''
      }
    ],
    others: []
  },
  {
    id: 'Element',
    name: 'Element',
    icon: 'https://element-plus.gitee.io/images/element-plus-logo.svg',
    official: [
      {
        link: 'https://element.eleme.cn/#/zh-CN/component/layout',
        name: 'element UI 2.x 官方文档'
      }
    ],
    others: []
  },
  {
    id: 'Electron',
    name: 'Electron',
    icon: 'https://www.electronjs.org/assets/img/logo.svg',
    official: [
      {
        link: 'https://www.electronjs.org/',
        name: 'Electron官方文档'
      }
    ],
    others: []
  },
  {
    id: 'eslint',
    name: 'eslint',
    official: [
      {
        link: 'https://zh-hans.eslint.org/',
        name: 'eslint中文文档'
      }
    ],
    others: [
      {
        link: 'https://www.cnblogs.com/iwillrich/p/16443307.html',
        name: 'Vue脚手架 eslintrc.js 配置速查'
      },
      {
        link: 'https://www.jianshu.com/p/fe727ad2bbf4',
        name: 'eslintrc.js配置文件详解'
      }
    ]
  },
  {
    id: 'Element-Plus',
    name: 'Element-Plus',
    icon: 'https://element-plus.gitee.io/images/element-plus-logo.svg',
    official: [
      {
        link: 'https://element-plus.gitee.io/zh-CN/component/button.html',
        name: 'element-plus 官方文档'
      }
    ]
  },
  {
    id: 'Echarts',
    name: 'Echarts',
    icon: 'https://echarts.apache.org/zh/images/favicon.png',
    official: [
      {
        link: 'https://echarts.apache.org/zh/index.html',
        name: 'Echarts 官方文档'
      }
    ]
  },
  {
    id: 'Express',
    name: 'Express',
    official: [
      {
        link: 'https://www.expressjs.com.cn/',
        name: 'Express中文官网'
      }
    ],
    others: [
      {
        link: 'https://www.runoob.com/nodejs/nodejs-express-framework.html?_t_t_t=0.6210600977753176',
        name: 'Express框架 菜鸟教程'
      },
      {
        link: 'https://www.runoob.com/w3cnote/express-4-x-api.html',
        name: 'Express 4.x API 中文文档'
      }
    ]
  },
  {
    id: 'Flutter',
    name: 'Flutter',
    official: [
      {
        link: 'https://flutter.dev/',
        name: 'Flutter英文官网'
      },
      {
        link: 'https://flutter.cn/',
        name: 'Flutter中文官网'
      }
    ],
    others: [
      {
        link: 'https://codelabs.flutter-io.cn/',
        name: 'Flutter Codelabs'
      },
      {
        link: 'https://flutter.cn/docs/cookbook',
        name: 'Flutter教程文档'
      },
      {
        link: 'https://book.flutterchina.club/',
        name: '《Flutter实现·第二版》'
      }
    ]
  },
  {
    id: 'iScroll',
    name: 'iScroll',
    icon: 'https://iscrolljs.com/wp-content/uploads/2021/04/fav_iscrolljs_iGq_icon.ico',
    official: [
      {
        link: 'https://iscrolljs.com/',
        name: 'iScroll 官网'
      },
      {
        link: 'http://caibaojian.com/iscroll-5/gettingstart.html',
        name: 'iScroll 官方文档'
      }
    ]
  },
  {
    id: 'jquery',
    name: 'jquery',
    official: [
      {
        link: 'https://www.w3school.com.cn/jquery/index.asp',
        name: 'jQuery w3school教程'
      }
    ],
    others: [
      {
        link: 'http://hemin.cn/jq/',
        name: 'jQuery 1.12.1 API速查表'
      }
    ]
  },
  {
    id: 'Micro-app',
    name: 'Micro-app',
    official: [
      {
        link: 'http://cangdu.org/micro-app/docs.html#/',
        name: 'Micro-app教程'
      }
    ]
  },
  {
    id: 'Material-UI',
    name: 'Material-UI',
    official: [
      {
        link: 'https://mui.com/',
        name: 'Material-UI官网'
      }
    ]
  },
  {
    id: 'MUI',
    name: 'MUI',
    icon: 'https://dev.dcloud.net.cn/mui/favicon.ico',
    official: [
      {
        link: 'https://dev.dcloud.net.cn/mui/ui/',
        name: ''
      }
    ]
  },
  {
    id: 'Mint-ui',
    name: 'Mint-ui',
    official: [
      {
        link: 'http://mint-ui.github.io/docs/#/',
        name: ''
      }
    ]
  },
  {
    id: 'Node.js',
    name: 'Node.js',
    official: [
      {
        link: 'https://nodejs.p2hp.com/',
        name: 'Node.js中文网'
      },
      {
        link: 'https://nodejs.org/zh-cn',
        name: 'Node.js官网'
      }
    ],
    others: [
      {
        link: 'https://www.w3cschool.cn/nodejs/',
        name: 'Node.js教程 w3cSchool'
      },
      {
        link: 'https://www.runoob.com/nodejs/nodejs-tutorial.html',
        name: 'Node.js教程 菜鸟教程'
      }
    ]
  },
  {
    id: 'nuxt',
    name: 'nuxt',
    official: [
      {
        link: 'https://v2.nuxt.com/',
        name: 'nuxt2 官网'
      },
      {
        link: 'https://www.nuxtjs.cn/guide/installation',
        name: 'nuxt2.x 中文文档'
      },
      {
        link: 'https://nuxt.com/docs/getting-started/installation',
        name: 'nuxt3 官网'
      }
    ],
    others: [
      {
        link: 'http://57code.gitee.io/nuxt3-docs-zh/getting-started/installation.html',
        name: 'nuxt3 中文文档'
      },
      {
        link: 'https://ezdoc.cn/docs/nuxtjs/nuxt-config',
        name: 'Nuxt.js v3.5.3 中文开发文档手册'
      }
    ]
  },
  {
    id: 'Naive UI',
    name: 'Naive UI',
    official: [
      {
        link: 'https://www.naiveui.com/zh-CN/os-theme/docs/installation',
        name: 'Naive UI官方文档'
      }
    ]
  },
  {
    id: 'Pinia',
    name: 'Pinia',
    official: [
      {
        link: 'https://pinia.web3doc.top/',
        name: 'Pinia中文文档'
      }
    ]
  },
  {
    id: 'Pixi.js',
    name: 'Pixi.js',
    official: [
      {
        link: 'http://pixijs.huashengweilai.com/guide/start/1.introduction.html',
        name: 'PixiJS中文网'
      }
    ]
  },
  {
    id: 'prettier',
    name: 'prettier',
    official: [
      {
        link: 'https://www.prettier.cn/',
        name: 'Prettier中文网'
      }
    ],
    others: [
      {
        link: 'https://blog.csdn.net/qq_42611074/article/details/129232744',
        name: 'prettier所有配置项详细介绍（基于最新版2.8.7）'
      },
      {
        link: 'https://www.freesion.com/article/8482878644/',
        name: '.PRETTIERRC代码格式化配置介绍'
      },
      {
        link: 'https://blog.csdn.net/weixin_49409651/article/details/118082396',
        name: 'prettierrc.js 的一些配置项说明'
      }
    ]
  },
  {
    id: 'puppeteer',
    name: 'puppeteer',
    official: [
      {
        link: 'https://puppeteer.bootcss.com//',
        name: 'puppeteer官网'
      }
    ]
  },
  {
    id: 'qiankun',
    name: 'qiankun',
    official: [
      {
        link: 'https://qiankun.umijs.org/zh/',
        name: 'qiankun官网'
      }
    ]
  },
  {
    id: 'React',
    name: 'React',
    official: [
      {
        link: 'https://react.docschina.org/',
        name: 'React官网'
      }
    ],
    others: [
      {
        link: 'https://reactjs.bootcss.com/',
        name: 'React 中文文档'
      }
    ]
  },
  {
    id: 'Rollup',
    name: 'Rollup',
    official: [
      {
        link: 'https://www.rollupjs.com/',
        name: 'rollup.js 中文文档'
      }
    ],
    others: []
  },
  {
    id: 'Svelte.js',
    name: 'Svelte.js',
    official: [
      {
        link: 'https://www.svelte.cn/',
        name: 'Svelte.js官网'
      }
    ]
  },
  {
    id: 'solid.js',
    name: 'solid.js',
    official: [
      {
        link: 'https://www.solidjs.com/',
        name: 'solid.js官网'
      }
    ]
  },
  {
    id: 'Single-spa',
    name: 'Single-spa',
    official: [
      {
        link: 'https://zh-hans.single-spa.js.org/docs/getting-started-overview/',
        name: 'Single spa中文官网'
      },
      {
        link: 'https://single-spa.js.org/',
        name: 'Single spa英文官网'
      },
      {
        link: 'https://github.com/single-spa/single-spa',
        name: 'github仓库地址'
      }
    ],
    others: [
      {
        link: 'https://wener.me/notes/web/framework/single-spa',
        name: 'single spa教程'
      }
    ]
  },
  {
    id: 'Taro',
    name: 'Taro',
    official: [
      {
        link: 'https://taro.jd.com/',
        name: 'Taro官网'
      }
    ],
    others: []
  },
  {
    id: 'TaroUI',
    name: 'TaroUI',
    official: [
      {
        link: 'https://taro-ui.jd.com/#/',
        name: 'Taro-UI官网'
      }
    ],
    others: []
  },
  {
    id: 'three.js',
    name: 'three.js',
    official: [
      {
        link: 'http://www.webgl3d.cn/',
        name: 'Three.js中文网'
      }
    ],
    others: []
  },
  {
    id: 'tinymce',
    name: 'tinymce',
    official: [
      {
        link: 'http://tinymce.ax-z.cn/',
        name: 'tiny中文文档'
      }
    ],
    others: []
  },
  {
    id: 'Typescript',
    name: 'Typescript',
    official: [
      {
        link: 'http://typescript.p2hp.com/',
        name: 'typescript中文文档'
      }
    ],
    others: [
      {
        link: 'https://zhuanlan.zhihu.com/p/601687200',
        name: 'tsconfig.json各配置属性详解'
      },
      {
        link: 'https://blog.csdn.net/u010100877/article/details/125501185',
        name: 'tsconfig.json详细配置'
      },
      {
        link: 'https://blog.51cto.com/u_15689678/5396841',
        name: 'tsconfig.json配置详解 '
      },
      {
        link: 'http://wiki.41bj.com/brochure/%E9%9B%B6%E5%9F%BA%E7%A1%80%E5%AD%A6%E9%80%8FTypeScript/31-%E9%80%90%E6%9D%A1%E6%9D%A5%E7%9C%8Btsconfig.json%E9%85%8D%E7%BD%AE.html',
        name: '逐条来看tsconfig.json配置'
      }
    ]
  },
  {
    id: 'Tailwind',
    name: 'Tailwind',
    official: [
      {
        link: 'https://www.tailwindcss.cn/',
        name: 'tailwindcss官网'
      }
    ],
    others: [
      {
        link: 'https://juejin.cn/post/7231539903649398843',
        name: '《快速掌握 Tailwind：最流行的原子化 CSS 框架》'
      }
    ]
  },
  {
    id: '腾讯云trtc',
    name: '腾讯云trtc',
    official: [
      {
        link: 'https://cloud.tencent.com/document/product/647/17249',
        name: '腾讯云trtc web端API文档'
      }
    ],
    others: []
  },
  {
    id: 'uView',
    name: 'uView',
    official: [
      {
        link: 'https://www.uviewui.com/',
        name: ''
      }
    ],
    others: []
  },
  {
    id: 'vue2',
    name: 'vue2',
    official: [
      {
        link: 'https://v2.cn.vuejs.org/',
        name: ''
      }
    ],
    others: []
  },
  {
    id: 'vue3',
    name: 'vue3',
    official: [
      {
        link: 'https://cn.vuejs.org/',
        name: ''
      }
    ],
    others: [
      {
        link: 'https://www.javascriptc.com/vue3js/guide/introduction.html',
        name: 'vue3中文文档'
      }
    ]
  },
  {
    id: 'vite',
    name: 'vite',
    official: [
      {
        link: 'https://cn.vitejs.dev/config/',
        name: 'vite官方中文文档'
      }
    ],
    others: []
  },
  {
    id: 'vant',
    name: 'vant',
    official: [
      {
        link: 'https://gitee.com/vant-contrib/vant#http://vant-contrib.gitee.io/vant-weapp',
        name: 'github仓库地址'
      },
      {
        link: 'https://vant-contrib.gitee.io/vant/v2/#/zh-CN/',
        name: 'vant2 vue2版本中文文档'
      },
      {
        link: 'https://www.w3cschool.cn/vantlesson/vantlesson-htl635uq.html',
        name: 'vant2 vue2版本中文文档'
      },
      {
        link: 'https://vant-contrib.gitee.io/vant/#/zh-CN',
        name: 'vant4 vue3版本中文文档'
      },
      {
        link: 'https://vant-contrib.gitee.io/vant-weapp/#/home',
        name: 'vant 小程序版本中文文档'
      }
    ],
    others: []
  },
  {
    id: 'VueQuill',
    name: 'VueQuill',
    official: [
      {
        link: 'https://vueup.github.io/vue-quill/guide/',
        name: ''
      }
    ]
  },
  {
    id: 'vue-quill-editor',
    name: 'vue-quill-editor',
    official: [
      {
        link: 'https://www.npmjs.com/package/vue-quill-editor',
        name: ''
      },
      {
        link: 'https://www.kancloud.cn/liuwave/quill/1409423',
        name: 'Quil富文本编辑器官方中文文档'
      }
    ]
  },
  {
    id: 'webpack',
    name: 'webpack',
    official: [
      {
        link: 'https://www.webpackjs.com/concepts/',
        name: 'webpack中文文档'
      }
    ]
  },
  {
    id: 'wujie',
    name: 'wujie',
    official: [
      {
        link: 'https://gitcode.net/mirrors/Tencent/wujie?utm_source=csdn_github_accelerator',
        name: 'gitcode仓库地址'
      }
    ]
  },
  {
    id: 'web3.js',
    name: 'web3.js',
    official: [
      {
        link: 'https://learnblockchain.cn/docs/web3js-0.2x/#',
        name: 'web3.js中文文档'
      }
    ]
  },
  {
    id: '微信开发文档',
    name: '微信开发文档',
    official: [
      {
        link: 'https://developers.weixin.qq.com/miniprogram/dev/framework/',
        name: '微信小程序开发文档'
      }
    ]
  },
  {
    id: 'uniapp',
    name: 'uniapp',
    official: [
      {
        link: 'https://uniapp.dcloud.net.cn/uniCloud/unipay.html#',
        name: 'uniapp官网'
      }
    ],
    others: [
      {
        link: 'https://www.w3cschool.cn/uni_app/',
        name: 'uniapp中文文档 w3cSchool'
      }
    ]
  },
  {
    id: 'unocss',
    name: 'unocss',
    official: [
      {
        link: 'https://unocss.dev/integrations/vite',
        name: 'https://unocss.dev/integrations/vite'
      }
    ],
    others: [
      {
        link: 'https://juejin.cn/post/7129153610855743525',
        name: '新一代原子化引擎 unocss'
      },
      {
        link: 'https://juejin.cn/post/7161967494905724942#heading-17',
        name: '原子化CSS引擎UnoCSS'
      }
    ]
  }
])

const mode = ref(0)
const onChangeMode = () => {
  mode.value = mode.value == 0 ? 1 : 0
}

const activeDocs = ref({})
const showPanel = ref(false)
const onLookPanel = (item) => {
  showPanel.value = false
  nextTick(() => {
    showPanel.value = true
  })
  activeDocs.value = item
}
</script>

<style lang="scss" scoped>
.page {
  margin: 0 auto;
  position: relative;
  max-width: 1250px;
  font-size: 20px;
}
.box {
  width: 1080px;
  min-height: 80vh;
  padding: 40px 80px;
  margin: 0 auto;
  border-radius: 0;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 20px;
  background: url(images/paper.png);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;
}
.item-box {
  width: 140px;
  margin: 12px 15px;
}
.item {
  margin: 0;
  width: fit-content;
  height: auto;
  background: transparent;
  padding: 0;
  border: none;
}
.item {
  --border-right: 6px;
  --text-stroke-color: rgba(255, 255, 255, 0.6);
  --animation-color: #1e80ff;
  --fs-size: 14px;
  letter-spacing: 3px;
  text-decoration: none;
  font-size: var(--fs-size);
  font-family: 'Arial';
  position: relative;
  // text-transform: uppercase;
  color: black;
  -webkit-text-stroke: 1px var(--text-stroke-color);
  cursor: pointer;
  white-space: nowrap;
}
/* this is the text, when you hover on item */
.hover-text {
  position: absolute;
  box-sizing: border-box;
  content: attr(data-text);
  color: var(--animation-color);
  width: 0%;
  inset: 0;
  border-right: var(--border-right) solid var(--animation-color);
  overflow: hidden;
  transition: 0.5s;
  -webkit-text-stroke: 1px var(--animation-color);
}
/* hover */
.item:hover .hover-text {
  width: 100%;
  filter: drop-shadow(0 0 23px var(--animation-color));
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  max-width: 80vw;
  height: fit-content;
  padding: 12px 28px;
  min-height: 250px;
  border-radius: 8px;
  background-color: rgba(106, 123, 252, 0.96);
  border: 2px solid rgb(125, 140, 255);
  animation: popup 0.4s ease-out forwards;
  transform-origin: center center;
  color: #fff;
  h3 {
    text-align: center;
    margin-bottom: 8px;
  }
  p {
    font-size: 18px;
    font-weight: bold;
  }
  p:nth-of-type(2) {
    margin-top: 20px;
  }
  a {
    display: block;
    font-size: 15px;
    margin: 6px 0;
    color: #fff;
    &:hover {
      text-decoration: underline;
    }
  }
}
@keyframes popup {
  from {
    transform: translate(-50%, -50%) scaleX(0);
  }
  75% {
    transform: translate(-50%, -50%) scaleX(1);
  }
}

@media (max-width: 480px) {
  .box {
    margin-top: 12px;
    padding: 12px 0;
  }
}
</style>
