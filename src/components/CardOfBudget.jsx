import { useState } from "react"
import useBateries from "../hooks/useBateries"
import useInverter from "../hooks/useInverter"
import usePanels from "../hooks/usePanels"
import useRegulator from "../hooks/useRegulator"
import Select from 'react-select';
import TotalBudget from "./TotalBudget"
import '../styles/CardOfBudget.css'



const MainConditions = [
    { label: '100 W', value: 100 },
    { label: '160 W', value: 160 },
    { label: '290 W', value: 290 },
    { label: '330 W', value: 330 },
    { label: '400 W', value: 400 },
    { label: '500 W', value: 500 }
]
const MainConditionsBattery = [
    { label: '250 Ah', value: 250 },
    { label: '200 Ah', value: 200 },
    { label: '150 Ah', value: 150 },
    { label: '100 Ah', value: 100 }
]

const invertersArray = [
    { label: '2000 W', value: 2000 },
    { label: '1800 W', value: 1800 },
    { label: '1500 W', value: 1500 },
    { label: '700 W', value: 700 }
]

const CardOfBudget = ({ consumptionOverDimension, autonomy_Days, propIrradiation}) => {

    const panels = usePanels()

    const batteries = useBateries()

    const arrayofRegulator = useRegulator()

    const inverters = useInverter()

    const [conditionsForPanels, setConditionsForPanels] = useState()
    const [conditionBattery1, setConditionBattery1] = useState()
    const [conditionInverter, setConditionInverter] = useState()
    const [budgetChange, setBudgetChange] = useState(false)

    const argumento = [
        { Min: 0, Max: 45 },
        { Min: 45, Max: 50 },
        { Min: 50, Max: 60 },
        { Min: 60, Max: 70 },
        { Min: 70, Max: 85 },
        { Min: 85, Max: 100 },
        { Min: 100, Max: 200 }
    ]
    const analiticSubstractionFunction = (aNumber) => {
        let number
        if (aNumber <= 0) {
            number = 0
        } else if (aNumber > 200) {
            number = 200
        } else {
            argumento.map(data => {
                if (aNumber <= data.Max && aNumber > data.Min) {
                    number = data.Max
                }
            })
        }
        return number
    }
    const CalculoCircuito = (Voltaje, Corriente, Quantity) => {
        let Subtension = TensionSystem - Voltaje
        let Fila_Paralelo
        let Colum_Paralelo
        let N
        if (TensionSystem === Voltaje) {
            N = Quantity
            Fila_Paralelo = N
            Colum_Paralelo = 1;
        } else if (Subtension === Voltaje) {
            if (Quantity % 2 === 0) {
                N = Quantity
            } else {
                N = Quantity + 1
            }
            Fila_Paralelo = Math.ceil(N / 2)
            Colum_Paralelo = 2;
        } else if (Subtension > Voltaje) {
            if (Quantity % 4 === 0) {
                N = Quantity
            } else {
                let subtraccion = 4 - (Quantity % 4)
                N = Quantity + subtraccion
            }
            Fila_Paralelo = Math.ceil(N / 4)
            Colum_Paralelo = 4;
        }
        let I = 0
        let V
        let W
        let IAd = 0
        let VAd
        let WAd
        let NAd = 0
        for (let index = 0; index < Fila_Paralelo; index++) {
            if (W >= 6500) {
                if (WAd > 7000) {
                    NAd = NAd + Colum_Paralelo
                    VAd = Voltaje * Colum_Paralelo
                    IAd = Corriente + IAd
                    WAd = Math.round(VAd * IAd)
                } else {
                    WAd = 7100
                }
            } else {
                V = Voltaje * Colum_Paralelo
                I = Corriente + I
                W = Math.round(V * I)
            }
        }
        let NP = N - NAd

        let ValueP = { V: V, I: I, W: W }
        let ValueS = { V: VAd, I: IAd, W: WAd }
        return { ValueP, NP, ValueS, NAd, N }
    }
    const CalculoCircuitoB = (Voltaje, Corriente, Quantity) => {
        let Subtension = TensionSystem - Voltaje
        let Fila_Paralelo
        let Colum_Paralelo
        let N
        if (TensionSystem === Voltaje) {
            N = Quantity
            Fila_Paralelo = N
            Colum_Paralelo = 1;
        } else if (Subtension === Voltaje) {
            if (Quantity % 2 === 0) {
                N = Quantity
            } else {
                N = Quantity + 1
            }
            Fila_Paralelo = Math.ceil(N / 2)
            Colum_Paralelo = 2;
        } else if (Subtension > Voltaje) {
            if (Quantity % 4 === 0) {
                N = Quantity
            } else {
                let subtraccion = 4 - (Quantity % 4)
                N = Quantity + subtraccion
            }
            Fila_Paralelo = Math.ceil(N / 4)
            Colum_Paralelo = 4;
        }
        let I = 0
        let V
        let W
        for (let index = 0; index < Fila_Paralelo; index++) {
            V = Voltaje * Colum_Paralelo
            I = Corriente + I
            W = Math.round(V * I)
        }

        let Value = { V: V, I: I, W: W }
        return { Value, N }
    }
    ///////////////////////////////////////////////////////////////////////////down here
    let regulatorsMPPT = arrayofRegulator.filter(data => data.type === 'MPPT')
    let regulatorsMPPTWithOutRepeat = regulatorsMPPT.filter(data => {
        if (data.Tmca === 150 || data.Tmca === 450 || data.Tmca === 100) {
            return data
        }
    })
    //////////////////////////Panels budget///////////////////Down here
    /*mio */
    //P-type: panels type.

    const oneSunConstant = 1000
    const EHS = (propIrradiation[0].min) / (oneSunConstant)
    let Valueofpanel = []
    let Valueofbateria = []
    let Valueofregulador = []
    let Valueofinversor = []
    let ValueOfpanelFilter = []
    let argumentoPotencia = [
        { Min: 0, Max: 1900, value: 12 },
        { Min: 1900, Max: 4000, value: 24 }
    ]
    const analiticTension = () => {
        let number
        if (0 < consumptionOverDimension && consumptionOverDimension <= 4000) {
            argumentoPotencia.map(data => {
                if (consumptionOverDimension <= data.Max && consumptionOverDimension > data.Min) {
                    number = data.value
                }
            })
        } else if (consumptionOverDimension > 4000) {
            number = 48
        } else {
            number = 0
        }
        return number
    }
    let TensionSystem = analiticTension()
    let PanelTension = panels.filter(data => data.Voltaje <= TensionSystem)
    //Operacion paneles
    PanelTension.map(panel => {
        let FilMainConditions = MainConditions.filter(power => power.value === panel.Power)
        ValueOfpanelFilter.push(FilMainConditions[0])//filtrado de la potencia de los pnales referente al voltaje del sistema
        let powerOfPanels = panel.Power
        let NPa = Math.ceil(consumptionOverDimension / (0.9 * powerOfPanels * EHS))
        const { ValueP, NP, ValueS, NAd, N } = CalculoCircuito(panel.Voltaje, panel.Isc, NPa)
        let priceOfPanels = panel.Price
        let budgetOfPanels = priceOfPanels * N
        Valueofpanel.push({ Cant: N, PriceTotal: budgetOfPanels, Ref_Potencia: powerOfPanels, CircuitoPanelP: ValueP, CircuitoPanelS: ValueS, CantAd: NAd, CantP: NP }
        )
        //Operacion de regulador
        let Quantity
        let QuantityAd
        let IntensityOfTheSystemP = Math.ceil(ValueP.W / TensionSystem)
        let IntensityOfTheSystemS = Math.ceil(ValueS.W / TensionSystem)
        if (isNaN(IntensityOfTheSystemS)) {
            IntensityOfTheSystemS = 0
        }
        let analiticFunctionForRegulators = analiticSubstractionFunction(IntensityOfTheSystemP)
        let analiticAdditionalRegulators = analiticSubstractionFunction(IntensityOfTheSystemS)
        if (IntensityOfTheSystemP > 0) {
            Quantity = 1
        } else {
            Quantity = 0
        }
        if (analiticAdditionalRegulators > 0) {
            QuantityAd = 1
        } else {
            QuantityAd = 0
        }
        Valueofregulador.push({
            analiticFunctionForRegulators: analiticFunctionForRegulators,
            analiticAdditionalRegulators: analiticAdditionalRegulators,
            Cant_Regulators: Quantity,
            Cant_RegulatorsAd: QuantityAd,
            IntensityOfTheSystemP: IntensityOfTheSystemP,
            IntensityOfTheSystemS: IntensityOfTheSystemS,
            WP: ValueP.W,
            WS: ValueS.W,
            Panel: powerOfPanels
        })
    })
    //Operacion de bateria
    batteries.map(bateria => {
        let powerOfTheSystem = Math.ceil((consumptionOverDimension * autonomy_Days) / (TensionSystem * 0.5))
        let Quantity = Math.ceil(powerOfTheSystem / bateria.type)
        const { Value, N, } = CalculoCircuitoB(bateria.voltage, bateria.type, Quantity)
        let costOfBatteries = N * bateria.cost
        Valueofbateria.push({
            Cant: Quantity,
            PriceTotal: costOfBatteries,
            Ref_Corriente: bateria.type,
            CircuitoBateria: Value
        })
    })
    //Operacion Inversor
    inverters.map(data => {
        let power = data.Power
        let quantit = Math.ceil((consumptionOverDimension * 0.76) / power)
        let priceOfInversor = data.price
        let budgetOfInversor = quantit * priceOfInversor
        Valueofinversor.push({ Cant: quantit, Ref_Power: power, PriceTotal: budgetOfInversor, Power: power })
    })
    const pricePanel = () => {
        let ValueP = Valueofpanel.find((data, index) => conditionsForPanels === MainConditions[index].value)
        return ValueP
    }
    const priceBattery = () => {
        let ValueB = Valueofbateria.find((data, index) => conditionBattery1 === MainConditionsBattery[index].value)
        return ValueB
    }
    const priceRegulator = () => {
        let ValuesR
        Valueofregulador.map(data => {
            if (conditionsForPanels === data.Panel) {
                let PriceRegulador = regulatorsMPPTWithOutRepeat.find(user => (data.analiticFunctionForRegulators === user.Cc || data.analiticFunctionForRegulators * 1.2 >= user.Cc) && [{ voltage: user.system_voltage_1, spp: user.Spp12 }, { voltage: user.system_voltage_2, spp: user.Spp24 }, { voltage: user.system_voltage_4, spp: user.Spp48 }]
                    .some(regu => TensionSystem === regu.voltage && data.WP <= regu.spp))

                let PriceReguladorAd = regulatorsMPPTWithOutRepeat.find(user => (data.analiticAdditionalRegulators === user.Cc || data.analiticAdditionalRegulators * 1.2 >= user.Cc) && [{ voltage: user.system_voltage_1, spp: user.Spp12 }, { voltage: user.system_voltage_2, spp: user.Spp24 }, { voltage: user.system_voltage_4, spp: user.Spp48 }]
                    .some(regu => TensionSystem === regu.voltage && data.WS <= regu.spp))
                ValuesR = {
                    Ref_Corriente: data.analiticFunctionForRegulators,
                    Ref_CorrienteAd: data.analiticAdditionalRegulators,
                    Cant_Regulators: data.Cant_Regulators,
                    Cant_RegulatorsAd: data.Cant_RegulatorsAd,
                    PriceReguladorAd: PriceReguladorAd ? PriceReguladorAd.price : 0,
                    PriceRegulador: PriceRegulador ? PriceRegulador.price : 0,
                    panel: data.Panel,
                    data: data.WS
                }
            }
        })

        return ValuesR
    }
    const priceinversor = () => {
        let valueI = Valueofinversor.find(data => data.Power === conditionInverter)
        return valueI
    }

    const handleSelectionChange = ({ value }) => {
        setConditionsForPanels(value)
    }

    const handleSelectionChangeBattery = ({ value }) => {
        setConditionBattery1(value)
    }

    const handleSelectionInverter = ({ value }) => {
        setConditionInverter(value)
    }
    let sumOfValuesP = pricePanel()
    let sumOfValuesBattery = priceBattery()
    let sumOfValuesRegulator = priceRegulator()
    let sumOfValuesinversor = priceinversor()
    const functionShowBudget = () => setBudgetChange(!budgetChange)
    const previous_Function = () => setBudgetChange(false)
    const next_Function = () => setBudgetChange(true)
    return (
        <article className='general-budget' >

            <div className='grid-buttons-budget'>
                <div className='grid-buttons-budget-1'>
                    <button onClick={previous_Function}>Cambiar datos</button>
                </div>

                <div className='grid-buttons-budget-1'>
                    <button onClick={next_Function}>Presupuesto</button>
                </div>
            </div>

            <TotalBudget
                sumOfValuesP={sumOfValuesP}
                sumOfValuesBattery={sumOfValuesBattery}
                sumOfValuesRegulator={sumOfValuesRegulator}
                sumOfValuesinversor={sumOfValuesinversor}
                TensionSystem={TensionSystem}
                budgetChange={budgetChange}
            />

            <div className={!budgetChange ? 'budget' : 'budget on'}>

                <h3 className='Select-main'>Selección panel</h3>

                <Select className='select-panel-select'
                    options={ValueOfpanelFilter}
                    onChange={handleSelectionChange}
                />

                <div className='budget-panel-quantity'>

                    <div className='budget-panel-quantity-row-reduce'>
                        <div className='budget-panel-quantity-1'>
                            <h3>Cantidad:</h3>
                        </div>
                        <div className='budget-panel-quantity-1'>
                            <h3>Costo</h3>
                        </div>
                    </div>

                    <div className='budget-panel-quantity-row-1-reduce'>
                        <div className='budget-panel-quantity-1-1'>
                            <h3>{`${sumOfValuesP ? sumOfValuesP.Cant : 0} Uds`}</h3>
                        </div>
                        <div className='budget-panel-quantity-1-1'>
                            {/* Un comentario JSX */}
                            <h3>{`$ ${new Intl.NumberFormat().format(sumOfValuesP ? sumOfValuesP.PriceTotal : 0)}`}</h3>
                        </div>

                    </div>

                </div>

                <h3 className='Select-main'>Selección batería</h3>
                <Select className='select-panel-select'
                    options={MainConditionsBattery}
                    onChange={handleSelectionChangeBattery}
                />
                <div className='budget-panel-quantity'>
                    <div className='budget-panel-quantity-row'>
                        <div className='budget-panel-quantity-1'>
                            <h3>Voltaje</h3>
                        </div>
                        <div className='budget-panel-quantity-1'>
                            <h3>Cantidad:</h3>
                        </div>
                        <div className='budget-panel-quantity-1'>
                            <h3>Costo</h3>
                        </div>


                    </div>
                    <div className='budget-panel-quantity-row-1'>

                        <div className='budget-panel-quantity-1-1'>
                            <h3>12 v</h3>
                        </div>
                        <div className='budget-panel-quantity-1-1'>
                            <h3>{`${sumOfValuesBattery ? sumOfValuesBattery.Cant : 0} Uds`}</h3>
                        </div>
                        <div className='budget-panel-quantity-1-1'>
                            <h3>{`$ ${new Intl.NumberFormat().format(sumOfValuesBattery ? sumOfValuesBattery.PriceTotal : 0)}`}</h3>
                        </div>
                    </div>

                </div>

                <h3 className='Select-main'>El regulador asociado es</h3>

                <div className='budget-panel-quantity'>

                    <div className='budget-panel-quantity-row'>

                        <div className='budget-panel-quantity-1'>
                            <h3>Cantida principal</h3>
                        </div>

                        <div className='budget-panel-quantity-1'>
                            <h3>Costo</h3>
                        </div>

                        <div className='budget-panel-quantity-1'>
                            <h3>Cantidad adicional</h3>
                        </div>

                        <div className='budget-panel-quantity-1'>
                            <h3>Costo</h3>
                        </div>

                    </div>

                    <div className='budget-panel-quantity-row-1'>

                        <div className='budget-panel-quantity-1-1'>
                            <h3>{`${sumOfValuesRegulator ? sumOfValuesRegulator.Cant_Regulators : 0} Uds`}</h3>
                        </div>

                        <div className='budget-panel-quantity-1-1'>
                            <h3>{`$ ${new Intl.NumberFormat().format(sumOfValuesRegulator ? sumOfValuesRegulator.PriceRegulador : 0)}`}</h3>
                        </div>

                        <div className='budget-panel-quantity-1-1'>
                            <h3>{`${sumOfValuesRegulator ? sumOfValuesRegulator.Cant_RegulatorsAd : 0} Uds`}</h3>
                        </div>

                        <div className='budget-panel-quantity-1-1'>
                            <h3>{`$ ${new Intl.NumberFormat().format(sumOfValuesRegulator ? sumOfValuesRegulator.PriceReguladorAd : 0)}`}</h3>
                        </div>

                    </div>

                </div>

                <h3 className='Select-main'>Selección inversor</h3>

                <Select className='select-panel-select'
                    options={invertersArray}
                    onChange={handleSelectionInverter}
                />

                <div className='budget-panel-quantity'>

                    <div className='budget-panel-quantity-row'>

                        <div className='budget-panel-quantity-1'>
                            <h3>Cantidad</h3>
                        </div>

                        <div className='budget-panel-quantity-1'>
                            <h3>Costo</h3>
                        </div>

                    </div>

                    <div className='budget-panel-quantity-row-1'>

                        <div className='budget-panel-quantity-1-1'>
                            <h3>{`${sumOfValuesinversor ? sumOfValuesinversor.Cant : 0} Uds`}</h3>
                        </div>

                        <div className='budget-panel-quantity-1-1'>
                            <h3>{`$ ${new Intl.NumberFormat().format(sumOfValuesinversor ? sumOfValuesinversor.PriceTotal : 0)}`}</h3>
                        </div>

                    </div>

                </div>


            </div>

            <button onClick={functionShowBudget}>{budgetChange ? 'Regresar' : 'Ver presupuesto'}</button>

        </article >
    )
}

export default CardOfBudget