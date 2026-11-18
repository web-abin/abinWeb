export interface InterviewQuestion {
  id: string
  track: string
  category: string
  title: string
  difficulty: '基础' | '进阶' | '实战'
  tags: string[]
  summary: string
  answer: string[]
  example: string
  pitfalls: string
  followups: string[]
  references: string[]
}

export const tracks = [
  { id: 'agent', name: 'Agent 应用开发', description: '从工具调用到可靠的生产系统', categories: ['基础与架构', '工具与协议', '检索与记忆', '评估与生产'] },
  { id: 'native', name: 'AI Native 开发', description: '从产品思维到 AI 工程交付', categories: ['产品与交互', '模型与上下文', '研发与协作', '交付与治理'] }
]

export const references: Record<string, { title: string; url: string }> = {
  agents: { title: 'Anthropic · Agent 与工作流的设计模式', url: 'https://www.anthropic.com/research/building-effective-agents' },
  tools: { title: 'OpenAI · Function calling', url: 'https://developers.openai.com/api/docs/guides/function-calling' },
  mcp: { title: 'MCP · 协议架构', url: 'https://modelcontextprotocol.io/docs/learn/architecture' },
  evals: { title: 'OpenAI · 评估实践', url: 'https://developers.openai.com/api/docs/guides/evaluation-best-practices' },
  coding: { title: 'Claude Code · 开发实践', url: 'https://code.claude.com/docs/en/best-practices' },
  security: { title: 'OWASP · LLM 应用安全风险', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' }
}
