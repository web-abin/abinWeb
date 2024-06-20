<template>
  <div class="page">
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
onMounted(() => {
  var d = document,
    s = d.createElement('script')
  s.src = 'https://https-web-abin-github-io-abinweb-tools.disqus.com/embed.js'
  s.setAttribute('data-timestamp', +new Date())
  ;(d.head || d.body).appendChild(s)
})
</script>

<style scoped lang="scss">
.page {
  min-height: calc(100vh - $--header-height - 160px);
  padding: 16px 64px;
}
</style>
<style>
/* #disqus_thread iframe {
  display: none;
} */
</style>
