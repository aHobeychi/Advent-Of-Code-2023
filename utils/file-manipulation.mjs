// Function that reads and returns an arary
import { promises as fs } from 'fs'
import { EOL } from 'os';

const readFileToArray = async(filePath) => {
    try {
        const data = (await fs.readFile(filePath, 'utf8')).trim();
        return data.split(EOL);
    } catch (err) {
        console.error(`Error reading file ${filePath}: `, err);
    }
}

const readFile = async(filePath) => {
    try {
        return (await fs.readFile(filePath, 'utf8')).trim();
    } catch (err) {
        console.error(`Error reading file ${filePath}: `, err);
    }
}

export { readFileToArray, readFile }