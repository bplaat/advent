import { readFile } from 'fs/promises';
const data = (await readFile('input.txt')).toString();
const lines = data.split('\n');
let sum = 0;
for (const line of lines) {
    const digits = [...line.matchAll(/\d/g)].map(match => parseInt(match[0]));
    if (digits.length > 0)
        sum += digits.at(0) * 10 + digits.at(-1);
}
console.log(sum);
