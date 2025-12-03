use std::io::{self, Read};

fn main() -> io::Result<()> {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input)?;

    // MARK: Part 1
    let mut total_jolt = 0u64;
    for line in input.lines() {
        let line = line.trim();
        if line.is_empty() {
            continue;
        }

        let digits: Vec<u8> = line.bytes().map(|b| b - b'0').collect();
        let n = digits.len();

        let mut max_for_bank = 0u64;
        for i in 0..n {
            for j in i + 1..n {
                let number = (digits[i] as u64) * 10 + (digits[j] as u64);
                if number > max_for_bank {
                    max_for_bank = number;
                }
            }
        }
        total_jolt += max_for_bank;
    }
    println!("Part 1: {}", total_jolt);

    // MARK: Part 2
    let mut total: u64 = 0;
    for line in input.lines() {
        let line = line.trim();
        if line.is_empty() {
            continue;
        }

        let s = line.as_bytes();
        let n = s.len();
        let to_remove = n - 12; // we must keep exactly 12 digits

        // We want the lexicographically largest 12-digit subsequence.
        // This is equivalent to greedily keeping the largest possible digit
        // at each position while being able to remove exactly `to_remove` digits in total.
        let mut result = Vec::with_capacity(12);
        let mut removals_left = to_remove;
        let mut i = 0usize;

        for pos in 0..12 {
            // We need to choose the digit for position `pos` in the result.
            // The remaining digits after our choice must be enough for the rest of the number
            // and we still have to be able to remove `removals_left` digits.
            let last_possible = n - (12 - pos) + 1; // inclusive upper bound

            // Find the rightmost index we can pick that is >= current i
            // and still leaves enough digits for the rest while respecting removals_left
            let mut chosen = i;
            for j in i..last_possible.min(n) {
                if removals_left >= j - i {
                    // we can remove everything between i and j-1
                    if s[j] > s[chosen] {
                        chosen = j;
                    }
                } else {
                    break; // cannot remove enough to reach further candidates
                }
            }

            // Use the best digit we found
            result.push(s[chosen]);
            removals_left -= chosen - i; // we removed everything from i to chosen-1
            i = chosen + 1;
        }

        // Convert the 12 chosen digits into a number
        let mut num: u64 = 0;
        for &digit in &result {
            num = num * 10 + (digit - b'0') as u64;
        }
        total += num;
    }
    println!("Part 2: {}", total);

    Ok(())
}
