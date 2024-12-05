import {readFileSync} from 'fs';

const lines = readFileSync('input.txt', 'utf-8').split('\n');

let left = [], right = [];
for (const line of lines) {
    if (line === '') {
        continue;
    }
    const parts = line.split(/\s+/);
    left.push(parseInt(parts[0]));
    right.push(parseInt(parts[1]));
}

left.sort();
right.sort();

let dist = 0;
for (let i = 0; i < left.length; i++) {
    dist += Math.abs(left[i] - right[i]);
}
console.log(dist);
