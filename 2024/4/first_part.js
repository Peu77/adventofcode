const fs = require('fs');

function checkWord(grid, word, row, col, rowStep, colStep) {
    for (let i = 0; i < word.length; i++) {
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] !== word[i]) {
            return false;
        }

        row += rowStep;
        col += colStep;
    }

    return true;
}

function countXMAS(grid) {
    const word = 'XMAS';
    let count = 0;
    const directions = [
        { rowStep: 0, colStep: 1 },
        { rowStep: 1, colStep: 0 },
        { rowStep: 1, colStep: 1 },
        { rowStep: 1, colStep: -1 },
        { rowStep: -1, colStep: 1 },
        { rowStep: -1, colStep: -1 },
        { rowStep: 0, colStep: -1 },
        { rowStep: -1, colStep: 0 }
    ];

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            for (const { rowStep, colStep } of directions) {
                if (checkWord(grid, word, row, col, rowStep, colStep)) {
                    count++;
                }
            }
        }
    }

    return count;
}

function solvePuzzle(inputPath) {
    const input = fs.readFileSync(inputPath, 'utf8').trim();
    const grid = input.split('\n').map(line => line.trim().split(''));
    const result = countXMAS(grid);

    console.log(`result: ${result}`);
    return result;
}

solvePuzzle("first_input.txt")