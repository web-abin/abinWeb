<script setup lang="ts">
import questionData from '~/data/interview/questions.json'
import { tracks, references, type InterviewQuestion } from '~/data/interview/catalog'
const questions = questionData as InterviewQuestion[]
const route = useRoute()
const search = useState('interview-search', () => '')
const difficulty = useState('interview-difficulty', () => '全部难度')
const mobileOpen = ref(false)
const copied = ref('')
const current = computed(() => questions.find(q => q.id === route.params.slug))
if (route.params.slug && !current.value) throw createError({ statusCode: 404, statusMessage: '这道面试题还未收录' })
const selectedTrack = computed(() => tracks.find(t => t.id === current.value?.track))
const filtered = computed(() => {
  const words = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean)
  return questions.filter(q => (difficulty.value === '全部难度' || q.difficulty === difficulty.value)
    && words.every(word => [q.title, q.category, ...q.tags, q.summary, ...q.answer, q.example, q.pitfalls, ...q.followups, tracks.find(t => t.id === q.track)?.name].join(' ').toLocaleLowerCase().includes(word)))
})
const groups = computed(() => tracks.map(track => ({ ...track,
  categories: track.categories.map(name => ({ name, questions: filtered.value.filter(q => q.track === track.id && q.category === name) })).filter(c => c.questions.length)
})).filter(t => t.categories.length))
const position = computed(() => current.value ? questions.findIndex(q => q.id === current.value!.id) : -1)
const previous = computed(() => questions[position.value - 1])
const next = computed(() => questions[position.value + 1])
const pageTitle = computed(() => current.value ? `${current.value.title} · 面试题` : '面试题 · Agent 应用开发与 AI Native 开发')
const description = computed(() => current.value?.summary || '按知识体系整理 Agent 应用开发、AI Native 开发面试题，包含参考回答、场景示例、常见误区与延伸追问。')
useHead(() => ({ title: `${pageTitle.value} | 前端助手`,
  meta: [{ name: 'description', content: description.value }, { property: 'og:title', content: pageTitle.value }, { property: 'og:description', content: description.value }],
  link: [{ rel: 'canonical', href: `https://web-abin.github.io/abinWeb/interview/${current.value ? current.value.id + '/' : ''}` }]
}))
function resetReadingPosition() {
  if (!import.meta.client || route.hash) return
  document.getElementById('__nuxt')?.scrollTo({ top: 0 })
  document.getElementById('interview-title')?.focus({ preventScroll: true })
}
onMounted(resetReadingPosition)
watch(() => route.path, () => {
  mobileOpen.value = false
  copied.value = ''
  resetReadingPosition()
}, { flush: 'post' })
const reset = () => { search.value = ''; difficulty.value = '全部难度' }
async function copyLink() {
  try { await navigator.clipboard.writeText(window.location.href); copied.value = '链接已复制' }
  catch { copied.value = '复制失败，请复制浏览器地址栏链接' }
}
</script>

<template>
  <div class="interview">
    <div class="mobile-toolbar"><span>面试题</span><button type="button" :aria-expanded="mobileOpen" aria-controls="question-sidebar" @click="mobileOpen = !mobileOpen">{{ mobileOpen ? '收起目录' : '题目目录与搜索' }}</button></div>
    <aside id="question-sidebar" class="question-sidebar" :class="{ 'is-open': mobileOpen }" aria-label="面试题目录">
      <NuxtLink to="/interview/" class="catalog-title" :aria-current="!current ? 'page' : undefined">面试题库 <span>{{ questions.length }} 题</span></NuxtLink>
      <label class="search-label" for="question-search">搜索题目与答案</label>
      <div class="search-field"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg><input id="question-search" v-model="search" type="search" placeholder="搜索 RAG、MCP、上下文…" /></div>
      <label class="search-label" for="difficulty">题目难度</label>
      <select id="difficulty" v-model="difficulty"><option>全部难度</option><option>基础</option><option>进阶</option><option>实战</option></select>
      <p class="result-count" aria-live="polite">{{ search || difficulty !== '全部难度' ? `找到 ${filtered.length} / ${questions.length} 道题` : '按方向浏览，循序深入' }}</p>
      <nav aria-label="分类与题目"><section v-for="track in groups" :key="track.id" class="track-group"><h2>{{ track.name }}</h2><details v-for="category in track.categories" :key="category.name" open><summary>{{ category.name }}<span>{{ category.questions.length }}</span></summary><NuxtLink v-for="q in category.questions" :key="q.id" :to="`/interview/${q.id}/`" class="question-link" :aria-current="current?.id === q.id ? 'page' : undefined">{{ q.title }}</NuxtLink></details></section></nav>
      <div v-if="!filtered.length" class="empty-state"><p>没有找到匹配的题目。</p><p>试试更短的关键词，或清除难度筛选。</p><button type="button" @click="reset">清除筛选</button></div>
      <p class="catalog-note">原创整理题 · 非公司真题<br />内容校对：2026-11-18</p>
    </aside>
    <div class="reading-area">
      <article v-if="current" :key="current.id" class="question-article" aria-labelledby="interview-title">
        <div class="breadcrumbs"><NuxtLink to="/interview/">面试题</NuxtLink><span aria-hidden="true">/</span><span>{{ selectedTrack?.name }}</span><span aria-hidden="true">/</span><span>{{ current.category }}</span></div>
        <div class="article-meta"><span class="difficulty">{{ current.difficulty }}</span><span v-for="tag in current.tags" :key="tag">{{ tag }}</span></div>
        <h1 id="interview-title" tabindex="-1">{{ current.title }}</h1><p class="lead">{{ current.summary }}</p>
        <div class="article-actions"><button type="button" @click="copyLink">复制题目链接</button><span aria-live="polite">{{ copied }}</span></div>
        <nav class="article-toc" aria-label="本题目录"><a href="#answer">参考回答</a><a href="#example">场景示例</a><a href="#pitfalls">常见误区</a><a href="#followups">延伸追问</a></nav>
        <section id="answer"><h2>参考回答</h2><p v-for="(paragraph, i) in current.answer" :key="i">{{ paragraph }}</p></section>
        <section id="example"><h2>场景示例</h2><p>{{ current.example }}</p></section>
        <section id="pitfalls"><h2>常见误区</h2><p>{{ current.pitfalls }}</p></section>
        <section id="followups"><h2>延伸追问</h2><ul><li v-for="followup in current.followups" :key="followup">{{ followup }}</li></ul></section>
        <section class="further-reading"><h2>延伸阅读</h2><p class="small-note">以下为相关官方资料；本题回答为工程实践整理，场景均为示例。具体 API 与协议以使用版本的文档为准。</p><a v-for="id in current.references" :key="id" :href="references[id].url" target="_blank" rel="noopener noreferrer">{{ references[id].title }} <span aria-hidden="true">↗</span></a></section>
        <nav class="page-turn" aria-label="相邻题目"><NuxtLink v-if="previous" :to="`/interview/${previous.id}/`"><span>上一题</span>{{ previous.title }}</NuxtLink><NuxtLink v-if="next" :to="`/interview/${next.id}/`"><span>下一题</span>{{ next.title }}</NuxtLink></nav>
      </article>
      <article v-else class="overview" aria-labelledby="interview-title">
        <div class="breadcrumbs"><span>面试题</span><span aria-hidden="true">/</span><span>学习导览</span></div>
        <h1 id="interview-title" tabindex="-1">把概念讲清楚，<br />把方案讲落地。</h1>
        <p class="lead">围绕 Agent 应用开发与 AI Native 开发，<br class="desktop-break" />从基础概念到系统设计，整理一份可以反复查阅的面试题库。</p>
        <p class="overview-note">{{ questions.length }} 道整理题 · 2 个方向 · 8 个分类</p>
        <div class="study-tracks"><section v-for="track in tracks" :key="track.id" class="study-track"><h2>{{ track.name }}</h2><p>{{ track.description }}</p><ul><li v-for="category in track.categories" :key="category">{{ category }}</li></ul><NuxtLink :to="`/interview/${questions.find(q => q.track === track.id)!.id}/`">开始阅读 <span aria-hidden="true">→</span><span class="sr-only">{{ track.name }}</span></NuxtLink></section></div>
        <section class="reading-guide"><h2>怎么用这份题库</h2><p>从左侧选择方向和题目，或通过关键词搜索题目与答案。先试着用自己的话回答，再对照参考回答，结合场景补足方案中的取舍，最后用延伸追问检验理解。</p><p>题目分为基础、进阶、实战三个难度。回答提供讨论框架，面试时请结合自己的项目证据；没有做过的实践，不必包装成亲身经历。</p></section>
        <p class="content-note">本题库为原创整理与模拟场景，非公司真题汇编。各题附相关官方资料，便于继续查阅。首批整理于 2026-11-18。</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.interview { --interview-muted: #526176; --interview-link: #1d4ed8; --interview-soft: #edf3fc; display: grid; grid-template-columns: 292px minmax(0, 1fr); align-items: start; max-width: 1440px; margin: 0 auto; min-height: calc(100vh - 140px); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; letter-spacing: 0; color: var(--app-fg); }
:global(html[data-theme='dark'] .interview) { --interview-muted: #a9b7cb; --interview-link: #8cbbff; --interview-soft: #192b45; }
.interview a, .interview button, .interview input, .interview select, .interview summary { -webkit-tap-highlight-color: transparent; }
.interview :is(a, button, input, select, summary):focus-visible { outline: 2px solid var(--interview-link); outline-offset: 4px; }
.interview ::selection { background: var(--interview-soft); color: var(--interview-link); }
.interview button, .interview input, .interview select { font: inherit; }
.interview button { cursor: pointer; }
.question-sidebar { position: sticky; top: 70px; max-height: calc(100dvh - 90px); overflow-y: auto; padding: 8px 24px 28px 0; scrollbar-width: thin; scrollbar-color: var(--app-border) transparent; }
.catalog-title { display: flex; align-items: center; justify-content: space-between; font-size: 19px; font-weight: 650; margin-bottom: 24px; }
.catalog-title span { color: var(--interview-muted); font-size: 12px; font-weight: 400; }
.search-label { display: block; font-size: 12px; color: var(--interview-muted); margin: 14px 0 7px; }
.search-field { display: flex; gap: 8px; align-items: center; border: 1px solid var(--app-border); background: var(--app-panel); padding: 0 10px; border-radius: 6px; }
.search-field svg { flex-shrink: 0; color: var(--interview-muted); }
.search-field input { min-width: 0; width: 100%; border: 0; color: var(--app-fg); background: transparent; padding: 11px 0; font-size: 13px; caret-color: var(--interview-link); }
.search-field input::placeholder { color: var(--interview-muted); opacity: 1; }
select { width: 100%; color: var(--app-fg); background: var(--app-panel); border: 1px solid var(--app-border); padding: 9px; border-radius: 6px; font-size: 13px !important; }
.result-count { font-size: 12px; color: var(--interview-muted); margin: 12px 0 25px; }
.track-group + .track-group { margin-top: 30px; }
.track-group h2 { font-size: 15px; font-weight: 650; margin-bottom: 10px; }
details { margin: 7px 0; }
summary { cursor: pointer; color: var(--interview-muted); font-size: 13px; padding: 9px 2px; }
summary span { float: right; font-variant-numeric: tabular-nums; font-size: 12px; margin-right: 6px; }
.question-link { display: block; font-size: 13px; line-height: 1.65; padding: 8px 12px; margin: 2px 0; border-radius: 6px; color: var(--interview-muted); overflow-wrap: anywhere; }
.question-link:hover { color: var(--interview-link); background: var(--interview-soft); }
.question-link[aria-current='page'] { background: var(--interview-soft); color: var(--interview-link); font-weight: 600; }
.catalog-note { font-size: 11px; color: var(--interview-muted); line-height: 1.8; border-top: 1px solid var(--app-border); margin-top: 28px; padding-top: 18px; }
.reading-area { background: var(--app-panel); min-height: calc(100vh - 140px); border-radius: 12px; padding: 30px clamp(24px, 4.5vw, 72px) 48px; min-width: 0; }
.question-article, .overview { max-width: 780px; margin: 0 auto; overflow-wrap: anywhere; }
.breadcrumbs { display: flex; flex-wrap: wrap; gap: 10px; font-size: 12px; line-height: 1.7; color: var(--interview-muted); margin-bottom: 30px; }
.breadcrumbs a { color: var(--interview-link); }
h1 { font-size: clamp(26px, 2.7vw, 38px); line-height: 1.45; font-weight: 700; letter-spacing: -.025em; margin: 15px 0 18px; text-wrap: balance; }
h1:focus { outline: none; }
.overview h1 { font-size: clamp(30px, 3.2vw, 46px); margin-top: 40px; }
.lead { font-size: 17px; line-height: 1.9; color: var(--interview-muted); }
.article-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; color: var(--interview-muted); font-size: 12px; }
.difficulty { padding: 3px 8px; background: var(--interview-soft); color: var(--interview-link); border-radius: 4px; }
.article-actions { margin: 22px 0; display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
.article-actions button, .empty-state button, .mobile-toolbar button { background: transparent; color: var(--interview-link); border: 1px solid var(--app-border); padding: 8px 12px; border-radius: 6px; font-size: 12px; }
.article-actions button:hover, .empty-state button:hover { background: var(--interview-soft); }
.article-actions span { font-size: 12px; color: var(--interview-muted); }
.article-toc { display: flex; flex-wrap: wrap; gap: 12px 24px; padding: 18px 0; border-top: 1px solid var(--app-border); border-bottom: 1px solid var(--app-border); margin-bottom: 32px; }
.article-toc a { color: var(--interview-link); font-size: 13px; }
.question-article section { scroll-margin-top: 80px; }
.question-article h2, .reading-guide h2 { font-size: 21px; font-weight: 650; margin: 36px 0 14px; line-height: 1.5; }
.question-article section p, .question-article li, .reading-guide p { font-size: 16px; line-height: 1.95; margin-bottom: 16px; }
ul { padding-left: 22px; }
.question-article li { margin-bottom: 6px; }
.further-reading { margin-top: 40px; border-top: 1px solid var(--app-border); }
.further-reading .small-note { font-size: 13px; color: var(--interview-muted); }
.further-reading a { display: block; color: var(--interview-link); line-height: 1.8; margin: 8px 0; font-size: 14px; text-decoration: underline; text-underline-offset: 4px; }
.page-turn { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; margin-top: 40px; padding-top: 25px; border-top: 1px solid var(--app-border); }
.page-turn a { color: var(--interview-link); line-height: 1.7; font-size: 14px; }
.page-turn span { display: block; color: var(--interview-muted); font-size: 12px; margin-bottom: 8px; }
.overview-note { font-size: 13px; color: var(--interview-muted); margin: 20px 0 38px; }
.study-tracks { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 34px; border-top: 1px solid var(--app-border); border-bottom: 1px solid var(--app-border); padding: 30px 0; }
.study-track h2 { font-size: 21px; font-weight: 650; margin-bottom: 10px; }
.study-track p { font-size: 13px; line-height: 1.8; color: var(--interview-muted); }
.study-track ul { list-style: none; padding: 0; margin: 20px 0; display: grid; gap: 10px; color: var(--interview-muted); font-size: 14px; }
.study-track a { font-size: 14px; font-weight: 600; color: var(--interview-link); }
.study-track a:hover { text-decoration: underline; text-underline-offset: 4px; }
.reading-guide p { color: var(--interview-muted); }
.content-note { color: var(--interview-muted); font-size: 12px; line-height: 1.9; margin-top: 32px; border-top: 1px solid var(--app-border); padding-top: 20px; }
.empty-state { font-size: 13px; line-height: 1.8; color: var(--interview-muted); }
.empty-state button { margin-top: 12px; }
.mobile-toolbar { display: none; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
@media (min-width: 481px) and (max-width: 1000px) { .interview { grid-template-columns: 240px minmax(0, 1fr); } .question-sidebar { padding-right: 18px; } .reading-area { padding: 26px; } .study-tracks { grid-template-columns: 1fr; gap: 28px; } .desktop-break { display: none; } }
@media (max-width: 760px) {
  .interview { display: block; }
  .mobile-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; font-weight: 600; }
  .question-sidebar { display: none; position: static; max-height: 65dvh; padding: 20px; margin-bottom: 20px; border: 1px solid var(--app-border); border-radius: 8px; }
  .question-sidebar.is-open { display: block; }
  .reading-area { min-height: 65vh; padding: 24px 20px 32px; }
  .breadcrumbs { margin-bottom: 22px; }
  .overview h1 { margin-top: 26px; }
  .lead { font-size: 16px; }
  .study-tracks { grid-template-columns: 1fr; gap: 30px; padding: 25px 0; }
  .study-track + .study-track { border-top: 1px solid var(--app-border); padding-top: 26px; }
  .desktop-break { display: none; }
  .page-turn { gap: 20px; }
}
</style>
