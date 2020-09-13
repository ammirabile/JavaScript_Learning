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
            if (isEnemy && cell == 'O') {
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

function placeShips(ships, player) {
    for (let i = 0; i < ships; i++) {
        let valid = false;
        while (!valid) {
            let shipPos = prompt(`You have ${ships} ships!
            \nChoose where you want your ship - ${i+1} separeted by comma`);
            if (checkPos(shipPos, player.length - 1)) {
                player[shipPos[0]][shipPos[2]] = 'S';
                valid = true;
            }
        }
    }
}

function checkPos(coord, gridLenght) {
    if (coord.length !== 3 || coord.indexOf(",") === -1) {
        return false;
    } else if (coord[0] > gridLenght || coord[2] > gridLenght) {
        return false;
    } else if (mygrid[coord[0]][coord[2]] === 'S') {
        return false;
    }
    return true;
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

//Print Grid with ships
printGrid(mygrid, true);