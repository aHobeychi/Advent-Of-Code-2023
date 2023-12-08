import { readFileToArray } from '../utils/file-manipulation.mjs'

const cardsPartOne = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const cardsPartTwo = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']
const part = {
    cards: cardsPartOne,
    jokerOffset: () => 0
}

const getUniqueChars = (hand) => [... new Set(hand.split(''))]

const checkForNumberOfMatches = (hand, char, numberOfMatches) => {
    return hand.match(new RegExp(char, 'g') || []).length == numberOfMatches
}

const checkForFive = (hand) => {
    return checkForNumberOfMatches(hand, hand[0], 5)
}

const checkForFour = (hand) => {
    const setOfChars = getUniqueChars(hand)

    if (setOfChars.length !== 2) {
        return false;
    }

    return checkForNumberOfMatches(hand, setOfChars[0], 4) || checkForNumberOfMatches(hand, setOfChars[1], 4)
}

const checkForFullHouse = (hand) => {
    const setOfChars = getUniqueChars(hand)
    return setOfChars.length == 2;
}

const checkForThree = (hand) => {
    const setOfChars = getUniqueChars(hand)

    if (setOfChars.length !== 3) {
        return false;
    }

    return setOfChars.map(char => checkForNumberOfMatches(hand, char, 3)).includes(true)
}

const checkForTwoPair = (hand) => {
    const setOfChars = getUniqueChars(hand)

    if (setOfChars.length !== 3) {
        return false;
    }

    return setOfChars.map(char => checkForNumberOfMatches(hand, char, 2)).filter(result => result == true).length == 2
}

const checkForPair = (hand) => {
    const setOfChars = getUniqueChars(hand)

    if (setOfChars.length !== 4) {
        return false;
    }

    return setOfChars.map(char => checkForNumberOfMatches(hand, char, 2)).includes(true);
}

const getHandValue = (hand) => {

    let val = 0

    if (checkForFive(hand)) {
        val = 6
    } else if (checkForFour(hand)) {
        val = 5
    } else if (checkForFullHouse(hand)) {
        val = 4
    } else if (checkForThree(hand)) {
        val = 3
    } else if (checkForTwoPair(hand)) {
        val = 2
    } else if (checkForPair(hand)) {
        val = 1
    }

    return val + part.jokerOffset(hand)
}

const compareTwoHands = (first, second) => {
    const firstValue = getHandValue(first.hand)
    const secondValue = getHandValue(second.hand)

    if (firstValue == secondValue) {
        return compareTwoHandsByOrder(first.hand, second.hand)
    }

    return firstValue > secondValue ? 1 : -1
}

const compareTwoHandsByOrder = (first, second) => {
    for (let i = 0; i < first.length; i++) {
        if (part.cards.indexOf(first[i]) > part.cards.indexOf(second[i])) {
            return 1;
        } else if (part.cards.indexOf(first[i]) < part.cards.indexOf(second[i])) {
            return -1;
        }
    }

    return 0
}

// Part 1
const partOneTotal = (await readFileToArray('7/data.txt')).map(line => {
    return {
        hand: line.split(' ')[0],
        bid: Number(line.split(' ')[1]),
        value: getHandValue(line.split(' ')[0])
    }
}).sort(compareTwoHands).map((val, index) => val.bid * (index + 1))
    .reduce((a, b) => a + b, 0)


//Part 2
part.cards = cardsPartTwo

const applyWildcard = (hand) => {

    const numberOfJokers = (hand.match(new RegExp('J', 'g')) || []).length

    if (numberOfJokers == 0 || numberOfJokers == 5) {
        return 0;
    }

    if (checkForFour(hand)) {
        return 1;
    }

    if (checkForFullHouse(hand) || checkForThree(hand)) {
        return 2
    }

    if (checkForTwoPair(hand)) {
        if (numberOfJokers == 2) {
            return 3;
        }

        return 2
    }

    if (checkForPair(hand)) {
        return 2
    }

    return 1;
}

part.jokerOffset = applyWildcard

const partTwoTotal = (await readFileToArray('7/data.txt')).map(line => {
    return {
        hand: line.split(' ')[0],
        bid: Number(line.split(' ')[1]),
        value: getHandValue(line.split(' ')[0])
    }
}).sort(compareTwoHands).map((val, index) => val.bid * (index + 1))
    .reduce((a, b) => a + b, 0)

console.log(`Total: ${partOneTotal}`)
console.log(`Total Part 2: ${partTwoTotal}`)