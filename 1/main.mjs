import assert from 'assert';
import { readFileToArray, readFile } from '../common-js/file-manipulation.mjs';

const removeNonDigit = (line) => {
    return line.replace(/\D/g, '')
}

const getFirstAndLastDigit = (digits) => {
    return Number(digits.charAt(0) + digits.charAt(digits.length - 1))
}

const part1Data = await readFileToArray('1/data.txt');

const sum = part1Data.map(removeNonDigit)
    .map(getFirstAndLastDigit)
    .reduce((partialSum, a) => partialSum + a, 0)

console.log(sum)

let dataPart2 = await readFile('1/data.txt');
dataPart2 = dataPart2
    .replace(/one/g, 'one1one')
    .replace(/two/g, 'two2two')
    .replace(/three/g, 'three3three')
    .replace(/four/g, 'four4ffour')
    .replace(/five/g, 'five5five')
    .replace(/six/g, 'six6six')
    .replace(/seven/g, 'seven7seven')
    .replace(/eight/g, 'eight8eight')
    .replace(/nine/g, 'nine9nine')
    .trim()
    .replace('\r', '')
    .split('\n')

const sumPart2 = dataPart2.map(removeNonDigit)
    .map(getFirstAndLastDigit)
    .reduce((partialSum, a) => partialSum + a, 0)


console.log(sumPart2)