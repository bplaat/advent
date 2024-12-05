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

let sim = 0;
for (const item of left) {
    for (const item2 of right) {
        if (item === item2) {
            sim += item;
        }
    }
}
console.log(sim);
