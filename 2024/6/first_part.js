import fs from "node:fs";

class GuardPatrol {
    constructor(map) {
        this.map = map.map(row => row.split(''));
        this.visited = new Set();
        this.directions = [
            { x: 0, y: -1, char: '^' },
            { x: 1, y: 0, char: '>' },
            { x: 0, y: 1, char: 'v' },
            { x: -1, y: 0, char: '<' }
        ];

        this.findStartingPosition();
    }

    findStartingPosition() {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const char = this.map[y][x];
                if ('^>v<'.includes(char)) {
                    this.x = x;
                    this.y = y;
                    this.dirIndex = this.directions.findIndex(d => d.char === char);
                    this.map[y][x] = '.';
                    return;
                }
            }
        }
    }

    isInBounds(x, y) {
        return x >= 0 && x < this.map[0].length &&
            y >= 0 && y < this.map.length;
    }

    isObstacle(x, y) {
        if (!this.isInBounds(x, y)) {
            return false;
        }
        return this.map[y][x] === '#';
    }

  async  patrol() {
        let turnsWithoutMoving = 0;

        while (true) {
            this.visited.add(`${this.x},${this.y}`);

            const currentDir = this.directions[this.dirIndex];
            const nextX = this.x + currentDir.x;
            const nextY = this.y + currentDir.y;

            if (this.isObstacle(nextX, nextY)) {
                this.dirIndex = (this.dirIndex + 1) % 4;
                turnsWithoutMoving++;

                if (turnsWithoutMoving >= 4) {
                    break;
                }
            } else {
                this.x = nextX;
                this.y = nextY;
                turnsWithoutMoving = 0;
            }

            if (!this.isInBounds(this.x, this.y)) {
                break;
            }
/*
            console.log(this.x, this.y);
            await new Promise(resolve => setTimeout(resolve, 100));
            visualizeMap(this.map, this.x, this.y);

 */
        }

        return this.visited.size;
    }
}

function visualizeMap(map, gx, gy) {
    console.clear();
    for (let y = 0; y < map.length; y++) {
        let row = '';
        for (let x = 0; x < map[y].length; x++) {
            if (x === gx && y === gy) {
                row += '@';
            } else {
                row += map[y][x];
            }
        }
        console.log(row);
    }
}

function solveGuardPatrolPuzzle(mapInput) {
    const guardPatrol = new GuardPatrol(mapInput);
     guardPatrol.patrol().then(result => {
        console.log('Visited cells:', result);
     });
}

const input = fs.readFileSync('input.txt').toString().split('\n');

solveGuardPatrolPuzzle(input);