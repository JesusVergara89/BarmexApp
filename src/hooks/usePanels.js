
const usePanels = () => {

    const arrayOfPanels = [
        {
            Power: 100,
            Voltaje: 12,
            Price: 283900,
            Ref: 'RTM-100P',
            Pmax: 100,
            Pmax_1: '0-5',
            Vmp: 17.40,
            Imp: 5.75,
            Voc: 21.58,
            Isc: 6.04,
            Efficiency: 15.44,
            cells: 'poli',
            dimension: {
                length: 1020,
                width_p: 670,
                height_p: 30,
                weight: 7
            }
        },

        {
            Power: 160,
            Voltaje: 12,
            Price: 475000,
            Ref: 'RT6E-150-170P',
            Pmax: 160, // Rated power in watts (Wp)
            Pmax_1: '0-5', //Tolerance from 0 to 5 (W)
            Vmp: 19.01, //Maximum power voltage (V)
            Imp: 8.42, //Maximum power current (A)
            Voc: 23.59, // Open circuit Voltage (V)
            Isc: 8.93, // Short circuit current (A)
            Efficiency: 16.16, //module efficiency (%)
            cells: 'poli',
            dimension: {
                length: 1487, //mm
                width_p: 666, //mm
                height_p: 35, //mm
                weight: 11.5  //KG
            }
        },

        {
            Power: 290,
            Voltaje: 24,
            Price: 598900,
            Ref: 'RT6C-P',
            Pmax: 290, // Rated power in watts (Wp)
            Pmax_1: '0-5', //Tolerance from 0 to 5 (W)
            Vmp: 31.8, //Maximum power voltage (V)
            Imp: 9.12, //Maximum power current (A)
            Voc: 38.4, // Open circuit Voltage (V)
            Isc: 9.59, // Short circuit current (A)
            Efficiency: 17.83, //module efficiency (%)
            cells: 'poli',
            dimension: {
                length: 1640, //mm
                width_p: 992, //mm
                height_p: 35, //mm
                weight: 19  //KG
            }
        },

        {
            Power: 330,
            Voltaje: 24,
            Price: 720000,
            Ref: 'LNSF-330P',
            Pmax: 330,
            Pmax_1: '0-5',
            Vmp: 37.39,
            Imp: 8.83,
            Voc: 46.36,
            Isc: 9.30,
            Efficiency: 17.01,
            cells: 'poli',
            dimension: {
                length: 1956,
                width_p: 992,
                height_p: 35,
                weight: 21
            }
        },

        {
            Power: 400,
            Voltaje:24,
            Price: 796000,
            Ref: 'JAM54S30',
            Pmax: 400,
            Pmax_1: '0-5',
            Vmp: 31.01,
            Imp: 12.90,
            Voc: 37.07,
            Isc: 13.79,
            Efficiency: 20.5,
            cells: 'mono',
            dimension: {
                length: 1722,
                width_p: 1134,
                height_p: 30,
                weight: 21.5
            }
        },

        {
            Power: 500,
            Voltaje: 48,
            Price: 1075000,
            Ref: 'TSM-DE18M(II)',
            Pmax: 500,
            Pmax_1: '0-5',
            Vmp: 42.8,
            Imp: 11.69,
            Voc: 51.70,
            Isc: 12.28,
            Efficiency: 20.7,
            cells: 'mono',
            dimension: {
                length: 2187,
                width_p: 1102,
                height_p: 35,
                weight: 26.5
            }
        }

    ]



    return arrayOfPanels
}

export default usePanels