<script setup lang="ts">
const { theme, applyTheme, initTheme } = useTheme()

onMounted(() => {
  initTheme()
  watch(theme, applyTheme, { immediate: true })
})

useHead({
  script: [
    {
      tagPosition: 'head',
      innerHTML: `(() => {
        try {
          const stored = localStorage.getItem('theme');
          const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          const next = stored || (prefersDark ? 'dark' : 'light');
          document.documentElement.dataset.theme = next;
        } catch (e) {}
      })();`
    }
  ]
})
</script>

<template>
  <div>
    <!-- 路由出口 -->
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  background: var(--app-bg);
  color: var(--app-fg);
  font-family:
    "JetBrains Mono",
    "Fira Code",
    "SFMono-Regular",
    Menlo,
    Monaco,
    Consolas,
    "Liberation Mono",
    "Courier New",
    monospace;
  letter-spacing: 0.02em;
}

:root {
  --app-bg: #f6f8fb;
  --app-fg: #0f172a;
  --app-muted: #64748b;
  --app-panel: #ffffff;
  --app-border: rgba(15, 23, 42, 0.08);
  --app-accent: #2563eb;
  --app-accent-2: #0ea5e9;
  --app-accent-3: #22d3ee;
  --app-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
}

html[data-theme='dark'] {
  --app-bg: #0b1018;
  --app-fg: #e2e8f0;
  --app-muted: #94a3b8;
  --app-panel: #0f172a;
  --app-border: rgba(148, 163, 184, 0.16);
  --app-accent: #3b82f6;
  --app-accent-2: #22d3ee;
  --app-accent-3: #38bdf8;
  --app-shadow: 0 12px 30px rgba(15, 23, 42, 0.45);
}
</style>
