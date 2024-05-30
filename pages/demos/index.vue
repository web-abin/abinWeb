<template>
  <div class="page">
    <img src="@/assets/images/wx.jpg" alt="" />
    <img src="@/assets/images/qq-code.jpeg" alt="" />
  </div>
</template>

<script setup></script>

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
