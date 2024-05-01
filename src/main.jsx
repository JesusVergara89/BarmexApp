import React from 'react'
import ReactDOM from 'react-dom/client'
import SolarApp from './SolarApp.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <React.StrictMode>
      <SolarApp />
      <ToastContainer />
    </React.StrictMode>,
  </HashRouter>
)
