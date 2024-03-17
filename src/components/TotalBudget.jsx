import React from 'react'
import '../styles/TotalBudget.css'

const TotalBudget = ({ sumOfValuesP, sumOfValuesBattery, sumOfValuesRegulator, sumOfValuesinversor, TensionSystem, budgetChange }) => {
    let Total = Math.ceil(sumOfValuesP?.PriceTotal + sumOfValuesBattery?.PriceTotal + sumOfValuesRegulator?.PriceRegulador + sumOfValuesRegulator?.PriceReguladorAd + sumOfValuesinversor?.PriceTotal)
    return (
        <article className={budgetChange ? 'Total-budget-car':'Total-budget-car on'}>

            <div className='budget-grid'>

                <h3 className='rigth-border'>Equipo</h3>
                <h3 className='center-tittle'>Cantidad</h3>
                <h3 className='left-border'>Precio</h3>

                <div className='center-tittle-1'>Paneles</div>
                <div className='center-tittle-2'>{`${sumOfValuesP ? sumOfValuesP.Cant : 0} uds`}</div>
                <div className='center-tittle-3'>{`$ ${new Intl.NumberFormat().format(Math.ceil(sumOfValuesP ? sumOfValuesP.PriceTotal : 0))}`}</div>

                <div className='center-tittle-1'>Baterias</div>
                <div className='center-tittle-2'>{`${sumOfValuesBattery ? sumOfValuesBattery.Cant : 0} uds`}</div>
                <div className='center-tittle-3'>{`$ ${new Intl.NumberFormat().format(Math.ceil(sumOfValuesBattery ? sumOfValuesBattery.PriceTotal : 0))}`}</div>

                <div className='center-tittle-1'>Micro <br /> inversores</div>
                <div className='center-tittle-2'>{`${sumOfValuesinversor ? sumOfValuesinversor.Cant : 0} uds`}</div>
                <div className='center-tittle-3'>{`$ ${new Intl.NumberFormat().format(Math.ceil(sumOfValuesinversor ? sumOfValuesinversor.PriceTotal : 0))}`}</div>

                <div className='center-tittle-1'>Regulador <br /> principal</div>
                <div className='center-tittle-2'>{`${sumOfValuesRegulator ? sumOfValuesRegulator.Cant_Regulators : 0} uds`}</div>
                <div className='center-tittle-3'>{`$ ${new Intl.NumberFormat().format(Math.ceil(sumOfValuesRegulator ? sumOfValuesRegulator.PriceRegulador : 0))}`}</div>

                <div className='center-tittle-1-1'>Regulador <br /> secundario</div>
                <div className='center-tittle-2-1'>{`${sumOfValuesRegulator ? sumOfValuesRegulator.Cant_RegulatorsAd : 0} uds`}</div>
                <div className='center-tittle-3-1'>{`$ ${new Intl.NumberFormat().format(Math.ceil(sumOfValuesRegulator ? sumOfValuesRegulator.PriceReguladorAd : 0))}`}</div>

            </div>

            <div className='total-grind-price'>
                <div className='total-name-total'>Total</div>
                <div className='total-price-total'>{`$ ${new Intl.NumberFormat().format(Math.ceil(Total ? Total : 0))}`}</div>
            </div>

            <h3 className='chose-system-1'> &#9660; {`Sistema elegido`} &#9660;</h3>

            <div className='type-of-system-chose-grid'>

                <div className='technical-specifications'>
                    <div className='equipment-description'>Equipo</div>
                    <div className='equipment-characteristic'>Type</div>
                </div>

                <div className='technical-specifications'>
                    <div className='equipment-description-1'>Paneles</div>
                    <div className='equipment-characteristic-1'>{sumOfValuesP ? `${sumOfValuesP.Ref_Potencia} W` : '0 W'}</div>
                </div>

                <div className='technical-specifications'>
                    <div className='equipment-description-1'>Baterias</div>
                    <div className='equipment-characteristic-1'>{sumOfValuesBattery ? `${sumOfValuesBattery.Ref_Corriente} Ah` : '0 Ah'}</div>
                </div>

                <div className='technical-specifications'>
                    <div className='equipment-description-1'>Inversores</div>
                    <div className='equipment-characteristic-1'>{sumOfValuesinversor ? `${sumOfValuesinversor.Ref_Power} W` : '0 W'}</div>
                </div>

                <div className='technical-specifications'>
                    <div className='equipment-description-1'>Regulador principal</div>
                    <div className='equipment-characteristic-1'>{sumOfValuesRegulator ? `${sumOfValuesRegulator.Ref_Corriente} A` : '0 A'}</div>
                </div>

                <div className='technical-specifications'>
                    <div className='equipment-description-1'>Regulador adicional</div>
                    <div className='equipment-characteristic-1'>{sumOfValuesRegulator ? `${sumOfValuesRegulator.Ref_CorrienteAd} A` : '0 A'}</div>
                </div>

                <div className='technical-specifications'>
                    <div className='equipment-description-2'>Tension del Sistema</div>
                    <div className='equipment-characteristic-2'>{TensionSystem ? `${TensionSystem} V` : '0 V'}</div>
                </div>

            </div>

        </article>
    )
}

export default TotalBudget