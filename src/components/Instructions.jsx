import React from 'react'
import '../styles/Instructions.css'
import consumo from '../images/consumo.jpeg'

const Instructions = () => {
    return (
        <article className="instructions">
            <div className="instructions-container">
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
                            Haz clic en el botón "Calcular" para obtener los resultados. La herramienta te mostrará los datos calculados de manera inmediata. Aqui se incluyen las abreviaturas que se presentan y su explicación correspondiente.
                        </h4>

                        <h5><span>DOA:</span> Dias de autonomía</h5>
                        <h5><span>AVIP:</span> valor promedio de la radiación en el lugar escogido.</h5>
                        <h5><span>AVIPL:</span> valor promedio de la radiación con perdidas como FI y FS</h5>
                        <h5><span>PRFM:</span> eficiencia del sistema, 40%</h5>
                        <h5><span>LCAB:</span> Mayor consumo de acuerdo al 40% sobre la energía consumida por el sistema</h5>
                        <h5><span>BB-XX-V:</span> Banco de baterias, donde XX corresponde al voltaje del banco, este valor viene en Ah/día.</h5>
                    </li>
                    <li>Seleccionar equipos:

                        <h4>
                            Explora la sección "Selección de equipos" para ajustar componentes del sistema solar.
                        </h4>

                    </li>
                    <li>Ver presupuesto:

                        <h4>
                            Revisa el presupuesto final y los detalles del sistema solar propuesto.
                        </h4>

                    </li>
                    <li>Regresar:

                        <h4>
                            Si necesitas retroceder, elige la opción "Regresar" y ajusta los equipos según tus preferencias.
                        </h4>

                    </li>
                </ol>
            </div>
        </article>
    )
}

export default Instructions



