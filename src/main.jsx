import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CategoryProvider } from './context/CategoryContext.jsx'
import { SettingsProvider } from './context/SettingsContext.jsx'
import App from './App.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <CategoryProvider>
          <App />
        </CategoryProvider>
      </SettingsProvider>
    </BrowserRouter>
  </React.StrictMode >,
)
