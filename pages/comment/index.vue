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
var disqus_config = function () {
  this.page.url = PAGE_URL // Replace PAGE_URL with your page's canonical URL variable
  this.page.identifier = PAGE_IDENTIFIER // Replace PAGE_IDENTIFIER with your page's unique identifier variable
}
onMounted(() => {
  // DON'T EDIT BELOW THIS LINE
  var d = document,
    s = d.createElement('script')
  s.src = 'https://EXAMPLE.disqus.com/embed.js'
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
#disqus_thread iframe {
  display: none;
}
</style>
