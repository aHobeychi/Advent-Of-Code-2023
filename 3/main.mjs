import { readFileToArray } from "../utils/file-manipulation.mjs"

const symbols = new Set(['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '/', '+', '=', '-', '_'])
const numberRegex = /\d+/g
let sum = 0
const digitMatch = {}

const engineLines = await readFileToArray('3/data.txt')

const convertMatchToObj = (matches) => {
    return matches.map(match => {
        return {
            match: match[0],
            index: match['index']
        }
    })
}

const strContainsSymbol = (str) => {
    let match = false;
    symbols.forEach(symbol => {
        if (str.includes(symbol)) {
            match = true;
        }
    })

    return match;
}

const checkSymbolMatchLine = (match, index, lineIndex) => {

    if (lineIndex <= 0 || lineIndex >= engineLines.length - 1) {
        return false;
    }

    const currentLine = engineLines[lineIndex]
    const lengthOfNumber = match.length

    const examinedSlice = currentLine.slice(index - 1 < 0 ? 0 : index - 1, index + lengthOfNumber + 1)
    return strContainsSymbol(examinedSlice);
}

const checkForAsterixMatch = (numberMatch, index, lineIndex) => {
    if (lineIndex <= 0 || lineIndex >= engineLines.length - 1) {
        return false;
    }

    const currentLine = engineLines[lineIndex]
    const lengthOfNumber = numberMatch.length

    const examinedSlice = currentLine.slice(index - 1 < 0 ? 0 : index - 1, index + lengthOfNumber + 1)
    const asterixMatches = convertMatchToObj([...examinedSlice.matchAll(/\*/g)])

    asterixMatches.map(match => {
        const characterMatchIndex = match['index']
        const asterixIndex = characterMatchIndex + (index - 1 < 0 ? 0 : index - 1)

        if (digitMatch[`${lineIndex}|${asterixIndex}`]) {
            const curr = digitMatch[`${lineIndex}|${asterixIndex}`]
            digitMatch[`${lineIndex}|${asterixIndex}`] = [...curr, numberMatch]
        } else {
            digitMatch[`${lineIndex}|${asterixIndex}`] = [numberMatch]
        }
    })
}

const checkForNeighbouringSymbols = (match, index, lineIndex) => {
    const matchAbove = checkSymbolMatchLine(match, index, lineIndex - 1)
    const matchCurrentLine = checkSymbolMatchLine(match, index, lineIndex)
    const matchBelow = checkSymbolMatchLine(match, index, lineIndex + 1)

    return matchAbove || matchCurrentLine || matchBelow
}

const checkForNeighbouringAsterix = (match, index, lineIndex) => {
    checkForAsterixMatch(match, index, lineIndex - 1)
    checkForAsterixMatch(match, index, lineIndex)
    checkForAsterixMatch(match, index, lineIndex + 1)
}

for (let i = 0; i < engineLines.length; i++) {
    const line = engineLines[i];
    const numberMatches = convertMatchToObj([...line.matchAll(numberRegex)])

    numberMatches.forEach(match => {
        if (checkForNeighbouringSymbols(match['match'], match['index'], i)) {
            sum += Number(match['match'])
        }
    });
}


console.log(`The sum of all the parts is ${sum}`)

// PART 2
for (let i = 0; i < engineLines.length; i++) {
    const line = engineLines[i];
    const numberMatches = convertMatchToObj([...line.matchAll(numberRegex)])
    numberMatches.forEach(match => checkForNeighbouringAsterix(match['match'], match['index'], i))
}

let total = 0

Object.values(
    Object.keys(digitMatch)
        .reduce(function (filtered, key) {
            if (digitMatch[key].length == 2) filtered[key] = digitMatch[key];
            return filtered;
        }, {}))
    .map(pair => total += Number(pair[0]) * Number(pair[1]));

console.log(`The sum of the gears is ${total}`)