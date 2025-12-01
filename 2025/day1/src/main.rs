use std::io::{self, Read};

fn main() -> io::Result<()> {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input)?;

    let mut pos: i32 = 50;
    let mut zeros_part1: u64 = 0;
    let mut zeros_part2: u64 = 0;

    for line in input.lines() {
        let line = line.trim();
        if line.is_empty() {
            continue;
        }

        let direction = line.chars().next().unwrap();
        let distance = line[1..].parse::<i32>().expect("Invalid number");
        let steps = distance.abs();
        let delta = if direction == 'L' { -1 } else { 1 };

        if steps > 0 {
            let mut current = pos;
            zeros_part2 += (steps / 100) as u64;
            for _ in 0..(steps % 100) {
                current = (current + delta).rem_euclid(100);
                if current == 0 {
                    zeros_part2 += 1;
                }
            }
            pos = (pos + delta * distance).rem_euclid(100);
        } else {
            pos = pos.rem_euclid(100);
        }

        if pos == 0 {
            zeros_part1 += 1;
        }
    }

    println!("Part 1: {}", zeros_part1);
    println!("Part 2: {}", zeros_part2);
    Ok(())
}
