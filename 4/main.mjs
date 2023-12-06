import { readFileToArray } from '../utils/file-manipulation.mjs'

const data = await readFileToArray('4/data.txt')

const cards = data.map((line, index) => {

    const numberSections = line.split(":")[1].split("|")
    const winningSection = numberSections[0].trim().split(" ").filter(digit => !isNaN(digit) && digit !== '')
    const selectedSection = numberSections[1].trim().split(" ").filter(digit => !isNaN(digit) && digit !== '')

    return {
        id: index,
        winningNumbers: winningSection,
        givenNumbers: selectedSection,
        numberOfCards: 1
    }
})

// PART 1
const points = cards.map(card => card.givenNumbers.filter(number => card.winningNumbers.includes(number)).length)
    .filter(match => match > 0) // Remove Zero Values
    .map(match => match - 1) // Calculate Offset
    .map(match => Math.pow(2, match)) // Calculate Power
    .reduce((partialSum, a) => partialSum + a, 0) // Calculate Sum

console.log(`The value of the cards is ${points}`)

// Part 2 
const numberOfCards = cards.map((card, index) => {

    const numberOfMatches = card.givenNumbers.filter(number => card.winningNumbers.includes(number)).length

    for (let i = 1; i <= numberOfMatches; i++) {
        cards.at(index + i).numberOfCards += (1 * card.numberOfCards)
    }

    return card.numberOfCards
}).reduce((partialSum, a) => partialSum + a, 0) // Calculate Sum

console.log(`Game is finished and you now have ${numberOfCards}`)
