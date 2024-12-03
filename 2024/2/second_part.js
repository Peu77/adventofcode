const fs = require('fs')
const readline = require('readline')
const inputFile = "second_input.txt"

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
        let overall_safe = false;
        for (let j = 0; j < level.length; j++) {
            let safe = true;
            let minusCount = 0;
            let copy = [...level];

            const to_remove = copy.splice(j, 1);
            copy = copy.filter(e => e !== to_remove);

            for (let i = 1; i < copy.length; i++) {
                const minus = copy[i - 1] - copy[i];
                const diff = Math.abs(minus);

                minusCount += minus > 0 ? 1 : -1;
                if (diff < 1 || diff > 3) {
                    safe = false;
                    break;
                }

            }

            if (safe && Math.abs(minusCount) === level.length - 2) {
                overall_safe = true;
                break;
            }
        }


        if (overall_safe) {
            result++;
        }
    })

    console.log(result);
})

