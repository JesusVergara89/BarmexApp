import React from 'react'
import '../styles/Presentation.css'
import plug from '../assets/plug.svg'

const Presentation = () => {
    return (
        <article className="Presentation">
            <div className="Presentation-description">
                <h2>Calculadora de Instalación Fotovoltaica</h2>
                <p>
                    Descubre el potencial de la energía solar con nuestra avanzada calculadora de instalación fotovoltaica. Ya sea que busques reducir tus costos energéticos o contribuir activamente a la preservación del medio ambiente, esta herramienta te proporciona una visión clara y detallada de los beneficios económicos y ambientales de la energía solar en tu hogar o negocio.
                </p>
            </div>
            <img src={plug} alt="plug" /> 
        </article>
    )
}

export default Presentation