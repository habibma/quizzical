import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CategoryProvider } from './context/Admin/CategoryContext.jsx'
import { SettingsProvider } from './context/Admin/SettingsContext.jsx'
import { ApiProvider } from './context/Admin/ApiContext.jsx'
import App from './App.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApiProvider>
        <SettingsProvider>
          <CategoryProvider>
            <App />
          </CategoryProvider>
        </SettingsProvider>
      </ApiProvider>
    </BrowserRouter>
  </React.StrictMode >,
)
