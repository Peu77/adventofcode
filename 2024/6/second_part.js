import * as fs from "node:fs";

class GuardPatrol {
    constructor(map) {
        this.map = map.map(row => row.split(''));
        this.directions = [
            { x: 0, y: -1, char: '^' },
            { x: 1, y: 0, char: '>' },
            { x: 0, y: 1, char: 'v' },
            { x: -1, y: 0, char: '<' }
        ];
        this.death = false;
        this.isStuck = false;
        this.wasAlready = []

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
        let startX = this.x;
        let startY = this.y;
        let samePosition = 0;
        let lastX = this.x;
        let lastY = this.y;
        let startTime = new Date().getTime();
        let rotationsAt = []

        while (true) {
            lastX = this.x;
            lastY = this.y;


            const currentDir = this.directions[this.dirIndex];
            let nextX = this.x + currentDir.x ;
            let nextY = this.y + currentDir.y;

            if (this.isObstacle(nextX, nextY)) {
                this.dirIndex = (this.dirIndex + 1) % 4;
                turnsWithoutMoving++;

                if(rotationsAt.filter(r => r.x === this.x && r.y === this.y).length > 4) {
                    this.isStuck = true;
                    break;
                }

                rotationsAt.push({x: this.x, y: this.y});

                if(this.x === startX && this.y === startY) {
                    samePosition++;
                    if(samePosition === 2) {
                        console.log('Stuck');
                        this.isStuck = true;
                        break;
                    }
                }

                if (turnsWithoutMoving >= 4) {
                    this.isStuck = true;
                    break;
                }
            } else {
                this.x = nextX;
                this.y = nextY;


                turnsWithoutMoving = 0;
            }

            if (!this.isInBounds(this.x, this.y)) {
                this.death = true;
                break;
            }

            if(new Date().getTime() - startTime > 1000) {
               // await new Promise(resolve => setTimeout(resolve, 200));
               // visualizeMap(this.map, this.x, this.y);

            }


        }



        return 0;
    }
}

function visualizeMap(map, gx, gy) {
    console.clear()
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

async function solveGuardPatrolPuzzle(mapInput) {

    let solution = 0;
    for(let i = 0; i < mapInput.length; i++) {
        for(let j = 0; j < mapInput[i].length; j++) {
            let copyMap = [...mapInput];
            if(copyMap[i][j] === '.') {
                copyMap[i] = copyMap[i].substring(0, j) + '#' + copyMap[i].substring(j + 1);
                const guardPatrol = new GuardPatrol(copyMap);
               await guardPatrol.patrol().then(result => {
                    if(guardPatrol.isStuck) {
                        solution++;
                    }
                });

            }
            }
        }

    console.log("solutions: ", solution);

}

const input = fs.readFileSync('second_input.txt').toString().split('\n');

solveGuardPatrolPuzzle(input);