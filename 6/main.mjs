const races = {
    times: [59, 70, 78, 78],
    distances: [430, 1218, 1213, 1276]
}

const partTwoRace = {
    times: [59707878],
    distances: [430121812131276]
}

const getNumberOfPossibilities = (races) => {
    return races.times.map((time, index) => {
        let breaksRecords = 0
        for (let i = 0; i < time; i++) {
            (time - i) * i > races.distances[index] ? breaksRecords++ : null;
        }
        return breaksRecords
    }).reduce((a, b) => a * b, 1)
}

console.log(`Number of Possibilities for part 1: ${getNumberOfPossibilities(races)}`)
console.log(`Number of Possibilities for part 2: ${getNumberOfPossibilities(partTwoRace)}`)