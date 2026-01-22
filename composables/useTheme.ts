export const useTheme = () => {
  const theme = useState<'dark' | 'light'>('theme', () => 'dark')

  const applyTheme = (value: 'dark' | 'light') => {
    theme.value = value
    if (process.client) {
      document.documentElement.dataset.theme = value
      localStorage.setItem('theme', value)
    }
  }

  const toggleTheme = () => {
    applyTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  const initTheme = () => {
    if (!process.client) return
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
    applyTheme(stored || (prefersDark ? 'dark' : 'light'))
  }

  return {
    theme,
    applyTheme,
    toggleTheme,
    initTheme
  }
}
