<template>
  <div class="page">
    <div class="navigation-tools">
      <dl>
        <dd
          v-for="(nav, navindex) in list"
          :key="navindex"
          :id="navindex"
          :class="{ nav_active: navindex == curIndex }"
        >
          <a :href="`#${nav.id}`" @click="toNav(navindex)">{{ nav.name }}</a>
        </dd>
      </dl>
    </div>
    <div class="tools-box">
      <section v-for="(tool, index) in list" :key="index">
        <span :id="tool.id" class="point"></span>
        <header>{{ tool.name }}</header>
        <a
          target="_blank"
          rel="nofollow external"
          class="tool-item"
          v-for="link in tool.collection"
          :key="link.link"
          :href="link.link"
          ><img
            alt=""
            decoding="async"
            loading="lazy"
            :src="link.icon"
            @error="handleImageError($event)"
          />
          <span class="tool-name">{{ link.name }}</span></a
        >
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import tools from './tools.ts'
import config from '~/config'
import Icon404 from '@/assets/images/icon-404.png'

// SEO优化
useSeo({
  title: `工具 - ${config.SEO_title}`,
  description: config.TOOLS_description,
  keywords: `${config.SEO_keywords}, 前端工具, 开发工具`,
  type: 'website'
})

const list = ref(tools)

const curIndex = ref(0)
const toNav = (index) => {
  curIndex.value = index
}

// 处理图片加载失败，显示默认图标
const handleImageError = (event) => {
  const img = event.target
  // 如果已经是默认图标，则不再替换，避免无限循环
  if (img.src && !img.src.includes('icon-404.png')) {
    img.src = Icon404
  }
}
</script>

<style lang="scss" scoped>
.page {
  margin: 0 auto;
  position: relative;
  max-width: 1300px;
}
.navigation-tools {
  position: fixed;
  width: fit-content;
  height: fit-content;
  max-height: calc(100% - 110px);
  padding: 8px 0;
  box-sizing: border-box;
  transition: all 0.2s linear;
  overflow: auto;
  dd {
    margin: 0;
    padding: 6px 0;
    letter-spacing: 0.5px;
    a {
      font-size: 14px;
      color: #5e5d5b;
      display: inline-block;
      padding: 2px 4px;
      transition: 0.1s;
      text-decoration: none;
      &:hover {
        background: #ff5a00;
        border-radius: 3px;
      }
    }
  }
  .nav_active {
    a {
      color: #ff5a00;
      background: transparent !important;
    }
  }
}
.tools-box {
  width: 1080px;
  min-height: 800px;
  margin: 0 auto;
  section {
    position: relative;
    width: 100%;
    min-height: 166px;
    padding: 42px 48px 10px 48px;
    border-radius: 8px;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 20px;
    background-color: $--color-box;
    .point {
      position: absolute;
      left: 0;
      top: -60px;
      opacity: 0;
    }
    header {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      line-height: 42px;
      font-size: 15px;
      padding-left: 46px;
      font-weight: 600;
      flex-shrink: 0;
      border-bottom: 0.5px solid $--color-border;
    }
    .tool-item {
      width: 164px;
      height: 42px;
      flex-shrink: 0;
      line-height: 42px;
      cursor: pointer;
      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        vertical-align: middle;
      }
      .tool-name {
        font-size: 14px;
        color: $--color-text;
        vertical-align: middle;
      }
    }
  }
}

@media (max-width: 480px) {
  .navigation-tools {
    display: none;
    // top: 0;
    // dl{
    //   display: flex;
    // }
  }
  .tools-box {
    width: unset;
    section {
      padding: 58px 16px 16px 16px;
      header {
        padding: 0 16px;
      }
      .tool-item {
        width: 140px;
      }
    }
  }
}
</style>
