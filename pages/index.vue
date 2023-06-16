<script setup lang="ts">
const route = useRoute()

definePageMeta({
  layout: false,
});
</script>

<template>
  <div>
    <h1>前端助手</h1>
    <NuxtLink class="navigation-link" to="/tools">进入</NuxtLink>
  </div>
</template>
