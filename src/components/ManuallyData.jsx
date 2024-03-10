import React, { useEffect, useState } from 'react'
import useIrradiation from '../hooks/useIrradiation'
import { useForm } from 'react-hook-form'
import Select from 'react-select';
import CardOfCalculus from './CardOfCalculus';
import '../styles/ManuallyData.css'
import CardOfBudget from './CardOfBudget';

const ManuallyData = () => {
    const arrayOfDeparments = [
        { label: 'Amazonas', value: 1 },
        { label: 'Antioquia', value: 2 },
        { label: 'Arauca', value: 3 },
        { label: 'Atlántico', value: 4 },
        { label: 'Bolívar', value: 5 },
        { label: 'Boyacá', value: 6 },
        { label: 'Caldas', value: 7 },
        { label: 'Caquetá', value: 8 },
        { label: 'Casanare', value: 9 },
        { label: 'Cauca', value: 10 },
        { label: 'Cesar', value: 11 },
        { label: 'Chocó', value: 12 },
        { label: 'Córdoba', value: 13 },
        { label: 'Cundinamarca', value: 14 },
        { label: 'Guainía', value: 15 },
        { label: 'Guajira', value: 16 },
        { label: 'Guaviare', value: 17 },
        { label: 'Huila', value: 18 },
        { label: 'Magdalena', value: 19 },
        { label: 'Meta', value: 20 },
        { label: 'Nariño', value: 21 },
        { label: 'Norte de santander', value: 22 },
        { label: 'Providencia isla', value: 23 },
        { label: 'Putumayo', value: 24 },
        { label: 'Quindío', value: 25 },
        { label: 'Risaralda', value: 26 },
        { label: 'San andrés isla', value: 27 },
        { label: 'Santander', value: 28 },
        { label: 'Sucre', value: 29 },
        { label: 'Tolima', value: 30 },
        { label: 'Valle del cauca', value: 31 },
        { label: 'Vaupes', value: 32 },
        { label: 'Vichada', value: 33 }
    ]

    const [location, setLocation] = useState()
    const [location1, setLocation1] = useState()
    const [acceptIN, setAcceptIN] = useState(false)
    const [lookingIrradiation, setLookingIrradiation] = useState()
    const [statetest, setStatetest] = useState()
    const [stateTestBudget, setStateTestBudget] = useState()


    const handleSelectionIrradiation = ({ value }) => { //function to pass the setstates(setLookingIrradiation) for keep the information from selector
        setLookingIrradiation(value)
    }
    const irradiation = useIrradiation()//hook of irradiation

    let valueOfIrradiation
    let propIrradiation = []//array to keep inside the information about the irradiation in the place, also max and min values

    if (isNaN(lookingIrradiation) || lookingIrradiation === undefined) {
        valueOfIrradiation = 999
    } else {
        valueOfIrradiation = lookingIrradiation
    }

    let dataIrradiation = irradiation.filter(data => data.id === valueOfIrradiation)

    if (dataIrradiation.length === 0) {
        propIrradiation = [
            {
                id: 999,
                name: 'No country',
                max: 4000,
                min: 4000
            }
        ]
    } else {
        propIrradiation = dataIrradiation
    }

    //console.log(propIrradiation)

    useEffect(() => {
        const success = (pos) => {
            let lat = pos.coords.latitude
            let lon = pos.coords.longitude
            setLocation(lat)
            setLocation1(lon)

        }
        navigator.geolocation.getCurrentPosition(success)
    }, [])

    let latitudeOfPLace
    let longitudeOfPLace

    if (location === undefined) {
        "dont do anything"
    } else {
        latitudeOfPLace = Math.round(location)
    }

    if (location1 === undefined) {
        'dont do anything'
    } else {
        longitudeOfPLace = Math.round(location1)
    }

    //from here

    const defaultData = {
        autonomy: "1",
        consumption1: "0.00001",
        consumption2: "0.00001",
        consumption3: "0.00001",
        consumption4: "0.00001",
        consumption5: "0.00001",
        consumption6: "0.00001",
        consumption7: "0.00001"
    }

    const defaultReset = {
        autonomy: "",
        consumption1: "",
        consumption2: "",
        consumption3: "",
        consumption4: "",
        consumption5: "",
        consumption6: "",
        consumption7: ""
    }

    const { register, handleSubmit, reset } = useForm()
    const [dataOrigin, setDataOrigin] = useState(defaultData)
    const [isShow, setIsShow] = useState(false)


    const submit = (data) => {
        setDataOrigin(data)
        reset(defaultReset)
        setIsShow(!isShow)
    }

    const analytic = (num) => {
        let test = num.split(',')
        if (test.length !== 1) {
            return Number(test[0] + '.' + test[1])
        } else {
            return Number(num)
        }
    }


    let autonomy_Days = analytic(dataOrigin.autonomy)
    let data_A = analytic(dataOrigin.consumption1)
    let data_B = analytic(dataOrigin.consumption2)
    let data_C = analytic(dataOrigin.consumption3)
    let data_D = analytic(dataOrigin.consumption4)
    let data_E = analytic(dataOrigin.consumption5)
    let data_F = analytic(dataOrigin.consumption6)
    let data_G = analytic(dataOrigin.consumption7)

    let data_1 = data_A * 1000
    let data_2 = data_B * 1000
    let data_3 = data_C * 1000
    let data_4 = data_D * 1000
    let data_5 = data_E * 1000
    let data_6 = data_F * 1000
    let data_7 = data_G * 1000



    let dataConsuption = []

    const arrayOfCurrent = [12, 24, 48]

    dataConsuption.push(data_1, data_2, data_3, data_4, data_5, data_6, data_7)

    const largerConsuption = Math.max.apply(null, dataConsuption)// Obtain the max of the input data from the use form

    if (largerConsuption > 5000000) {
        window.location.reload(true);
    }

    const kb = 0.05 //accumulator losses
    const kc = 0.05 //converter losses
    const kv = 0.15 //several losses
    const ka = 0.005 //auto-discharge coefficient
    const Pd = 0.5 //battery discharge depth
    const R_1 = ((1 - kb - kc - kv) * (1 - ((ka * autonomy_Days) / Pd)))
    const R = R_1.toFixed(2)//performance

    const consumptionOverDimension = Math.round((largerConsuption / 30) / R)

    //const totalLoadCurrent12 = Math.round((consumptionOverDimension / arrayOfCurrent[0]))

    //const totalLoadCurrent24 = Math.round((consumptionOverDimension / arrayOfCurrent[1]))

    const total = Math.round(((data_1 + data_2 + data_3 + data_4 + data_5 + data_6 + data_7) / 7))
    const totalShow = total / 1000
    const consumptionOverDimensionShow = consumptionOverDimension / 1000
    const largerConsuptionShow = largerConsuption / 1000

    const submit1 = () => setIsShow(!isShow)
    return (
        <article className='Data_input'>

            <button className='button-app-1' onClick={submit1}>{isShow ? 'Regresar' : 'Ver datos'}</button>

            {isShow ?

                ''
                :
                <div className='form-deparments-and-data'>

                   <h3 className='choose-place'>Elegir departamento</h3>

                    <Select className='select-panel-select'
                        options={arrayOfDeparments}
                        onChange={handleSelectionIrradiation}
                        defaultValue={'Select department'}
                    />

                    <form className='input_form' onSubmit={handleSubmit(submit)} >
                        <div className='tittle-autonomy'>Dias de autonomía</div>
                        <input className='Autonomy-days-form' type="text" autoComplete='off' placeholder='Autonomía' {...register('autonomy')} />
                        <div className='tittle-autonomy' ><h3>Consumo</h3></div>
                        <input className='Autonomy-input' type="text" autoComplete='off' placeholder='Consumo 1 en kWh' {...register('consumption1')} />
                        <input className='Autonomy-input' type="text" autoComplete='off' placeholder='Consumo 2 en kWh' {...register('consumption2')} />
                        <input className='Autonomy-input' type="text" autoComplete='off' placeholder='Consumo 3 en kWh' {...register('consumption3')} />
                        <input className='Autonomy-input' type="text" autoComplete='off' placeholder='Consumo 4 en kWh' {...register('consumption4')} />
                        <input className='Autonomy-input' type="text" autoComplete='off' placeholder='Consumo 5 en kWh' {...register('consumption5')} />
                        <input className='Autonomy-input' type="text" autoComplete='off' placeholder='Consumo 6 en kWh' {...register('consumption6')} />
                        <input className='Autonomy-input' type="text" autoComplete='off' placeholder='Consumo 7 en kWh' {...register('consumption7')} />

                        <button>Calcular</button>

                    </form>

                </div>
            }

            {
                isShow ?
                    <CardOfCalculus
                        consumptionOverDimension={consumptionOverDimension}
                        arrayOfCurrent={arrayOfCurrent}
                        largerConsuption={largerConsuption}
                        location={location}
                        autonomy_Days={autonomy_Days}
                        latitudeOfPLace={latitudeOfPLace}
                        longitudeOfPLace={longitudeOfPLace}
                        setIsShow={setIsShow}
                        isShow={isShow}
                        propIrradiation={propIrradiation}
                    />
                    :
                    ''
            }

            <div className='grid-1'>
                <h3><span className='span-1'>Average Consuption: </span> <br /> <span className="span-2">{` ${totalShow} kWh/mes`}</span>  </h3>

                <h3><span className='span-1'>Larger consuption: </span> <br /> <span className="span-2">{`${largerConsuptionShow} kWh/mes `}</span> </h3>

                <h3><span className='span-1'>Consuption oversize: </span> <br /> <span className="span-2">{` ${consumptionOverDimensionShow} kWh/día `}</span> </h3>
            </div>


            <h3 className='Equipment-selection'>Selección de equipos</h3>


            <CardOfBudget
                consumptionOverDimension={consumptionOverDimension}
                arrayOfCurrent={arrayOfCurrent}
                largerConsuption={largerConsuption}
                autonomy_Days={autonomy_Days}
                propIrradiation={propIrradiation}
                setStateTestBudget={setStateTestBudget}
                stateTestBudget={stateTestBudget}
            />


        </article>

    )
}

export default ManuallyData