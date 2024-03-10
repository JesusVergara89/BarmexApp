import { useEffect, useState } from "react"
import useBateries from "../hooks/useBateries"
import useInverter from "../hooks/useInverter"
import usePanels from "../hooks/usePanels"
import useRegulator from "../hooks/useRegulator"
import Select from 'react-select';
import TotalBudget from "./TotalBudget"
import '../styles/CardOfBudget.css'



const MainConditions = [
    { label: '100 W panel', value: 100 },
    { label: '160 W panel', value: 160 },
    { label: '290 W panel', value: 290 },
    { label: '330 W panel', value: 330 },
    { label: '400 W panel', value: 400 },
    { label: '500 W panel', value: 500 }
]

const MainConditionsB = [
    { label: '12 v', value: 12 }
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

const CardOfBudget = ({ consumptionOverDimension, arrayOfCurrent, largerConsuption, autonomy_Days, propIrradiation, setStateTestBudget, stateTestBudget }) => {

    const panels = usePanels()

    const batteries = useBateries()

    const arrayofRegulator = useRegulator()
    
    const inverters = useInverter()

    const [conditionsForPanels, setConditionsForPanels] = useState()
    const [conditionForBatteries, setConditionForBatteries] = useState()
    const [conditionBattery1, setConditionBattery1] = useState()
    const [conditionInverter, setConditionInverter] = useState()
    const [budgetChange, setBudgetChange] = useState(false)

    let totalBudgetValue

    //////////////////////////Panels budget///////////////////Down here

    //P-type: panels type.

    const oneSunConstant = 1000

    const EHS = (propIrradiation[0].min) / (oneSunConstant)

    let NP = panels.map(panel => Math.round(consumptionOverDimension / (0.9 * panel.Power * EHS)))

    let priceOfPanels = panels.map(data => data.Price)//Price of each panel

    let boundaries1 = Math.min(NP.length, priceOfPanels.length)

    let budgetOfPanels = []

    for (let i = 0; i < boundaries1; i++) {
        budgetOfPanels.push(priceOfPanels[i] * NP[i])
    }

    let budgetIncurrencyPanels = budgetOfPanels.map(data => data)

    //////////////////////////Panels budget///////////////////Above here

    //////////////////////////Batteries budget///////////////////Down here

    //B-type: Battery type.

    const N = autonomy_Days //Number of days of autonomy
    const kb = 0.05 //accumulator losses
    const kc = 0.05 //converter losses
    const kv = 0.15 //several losses
    const ka = 0.005 //auto-discharge coefficient
    const Pd = 0.5 //battery discharge depth
    const R_1 = ((1 - kb - kc - kv) * (1 - ((ka * N) / Pd)))
    const R = R_1.toFixed(2)//performance
    const E_1 = ((largerConsuption/30) / R)
    const E = E_1.toFixed(2)//real consumption
    const C_112 = ((1.1 * E * N) / (arrayOfCurrent[0] * Pd))
    const C_124 = ((1.1 * E * N) / (arrayOfCurrent[1] * Pd))
    const C_148 = ((1.1 * E * N) / (arrayOfCurrent[2] * Pd))
    const C12 = C_112.toFixed(2)//Battery box for 12v
    const C24 = C_124.toFixed(2)//Battery box for 24v
    const C48 = C_148.toFixed(2)//Battery box for 48v

    let arrayOfNumberOfBateries12v = batteries.map(current => Math.ceil(C12 / current.type))
    let arrayOfNumberOfBateries24v = batteries.map(current => Math.ceil(C24 / current.type))
    let arrayOfNumberOfBateries48v = batteries.map(current => Math.ceil(C48 / current.type))

    let batteriesBoundaries12v = Math.min(arrayOfNumberOfBateries12v.length, batteries.length)
    let batteriesBoundaries24v = Math.min(arrayOfNumberOfBateries24v.length, batteries.length)
    let batteriesBoundaries48v = Math.min(arrayOfNumberOfBateries48v.length, batteries.length)

    let costOfBatteries12v = []
    let costOfBatteries24v = []
    let costOfBatteries48v = []

    for (let i = 0; i < batteriesBoundaries12v; i++) {
        costOfBatteries12v.push(arrayOfNumberOfBateries12v[i] * batteries[i].cost)
    }

    for (let i = 0; i < batteriesBoundaries24v; i++) {
        costOfBatteries24v.push(arrayOfNumberOfBateries24v[i] * batteries[i].cost)
    }

    for (let i = 0; i < batteriesBoundaries48v; i++) {
        costOfBatteries48v.push(arrayOfNumberOfBateries48v[i] * batteries[i].cost)
    }

    let budgetInCurrencyBatteries12v = costOfBatteries12v.map(data => data)
    let budgetInCurrencyBatteries24v = costOfBatteries24v.map(data => data)
    let budgetInCurrencyBatteries48v = costOfBatteries48v.map(data => data)

    //////////////////////////Batteries budget///////////////////Above here


    ///////////////////////////////controllers buget- down here
    let powerOfPanels = panels.map(data => data.Power)

    let boundaries = Math.min(NP.length, powerOfPanels.length)

    let powerOfTheSystem = []

    for (let i = 0; i < boundaries; i++) {
        powerOfTheSystem.push(NP[i] * powerOfPanels[i])
    }

    let totalIntensityOfTheSystemIn12v = powerOfTheSystem.map(data => Math.ceil(data / 12))
    let totalIntensityOfTheSystemIn24v = powerOfTheSystem.map(data => Math.ceil(data / 24))
    let totalIntensityOfTheSystemIn48v = powerOfTheSystem.map(data => Math.ceil(data / 48))

    ///////////////////////////////////////////////////////////////////////////down here
    let regulatorsMPPT = arrayofRegulator.filter(data => data.type === 'MPPT')
    let regulatorsMPPTWithOutRepeat = regulatorsMPPT.filter(data => {
        if (data.Tmca === 150 || data.Tmca === 450 || data.Tmca === 100) {
            return data
        }
    })


    const analiticSubstractionFunction = (aNumber) => {
        let number
        if (aNumber === 0) {
            number = 0
        } else {
            if (aNumber <= 45 && aNumber > 0) {
                number = 45
            } else {
                if (aNumber <= 50 && aNumber > 45) {
                    number = 50
                } else {
                    if (aNumber <= 60 && aNumber > 50) {
                        number = 60
                    } else {
                        if (aNumber <= 70 && aNumber > 60) {
                            number = 70
                        } else {
                            if (aNumber <= 85 && aNumber > 70) {
                                number = 85
                            } else {
                                if (aNumber <= 100 && aNumber > 85) {
                                    number = 100
                                } else {
                                    if (aNumber <= 200 && aNumber > 100) {
                                        number = 200
                                    } else {
                                        if (aNumber > 200) {
                                            number = 200
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return number
    }

    const substractionFunctionForAdditionalRegulator = (value) => {
        let number
        if (value >= 200) {
            let aFractionNumberOfQuatity = value / 200
            let aIntegerPart = parseInt(aFractionNumberOfQuatity)
            let aFractionPartFromQuantity = aFractionNumberOfQuatity - aIntegerPart
            let dataToAnalize = aFractionPartFromQuantity * 200
            if (dataToAnalize <= 45) {
                number = 45
            } else {
                if (dataToAnalize <= 50 && dataToAnalize > 45) {
                    number = 50
                } else {
                    if (dataToAnalize <= 60 && dataToAnalize > 50) {
                        number = 60
                    } else {
                        if (dataToAnalize <= 70 && dataToAnalize > 60) {
                            number = 70
                        } else {
                            if (dataToAnalize <= 85 && dataToAnalize > 70) {
                                number = 85
                            } else {
                                if (dataToAnalize <= 100 && dataToAnalize > 85) {
                                    number = 100
                                } else {
                                    if (dataToAnalize <= 200 && dataToAnalize > 100) {
                                        number = 200
                                    }
                                }
                            }
                        }
                    }
                }
            }

        } else {
            number = 0
        }

        return number
    }

    let analiticFunctionForRegulators12v = totalIntensityOfTheSystemIn12v.map(data => analiticSubstractionFunction(data))
    let analiticFunctionForRegulators24v = totalIntensityOfTheSystemIn24v.map(data => analiticSubstractionFunction(data))
    let analiticFunctionForRegulators48v = totalIntensityOfTheSystemIn48v.map(data => analiticSubstractionFunction(data))

    let analiticAdditionalRegulators12v = totalIntensityOfTheSystemIn12v.map(data => substractionFunctionForAdditionalRegulator(data))
    let analiticAdditionalRegulators24v = totalIntensityOfTheSystemIn24v.map(data => substractionFunctionForAdditionalRegulator(data))
    let analiticAdditionalRegulators48v = totalIntensityOfTheSystemIn48v.map(data => substractionFunctionForAdditionalRegulator(data))

    const functionBoundaries = (array1, array2) => {
        let data = []
        let boundaries = Math.min(array1.length, array2.length)
        for (let i = 0; i < boundaries; i++) {
            data.push((array1[i] / array2[i]))
        }
        return data
    }

    let arrayOfQuantity_1 = functionBoundaries(totalIntensityOfTheSystemIn12v, analiticFunctionForRegulators12v)
    let arrayOfQuantity_2 = functionBoundaries(totalIntensityOfTheSystemIn24v, analiticFunctionForRegulators24v)
    let arrayOfQuantity_3 = functionBoundaries(totalIntensityOfTheSystemIn48v, analiticFunctionForRegulators48v)

    let arrayOfQuantity1 = arrayOfQuantity_1.map(data => data.toFixed(2))
    let arrayOfQuantity2 = arrayOfQuantity_2.map(data => data.toFixed(2))
    let arrayOfQuantity3 = arrayOfQuantity_3.map(data => data.toFixed(2))



    const handleSelectionChange = ({ value }) => {
        setConditionsForPanels(value)
    }

    const handleSelectionChangeB = ({ value }) => {
        setConditionForBatteries(value)
    }

    const handleSelectionChangeBattery = ({ value }) => {
        setConditionBattery1(value)
    }

    const handleSelectionInverter = ({ value }) => {
        setConditionInverter(value)
    }

    let sumOfValuesP = []
    let sumOfValuesBattery = []
    let sumOfValuesRegulator = []


    const priceAnalisys = () => {
        if (conditionsForPanels === undefined) {
            sumOfValuesP.push(0)
        } else {
            if (conditionsForPanels === 100) {
                sumOfValuesP.push(NP[0], '100 W', budgetIncurrencyPanels[0])
            } else {
                if (conditionsForPanels === 160) {
                    sumOfValuesP.push(NP[1], '160 W', budgetIncurrencyPanels[1])
                } else {
                    if (conditionsForPanels === 290) {
                        sumOfValuesP.push(NP[2], '290 W', budgetIncurrencyPanels[2])
                    } else {
                        if (conditionsForPanels === 330) {
                            sumOfValuesP.push(NP[3], '330 W', budgetIncurrencyPanels[3])
                        } else {
                            if (conditionsForPanels === 400) {
                                sumOfValuesP.push(NP[4], '400 W', budgetIncurrencyPanels[4])
                            } else {
                                if (conditionsForPanels === 500) {
                                    sumOfValuesP.push(NP[5], '500 W', budgetIncurrencyPanels[5])
                                }
                            }
                        }
                    }
                }
            }
        }
        return sumOfValuesP
    }

    priceAnalisys()

    const priceAnalisysBattery = () => {
        if ((conditionBattery1 === undefined) || (conditionForBatteries === undefined) || (isNaN(conditionForBatteries))) {
            sumOfValuesBattery.push(0, 0, 0)
        } else {
            if (conditionForBatteries === 12) {
                if (conditionBattery1 === 250) {
                    sumOfValuesBattery.push('250', arrayOfNumberOfBateries12v[0], budgetInCurrencyBatteries12v[0])
                } else {
                    if (conditionBattery1 === 200) {
                        sumOfValuesBattery.push('200', arrayOfNumberOfBateries12v[1], budgetInCurrencyBatteries12v[1])
                    } else {
                        if (conditionBattery1 === 150) {
                            sumOfValuesBattery.push('150', arrayOfNumberOfBateries12v[2], budgetInCurrencyBatteries12v[2])
                        } else {
                            if (conditionBattery1 === 100) {
                                sumOfValuesBattery.push('100', arrayOfNumberOfBateries12v[3], budgetInCurrencyBatteries12v[3])
                            }
                        }
                    }
                }
            } else {
                if (conditionForBatteries === 24) {
                    if (conditionBattery1 === 250) {
                        sumOfValuesBattery.push('250', arrayOfNumberOfBateries24v[0], budgetInCurrencyBatteries24v[0])
                    } else {
                        if (conditionBattery1 === 200) {
                            sumOfValuesBattery.push('200', arrayOfNumberOfBateries24v[1], budgetInCurrencyBatteries24v[1])
                        } else {
                            if (conditionBattery1 === 150) {
                                sumOfValuesBattery.push('150', arrayOfNumberOfBateries24v[2], budgetInCurrencyBatteries24v[2])
                            } else {
                                if (conditionBattery1 === 100) {
                                    sumOfValuesBattery.push('100', arrayOfNumberOfBateries24v[3], budgetInCurrencyBatteries24v[3])
                                }
                            }
                        }
                    }
                } else {
                    if (conditionBattery1 === 250) {
                        sumOfValuesBattery.push('250', arrayOfNumberOfBateries48v[0], budgetInCurrencyBatteries48v[0])
                    } else {
                        if (conditionBattery1 === 200) {
                            sumOfValuesBattery.push('200', arrayOfNumberOfBateries48v[1], budgetInCurrencyBatteries48v[1])
                        } else {
                            if (conditionBattery1 === 150) {
                                sumOfValuesBattery.push('150', arrayOfNumberOfBateries48v[2], budgetInCurrencyBatteries48v[2])
                            } else {
                                if (conditionBattery1 === 100) {
                                    sumOfValuesBattery.push('100', arrayOfNumberOfBateries48v[3], budgetInCurrencyBatteries48v[3])
                                }
                            }
                        }
                    }
                }
            }
        }
        return sumOfValuesBattery
    }

    priceAnalisysBattery()

    const priceAndCorrectRegulator = () => {
        if (sumOfValuesBattery[1] === 0) {
            sumOfValuesRegulator.push(0)
        }
        if (sumOfValuesBattery[1] != 0) {
            if (conditionForBatteries === 12) {
                if (conditionsForPanels === undefined) {
                    sumOfValuesRegulator.push(0)
                } else {
                    if (conditionsForPanels === 100) {
                        sumOfValuesRegulator.push(analiticFunctionForRegulators12v[0], (parseInt(Number(arrayOfQuantity1[0]))), analiticAdditionalRegulators12v[0])
                    }
                    if (conditionsForPanels === 160) {
                        sumOfValuesRegulator.push(analiticFunctionForRegulators12v[1], (parseInt(Number(arrayOfQuantity1[1]))), analiticAdditionalRegulators12v[1])
                    }
                    if (conditionsForPanels === 290) {
                        sumOfValuesRegulator.push(analiticFunctionForRegulators12v[2], (parseInt(Number(arrayOfQuantity1[2]))), analiticAdditionalRegulators12v[2])
                    }
                    if (conditionsForPanels === 330) {
                        sumOfValuesRegulator.push(analiticFunctionForRegulators12v[3], (parseInt(Number(arrayOfQuantity1[3]))), analiticAdditionalRegulators12v[3])
                    }
                    if (conditionsForPanels === 400) {
                        sumOfValuesRegulator.push(analiticFunctionForRegulators12v[4], (parseInt(Number(arrayOfQuantity1[4]))), analiticAdditionalRegulators12v[4])
                    }
                    if (conditionsForPanels === 500) {
                        sumOfValuesRegulator.push(analiticFunctionForRegulators12v[5], (parseInt(Number(arrayOfQuantity1[5]))), analiticAdditionalRegulators12v[5])
                    }
                }
            }
            if (conditionForBatteries === 24) {
                if (conditionsForPanels === undefined) {
                    sumOfValuesRegulator.push(0)
                } else {
                    if (conditionsForPanels === 100) {
                        sumOfValuesRegulator.push(analiticFunctionForRegulators24v[0], (parseInt(Number(arrayOfQuantity2[0]))), analiticAdditionalRegulators24v[0])
                    }
                    if (conditionsForPanels === 160) {
                        sumOfValuesRegulator.push(analiticFunctionForRegulators24v[1], (parseInt(Number(arrayOfQuantity2[1]))), analiticAdditionalRegulators24v[1])
                    }
                    if (conditionsForPanels === 290) {
                        sumOfValuesRegulator.push(analiticFunctionForRegulators24v[2], (parseInt(Number(arrayOfQuantity2[2]))), analiticAdditionalRegulators24v[2])
                    }
                    if (conditionsForPanels === 330) {
                        sumOfValuesRegulator.push(analiticFunctionForRegulators24v[3], (parseInt(Number(arrayOfQuantity2[3]))), analiticAdditionalRegulators24v[3])
                    }
                    if (conditionsForPanels === 400) {
                        sumOfValuesRegulator.push(analiticFunctionForRegulators24v[4], (parseInt(Number(arrayOfQuantity2[4]))), analiticAdditionalRegulators24v[4])
                    }
                    if (conditionsForPanels === 500) {
                        sumOfValuesRegulator.push(analiticFunctionForRegulators24v[5], (parseInt(Number(arrayOfQuantity2[5]))), analiticAdditionalRegulators24v[5])
                    }
                }
            }
            if (conditionForBatteries === 48) {
                if (conditionsForPanels === undefined) {
                    sumOfValuesRegulator.push(0)
                } else {
                    if (conditionsForPanels === 100) {
                        sumOfValuesRegulator.push(analiticFunctionForRegulators48v[0], (parseInt(Number(arrayOfQuantity3[0]))), analiticAdditionalRegulators48v[0])
                    }
                    if (conditionsForPanels === 160) {
                        sumOfValuesRegulator.push(analiticFunctionForRegulators48v[1], (parseInt(Number(arrayOfQuantity3[1]))), analiticAdditionalRegulators48v[1])
                    }
                    if (conditionsForPanels === 290) {
                        sumOfValuesRegulator.push(analiticFunctionForRegulators48v[2], (parseInt(Number(arrayOfQuantity3[2]))), analiticAdditionalRegulators48v[2])
                    }
                    if (conditionsForPanels === 330) {
                        sumOfValuesRegulator.push(analiticFunctionForRegulators48v[3], (parseInt(Number(arrayOfQuantity3[3]))), analiticAdditionalRegulators48v[3])
                    }
                    if (conditionsForPanels === 400) {
                        sumOfValuesRegulator.push(analiticFunctionForRegulators48v[4], (parseInt(Number(arrayOfQuantity3[4]))), analiticAdditionalRegulators48v[4])
                    }
                    if (conditionsForPanels === 500) {
                        sumOfValuesRegulator.push(analiticFunctionForRegulators48v[5], (parseInt(Number(arrayOfQuantity3[5]))), analiticAdditionalRegulators48v[5])
                    }
                }
            }
        }
        return sumOfValuesRegulator
    }

    priceAndCorrectRegulator()

    let sumOfValuesRegulator_ = sumOfValuesRegulator.map((data, index) => {
        if (index === 0) {
            data = data
        }
        if (index === 1) {
            if (data === 0) {
                data = 1
            }
        }
        if (index === 2) {
            data === data
        }
        return data
    })

    //console.log(sumOfValuesRegulator_)

    let priceMainRegulator = regulatorsMPPTWithOutRepeat.find(data => { //i can't be undefined
        if (sumOfValuesRegulator_[0] === data.Cc) {
            return data
        } else {
            return 0
        }
    })//here is the information that  we need for the type of regulators

    let priceAdditionalRegulator = regulatorsMPPTWithOutRepeat.find(data => { //i can't be undefined
        if (sumOfValuesRegulator_[2] === data.Cc) {
            return data
        } else {
            return 0
        }
    })

    let priceMainRegulator_
    let priceAdditionalRegulator_

    const functionAnalisysUndefined = (array) => {
        let aux = []
        if (array === undefined) {
            aux = 0
        } else {
            aux = array
        }
        priceMainRegulator_ = (aux.price) * sumOfValuesRegulator_[1]
        return priceMainRegulator_
    }

    const functionAnalisysUndefined1 = (array) => {
        if (array === undefined) {
            priceAdditionalRegulator_ = 0
        } else {
            priceAdditionalRegulator_ = array.price
        }
        return priceAdditionalRegulator_
    }

    functionAnalisysUndefined(priceMainRegulator)

    functionAnalisysUndefined1(priceAdditionalRegulator)

    const functionQuantityNonZero = (data) => {
        let aux
        if (data === 0 || data === undefined || isNaN(data)) {
            aux = 0
        } else {
            aux = 1
        }
        return aux
    }

    let quantityNonZero = functionQuantityNonZero(sumOfValuesRegulator_[2])



    const functionVoltage = (data) => {
        let aux
        if (isNaN(data) || data === 0 || data === undefined) {
            aux = 0
        } else {
            aux = data
        }
        return aux
    }

    let voltageOfBattery_ = functionVoltage(conditionForBatteries)
    let typeOfBattery = functionVoltage(sumOfValuesBattery[1])
    let quantityMainRegulator = functionVoltage(sumOfValuesRegulator_[1])

    ///////////////////////////////////////////////////////////////////////////above here - controllers buget


    ///////////////////////////////////////////////////////////////////////////inverters down here

    let multidimensionalArray = [
        {
            id: NP[0],//Panel numbers 
            Power: panels[0].Power,
            inverter2000W: {
                type: '2000',
                quantity: Math.ceil(consumptionOverDimension / inverters[0].Power), //Quantity of panels of 2000w
                quantityForEachPanel: (NP[0] / (consumptionOverDimension / inverters[0].Power)).toFixed(1) // Quantity of panels for each inverter
            },
            inverter1800W: {
                type: '1800',
                quantity: Math.ceil(consumptionOverDimension / inverters[1].Power),
                quantityForEachPanel: (NP[0] / (consumptionOverDimension / inverters[1].Power)).toFixed(1)
            },
            inverter1500W: {
                type: '1500',
                quantity: Math.ceil(consumptionOverDimension / inverters[2].Power),
                quantityForEachPanel: (NP[0] / (consumptionOverDimension / inverters[2].Power)).toFixed(1)
            },
            inverter700W: {
                type: '700',
                quantity: Math.ceil(consumptionOverDimension / inverters[3].Power),
                quantityForEachPanel: (NP[0] / (consumptionOverDimension / inverters[3].Power)).toFixed(1)
            }
        },
        {
            id: NP[1],
            Power: panels[1].Power,
            inverter2000W: {
                type: '2000',
                quantity: Math.ceil(consumptionOverDimension / inverters[0].Power),
                quantityForEachPanel: (NP[1] / (consumptionOverDimension / inverters[0].Power)).toFixed(1)
            },
            inverter1800W: {
                type: '1800',
                quantity: Math.ceil(consumptionOverDimension / inverters[1].Power),
                quantityForEachPanel: (NP[1] / (consumptionOverDimension / inverters[1].Power)).toFixed(1)
            },
            inverter1500W: {
                type: '1500',
                quantity: Math.ceil(consumptionOverDimension / inverters[2].Power),
                quantityForEachPanel: (NP[1] / (consumptionOverDimension / inverters[2].Power)).toFixed(1)
            },
            inverter700W: {
                type: '700',
                quantity: Math.ceil(consumptionOverDimension / inverters[3].Power),
                quantityForEachPanel: (NP[1] / (consumptionOverDimension / inverters[3].Power)).toFixed(1)
            }
        },
        {
            id: NP[2],
            Power: panels[2].Power,
            inverter2000W: {
                type: '2000',
                quantity: Math.ceil(consumptionOverDimension / inverters[0].Power),
                quantityForEachPanel: (NP[2] / (consumptionOverDimension / inverters[0].Power)).toFixed(1)
            },
            inverter1800W: {
                type: '1800',
                quantity: Math.ceil(consumptionOverDimension / inverters[1].Power),
                quantityForEachPanel: (NP[2] / (consumptionOverDimension / inverters[1].Power)).toFixed(1)
            },
            inverter1500W: {
                type: '1500',
                quantity: Math.ceil(consumptionOverDimension / inverters[2].Power),
                quantityForEachPanel: (NP[2] / (consumptionOverDimension / inverters[2].Power)).toFixed(1)
            },
            inverter700W: {
                type: '700',
                quantity: Math.ceil(consumptionOverDimension / inverters[3].Power),
                quantityForEachPanel: (NP[2] / (consumptionOverDimension / inverters[3].Power)).toFixed(1)
            }
        },
        {
            id: NP[3],
            Power: panels[3].Power,
            inverter2000W: {
                type: '2000',
                quantity: Math.ceil(consumptionOverDimension / inverters[0].Power),
                quantityForEachPanel: (NP[3] / (consumptionOverDimension / inverters[0].Power)).toFixed(1)
            },
            inverter1800W: {
                type: '1800',
                quantity: Math.ceil(consumptionOverDimension / inverters[1].Power),
                quantityForEachPanel: (NP[3] / (consumptionOverDimension / inverters[1].Power)).toFixed(1)
            },
            inverter1500W: {
                type: '1500',
                quantity: Math.ceil(consumptionOverDimension / inverters[2].Power),
                quantityForEachPanel: (NP[3] / (consumptionOverDimension / inverters[2].Power)).toFixed(1)
            },
            inverter700W: {
                type: '700',
                quantity: Math.ceil(consumptionOverDimension / inverters[3].Power),
                quantityForEachPanel: (NP[3] / (consumptionOverDimension / inverters[3].Power)).toFixed(1)
            }
        },
        {
            id: NP[4],
            Power: panels[4].Power,
            inverter2000W: {
                type: '2000',
                quantity: Math.ceil(consumptionOverDimension / inverters[0].Power),
                quantityForEachPanel: (NP[4] / (consumptionOverDimension / inverters[0].Power)).toFixed(1)
            },
            inverter1800W: {
                type: '1800',
                quantity: Math.ceil(consumptionOverDimension / inverters[1].Power),
                quantityForEachPanel: (NP[4] / (consumptionOverDimension / inverters[1].Power)).toFixed(1)
            },
            inverter1500W: {
                type: '1500',
                quantity: Math.ceil(consumptionOverDimension / inverters[2].Power),
                quantityForEachPanel: (NP[4] / (consumptionOverDimension / inverters[2].Power)).toFixed(1)
            },
            inverter700W: {
                type: '700',
                quantity: Math.ceil(consumptionOverDimension / inverters[3].Power),
                quantityForEachPanel: (NP[4] / (consumptionOverDimension / inverters[3].Power)).toFixed(1)
            }
        },
        {
            id: NP[5],
            Power: panels[5].Power,
            inverter2000W: {
                type: '2000',
                quantity: Math.ceil(consumptionOverDimension / inverters[0].Power),
                quantityForEachPanel: (NP[5] / (consumptionOverDimension / inverters[0].Power)).toFixed(1)
            },
            inverter1800W: {
                type: '1800',
                quantity: Math.ceil(consumptionOverDimension / inverters[1].Power),
                quantityForEachPanel: (NP[5] / (consumptionOverDimension / inverters[1].Power)).toFixed(1)
            },
            inverter1500W: {
                type: '1500',
                quantity: Math.ceil(consumptionOverDimension / inverters[2].Power),
                quantityForEachPanel: (NP[5] / (consumptionOverDimension / inverters[2].Power)).toFixed(1)
            },
            inverter700W: {
                type: '700',
                quantity: Math.ceil(consumptionOverDimension / inverters[3].Power),
                quantityForEachPanel: (NP[5] / (consumptionOverDimension / inverters[3].Power)).toFixed(1)
            }
        }
    ]

    //console.log(inverters)

    let priceOfInverters = []

    const selectInverterFunction = () => {
        if ((conditionsForPanels === 0 || conditionsForPanels === undefined) && (conditionInverter === 0 || conditionInverter === undefined)) {
            priceOfInverters.push(0)
        } else {
            if (conditionsForPanels === 100 && conditionInverter === 2000) {
                priceOfInverters.push((multidimensionalArray[0].inverter2000W.quantity), inverters[0].price)
            }
            if (conditionsForPanels === 100 && conditionInverter === 1800) {
                priceOfInverters.push((multidimensionalArray[0].inverter1800W.quantity), inverters[1].price)
            }
            if (conditionsForPanels === 100 && conditionInverter === 1500) {
                priceOfInverters.push((multidimensionalArray[0].inverter1500W.quantity), inverters[2].price)
            }
            if (conditionsForPanels === 100 && conditionInverter === 700) {
                priceOfInverters.push((multidimensionalArray[0].inverter700W.quantity), inverters[3].price)
            }
            ////////////////////////////////////////////////////////////////
            if (conditionsForPanels === 160 && conditionInverter === 2000) {
                priceOfInverters.push((multidimensionalArray[1].inverter2000W.quantity), inverters[0].price)
            }
            if (conditionsForPanels === 160 && conditionInverter === 1800) {
                priceOfInverters.push((multidimensionalArray[1].inverter1800W.quantity), inverters[1].price)
            }
            if (conditionsForPanels === 160 && conditionInverter === 1500) {
                priceOfInverters.push((multidimensionalArray[1].inverter1500W.quantity), inverters[2].price)
            }
            if (conditionsForPanels === 160 && conditionInverter === 700) {
                priceOfInverters.push((multidimensionalArray[1].inverter700W.quantity), inverters[3].price)
            }
            ////////////////////////////////////////////////////////////////
            if (conditionsForPanels === 290 && conditionInverter === 2000) {
                priceOfInverters.push((multidimensionalArray[2].inverter2000W.quantity), inverters[0].price)
            }
            if (conditionsForPanels === 290 && conditionInverter === 1800) {
                priceOfInverters.push((multidimensionalArray[2].inverter1800W.quantity), inverters[1].price)
            }
            if (conditionsForPanels === 290 && conditionInverter === 1500) {
                priceOfInverters.push((multidimensionalArray[2].inverter1500W.quantity), inverters[2].price)
            }
            if (conditionsForPanels === 290 && conditionInverter === 700) {
                priceOfInverters.push((multidimensionalArray[2].inverter700W.quantity), inverters[3].price)
            }
            ////////////////////////////////////////////////////////////////
            if (conditionsForPanels === 330 && conditionInverter === 2000) {
                priceOfInverters.push((multidimensionalArray[3].inverter2000W.quantity), inverters[0].price)
            }
            if (conditionsForPanels === 330 && conditionInverter === 1800) {
                priceOfInverters.push((multidimensionalArray[3].inverter1800W.quantity), inverters[1].price)
            }
            if (conditionsForPanels === 330 && conditionInverter === 1500) {
                priceOfInverters.push((multidimensionalArray[3].inverter1500W.quantity), inverters[2].price)
            }
            if (conditionsForPanels === 330 && conditionInverter === 700) {
                priceOfInverters.push((multidimensionalArray[3].inverter700W.quantity), inverters[3].price)
            }
            ////////////////////////////////////////////////////////////////
            if (conditionsForPanels === 400 && conditionInverter === 2000) {
                priceOfInverters.push((multidimensionalArray[4].inverter2000W.quantity), inverters[0].price)
            }
            if (conditionsForPanels === 400 && conditionInverter === 1800) {
                priceOfInverters.push((multidimensionalArray[4].inverter1800W.quantity), inverters[1].price)
            }
            if (conditionsForPanels === 400 && conditionInverter === 1500) {
                priceOfInverters.push((multidimensionalArray[4].inverter1500W.quantity), inverters[2].price)
            }
            if (conditionsForPanels === 400 && conditionInverter === 700) {
                priceOfInverters.push((multidimensionalArray[4].inverter700W.quantity), inverters[3].price)
            }
            ////////////////////////////////////////////////////////////////
            if (conditionsForPanels === 500 && conditionInverter === 2000) {
                priceOfInverters.push((multidimensionalArray[5].inverter2000W.quantity), inverters[0].price)
            }
            if (conditionsForPanels === 500 && conditionInverter === 1800) {
                priceOfInverters.push((multidimensionalArray[5].inverter1800W.quantity), inverters[1].price)
            }
            if (conditionsForPanels === 500 && conditionInverter === 1500) {
                priceOfInverters.push((multidimensionalArray[5].inverter1500W.quantity), inverters[2].price)
            }
            if (conditionsForPanels === 500 && conditionInverter === 700) {
                priceOfInverters.push((multidimensionalArray[5].inverter700W.quantity), inverters[3].price)
            }
        }
    }

    selectInverterFunction()


    ///////////////////////////////////////////////////////////////////////////inverters above here


    //////////////////////total down here

    const eliminatedErrorNaN = (data) => {
        let aux
        if (isNaN(data) || data === undefined) {
            aux = 0
        } else {
            aux = data
        }
        return aux
    }

    let valueOfBattery = eliminatedErrorNaN(sumOfValuesBattery[2])
    let valueOfRegulator = eliminatedErrorNaN(priceMainRegulator_)
    let valueOfAdditionalRegulator = eliminatedErrorNaN(priceAdditionalRegulator_)
    let valueOfInverters = eliminatedErrorNaN((priceOfInverters[1] * priceOfInverters[0]))
    let valueOfPanels = eliminatedErrorNaN(sumOfValuesP[2])
    let quantityInverters = eliminatedErrorNaN(priceOfInverters[0])
    let quantityOfPanels = eliminatedErrorNaN(sumOfValuesP[0])

    totalBudgetValue = valueOfPanels + valueOfBattery + valueOfRegulator + valueOfAdditionalRegulator + valueOfInverters

    const functionShowBudget = () => setBudgetChange(!budgetChange)

    //////////////////////total above here

    let panelType
    let voltageType
    let batteryType
    let inverterType
    let typeRegulator_main
    let typeRegulator_additional

    if (conditionsForPanels !== undefined) {
        panelType = conditionsForPanels
    } else {
        panelType = 0
    }

    if (conditionForBatteries !== undefined) {
        voltageType = conditionForBatteries
    } else {
        voltageType = 0
    }

    if (conditionBattery1 !== undefined) {
        batteryType = conditionBattery1
    } else {
        batteryType = 0
    }

    if (conditionInverter !== undefined) {
        inverterType = conditionInverter
    } else {
        inverterType = 0
    }

    if (priceMainRegulator === undefined) {
        typeRegulator_main = 0
    } else {
        typeRegulator_main = priceMainRegulator.Cc
    }

    if (priceAdditionalRegulator === undefined) {
        typeRegulator_additional = 0
    } else {
        typeRegulator_additional = priceAdditionalRegulator.Cc
    }


    let objectOfBudget = {
        value_OfPanels: valueOfPanels,
        quantity_OfPanels: quantityOfPanels,
        voltage_OfBattery_: voltageOfBattery_,
        value_OfBattery: valueOfBattery,
        sumOf_ValuesBattery: sumOfValuesBattery[1],
        quantity_MainRegulator: quantityMainRegulator,
        value_OfRegulator: valueOfRegulator,
        quantity_NonZero: quantityNonZero,
        value_OfAdditionalRegulator: valueOfAdditionalRegulator,
        quantity_Inverters: quantityInverters,
        value_OfInverters: valueOfInverters,
        total_BudgetValue: totalBudgetValue,
        type_OfBattery: typeOfBattery,
        panel_Type: panelType,
        voltage_Type: voltageType,
        battery_Type: batteryType,
        inverter_Type: inverterType,
        typpe_main_regulator: typeRegulator_main,
        type_additional_regulator: typeRegulator_additional
    }

    let data_to_show = []

    useEffect(() => {
        if (objectOfBudget.value_OfPanels !== 0) {
            setStateTestBudget(objectOfBudget)
        }
    }, [budgetChange])

    if (stateTestBudget === undefined) {
        data_to_show = objectOfBudget
    } else {
        data_to_show = stateTestBudget
    }

    

    //console.log('this is:',data_to_show)

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

            {budgetChange ?

                <TotalBudget
                    data_to_show={data_to_show}
                />

                :

                ''

            }

            {budgetChange ?

                ''
                :

                <div className='budget'>

                    <h3 className='Select-main'>Selección panel</h3>

                    <Select className='select-panel-select'
                        options={MainConditions}
                        onChange={handleSelectionChange}
                        defaultValue={MainConditions[0]}
                    />

                    <div className='budget-panel-quantity'>

                        <div className='budget-panel-quantity-row-reduce'>

                            <div className='budget-panel-quantity-1'>
                                <h3>Costo</h3>
                            </div>

                        </div>

                        <div className='budget-panel-quantity-row-1-reduce'>
                            <div className='budget-panel-quantity-1-1'>
                                {/* Un comentario JSX */}
                                <h3>{`$ ${new Intl.NumberFormat().format(Number(valueOfPanels))}`}</h3>
                            </div>

                        </div>

                    </div>

                    <h3 className='Select-main'>Voltage de batería</h3>

                    <Select className='select-panel-select'
                        options={MainConditionsB}
                        onChange={handleSelectionChangeB}
                        defaultValue={MainConditionsB[0]}
                    />

                    <div className='budget-panel-quantity'>

                        <div className='budget-panel-quantity-row'>

                            <div className='budget-panel-quantity-1'>
                                <h3>Voltage</h3>
                            </div>

                        </div>

                        <div className='budget-panel-quantity-row-1'>

                            <div className='budget-panel-quantity-1-1'>
                                <h3>{`${voltageOfBattery_} v`}</h3>
                            </div>

                        </div>

                    </div>

                    <h3 className='Select-main'>Selección batería</h3>

                    <Select className='select-panel-select'
                        options={MainConditionsBattery}
                        onChange={handleSelectionChangeBattery}
                        defaultValue={MainConditionsBattery[0]}
                    />

                    <div className='budget-panel-quantity'>

                        <div className='budget-panel-quantity-row-reduce'>

                            <div className='budget-panel-quantity-1'>
                                <h3>Costo</h3>
                            </div>

                        </div>

                        <div className='budget-panel-quantity-row-1-reduce'>

                            <div className='budget-panel-quantity-1-1'>
                                <h3>{`$ ${new Intl.NumberFormat().format(Number(valueOfBattery))}`}</h3>
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
                                <h3>{`${quantityMainRegulator} Uds`}</h3>
                            </div>

                            <div className='budget-panel-quantity-1-1'>
                                <h3>{`$ ${new Intl.NumberFormat().format(valueOfRegulator)}`}</h3>
                            </div>

                            <div className='budget-panel-quantity-1-1'>
                                <h3>{`${quantityNonZero} Uds`}</h3>
                            </div>

                            <div className='budget-panel-quantity-1-1'>
                                <h3>{`$ ${new Intl.NumberFormat().format(valueOfAdditionalRegulator)}`}</h3>
                            </div>

                        </div>

                    </div>

                    <h3 className='Select-main'>Selección inversor</h3>

                    <Select className='select-panel-select'
                        options={invertersArray}
                        onChange={handleSelectionInverter}
                        defaultValue={invertersArray[0]}
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
                                <h3>{`${quantityInverters} Uds`}</h3>
                            </div>

                            <div className='budget-panel-quantity-1-1'>
                                <h3>{`$ ${new Intl.NumberFormat().format(valueOfInverters)}`}</h3>
                            </div>

                        </div>

                    </div>


                </div>
            }

            <button onClick={functionShowBudget}>{budgetChange ? 'Regresar' : 'Ver presupuesto'}</button>

        </article >
    )
}

export default CardOfBudget