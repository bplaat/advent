import { readFile } from 'fs/promises';
const data = (await readFile('input.txt')).toString();
const lines = data.split('\n');
let sum = 0;
for (const line of lines) {
    if (line == '') continue;
    const [name, setsString] = line.split(':');
    let isFail = false;
    const sets = setsString.split(';');
    for (const set of sets) {
        const colors = set.trim().split(',');
        for (const color of colors) {
            const colorParts = color.trim().split(' ');
            const amount = parseInt(colorParts[0]);
            const name = colorParts[1];
            if (name == 'red' && amount > 12)
                isFail = true;
            if (name == 'green' && amount > 13)
                isFail = true;
            if (name == 'blue' && amount > 14)
                isFail = true;
        }
    }
    if (!isFail)
        sum += parseInt(name.split(' ')[1]);
}
console.log(sum);
