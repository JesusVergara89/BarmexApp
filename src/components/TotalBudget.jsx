import React from 'react'
import '../styles/TotalBudget.css'

const TotalBudget = ({ data_to_show }) => {
    //console.log(data_to_show)
    return (
        <article className='Total-budget-car'>

            <div className='budget-grid'>

                <h3 className='rigth-border'>Equipo</h3>
                <h3 className='center-tittle'>Cantidad</h3>
                <h3 className='left-border'>Precio</h3>

                <div className='center-tittle-1'>Paneles</div>
                <div className='center-tittle-2'>{`${data_to_show.quantity_OfPanels} uds`}</div>
                <div className='center-tittle-3'>{`$ ${new Intl.NumberFormat().format(Math.ceil(data_to_show.value_OfPanels))}`}</div>

                <div className='center-tittle-1'>Baterias</div>
                <div className='center-tittle-2'>{`${data_to_show.sumOf_ValuesBattery} uds`}</div>
                <div className='center-tittle-3'>{`$ ${new Intl.NumberFormat().format(Math.ceil(data_to_show.value_OfBattery))}`}</div>

                <div className='center-tittle-1'>Micro <br /> inversores</div>
                <div className='center-tittle-2'>{`${data_to_show.quantity_Inverters} uds`}</div>
                <div className='center-tittle-3'>{`$ ${new Intl.NumberFormat().format(Math.ceil(data_to_show.value_OfInverters))}`}</div>

                <div className='center-tittle-1'>Regulador <br /> principal</div>
                <div className='center-tittle-2'>{`${data_to_show.quantity_MainRegulator} uds`}</div>
                <div className='center-tittle-3'>{`$ ${new Intl.NumberFormat().format(Math.ceil(data_to_show.value_OfRegulator))}`}</div>

                <div className='center-tittle-1-1'>Regulador <br /> secundario</div>
                <div className='center-tittle-2-1'>{`${data_to_show.quantity_NonZero} uds`}</div>
                <div className='center-tittle-3-1'>{`$ ${new Intl.NumberFormat().format(Math.ceil(data_to_show.value_OfAdditionalRegulator))}`}</div>

            </div>

            <div className='total-grind-price'>
                <div className='total-name-total'>Total</div>
                <div className='total-price-total'>{`$ ${new Intl.NumberFormat().format(Math.ceil(data_to_show.total_BudgetValue))}`}</div>
            </div>

            <h3 className='chose-system-1'> &#9660; {`Sistema elegido`} &#9660;</h3>

            <div className='type-of-system-chose-grid'>

                <div className='technical-specifications'>
                    <div className='equipment-description'>Equipo</div>
                    <div className='equipment-characteristic'>Type</div>
                </div>

                <div className='technical-specifications'>
                    <div className='equipment-description-1'>Paneles</div>
                    <div className='equipment-characteristic-1'>{`${data_to_show.panel_Type} W`}</div>
                </div>

                <div className='technical-specifications'>
                    <div className='equipment-description-1'>Baterias</div>
                    <div className='equipment-characteristic-1'>{`${data_to_show.battery_Type} Ah`}</div>
                </div>

                <div className='technical-specifications'>
                    <div className='equipment-description-1'>Inversores</div>
                    <div className='equipment-characteristic-1'>{`${data_to_show.inverter_Type} W`}</div>
                </div>

                <div className='technical-specifications'>
                    <div className='equipment-description-1'>Regulador principal</div>
                    <div className='equipment-characteristic-1'>{`${data_to_show.typpe_main_regulator} Amp`}</div>
                </div>

                <div className='technical-specifications'>
                    <div className='equipment-description-1'>Regulador adicional</div>
                    <div className='equipment-characteristic-1'>{`${data_to_show.type_additional_regulator} Amp`}</div>
                </div>

                <div className='technical-specifications'>
                    <div className='equipment-description-2'>Voltage</div>
                    <div className='equipment-characteristic-2'>{`${data_to_show.voltage_Type} V`}</div>
                </div>

            </div>

        </article>
    )
}

export default TotalBudget