import { EOL } from "os";
import { readFile } from "../common-js/file-manipulation.mjs";

const zeroColorCount = {
    'r': 0,
    'g': 0,
    'b': 0
}

const data = (await readFile('2/data.txt')).replaceAll(' ', '')
    .replaceAll('Game', '')
    .replaceAll('green', 'g')
    .replaceAll('red', 'r')
    .replaceAll('blue', 'b')
    .split(EOL)

const gameInfo = data.map(line => {
    const [id, games] = [line.split(':')[0], line.split(':')[1].split(";")]

    let maxes = {
        ...zeroColorCount
    }

    games.map(turn => {
        turn.split(',').map(selection => {
            const color = selection.charAt(selection.length - 1)
            const number = Number(selection.slice(0, selection.length - 1))

            if (maxes[color] < number) {
                maxes[color] = number
            }
        })
    })

    return {
        id: id,
        maxes: {
            ...maxes
        }
    }
})

const selectedCubes = {
    'r': 12,
    'g': 13,
    'b': 14
}

const ids = gameInfo.filter(game => {
    let maxes = game.maxes
    return maxes['r'] <= selectedCubes['r'] &&
        maxes['g'] <= selectedCubes['g'] &&
        maxes['b'] <= selectedCubes['b']
}).map(game => Number(game.id))


// Part 1
console.log(ids.reduce((partialSum, a) => partialSum + a, 0))
// Part 2
console.log(gameInfo.map(games => {
    const maxes = games.maxes;
    return maxes['r'] * maxes['g'] * maxes['b']
}).reduce((partialSum, a) => partialSum + a, 0))