<template>
  <div class="page">
    <div class="wx-tip">
      <div class="wx-tip__icon">💬</div>
      <p class="wx-tip__text">微信搜索公众号</p>
      <p class="wx-tip__name">「AI造物进化」</p>
      <p class="wx-tip__desc">发送 <strong>"进群"</strong> 获取微信群二维码</p>
    </div>
    <img src="@/assets/images/qq-code.jpeg" alt="" />
  </div>
</template>

<script setup>
import config from '~/config'

// SEO优化
useSeo({
  title: `样例 | ${config.SEO_title}`,
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

.wx-tip {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 260px;
  height: 70vh;
  border: 2px dashed #07c160;
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  background: #f0faf4;

  &__icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  &__text {
    font-size: 15px;
    color: #666;
    margin: 0 0 6px;
  }

  &__name {
    font-size: 22px;
    font-weight: bold;
    color: #07c160;
    margin: 0 0 16px;
  }

  &__desc {
    font-size: 14px;
    color: #444;
    line-height: 1.6;
    margin: 0;

    strong {
      color: #07c160;
      font-size: 16px;
    }
  }
}

@media (max-width: 480px) {
  .page {
    flex-direction: column;
    img {
      height: 90vh;
    }
  }

  .wx-tip {
    width: 80vw;
    height: auto;
    min-height: 240px;
  }
}
</style>
