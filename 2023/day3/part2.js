import { readFile } from 'fs/promises';
const data = (await readFile('input.txt')).toString();
const grid = data.split('\n').map(line => line.split(''));
grid.pop();

function testNeighbors(x, y, test) {
    if (y > 0) {
        if (x > 0 && test(grid[y - 1][x - 1])) return { x: x - 1, y: y - 1 };
        if (test(grid[y - 1][x])) return { x, y: y - 1 };
        if (x < grid[0].length - 1 && test(grid[y - 1][x + 1])) return { x: x + 1, y: y - 1 };
    }

    if (x > 0 && test(grid[y][x - 1])) return { x: x - 1, y };
    if (x < grid[0].length - 1 && test(grid[y][x + 1])) return { x: x + 1, y };

    if (y < grid.length - 1) {
        if (x > 0 && test(grid[y + 1][x - 1])) return { x: x - 1, y: y + 1 };
        if (test(grid[y + 1][x])) return { x, y: y + 1 };
        if (x < grid[0].length - 1 && test(grid[y + 1][x + 1])) return { x: x + 1, y: y + 1 };
    }
    return null;
}

const stars = [];
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
        if (/\d/.test(grid[y][x])) {
            let number = '';
            let star = null;
            while (/\d/.test(grid[y][x])) {
                number += grid[y][x];
                const starPos = testNeighbors(x, y, (c) => c == '*');
                if (starPos != null) {
                    star = stars.find(star => star.x == starPos.x && star.y == starPos.y);
                    if (star == null) {
                        star = { x: starPos.x, y: starPos.y, numbers: [] };
                        stars.push(star);
                    }
                }
                x++;
            }

            if (star != null) {
                star.numbers.push(number);
            }
        }
    }
}

let sum = 0;
for (const star of stars) {
    if (star.numbers.length == 2)
        sum += star.numbers[0] * star.numbers[1];
}
console.log(sum);
