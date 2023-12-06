import { doesNotMatch } from 'assert';
import { readFile } from '../utils/file-manipulation.mjs';

const data = (await readFile('5/data.txt'))
    .replaceAll('\r', '')
    .trim()
    .split(/\n\s*\n/)
    .map(line => line.split(':')[1].trim());

const seeds = data[0].replace('seeds: ', '').trim().split(' ').map(num => Number(num))
const includedInInput = (num, ranges) => ranges.filter(range => range.input <= num && (range.input + range.range) > num).length > 0
const findMapping = (num, mapping) => {

    const correctMapping = mapping.filter(map => {
        return map.input <= num && (map.input + map.range) > num;
    }).pop();

    const [outputStart, inputStart] = [correctMapping.output, correctMapping.input]

    return outputStart + (num - inputStart);
}
const calculatedMapping = []
const addCalculatedMapping = (depth, input, output) => {
    if (calculatedMapping[depth]) {
        calculatedMapping[depth][input] = output
        return
    }

    calculatedMapping[depth] = {}
    calculatedMapping[depth][input] = output
}

// format x y z
// x: output start
// y: input start
// z: range offset
const maps = data.slice(1).map(entries => {
    return entries.split('\n').map(line => {
        const [outputStart, inputStart, range] = line.split(' ')
        return {
            output: Number(outputStart),
            input: Number(inputStart),
            range: Number(range)
        }
    })
})

// Part 2
const seedRanges = []
for (var i = 0; i < seeds.length - 1; i = i + 2) {
    seedRanges.push({
        start: Number(seeds[i]),
        range: Number(seeds[i + 1])
    })
}

let min = 0
for (let i = 0; i < seedRanges.length; i++) {
    const seedRange = seedRanges[i]

    for (let index = 0; index < seedRange.range; index++) {
        let currentVal = seedRange.start + index

        for (let depth = 0; depth < maps.length; depth++) {

            if (calculatedMapping[depth] != undefined && calculatedMapping[depth][currentVal]) {
                break;
            }


            if (!includedInInput(currentVal, maps[depth])) {
                addCalculatedMapping(depth, currentVal, currentVal)
                continue;
            }

            const val = findMapping(currentVal, maps[depth])

            if (depth == 6) {
                if (min > val) {
                    min = val;
                    break;
                }
            }

            addCalculatedMapping(depth, currentVal, val)
            currentVal = val
        }
    }
}


const finalMapping = calculatedMapping[calculatedMapping.length - 1]
console.log(`The closest location is the following: ${min}`)