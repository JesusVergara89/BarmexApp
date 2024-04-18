import React from 'react'
import '../styles/Footer.css'
import SinginAuth from '../Auth/SinginAuth'

const Footer = () => {
  return (
    <footer>
      <div className="informacion-empresa">
        <h3>Información de contacto</h3>
        <p>Número de Teléfono: <a href="tel:+573245181802">+573245181802</a></p>
        <p>Página Web: <a href="https://www.tuempresa.com">www.barmexenergy.com.co</a></p>
        <p>Bogota, Colombia</p>
      </div>

      <div className="formulario-contacto">
        <h3>Formulario de Contacto</h3>
        <SinginAuth/>
      </div>
    </footer>
  )
}

export default Footer