use std::io::{self, Read};

fn is_doubled(n: u64) -> bool {
    let s = n.to_string();
    let len = s.len();
    if len % 2 != 0 {
        return false;
    }
    let half = len / 2;
    let (first, second) = s.split_at(half);
    first == second
}

fn is_repeated_at_least_twice(n: u64) -> bool {
    let s = n.to_string();
    let len = s.len();

    for block_len in 1..=len / 2 {
        if len % block_len != 0 {
            continue;
        }
        let repeats = len / block_len;

        let block = &s[0..block_len];
        let mut valid = true;
        for i in 1..repeats {
            if &s[i * block_len..(i + 1) * block_len] != block {
                valid = false;
                break;
            }
        }
        if valid {
            return true;
        }
    }
    false
}

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let input = input.trim();

    let mut total_part1: u64 = 0;
    let mut total_part2: u64 = 0;

    for part in input.split(',') {
        let (start_str, end_str) = part.split_once('-').unwrap();
        let start: u64 = start_str.parse().unwrap();
        let end: u64 = end_str.parse().unwrap();

        for num in start..=end {
            if is_doubled(num) {
                total_part1 += num;
            }
            if is_repeated_at_least_twice(num) {
                total_part2 += num;
            }
        }
    }

    println!("Part 1: {}", total_part1);
    println!("Part 2: {}", total_part2);
}
