with open('input.txt') as f:
    data = f.readlines()

    are_safe = 0
    for line in data:
        numbers = [int(part.strip()) for part in line.split(' ')]

        safe = False
        for i in range(len(numbers) - 1):
            diff = abs(numbers[i] - numbers[i + 1])
            if numbers[i + 1] >= numbers[i] or diff < 1 or diff > 3:
                break
        else:
            safe = True

        if not safe:
            for i in range(len(numbers) - 1):
                diff = abs(numbers[i] - numbers[i + 1])
                if numbers[i + 1] <= numbers[i] or diff < 1 or diff > 3:
                    break
            else:
                safe = True

        if safe:
            are_safe += 1
    print(are_safe)
