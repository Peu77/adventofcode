const fs = require('fs')
const readline = require('readline')
const inputFile = "first_input.txt"

let levels = []

function parse_input() {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(inputFile, {encoding: 'utf8'})
        const lineReader = readline.createInterface({input: readStream})

        lineReader.on('line', (line) => {
            const split = line.split(' ').map(Number)
            levels.push(split)
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

    levels.forEach((level) => {
        let safe = true;
        let minusCount = 0;
        for (let i = 1; i < level.length; i++) {
            const minus = level[i - 1] - level[i];
            const diff = Math.abs(minus);

            minusCount += minus > 0 ? 1 : -1;
            if (diff < 1 || diff > 3 ) {
                safe = false;
                break;
            }

        }

        if (safe && Math.abs(minusCount) === level.length - 1) {
            result++;
        }
    })

    console.log(result);
})