import { readFile } from 'fs/promises';
const data = (await readFile('input.txt')).toString();
const grid = data.split('\n').map(line => line.split(''));
grid.pop();

function testNeighbors(x, y) {
    const test = (c) => c != '.' && !/\d/.test(c);

    if (y > 0) {
        if (x > 0 && test(grid[y - 1][x - 1])) return true;
        if (test(grid[y - 1][x])) return true;
        if (x < grid[0].length - 1 && test(grid[y - 1][x + 1])) return true;
    }

    if (x > 0 && test(grid[y][x - 1])) return true;
    if (x < grid[0].length - 1 && test(grid[y][x + 1])) return true;

    if (y < grid.length - 1) {
        if (x > 0 && test(grid[y + 1][x - 1])) return true;
        if (test(grid[y + 1][x])) return true;
        if (x < grid[0].length - 1 && test(grid[y + 1][x + 1])) return true;
    }
    return false;
}

// for (let y = 0; y < grid.length; y++) {
//     for (let x = 0; x < grid[0].length; x++) {
//         if (testNeighbors(x, y) && grid[y][x] != '.') {
//             process.stdout.write('\x1b[31m');
//         } else {
//             process.stdout.write('\x1b[0m');
//         }
//         process.stdout.write(grid[y][x]);
//     }
//     process.stdout.write('\n');
// }

let sum = 0;
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
        if (/\d/.test(grid[y][x])) {
            let number = '';
            let isSuccess = false;
            while (/\d/.test(grid[y][x])) {
                number += grid[y][x];
                if (testNeighbors(x, y)) isSuccess = true;
                x++;
            }
            if (isSuccess) {
                sum += parseInt(number);
            }
        }
    }
}
console.log(sum);
