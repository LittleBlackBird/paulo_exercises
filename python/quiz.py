import random

# -----------------------------
# Integer division (exact)
# -----------------------------
def division_problems(num: int):
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


# -----------------------------
# Decimal helpers (0–20, up to 3 decimal places)
# -----------------------------
def random_decimal(max_integer: int = 20, max_decimals: int = 3) -> float:
    """Random decimal with integer part 0..max_integer and 1..max_decimals decimals."""
    integer_part = random.randint(0, max_integer)
    decimal_places = random.randint(1, max_decimals)
    value = integer_part + random.random()
    return round(value, decimal_places)


def addition_decimal_problems(num: int):
    problems = []
    for _ in range(num):
        a = random_decimal()
        b = random_decimal()
        problems.append((f"How much is {a} + {b}?", round(a + b, 3)))
    return problems


def subtraction_decimal_problems(num: int, allow_negative: bool = False):
    problems = []
    for _ in range(num):
        a = random_decimal()
        b = random_decimal()
        if not allow_negative and b > a:
            a, b = b, a
        problems.append((f"How much is {a} − {b}?", round(a - b, 3)))
    return problems


def multiplication_decimal_problems(num: int):
    problems = []
    for _ in range(num):
        a = random_decimal()
        b = random_decimal()
        problems.append((f"How much is {a} × {b}?", round(a * b, 3)))
    return problems


# -----------------------------
# Mixed generator (Division + decimal add/sub/mul)
# -----------------------------
def mixed_problems(num: int):
    """
    Returns a mix of:
      - exact integer division
      - decimal addition, subtraction, multiplication (0–20, up to 3 decimals)
    Output format: [(question:str, answer:number), ...]
    """
    if num <= 0:
        return []

    problems = []

    # ~25% division, rest split among +, −, ×
    div_n = max(1, num // 4) if num >= 4 else 1
    remaining = num - div_n

    add_n = remaining // 3
    sub_n = remaining // 3
    mul_n = remaining - add_n - sub_n

    problems.extend(division_problems(div_n))
    problems.extend(addition_decimal_problems(add_n))
    problems.extend(subtraction_decimal_problems(sub_n, allow_negative=False))
    problems.extend(multiplication_decimal_problems(mul_n))

    random.shuffle(problems)
    return problems
