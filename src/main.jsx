import React from 'react'
import ReactDOM from 'react-dom/client'
import SolarApp from './SolarApp.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SolarApp />
    <ToastContainer/>
  </React.StrictMode>,
)
