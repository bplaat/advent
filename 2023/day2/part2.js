import { readFile } from 'fs/promises';
const data = (await readFile('input.txt')).toString();
const lines = data.split('\n');
let sum = 0;
for (const line of lines) {
    if (line == '') continue;
    const [name, setsString] = line.split(':');
    const sets = setsString.split(';');
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;
    for (const set of sets) {
        const colors = set.trim().split(',');
        for (const color of colors) {
            const colorParts = color.trim().split(' ');
            const amount = parseInt(colorParts[0]);
            const name = colorParts[1];
            if (name == 'red')
                maxRed = Math.max(maxRed, amount);
            if (name == 'green')
                maxGreen = Math.max(maxGreen, amount);
            if (name == 'blue')
                maxBlue = Math.max(maxBlue, amount);
        }
    }
    sum += maxRed * maxGreen * maxBlue;
}
console.log(sum);
