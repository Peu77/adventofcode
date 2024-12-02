const fs = require('fs')
const readline = require('readline')
const inputFile = "second_input.txt"

let list_a = []
let list_b = []

const nbCountB = new Map();

function parse_input() {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(inputFile, {encoding: 'utf8'})
        const lineReader = readline.createInterface({input: readStream})

        lineReader.on('line', (line) => {
            const split = line.split(' ')
            list_a.push(split[0])
            list_b.push(split[3])
        })

        lineReader.on('close', () => {
            resolve()
        })

        lineReader.on('error', (err) => {
            reject(err)
        })
    })
}

parse_input().then(() => {
    let result = 0;

    list_b.forEach((value) => {
        if (nbCountB.has(value)) {
            nbCountB.set(value, nbCountB.get(value) + 1);
        } else {
            nbCountB.set(value, 1);
        }
    })

    list_a.forEach((value) => {
        if(nbCountB.has(value)) {
            result += nbCountB.get(value) * value;
        }

    })

    console.log(result);
})

