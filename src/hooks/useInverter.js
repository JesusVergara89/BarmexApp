const useInverter = () => {
    const arrayOfInverters = [
        {
            Power: 2000,
            Type: 'microinverter',
            Phases: 'biphasic',
            price: 1596000
        },
        {
            Power: 1800,
            Type: 'microinverter',
            Phases: 'biphasic',
            price: 1519000
        },
        {
            Power: 1500,
            Type: 'microinverter',
            Phases: 'biphasic',
            price: 1418000
        },
        {
            Power: 700,
            Type: 'microinverter',
            Phases: 'biphasic',
            price: 873000
        }
    ]
    return arrayOfInverters
}

export default useInverter