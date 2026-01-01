import random

def division_problems(num):
    problems = []
    count = 0

    while count < num:
        dividend = random.randint(10000, 99999)
        divisor = random.randint(11, 100)

        if dividend % divisor == 0:
            answer = dividend // divisor
            problems.append((f"How much is {dividend} ÷ {divisor}?", answer))
            count += 1

    return problems
