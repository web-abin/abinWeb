<template>
  <div class="page">
    <img src="@/assets/images/wx.jpg" alt="" />
    <img src="@/assets/images/qq-code.jpeg" alt="" />
  </div>
</template>

<script setup>
import config from '~/config'

// SEO优化
useSeo({
  title: `样例 - ${config.SEO_title}`,
  description: `前端助手样例页面，展示各种前端案例和示例`,
  keywords: `${config.SEO_keywords}, 前端案例, 示例代码`,
  type: 'website'
})
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  column-gap: 100px;
  justify-content: center;
  align-items: center;
  img {
    display: block;
    width: auto;
    max-width: 90vw;
    height: 70vh;
    object-fit: cover;
  }
}

@media (max-width: 480px) {
  .page {
    flex-direction: column;
    img {
      height: 90vh;
    }
  }
}
</style>
