const fs = require('fs')
const readline = require('readline')
const inputFile = "first_input.txt"

let list_a = []
let list_b = []

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
    list_a.sort();
    list_b.sort();

    for (let i = 0; i < list_a.length; i++) {
        result += Math.abs(list_a[i] - list_b[i]);
    }

    console.log(result);
})

