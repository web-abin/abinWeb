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
          const next = stored || 'light';
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
  color-scheme: light;
  --app-scrollbar: rgba(59, 130, 246, 0.4);
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
  --app-bg: #111111;
  --app-fg: #ededed;
  --app-muted: #a3a3a3;
  --app-panel: #1a1a1a;
  --app-border: rgba(255, 255, 255, 0.12);
  --app-accent: #d4d4d4;
  --app-accent-2: #fafafa;
  --app-accent-3: #a3a3a3;
  --app-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  --app-scrollbar: rgba(255, 255, 255, 0.24);
  color-scheme: dark;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
</style>
