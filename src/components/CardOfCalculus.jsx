import '../styles/CardOfCalculus.css'

const CardOfCalculus = ({ consumptionOverDimension,
    arrayOfCurrent, largerConsuption, location,
    autonomy_Days, longitudeOfPLace, latitudeOfPLace, propIrradiation, isShow, totalShow }) => {

    let PF = 'PF-South'

    const N = autonomy_Days //Number of days of autonomy

    const K = 1.15

    const FI = (1 - (0.00012 * (location - (location - 10))))//irradiation factor

    const FS = 1//shadow factor

    //dataOfdeparments[i].irradiation -- Average anual irradiation Wh/day

    const Gdm_a_b = Math.round((propIrradiation[0].max) * K * FI * FS)//Average value of the solar irradiation Wh/day

    const kb = 0.05 //accumulator losses
    const kc = 0.05 //converter losses
    const kv = 0.15 //several losses
    const ka = 0.005 //auto-discharge coefficient
    const Pd = 0.5 //battery discharge depth
    const R_1 = ((1 - kb - kc - kv) * (1 - ((ka * N) / Pd)))
    const R = R_1.toFixed(2)//performance
    const E_1 = ((largerConsuption / 30) / R)
    const E = E_1.toFixed(2)//real consumption
    const C_112 = ((1.1 * E * N) / (arrayOfCurrent[0] * Pd))
    const C_124 = ((1.1 * E * N) / (arrayOfCurrent[1] * Pd))
    const C_148 = ((1.1 * E * N) / (arrayOfCurrent[2] * Pd))
    const C12 = C_112.toFixed(2)//Battery box for 12v
    const C24 = C_124.toFixed(2)//Battery box for 24v
    const C48 = C_148.toFixed(2)//Battery box for 48v


    //DOA: days of autonomy
    //AVIP: average value of irradiation in place
    //AVIPL: average value of irradiation in place with losses; like FI and FS
    //PRFM: performance of the system, usually is R but i'll use 40% which is really accurate
    //LCAB: larger consumption according to bill and with 40% over dimension - this is the same that the E= real consumption
    //BB-12/24V: batterry bank
    //AB12V: amoung of bateries at 12v
    //#BIS: number of batteries in series
    //BT: batteries 


    //Inclination- Orientation 

    let angleOfPanels

    let testVariable = 0;

    const analysisOfData = (lat) => { //Only for the north pole
        let inclinationOfPanels
        if ((lat >= 0) && (lat <= 15)) {
            inclinationOfPanels = 15
            return inclinationOfPanels
        } else {
            if ((lat > 15) && (lat <= 25)) {
                inclinationOfPanels = lat
                return inclinationOfPanels
            } else {
                if ((lat > 25) && (lat <= 30)) {
                    inclinationOfPanels = lat + 5
                    return inclinationOfPanels
                } else {
                    if ((lat > 30) && (lat <= 35)) {
                        inclinationOfPanels = lat + 10
                        return inclinationOfPanels
                    } else if ((lat > 35) && (lat <= 40)) {
                        inclinationOfPanels = lat + 15
                        return inclinationOfPanels
                    }
                    else {
                        inclinationOfPanels = lat + 20
                        return inclinationOfPanels
                    }
                }
            }
        }
    }

    angleOfPanels = analysisOfData(latitudeOfPLace)
    /*
        let anglesTestX=analysisOfData(5.38)
    
        console.log(anglesTestX)
    */

    const directionOfPanelFace = (data) => {
        if (data > 0) {
            return PF
        } else if (data === 0) {
            return PF = '⊥'
        } else {
            return PF = 'PF-North'
        }
    }

    const PF_1 = directionOfPanelFace(latitudeOfPLace)


    //Inclination- Orientation


    return (
        <article className={isShow ? 'article-calculus' : 'article-calculus on'}>

            <div className='Technical-information' >

                <div className='Technical-information-grid'>

                    <div className='Technical-information-grid-1'> <h3 className='Technical-information-grid-1-h3'>DOA:</h3></div>
                    <div className='Technical-information-grid-2'> <h3 className='Technical-information-grid-1-h3'>{`${N} días`}</h3></div>

                    <div className='Technical-information-grid-1'> <h3 className='Technical-information-grid-1-h3'>AVIP:</h3></div>
                    <div className='Technical-information-grid-2'> <h3 className='Technical-information-grid-1-h3'>{`${propIrradiation[0].max} Wh/día`}</h3></div>

                    <div className='Technical-information-grid-1'> <h3 className='Technical-information-grid-1-h3'>AVIPL:</h3></div>
                    <div className='Technical-information-grid-2'> <h3 className='Technical-information-grid-1-h3'>{`${Gdm_a_b} Wh/día`}</h3> </div>

                    <div className='Technical-information-grid-1'> <h3 className='Technical-information-grid-1-h3'>PRFM:</h3></div>
                    <div className='Technical-information-grid-2'> <h3 className='Technical-information-grid-1-h3'>{`${R}`}</h3> </div>

                    <div className='Technical-information-grid-1'> <h3 className='Technical-information-grid-1-h3'>Larger Consuption:</h3></div>
                    <div className='Technical-information-grid-2'> <h3 className='Technical-information-grid-1-h3 here'>{`${consumptionOverDimension} Wh/día`}</h3> </div>

                    <div className='Technical-information-grid-1'> <h3 className='Technical-information-grid-1-h3'>Average Consuption:</h3></div>
                    <div className='Technical-information-grid-2'> <h3 className='Technical-information-grid-1-h3 here'>{`${totalShow} kWh/mes`}</h3> </div>

                    <div className='Technical-information-grid-1'> <h3 className='Technical-information-grid-1-h3'>Average Consuption:</h3></div>
                    <div className='Technical-information-grid-2'> <h3 className='Technical-information-grid-1-h3 here'>{`${totalShow} kWh/mes`}</h3> </div>

                    <div className='Technical-information-grid-1'> <h3 className='Technical-information-grid-1-h3'>BB12V:</h3></div>
                    <div className='Technical-information-grid-2'> <h3 className='Technical-information-grid-1-h3'>{`${C12} Ah/día`}</h3> </div>

                    <div className='Technical-information-grid-1'> <h3 className='Technical-information-grid-1-h3'>BB24V:</h3></div>
                    <div className='Technical-information-grid-2'> <h3 className='Technical-information-grid-1-h3'>{`${C24} Ah/día`}</h3> </div>

                    <div className='Technical-information-grid-1'> <h3 className='Technical-information-grid-1-h3'>BB48V:</h3></div>
                    <div className='Technical-information-grid-2'> <h3 className='Technical-information-grid-1-h3'>{`${C48} Ah/día`}</h3> </div>

                </div>

            </div>

            <div className='Technical-information-grid'>

                <div className='Technical-information-grid-geo'> <h3 className='Technical-information-grid-1-h3'>Inclinación: </h3></div>
                <div className='Technical-information-grid-geo-1'> <h3 className='Technical-information-grid-1-h3'> &#8776; {angleOfPanels} &#10664;</h3> </div>

                <div className='Technical-information-grid-geo'> <h3 className='Technical-information-grid-1-h3'>Orientación: </h3></div>
                <div className='Technical-information-grid-geo-1'> <h3 className='Technical-information-grid-1-h3'>{PF_1}</h3> </div>

                <div className='Technical-information-grid-geo'> <h3 className='Technical-information-grid-1-h3'>Latitud: </h3></div>
                <div className='Technical-information-grid-geo-1'> <h3 className='Technical-information-grid-1-h3'> &#8776; {latitudeOfPLace} °</h3> </div>

                <div className='Technical-information-grid-geo'> <h3 className='Technical-information-grid-1-h3'>Longitud: </h3></div>
                <div className='Technical-information-grid-geo-1'> <h3 className='Technical-information-grid-1-h3'> &#8776; {longitudeOfPLace} °</h3> </div>

            </div>

        </article>
    )
}

export default CardOfCalculus