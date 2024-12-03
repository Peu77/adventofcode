const fs = require('fs')
const readline = require('readline')
const inputFile = "first_input.txt"

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

function get_next_match(line, offset){
    const mul_pattern = /mul\((\d+),(\d+)\)/
    const matches = line.match(mul_pattern)

    if(matches === null){
        return {
            x: 0,
            y: 0,
            offset: offset,
            match: ""
        }
    }

    const x = parseInt(matches[1])
    const y = parseInt(matches[2])
    return {
        x: x,
        y: y,
        offset: matches.index,
        match: matches[0]
    }
}

parse_input().then(() => {
    let result = 0;
    lines.forEach((line) => {
        let offset = 0
        while(offset <= line.length){
            const matches = get_next_match(line, offset)

            if(matches.match === ""){
                break
            }

            offset = matches.offset
            line = line.replace(matches.match, "")

           console.log()
            result += matches.x * matches.y
        }


    })
    console.log(result);
})

