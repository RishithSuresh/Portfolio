import { createContext, useContext, useEffect, useMemo } from 'react'

const ThemeContext = createContext({ theme: 'unified' })

export function ThemeProvider({ children }) {
  useEffect(() => {
    document.documentElement.dataset.theme = 'unified'
  }, [])

  const value = useMemo(() => ({ theme: 'unified' }), [])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
