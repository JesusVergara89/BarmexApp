

const useRegulator = () => {
    const arrayOfRegulator = [
        {
            type: 'MPPT',
            ref: 'MPPT 150/100',
            price: 3566025.67,
            system_voltage_1: 12, //System voltage at 12v 
            system_voltage_2: 24, //System voltage at 24v
            system_voltage_3: 36, //System voltage at 36v
            system_voltage_4: 48, //System voltage at 48v
            Spp12: 1450, //Solar panel power (12V battery)
            Spp24: 2900, //Solar panel power (24V battery)
            Spp36: 4350, //Solar panel power (36V battery)
            Spp48: 5200, //Solar panel power (48V battery)
            Cc: 100, //Charging current
            Mccc: 50,//Máxima corriente de corto circuito FV 2)
            Tmca: 150, //150 V máximo absoluto en las condiciones más frías 145 V en arranque y funcionando al máximo
            ef: 98//Eficacia máxima            
        },
        {
            type: 'MPPT',
            ref: 'MPPT 250/100',
            price: 4201792.35,
            system_voltage_1: 12, //System voltage at 12v 
            system_voltage_2: 24, //System voltage at 24v
            system_voltage_3: 36, //System voltage at 36v
            system_voltage_4: 48, //System voltage at 48v
            Spp12: 1450, //Solar panel power (12V battery)
            Spp24: 2900,
            Spp36: 0, //Solar panel power (24V battery)
            Spp48: 5800, //Solar panel power (48V battery)
            Cc: 100, //Charging current
            Mccc: 70,//Máxima corriente de corto circuito FV 2)
            Tmca: 250, //150 V máximo absoluto en las condiciones más frías 145 V en arranque y funcionando al máximo
            ef: 99//Eficacia máxima            
        },
        {
            type: 'MPPT',
            ref: 'MPPT 250/85',
            price: 3806054.22,
            system_voltage_1: 12, //System voltage at 12v 
            system_voltage_2: 24, //System voltage at 24v
            system_voltage_3: 36, //System voltage at 36v
            system_voltage_4: 48, //System voltage at 48v
            Spp12: 1200, //Solar panel power (12V battery)
            Spp24: 2400,
            Spp36: 0, //Solar panel power (24V battery)
            Spp48: 4900, //Solar panel power (48V battery)
            Cc: 85, //Charging current
            Mccc: 70,//Máxima corriente de corto circuito FV 2)
            Tmca: 250, //150 V máximo absoluto en las condiciones más frías 145 V en arranque y funcionando al máximo
            ef: 99//Eficacia máxima            
        },
        {
            type: 'MPPT',
            ref: 'MPPT 150/85',
            price: 3016593.89,
            system_voltage_1: 12, //System voltage at 12v 
            system_voltage_2: 24, //System voltage at 24v
            system_voltage_3: 36, //System voltage at 36v
            system_voltage_4: 48, //System voltage at 48v
            Spp12: 1200, //Solar panel power (12V battery)
            Spp24: 2400, //Solar panel power (24V battery)
            Spp36: 3600, //Solar panel power (36V battery)
            Spp48: 4900, //Solar panel power (48V battery)
            Cc: 85, //Charging current
            Mccc: 70,//Máxima corriente de corto circuito FV 2)
            Tmca: 150, //150 V máximo absoluto en las condiciones más frías 145 V en arranque y funcionando al máximo
            ef: 98//Eficacia máxima            
        },
        {
            type: 'MPPT',
            ref: 'MPPT 250/70',
            price: 3406196.055,
            system_voltage_1: 12, //System voltage at 12v 
            system_voltage_2: 24, //System voltage at 24v
            system_voltage_3: 36, //System voltage at 36v
            system_voltage_4: 48, //System voltage at 48v
            Spp12: 1000, //Solar panel power (12V battery)
            Spp24: 2000,
            Spp36: 0, //Solar panel power (24V battery)
            Spp48: 4000, //Solar panel power (48V battery)
            Cc: 70, //Charging current
            Mccc: 35,//Máxima corriente de corto circuito FV 2)
            Tmca: 250, //150 V máximo absoluto en las condiciones más frías 145 V en arranque y funcionando al máximo
            ef: 99//Eficacia máxima            
        },
        {
            type: 'MPPT',
            ref: 'MPPT 450/200',
            price: 9109734.03,
            system_voltage_1: 0, //System voltage at 12v 
            system_voltage_2: 0, //System voltage at 24v
            system_voltage_3: 0, //System voltage at 36v
            system_voltage_4: 48, //System voltage at 48v
            Spp48: 7200, //Solar panel power (48V battery)
            Cc: 200, //Charging current
            Mccc: 80,//Máxima corriente de corto circuito FV 
            Tmca: 450, //150 V máximo absoluto en las condiciones más frías 145 V en arranque y funcionando al máximo
            ef: 96//Eficacia máxima            
        },
        {
            type: 'MPPT',
            ref: 'MPPT 150/60',
            price: 3119100.15,
            system_voltage_1: 12, //System voltage at 12v 
            system_voltage_2: 24, //System voltage at 24v
            system_voltage_3: 36, //System voltage at 36v
            system_voltage_4: 48, //System voltage at 48v
            Spp12: 860, //Solar panel power (12V battery)
            Spp24: 1720, //Solar panel power (24V battery)
            Spp36: 2580, //Solar panel power (36V battery)
            Spp48: 3440, //Solar panel power (48V battery)
            Cc: 60, //Charging current
            Mccc: 50,//Máxima corriente de corto circuito FV 2)
            Tmca: 150, //150 V máximo absoluto en las condiciones más frías 145 V en arranque y funcionando al máximo
            ef: 98//Eficacia máxima            
        },
        {
            type: 'MPPT',
            ref: 'MPPT 150/70',
            price: 2695138.83,
            system_voltage_1: 12, //System voltage at 12v 
            system_voltage_2: 24, //System voltage at 24v
            system_voltage_3: 36, //System voltage at 36v
            system_voltage_4: 48, //System voltage at 48v
            Spp12: 1000, //Solar panel power (12V battery)
            Spp24: 2000, //Solar panel power (24V battery)
            Spp36: 3000, //Solar panel power (36V battery)
            Spp48: 4000, //Solar panel power (48V battery)
            Cc: 70, //Charging current
            Mccc: 50,//Máxima corriente de corto circuito FV 2)
            Tmca: 150, //150 V máximo absoluto en las condiciones más frías 145 V en arranque y funcionando al máximo
            ef: 98//Eficacia máxima            
        },
        {
            type: 'MPPT',
            ref: 'MPPT 100/50',
            price: 1497976.20,
            system_voltage_1: 12, //System voltage at 12v 
            system_voltage_2: 24, //System voltage at 24v
            system_voltage_3: 36, //System voltage at 36v
            system_voltage_4: 48, //System voltage at 48v
            Spp12: 700, //Solar panel power (12V battery)
            Spp24: 1400, //Solar panel power (24V battery)
            Cc: 50, //Charging current
            Mccc: 60,//Máxima corriente de corto circuito FV 2)
            Tmca: 100, //150 V máximo absoluto en las condiciones más frías 145 V en arranque y funcionando al máximo
            ef: 98//Eficacia máxima            
        },
        {
            type: 'MPPT',
            ref: 'MPPT 150/45',
            price: 2045348.21,
            system_voltage_1: 12, //System voltage at 12v 
            system_voltage_2: 24, //System voltage at 24v
            system_voltage_3: 36, //System voltage at 36v
            system_voltage_4: 48, //System voltage at 48v
            Spp12: 650, //Solar panel power (12V battery)
            Spp24: 1300, //Solar panel power (24V battery)
            Spp48: 2600, //Solar panel power (48V battery)
            Cc: 45, //Charging current
            Mccc: 50,//Máxima corriente de corto circuito FV 2)
            Tmca: 150, //150 V máximo absoluto en las condiciones más frías 145 V en arranque y funcionando al máximo
            ef: 98//Eficacia máxima            
        },
        {
            type: 'PWM',
            ref: 'PWM 12V/24V/10A',
            price: 127004.33,
            system_voltage_1: 12, //System voltage at 12v 
            system_voltage_2: 24, //System voltage at 24v
            Cc: 10, //Charging current   
        },
        {
            type: 'PWM',
            ref: 'PWM 12V/24V/20A',
            price: 158339.08,
            system_voltage_1: 12, //System voltage at 12v 
            system_voltage_2: 24, //System voltage at 24v
            Cc: 20, //Charging current   
        },
        {
            type: 'PWM',
            ref: 'PWM 12V/24V/30A',
            price: 194275.43,
            system_voltage_1: 12, //System voltage at 12v 
            system_voltage_2: 24, //System voltage at 24v
            Cc: 30, //Charging current   
        },
        {
            type: 'PWM',
            ref: 'PWM 12V/24V/40A',
            price: 306773.75,
            system_voltage_1: 12, //System voltage at 12v 
            system_voltage_2: 24, //System voltage at 24v
            Cc: 40, //Charging current   
        },
        {
            type: 'PWM',
            ref: 'PWM 12V/24V/50A',
            price: 377813.78,
            system_voltage_1: 12, //System voltage at 12v 
            system_voltage_2: 24, //System voltage at 24v
            Cc: 50, //Charging current   
        },
        {
            type: 'PWM',
            ref: 'PWM 12V/24V/60A',
            price: 373694.25,
            system_voltage_1: 12, //System voltage at 12v 
            system_voltage_2: 24, //System voltage at 24v
            Cc: 60, //Charging current   
        }
        
    ]
    return arrayOfRegulator
}

export default useRegulator