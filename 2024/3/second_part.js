const fs = require('fs')
const readline = require('readline')
const inputFile = "second_input.txt"

let lines = []


function parse_input() {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(inputFile, {encoding: 'utf8'})
        const lineReader = readline.createInterface({input: readStream})

        lineReader.on('line', (line) => {
            lines.push(line)
        })

        lineReader.on('close', () => {
            resolve()
        })

        lineReader.on('error', (err) => {
            reject(err)
        })
    })
}

let doIt = true;


function get_next_match(line){
    let result = 0;
    let i = 0;
    while(i < line.length){
        const string = line.slice(i);
        const next4 = line.slice(i, i + 4);
        if(next4 === "do()"){
            console.log("do()")
            doIt = true;
            i++;
            continue
        }
        const next7 = line.slice(i, i + 7);
        if(next7 === "don't()"){
            console.log("don't()")
            doIt = false;
            i++;
            continue
        }

        const mul_pattern = /mul\((\d+),(\d+)\)/
        const matches = string.match(mul_pattern, 0);

        if(matches === null || matches.index !== 0){
            i++;
            continue;
        }

        if(doIt){
            const x = parseInt(matches[1])
            const y = parseInt(matches[2])
            console.log(`mul(${x},${y})`)
            result += x * y;
        }

        i++;
    }

    return result;
}

parse_input().then(() => {

    let result = 0;
    lines.forEach((line) => {
        result += get_next_match(line);
    })
    console.log(result);
})

