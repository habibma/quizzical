import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CategoryProvider } from './context/Admin/CategoryContext.jsx'
import { SettingsProvider } from './context/Admin/SettingsContext.jsx'
import { ApiProvider } from './context/Admin/ApiContext.jsx'
import { ReposProvider } from './context/Admin/ReposContext.jsx'
import App from './App.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApiProvider>
        <ReposProvider>
          <SettingsProvider>
            <CategoryProvider>
              <App />
            </CategoryProvider>
          </SettingsProvider>
        </ReposProvider>
      </ApiProvider>
    </BrowserRouter>
  </React.StrictMode >
)
