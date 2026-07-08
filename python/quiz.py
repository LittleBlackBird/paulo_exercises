# =========================================================
# NOTE: This Python file has been CONVERTED to JavaScript
# (see js/quiz.js) so the site no longer needs Pyodide.
# It is kept here only as reference — it is NOT loaded anymore.
# =========================================================

import random
import json

# =========================================================
# Helpers
# =========================================================

def fmt(x):
    """Format a number without float noise, up to 4 decimals."""
    if isinstance(x, int):
        return str(x)
    r = round(float(x), 4)
    if r == int(r):
        return str(int(r))
    s = f"{r:.4f}".rstrip("0").rstrip(".")
    return s


def numeric(question_html, answer, places=3, topic="math"):
    return {
        "type": "numeric",
        "q": question_html,
        "a": round(float(answer), places),
        "places": places,
        "topic": topic,
    }


def mc(question_html, choices, answer_index, topic="concept"):
    return {
        "type": "mc",
        "q": question_html,
        "choices": choices,
        "a": answer_index,
        "topic": topic,
    }


def random_decimal(max_integer=20, max_decimals=3):
    integer_part = random.randint(0, max_integer)
    decimal_places = random.randint(1, max_decimals)
    value = integer_part + random.random()
    return round(value, decimal_places)


# =========================================================
# 1) Concept questions (multiple choice, one correct)
# =========================================================

CONCEPT_BANK = [
    ("In 84 ÷ 7 = 12, what is the number 84 called?",
     ["The dividend", "The divisor", "The quotient", "The remainder"], 0),
    ("In 84 ÷ 7 = 12, what is the number 7 called?",
     ["The dividend", "The divisor", "The quotient", "The product"], 1),
    ("In 84 ÷ 7 = 12, what is the number 12 called?",
     ["The quotient", "The dividend", "The divisor", "The sum"], 0),
    ("What do we call the answer of a multiplication, like 6 × 4 = 24?",
     ["The product", "The quotient", "The sum", "The difference"], 0),
    ("What do we call the answer of an addition, like 5 + 3 = 8?",
     ["The sum", "The product", "The factor", "The remainder"], 0),
    ("What do we call the answer of a subtraction, like 9 − 4 = 5?",
     ["The difference", "The sum", "The quotient", "The divisor"], 0),
    ("What is a prime number?",
     ["A number with exactly two factors: 1 and itself",
      "Any odd number",
      "A number that ends in 1",
      "A number bigger than 100"], 0),
    ("What is a factor of a number?",
     ["A number that divides it exactly, with no remainder",
      "A number that is always bigger than it",
      "The answer of an addition",
      "A number with a decimal point"], 0),
    ("In the fraction 3/4, what is the number 3 called?",
     ["The numerator", "The denominator", "The divisor", "The quotient"], 0),
    ("In the fraction 3/4, what is the number 4 called?",
     ["The denominator", "The numerator", "The product", "The dividend"], 0),
    ("In the equation 2x + 3 = 11, what is x called?",
     ["The variable (the unknown value)", "The product", "The remainder", "The denominator"], 0),
    ("What is the perimeter of a shape?",
     ["The distance all the way around its edge",
      "The space inside it",
      "Its weight",
      "The number of corners it has"], 0),
    ("What is the area of a shape?",
     ["The space inside it",
      "The distance around it",
      "Its height only",
      "The number of sides it has"], 0),
    ("What does the symbol < mean, as in 3 < 8?",
     ["Less than", "Greater than", "Equal to", "Divided by"], 0),
    ("What does the symbol > mean, as in 9 > 2?",
     ["Greater than", "Less than", "Equal to", "Multiplied by"], 0),
    ("What is A ∩ B (the intersection of sets A and B)?",
     ["The elements that are in BOTH A and B",
      "All elements of A and B together",
      "The elements only in A",
      "The empty set, always"], 0),
    ("What is A ∪ B (the union of sets A and B)?",
     ["All the elements that are in A or in B (or both)",
      "Only the elements in both sets",
      "The biggest element of each set",
      "The elements in neither set"], 0),
    ("A probability is always a number between…",
     ["0 and 1", "1 and 10", "0 and 100 only", "−1 and 1"], 0),
    ("If a division has a remainder of 0, it means…",
     ["The divisor divides the dividend exactly",
      "The answer is always 0",
      "The dividend is a prime number",
      "You made a mistake"], 0),
    ("What is a multiple of 5?",
     ["A number you get by multiplying 5 by a whole number, like 5, 10, 15…",
      "Any number that ends in 1",
      "A number smaller than 5",
      "Half of 5"], 0),
]


def concept_problem():
    q, choices, correct = random.choice(CONCEPT_BANK)
    # Shuffle choices, track the correct one
    idx = list(range(len(choices)))
    random.shuffle(idx)
    shuffled = [choices[i] for i in idx]
    new_correct = idx.index(correct)
    return mc("<strong>Concept:</strong> " + q, shuffled, new_correct, topic="concept")


# =========================================================
# 2) Division with decimal (fraction) numbers, up to 4 decimals
# =========================================================

def decimal_division_problem():
    """Build a division whose exact quotient has 1–4 decimal places."""
    places = random.randint(1, 4)
    # quotient = k / 10^places
    k = random.randint(11, 9999)
    quotient = k / (10 ** places)
    divisor = random.choice([2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 25])
    # dividend computed exactly with integers so quotient stays exact
    dividend = (k * divisor) / (10 ** places)
    question = (f"How much is {fmt(dividend)} ÷ {divisor}? "
                f"<em>(the answer has up to 4 decimal places)</em>")
    return numeric(question, quotient, places=4, topic="decimal division")


def integer_division_problem():
    while True:
        dividend = random.randint(10000, 99999)
        divisor = random.randint(11, 100)
        if dividend % divisor == 0:
            return numeric(f"How much is {dividend} ÷ {divisor}?",
                           dividend // divisor, places=0, topic="division")


# =========================================================
# 3) Decimal +, −, ×
# =========================================================

def addition_decimal_problem():
    a, b = random_decimal(), random_decimal()
    return numeric(f"How much is {fmt(a)} + {fmt(b)}?", round(a + b, 4), places=4, topic="addition")


def subtraction_decimal_problem():
    a, b = random_decimal(), random_decimal()
    if b > a:
        a, b = b, a
    return numeric(f"How much is {fmt(a)} − {fmt(b)}?", round(a - b, 4), places=4, topic="subtraction")


def multiplication_decimal_problem():
    a = round(random.uniform(0, 20), 2)
    b = round(random.uniform(0, 9), 2)
    return numeric(f"How much is {fmt(a)} × {fmt(b)}?", round(a * b, 4), places=4, topic="multiplication")


# =========================================================
# 4) Linear equations
# =========================================================

def linear_equation_problem():
    a = random.randint(2, 9)
    x = random.randint(2, 12)
    b = random.randint(1, 20)
    if random.random() < 0.5:
        c = a * x + b
        question = f"Solve for x: &nbsp; {a}x + {b} = {c}"
    else:
        c = a * x - b
        question = f"Solve for x: &nbsp; {a}x − {b} = {c}"
    return numeric(question, x, places=0, topic="linear equation")


# =========================================================
# 5) Geometry
# =========================================================

def geometry_problem():
    kind = random.choice(["rect_per", "rect_area", "square_per", "square_area", "triangle_area"])
    if kind == "rect_per":
        w, h = random.randint(3, 25), random.randint(3, 25)
        return numeric(f"A rectangle is {w} cm wide and {h} cm tall. What is its <strong>perimeter</strong> in cm?",
                       2 * (w + h), places=0, topic="geometry")
    if kind == "rect_area":
        w, h = random.randint(3, 15), random.randint(3, 15)
        return numeric(f"A rectangle is {w} cm wide and {h} cm tall. What is its <strong>area</strong> in cm²?",
                       w * h, places=0, topic="geometry")
    if kind == "square_per":
        s = random.randint(3, 30)
        return numeric(f"A square has sides of {s} cm. What is its <strong>perimeter</strong> in cm?",
                       4 * s, places=0, topic="geometry")
    if kind == "square_area":
        s = random.randint(3, 15)
        return numeric(f"A square has sides of {s} cm. What is its <strong>area</strong> in cm²?",
                       s * s, places=0, topic="geometry")
    # triangle area (base × height must be even so the answer is whole)
    b = random.randint(2, 20)
    h = random.choice([2, 4, 6, 8, 10, 12])
    return numeric(f"A triangle has a base of {b} cm and a height of {h} cm. "
                   f"What is its <strong>area</strong> in cm²? (area = base × height ÷ 2)",
                   b * h // 2, places=0, topic="geometry")


# =========================================================
# 6) Prime numbers
# =========================================================

def _is_prime(n):
    if n < 2:
        return False
    for d in range(2, int(n ** 0.5) + 1):
        if n % d == 0:
            return False
    return True


def prime_problem():
    if random.random() < 0.5:
        n = random.randint(4, 40)
        nxt = n + 1
        while not _is_prime(nxt):
            nxt += 1
        return numeric(f"What is the <strong>smallest prime number</strong> greater than {n}?",
                       nxt, places=0, topic="prime numbers")
    lo, hi = random.choice([(1, 10), (1, 20), (10, 30), (20, 40)])
    count = sum(1 for i in range(lo, hi + 1) if _is_prime(i))
    return numeric(f"How many <strong>prime numbers</strong> are there between {lo} and {hi} (including both)?",
                   count, places=0, topic="prime numbers")


# =========================================================
# 7) Factors
# =========================================================

def _gcf(a, b):
    while b:
        a, b = b, a % b
    return a


def factor_problem():
    kind = random.choice(["count", "largest", "gcf"])
    if kind == "count":
        n = random.choice([12, 16, 18, 20, 24, 28, 30, 36, 40, 48])
        count = sum(1 for d in range(1, n + 1) if n % d == 0)
        return numeric(f"How many <strong>factors</strong> does {n} have? (count every number that divides it exactly)",
                       count, places=0, topic="factors")
    if kind == "largest":
        n = random.choice([12, 18, 20, 24, 30, 36, 42, 48, 50, 54])
        smallest_pf = next(d for d in range(2, n + 1) if n % d == 0)
        return numeric(f"What is the <strong>largest factor</strong> of {n} that is smaller than {n}?",
                       n // smallest_pf, places=0, topic="factors")
    a = random.choice([12, 18, 24, 30, 36, 48])
    b = random.choice([8, 16, 20, 27, 40, 54, 60])
    return numeric(f"What is the <strong>greatest common factor</strong> (GCF) of {a} and {b}?",
                   _gcf(a, b), places=0, topic="factors")


# =========================================================
# 8) Sets
# =========================================================

def set_problem():
    universe = list(range(1, 13))
    a = sorted(random.sample(universe, random.randint(4, 6)))
    b = sorted(random.sample(universe, random.randint(4, 6)))
    set_a, set_b = set(a), set(b)
    a_txt = "{" + ", ".join(map(str, a)) + "}"
    b_txt = "{" + ", ".join(map(str, b)) + "}"
    if random.random() < 0.5:
        ans = len(set_a & set_b)
        op = "A ∩ B (in <strong>both</strong> sets)"
    else:
        ans = len(set_a | set_b)
        op = "A ∪ B (in A <strong>or</strong> B, counting each number once)"
    return numeric(f"Set A = {a_txt} and Set B = {b_txt}.<br>How many elements are in {op}?",
                   ans, places=0, topic="sets")


# =========================================================
# 9) Inequalities
# =========================================================

def inequality_problem():
    kind = random.choice(["count", "largest", "smallest"])
    if kind == "count":
        a = random.randint(1, 10)
        b = a + random.randint(3, 9)
        return numeric(f"How many <strong>whole numbers</strong> x satisfy {a} &lt; x ≤ {b}?",
                       b - a, places=0, topic="inequality")
    if kind == "largest":
        b = random.randint(5, 30)
        return numeric(f"What is the <strong>largest whole number</strong> x that satisfies x &lt; {b}?",
                       b - 1, places=0, topic="inequality")
    a = random.randint(3, 25)
    return numeric(f"What is the <strong>smallest whole number</strong> x that satisfies x &gt; {a}?",
                   a + 1, places=0, topic="inequality")


# =========================================================
# 10) Measures (unit conversion)
# =========================================================

def measures_problem():
    kind = random.choice(["m_cm", "km_m", "kg_g", "l_ml", "h_min"])
    if kind == "m_cm":
        v = round(random.randint(1, 12) + random.choice([0.0, 0.25, 0.5, 0.75]), 2)
        return numeric(f"How many <strong>centimeters</strong> are in {fmt(v)} meters?",
                       v * 100, places=0, topic="measures")
    if kind == "km_m":
        v = round(random.randint(1, 9) + random.choice([0.0, 0.1, 0.2, 0.5]), 1)
        return numeric(f"How many <strong>meters</strong> are in {fmt(v)} kilometers?",
                       v * 1000, places=0, topic="measures")
    if kind == "kg_g":
        v = round(random.randint(1, 9) + random.choice([0.0, 0.2, 0.5, 0.75]), 2)
        return numeric(f"How many <strong>grams</strong> are in {fmt(v)} kilograms?",
                       v * 1000, places=0, topic="measures")
    if kind == "l_ml":
        v = round(random.randint(1, 6) + random.choice([0.0, 0.25, 0.5]), 2)
        return numeric(f"How many <strong>milliliters</strong> are in {fmt(v)} liters?",
                       v * 1000, places=0, topic="measures")
    v = random.choice([1.5, 2, 2.5, 3, 3.5, 4])
    return numeric(f"How many <strong>minutes</strong> are in {fmt(v)} hours?",
                   v * 60, places=0, topic="measures")


# =========================================================
# 11) Probability (decimal answers, up to 4 places)
# =========================================================

def probability_problem():
    total = random.choice([2, 4, 5, 8, 10, 16, 20, 25])
    favorable = random.randint(1, total - 1)
    color_fav, color_other = random.choice([("red", "blue"), ("green", "yellow"), ("black", "white")])
    ans = round(favorable / total, 4)
    question = (f"A bag has {favorable} {color_fav} marbles and {total - favorable} {color_other} marbles "
                f"({total} in total).<br>What is the <strong>probability</strong> of picking a "
                f"{color_fav} marble? Write it as a decimal.")
    return numeric(question, ans, places=4, topic="probability")


# =========================================================
# 12) Reading tables
# =========================================================

def table_problem():
    days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
    item = random.choice(["apples sold", "books read", "goals scored", "cups of juice"])
    values = [random.randint(2, 30) for _ in days]

    rows = "".join(
        f"<tr><td>{d}</td><td>{v}</td></tr>" for d, v in zip(days, values)
    )
    table_html = (
        "<table class='mini-table'>"
        f"<tr><th>Day</th><th>{item.title()}</th></tr>{rows}</table>"
    )

    kind = random.choice(["cell", "sum", "max", "diff"])
    if kind == "cell":
        i = random.randrange(len(days))
        q = f"Read the table.<br>{table_html}How many {item} on <strong>{days[i]}</strong>?"
        ans = values[i]
    elif kind == "sum":
        i, j = random.sample(range(len(days)), 2)
        q = (f"Read the table.<br>{table_html}How many {item} on <strong>{days[i]}</strong> "
             f"and <strong>{days[j]}</strong> together?")
        ans = values[i] + values[j]
    elif kind == "max":
        q = f"Read the table.<br>{table_html}What is the <strong>highest</strong> number of {item} in one day?"
        ans = max(values)
    else:
        q = (f"Read the table.<br>{table_html}What is the difference between the "
             f"<strong>highest</strong> and the <strong>lowest</strong> day?")
        ans = max(values) - min(values)
    return numeric(q, ans, places=0, topic="read tables")


# =========================================================
# 13) Reading graphics (pictograph)
# =========================================================

def graph_problem():
    symbol, thing = random.choice([("🍎", "apples"), ("⭐", "stars"), ("📚", "books"), ("⚽", "goals")])
    per = random.choice([2, 3, 5, 10])
    names = random.sample(["Paulo", "Ana", "Leo", "Bia", "Duda"], 3)
    counts = [random.randint(2, 6) for _ in names]

    rows = "<br>".join(f"<strong>{n}:</strong> {symbol * c}" for n, c in zip(names, counts))
    chart = (f"<div class='pictograph'>Each {symbol} = {per} {thing}.<br>{rows}</div>")

    kind = random.choice(["one", "two", "diff"])
    if kind == "one":
        i = random.randrange(3)
        q = f"Read the graphic.{chart}How many {thing} does <strong>{names[i]}</strong> have?"
        ans = counts[i] * per
    elif kind == "two":
        q = f"Read the graphic.{chart}How many {thing} do <strong>{names[0]}</strong> and <strong>{names[1]}</strong> have together?"
        ans = (counts[0] + counts[1]) * per
    else:
        q = f"Read the graphic.{chart}How many more {thing} does the person with the <strong>most</strong> have than the person with the <strong>least</strong>?"
        ans = (max(counts) - min(counts)) * per
    return numeric(q, ans, places=0, topic="read graphics")


# =========================================================
# Session generator: always 8 problems
# =========================================================

TOPIC_POOL = [
    integer_division_problem,
    addition_decimal_problem,
    subtraction_decimal_problem,
    multiplication_decimal_problem,
    linear_equation_problem,
    geometry_problem,
    prime_problem,
    factor_problem,
    set_problem,
    inequality_problem,
    measures_problem,
    probability_problem,
    table_problem,
    graph_problem,
]


def generate_session():
    """
    Always returns exactly 8 problems as a JSON string:
      1 concept multiple-choice question (always present)
      1 decimal division (quotient with up to 4 decimals)
      6 problems from different random topics
    """
    problems = [concept_problem(), decimal_division_problem()]

    generators = random.sample(TOPIC_POOL, 6)
    for g in generators:
        problems.append(g())

    random.shuffle(problems)
    return json.dumps(problems)
