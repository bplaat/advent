import { readFile } from 'fs/promises';
const data = (await readFile('input.txt')).toString();
const lines = data.split('\n');
let sum = 0;
for (let line of lines) {
    line = line.replace(/one/g, 'o1e').replace(/two/g, 't2o').replace(/three/g, 't3e').replace(/four/g, 'f4r').replace(/five/g, 'f5e')
        .replace(/six/g, 's6x').replace(/seven/g, 's7n').replace(/eight/g, 'e8t').replace(/nine/g, 'n9e');
    const digits = [...line.matchAll(/\d/g)].map(match => parseInt(match[0]));
    if (digits.length > 0)
        sum += digits.at(0) * 10 + digits.at(-1);
}
console.log(sum);
