import { useState, useEffect } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'

function App() {

  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState(prefersDarkMode ? "dark" : "light")

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme])

  return <AppRoutes
    theme={theme}
    toggleTheme={toggleTheme}
  />
}

export default App
