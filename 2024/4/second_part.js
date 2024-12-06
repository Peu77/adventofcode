const fs = require('fs');

function checkXMAS(grid) {
    let xmasCount = 0;
    const rows = grid.length;
    const cols = grid[0].length;


    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const directions = [
                { topLeft: [-1, -1], bottomRight: [1, 1] },
                { topLeft: [-1, 1], bottomRight: [1, -1] },
                { topLeft: [1, -1], bottomRight: [-1, 1] },
                { topLeft: [1, 1], bottomRight: [-1, -1] }
            ];

            let found = 0;

            for (const { topLeft, bottomRight } of directions) {
                if (checkXMASPattern(grid, row, col, topLeft, bottomRight)) {
                    console.log(`Found X-MAS at (${topLeft}, ${bottomRight})`);
                    found++;
                }
            }

            if (found === 4) {
                xmasCount++;
            }
        }
    }

    return xmasCount;
}

function checkXMASPattern(grid, centerRow, centerCol, [topRowOffset, topColOffset], [bottomRowOffset, bottomColOffset]) {
    const topRow = centerRow + topRowOffset;
    const topCol = centerCol + topColOffset;
    const bottomRow = centerRow + bottomRowOffset;
    const bottomCol = centerCol + bottomColOffset;

    if (topRow < 0 || topRow >= grid.length ||
        topCol < 0 || topCol >= grid[0].length ||
        bottomRow < 0 || bottomRow >= grid.length ||
        bottomCol < 0 || bottomCol >= grid[0].length) {
        return false;
    }

    const isMASMatch = (seq) => {
        const forwardMAS = seq[0] === 'M' && seq[1] === 'A' && seq[2] === 'S';
        const backwardMAS = seq[0] === 'S' && seq[1] === 'A' && seq[2] === 'M';
        return forwardMAS || backwardMAS;
    };

    const topSequence = [
        grid[topRow][topCol],
        grid[centerRow][centerCol],
        grid[bottomRow][bottomCol]
    ];

    if(isMASMatch(topSequence)) {
        console.log(`Found X-MAS at (${centerRow}, ${centerCol})`, topSequence);
        return true;
    }


    return isMASMatch(topSequence);
}

function solvePuzzle(inputPath) {
    const input = fs.readFileSync(inputPath, 'utf8').trim();
    const grid = input.split('\n').map(line => line.trim().split(''));

    const result = checkXMAS(grid);
    console.log(`result: ${result}`);
    return result;
}

solvePuzzle('second_input.txt');