use std::fs;

use regex::Regex;

fn main() {
    let input = fs::read_to_string("input.txt").unwrap();
    let re = Regex::new(r"mul\((\d{1,3}),(\d{1,3})\)").unwrap();

    // Part 1
    let mut sum = 0;
    for cap in re.captures_iter(&input) {
        let a = cap[1].parse::<i32>().unwrap();
        let b = cap[2].parse::<i32>().unwrap();
        sum += a * b;
    }
    println!("Part 1: {}", sum);

    // Part 2
    let mut active_input = "".to_string();
    let mut is_active = true;
    let mut pos = 0;
    loop {
        if is_active {
            if let Some(next_pos) = input[pos..].find("don't()") {
                active_input.push_str(&input[pos..pos + next_pos]);
                pos += next_pos + 7;
                is_active = false;
            } else {
                break;
            }
        } else {
            if let Some(next_pos) = input[pos..].find("do()") {
                pos += next_pos + 4;
                is_active = true;
            } else {
                break;
            }
        }
    }

    let mut sum = 0;
    for cap in re.captures_iter(&active_input) {
        let a = cap[1].parse::<i32>().unwrap();
        let b = cap[2].parse::<i32>().unwrap();
        sum += a * b;
    }
    println!("Part 2: {}", sum);
}
