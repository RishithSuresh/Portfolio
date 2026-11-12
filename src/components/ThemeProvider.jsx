import { createContext, useContext, useEffect, useMemo } from 'react'

const ThemeContext = createContext(null)
export function ThemeProvider({ children }) {
  useEffect(() => {
    document.documentElement.dataset.theme = 'dark'
    localStorage.setItem('portfolio-theme', 'dark')
  }, [])
  const value = useMemo(() => ({ theme: 'dark' }), [])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
export function useTheme() {
  return useContext(ThemeContext)
}