<template>
  <div class="page">
    <div class="loader" v-if="loadStatus === 1"></div>
    <p class="error-tip" v-if="loadStatus === 3">评论功能加载失败</p>
    <div id="disqus_thread"></div>
    <noscript
      >Please enable JavaScript to view the
      <a href="https://disqus.com/?ref_noscript"
        >comments powered by Disqus.</a
      ></noscript
    >
  </div>
</template>

<script setup>
const loadStatus = ref(1)

onMounted(() => {
  var d = document,
    s = d.createElement('script')
  s.src = 'https://https-web-abin-github-io-abinweb-tools.disqus.com/embed.js'
  s.setAttribute('data-timestamp', +new Date())
  ;(d.head || d.body).appendChild(s)
  loadStatus.value = 2
  setTimeout(() => {
    if (!document.querySelector('#disqus_thread iframe')) loadStatus.value = 3
  }, 3000)
})
</script>

<style scoped lang="scss">
.page {
  min-height: calc(100vh - $--header-height - 160px);
  padding: 16px 64px;
}
.error-tip,
.loader {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto auto;
}
.error-tip {
  width: fit-content;
  height: fit-content;
  color: #000;
  font-size: 20px;
  font-family: cursive, 'Courier New', Courier, monospace;
}
.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border-radius: 50%;
  background: conic-gradient(
    #25b09b 25%,
    #f03355 0 50%,
    #514b82 0 75%,
    #ffa516 0
  );
  animation: l22 2s infinite linear;
}
.loader::before,
.loader::after {
  content: '';
  grid-area: 1/1;
  margin: 15%;
  border-radius: 50%;
  background: inherit;
  animation: inherit;
}
.loader::after {
  margin: 25%;
  animation-duration: 3s;
}
@keyframes l22 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
<style>
#disqus_thread [sandbox*='allow-scripts'] {
  display: none;
}
</style>
