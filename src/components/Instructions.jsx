import React from 'react'
import '../styles/Instructions.css'
import consumo from '../images/consumo.jpeg'

const Instructions = () => {
    return (
        <article className="instructions">
            <h1>Paso a paso para usar la herramienta</h1>
            <ol>
                <li>Aceptar "conocer tu ubicación":

                    <h4>Es importante obtener la ubicación del usuario y utilizar esa información en el cálculo de la cantidad de paneles solares necesarios para el sistema.
                    </h4>

                </li>
                <li>Elegir la ubicación:

                    <h4>
                        Haz clic en la opción "Elegir locación" y selecciona la ubicación donde deseas calcular el sistema de energía solar.
                    </h4>

                </li>
                <li>Ingresar días de autonomía:

                    <h4>
                        Elegir el número adecuado de días de autonomía es esencial para garantizar que un sistema de energía solar pueda funcionar de manera confiable y continua incluso en condiciones climáticas desfavorables. Esta medida proporciona un respaldo crucial durante períodos de baja radiación solar, previene descargas profundas de las baterías y brinda flexibilidad operativa en situaciones críticas. Si pones 0 o nada, el sistama calcula un sistema <a href="https://novumsolar.com/sistema-solar-conectado-a-red/">conectado a la red</a>
                    </h4>

                </li>
                <li>Ingresar consumo:

                    <h4>
                        De acuerdo al consumo eléctrico registrado en tu factura, inserta los valores correspondientes que representan el consumo mensual de energía de tu hogar o establecimiento comercial. Las cantidades necesarias están encerradas en círculos rojos en la imagen adjunta para una fácil identificación.
                    </h4>

                    <img src={consumo} alt="" />

                </li>
                <li>Calcular:

                    <h4>
                        Haz clic en el botón "Calcular" para obtener los resultados.
                    </h4>

                </li>
                <li>Revisar los resultados:

                    <h4>Observa los resultados proporcionados, incluyendo consumo promedio y mayor consumo.</h4>

                </li>
                <li>Seleccionar equipos:

                    <h4>Explora la sección "Selección de equipos" para ajustar componentes del sistema solar.</h4>

                </li>
                <li>Cambiar datos:

                    <h4>Si es necesario, puedes cambiar los datos de ubicación o consumo.</h4>

                </li>
                <li>Configurar el presupuesto:

                    <h4>Ingresa los detalles de tu presupuesto, incluyendo costos estimados.</h4>

                </li>
                <li>Ver presupuesto:

                    <h4>Revisa el presupuesto final y los detalles del sistema solar propuesto.</h4>

                </li>
                <li>Regresar:

                    <h4>Si necesitas volver atrás, selecciona la opción "Regresar".</h4>

                </li>
                <li>Revisar abreviaturas:

                    <h4>Consulta el significado de las abreviaturas proporcionadas para comprender mejor los resultados.</h4>

                </li>
            </ol>


        </article>
    )
}

export default Instructions



