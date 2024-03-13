import React from 'react'
import '../styles/Footer.css'
import SinginAuth from '../Auth/SinginAuth'

const Footer = () => {
  return (
    <footer>
      <div className="informacion-empresa">
        <h3>Información de contacto</h3>
        <p>Número de Teléfono: <a href="tel:+123456789">+123456789</a></p>
        <p>Página Web: <a href="https://www.tuempresa.com">www.tuempresa.com</a></p>
        <p>Dirección: Calle Principal, Ciudad, País</p>
      </div>

      <div className="formulario-contacto">
        <h3>Formulario de Contacto</h3>
        <SinginAuth/>
      </div>
    </footer>
  )
}

export default Footer