//Functions

function createGrid(size) {
    const grid = [];
    for (let i = 0; i < size; i++) {
        grid[i] = [];
        for (let j = 0; j < size; j++) {
            grid[i][j] = '-';
        }
    }
    return grid;
}

function printGrid(grid, isEnemy = false) {
    const headers = createHeaders(grid.length);
    console.log(headers);
    for (let i = 0; i < grid.length; i++) {
        let rowStr = i + ' ';
        for (let cell of grid[i]) {
            if (isEnemy && cell == 'S') {
                rowStr += '- ';
            } else {
                rowStr += cell + ' '
            }
        }
        console.log(rowStr);
    }
}

function createHeaders(size) {
    let result = '  ';
    for (i = 0; i < size; i++) {
        result += i + ' ';
    }
    return result;
}

function checkPos(coord, gridLenght, grid) {
    if (coord.length !== 3 || coord.indexOf(",") === -1) {
        return false;
    } else if (coord[0] > gridLenght || coord[2] > gridLenght) {
        return false;
    }
    return true;

}

function hasShip(grid, coord) {
    return grid[coord[0]][coord[2]] === 'S';
}

function wasHit(grid, coord) {
    return grid[coord[0]][coord[2]] === 'W' || grid[coord[0]][coord[2]] === 'H';
}

function pickPos(num) {
    let pos1 = Math.floor(Math.random() * num);
    let pos2 = Math.floor(Math.random() * num);
    return `${pos1},${pos2}`;
}

function placeShips(ships, player) {
    for (let i = 0; i < ships; i++) {
        let valid = false;
        while (!valid) {
            if (player === mygrid) {
                let shipPos = prompt(`You have ${ships} ships!
                \nChoose where you want your ship - ${i+1} separeted by comma`);
                if (checkPos(shipPos, player.length - 1, player) && !hasShip(player, shipPos)) {
                    player[shipPos[0]][shipPos[2]] = 'S';
                    valid = true;
                }
            } else {
                let pcPick = pickPos(player.length);
                //console.log(pcPick);
                if (checkPos(pcPick, player.length - 1, player) && !hasShip(player, pcPick)) {
                    player[pcPick[0]][pcPick[2]] = 'S';
                    valid = true;
                }
            }
        }
    }
}

function shoot(player) {
    let turn;
    if (player === mygrid) {
        turn = "H";
    } else {
        turn = "M";
    }
    console.log(turn);
    if (turn === "H") {
        let coord = prompt(`Set Coordinates:`);
        console.log(`\n\n\nYOUR SHOT! ${coord}`)
        if (checkPos(coord, enemyGrid.length - 1, enemyGrid) && !wasHit(enemyGrid, coord)) {
            if (enemyGrid[coord[0]][coord[2]] === 'S') {
                enemyGrid[coord[0]][coord[2]] = 'H';
                enemyHit += 1;
                console.log(`YOU HIT A SHIP! Total Hits ${enemyHit}`);
            } else {
                enemyGrid[coord[0]][coord[2]] = 'W';
            }
        }
        printGrid(enemyGrid, true);
        //console.log(enemyHit);
        return enemyHit;
    }
    if (turn === "M") {
        let pcShoot = pickPos(mygrid.length);
        console.log(`\n\n\nPC SHOT! ${pcShoot}`)
        if (checkPos(pcShoot, mygrid.length - 1, mygrid) && !wasHit(mygrid, pcShoot)) {
            if (mygrid[pcShoot[0]][pcShoot[2]] === 'S') {
                mygrid[pcShoot[0]][pcShoot[2]] = 'H';
                playerHit += 1;
                console.log(`PC HIT A SHIP! Total Hits ${playerHit}`);
            } else {
                mygrid[pcShoot[0]][pcShoot[2]] = 'W';
            }
        }
        printGrid(mygrid, );
        //console.log(playerHit);
        return playerHit;
    }

}

//Initialize variables

let playerGridSize = prompt('What size would you like your grid to be?');
let enemyGridSize = prompt('What size would you like your enemy grid to be?');
let mygrid = createGrid(playerGridSize);
let enemyGrid = createGrid(enemyGridSize);

//Print Initial Boards
printGrid(mygrid, true);
printGrid(enemyGrid);
//User place ships
placeShips(playerGridSize, mygrid);
//Pc Place ships
console.log("Pc Picking");
placeShips(enemyGridSize, enemyGrid);
//Print Grid with ships
printGrid(mygrid, );
printGrid(enemyGrid, true);
//Shooting Phase
alert("You can start shooting now\n Choose the coordinates separated by comma");
let enemyHit = 0;
let playerHit = 0;
let gameOver = false;

while (gameOver === false) {
    if (shoot(mygrid) == enemyGridSize) {
        gameOver = true;
        alert("Player WON");
    } else if (shoot(enemyGridSize) == playerGridSize) {
        gameOver = true;
        alert("PC WON'");
    }
}