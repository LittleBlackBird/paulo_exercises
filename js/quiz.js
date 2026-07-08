// =========================================================
// QUIZ GENERATOR (js/quiz.js)
//
// This is the Python file python/quiz.py converted to JavaScript,
// so the quiz no longer needs to download the Pyodide runtime.
// The page now loads instantly and works offline.
//
// Every session has exactly 8 exercises:
//   • 1 concept question (multiple choice, one correct answer)
//   • 1 division with a decimal quotient (up to 4 decimal places)
//   • 6 random exercises from: division, decimal + − ×, linear
//     equations, geometry, prime numbers, factors, sets,
//     inequalities, measures, probability, tables and graphics.
// =========================================================

const PauloQuiz = (() => {

  // ---------- helpers ----------
  const ri = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const choice = (arr) => arr[ri(0, arr.length - 1)];

  function sample(arr, n) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = ri(0, i);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = ri(0, i);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function round4(x, places = 4) {
    const f = Math.pow(10, places);
    return Math.round(x * f) / f;
  }

  // Format a number without float noise, up to 4 decimals.
  function fmt(x) {
    const r = round4(x, 4);
    if (Number.isInteger(r)) return String(r);
    return String(r);
  }

  // A short hint per topic. Shown after 2 wrong attempts. It nudges
  // toward the method without giving the number away.
  const TOPIC_HINTS = {
    "concept": "Read each choice slowly. Which one matches the exact word being asked about?",
    "decimal division": "Split it up: divide the whole part first, then the decimal part. Keep the decimal point lined up.",
    "division": "How many times does the divisor fit into the dividend? Try estimating, then check by multiplying.",
    "addition": "Line up the decimal points, then add column by column from the right.",
    "subtraction": "Line up the decimal points and subtract from the right. Borrow when the top digit is smaller.",
    "multiplication": "Multiply as if there were no decimals, then count the decimal places in BOTH numbers and put that many in your answer.",
    "linear equation": "Get x alone: first move the added/subtracted number to the other side, then divide by the number in front of x.",
    "geometry": "Perimeter = add all the sides. Area of a rectangle = width × height. Triangle area = base × height ÷ 2.",
    "prime numbers": "A prime has only two factors: 1 and itself. Check if the number can be divided by 2, 3, 5, 7…",
    "factors": "A factor divides the number exactly (no remainder). List the pairs that multiply to the number.",
    "sets": "∩ means the numbers in BOTH sets. ∪ means every number that appears in either set, counted once.",
    "inequality": "Remember: < and > do NOT include the number itself, but ≤ and ≥ do. Count carefully.",
    "measures": "1 m = 100 cm, 1 km = 1000 m, 1 kg = 1000 g, 1 L = 1000 mL, 1 hour = 60 min. Multiply by the right one.",
    "probability": "Probability = favorable ÷ total. Write it as a decimal by doing that division.",
    "read tables": "Find the right row (or rows) in the table, then read the number(s) and do what the question asks.",
    "read graphics": "Count the symbols for that person, then multiply by how many each symbol is worth.",
  };

  function topicHint(topic) {
    return TOPIC_HINTS[topic] || "Re-read the question carefully and try breaking it into smaller steps.";
  }

  function numeric(questionHtml, answer, places = 3, topic = "math", opts = {}) {
    const a = round4(Number(answer), places);
    return {
      type: "numeric",
      q: questionHtml,
      a,
      places,
      topic,
      hint: opts.hint || topicHint(topic),
      // Worked solution reveals the answer with a short explanation.
      solution: opts.solution || `The correct answer is <strong>${a}</strong>. ${topicHint(topic)}`,
    };
  }

  function mc(questionHtml, choices, answerIndex, topic = "concept", opts = {}) {
    return {
      type: "mc",
      q: questionHtml,
      choices,
      a: answerIndex,
      topic,
      hint: opts.hint || topicHint(topic),
      solution: opts.solution ||
        `The correct answer is: <strong>${choices[answerIndex]}</strong>.`,
    };
  }

  function randomDecimal(maxInteger = 20, maxDecimals = 3) {
    const integerPart = ri(0, maxInteger);
    const decimalPlaces = ri(1, maxDecimals);
    return round4(integerPart + Math.random(), decimalPlaces);
  }

  // =========================================================
  // 1) Concept questions (multiple choice, one correct)
  // =========================================================
  const CONCEPT_BANK = [
    ["In 84 ÷ 7 = 12, what is the number 84 called?",
      ["The dividend", "The divisor", "The quotient", "The remainder"], 0],
    ["In 84 ÷ 7 = 12, what is the number 7 called?",
      ["The dividend", "The divisor", "The quotient", "The product"], 1],
    ["In 84 ÷ 7 = 12, what is the number 12 called?",
      ["The quotient", "The dividend", "The divisor", "The sum"], 0],
    ["What do we call the answer of a multiplication, like 6 × 4 = 24?",
      ["The product", "The quotient", "The sum", "The difference"], 0],
    ["What do we call the answer of an addition, like 5 + 3 = 8?",
      ["The sum", "The product", "The factor", "The remainder"], 0],
    ["What do we call the answer of a subtraction, like 9 − 4 = 5?",
      ["The difference", "The sum", "The quotient", "The divisor"], 0],
    ["What is a prime number?",
      ["A number with exactly two factors: 1 and itself",
        "Any odd number",
        "A number that ends in 1",
        "A number bigger than 100"], 0],
    ["What is a factor of a number?",
      ["A number that divides it exactly, with no remainder",
        "A number that is always bigger than it",
        "The answer of an addition",
        "A number with a decimal point"], 0],
    ["In the fraction 3/4, what is the number 3 called?",
      ["The numerator", "The denominator", "The divisor", "The quotient"], 0],
    ["In the fraction 3/4, what is the number 4 called?",
      ["The denominator", "The numerator", "The product", "The dividend"], 0],
    ["In the equation 2x + 3 = 11, what is x called?",
      ["The variable (the unknown value)", "The product", "The remainder", "The denominator"], 0],
    ["What is the perimeter of a shape?",
      ["The distance all the way around its edge",
        "The space inside it",
        "Its weight",
        "The number of corners it has"], 0],
    ["What is the area of a shape?",
      ["The space inside it",
        "The distance around it",
        "Its height only",
        "The number of sides it has"], 0],
    ["What does the symbol &lt; mean, as in 3 &lt; 8?",
      ["Less than", "Greater than", "Equal to", "Divided by"], 0],
    ["What does the symbol &gt; mean, as in 9 &gt; 2?",
      ["Greater than", "Less than", "Equal to", "Multiplied by"], 0],
    ["What is A ∩ B (the intersection of sets A and B)?",
      ["The elements that are in BOTH A and B",
        "All elements of A and B together",
        "The elements only in A",
        "The empty set, always"], 0],
    ["What is A ∪ B (the union of sets A and B)?",
      ["All the elements that are in A or in B (or both)",
        "Only the elements in both sets",
        "The biggest element of each set",
        "The elements in neither set"], 0],
    ["A probability is always a number between…",
      ["0 and 1", "1 and 10", "0 and 100 only", "−1 and 1"], 0],
    ["If a division has a remainder of 0, it means…",
      ["The divisor divides the dividend exactly",
        "The answer is always 0",
        "The dividend is a prime number",
        "You made a mistake"], 0],
    ["What is a multiple of 5?",
      ["A number you get by multiplying 5 by a whole number, like 5, 10, 15…",
        "Any number that ends in 1",
        "A number smaller than 5",
        "Half of 5"], 0],
  ];

  function conceptProblem() {
    const [q, choices, correct] = choice(CONCEPT_BANK);
    const idx = shuffle(choices.map((_, i) => i));
    const shuffled = idx.map((i) => choices[i]);
    const newCorrect = idx.indexOf(correct);
    return mc("<strong>Concept:</strong> " + q, shuffled, newCorrect, "concept");
  }

  // =========================================================
  // 2) Division with decimal (fraction) numbers, up to 4 decimals
  // =========================================================
  function decimalDivisionProblem() {
    const places = ri(1, 4);
    const k = ri(11, 9999);
    const quotient = k / Math.pow(10, places);
    const divisor = choice([2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 25]);
    const dividend = (k * divisor) / Math.pow(10, places);
    const question = `How much is ${fmt(dividend)} ÷ ${divisor}? ` +
      `<em>(the answer has up to 4 decimal places)</em>`;
    return numeric(question, quotient, 4, "decimal division");
  }

  function integerDivisionProblem() {
    while (true) {
      const dividend = ri(10000, 99999);
      const divisor = ri(11, 100);
      if (dividend % divisor === 0) {
        return numeric(`How much is ${dividend} ÷ ${divisor}?`, dividend / divisor, 0, "division");
      }
    }
  }

  // =========================================================
  // 3) Decimal +, −, ×
  // =========================================================
  function additionDecimalProblem() {
    const a = randomDecimal(), b = randomDecimal();
    return numeric(`How much is ${fmt(a)} + ${fmt(b)}?`, round4(a + b), 4, "addition");
  }

  function subtractionDecimalProblem() {
    let a = randomDecimal(), b = randomDecimal();
    if (b > a) [a, b] = [b, a];
    return numeric(`How much is ${fmt(a)} − ${fmt(b)}?`, round4(a - b), 4, "subtraction");
  }

  function multiplicationDecimalProblem() {
    const a = round4(Math.random() * 20, 2);
    const b = round4(Math.random() * 9, 2);
    return numeric(`How much is ${fmt(a)} × ${fmt(b)}?`, round4(a * b), 4, "multiplication");
  }

  // =========================================================
  // 4) Linear equations
  // =========================================================
  function linearEquationProblem() {
    const a = ri(2, 9);
    const x = ri(2, 12);
    const b = ri(1, 20);
    let question;
    if (Math.random() < 0.5) {
      const c = a * x + b;
      question = `Solve for x: &nbsp; ${a}x + ${b} = ${c}`;
    } else {
      const c = a * x - b;
      question = `Solve for x: &nbsp; ${a}x − ${b} = ${c}`;
    }
    return numeric(question, x, 0, "linear equation");
  }

  // =========================================================
  // 5) Geometry
  // =========================================================
  function geometryProblem() {
    const kind = choice(["rect_per", "rect_area", "square_per", "square_area", "triangle_area"]);
    if (kind === "rect_per") {
      const w = ri(3, 25), h = ri(3, 25);
      return numeric(`A rectangle is ${w} cm wide and ${h} cm tall. What is its <strong>perimeter</strong> in cm?`,
        2 * (w + h), 0, "geometry");
    }
    if (kind === "rect_area") {
      const w = ri(3, 15), h = ri(3, 15);
      return numeric(`A rectangle is ${w} cm wide and ${h} cm tall. What is its <strong>area</strong> in cm²?`,
        w * h, 0, "geometry");
    }
    if (kind === "square_per") {
      const s = ri(3, 30);
      return numeric(`A square has sides of ${s} cm. What is its <strong>perimeter</strong> in cm?`, 4 * s, 0, "geometry");
    }
    if (kind === "square_area") {
      const s = ri(3, 15);
      return numeric(`A square has sides of ${s} cm. What is its <strong>area</strong> in cm²?`, s * s, 0, "geometry");
    }
    const b = ri(2, 20);
    const h = choice([2, 4, 6, 8, 10, 12]);
    return numeric(`A triangle has a base of ${b} cm and a height of ${h} cm. ` +
      `What is its <strong>area</strong> in cm²? (area = base × height ÷ 2)`,
      (b * h) / 2, 0, "geometry");
  }

  // =========================================================
  // 6) Prime numbers
  // =========================================================
  function isPrime(n) {
    if (n < 2) return false;
    for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
    return true;
  }

  function primeProblem() {
    if (Math.random() < 0.5) {
      const n = ri(4, 40);
      let nxt = n + 1;
      while (!isPrime(nxt)) nxt++;
      return numeric(`What is the <strong>smallest prime number</strong> greater than ${n}?`, nxt, 0, "prime numbers");
    }
    const [lo, hi] = choice([[1, 10], [1, 20], [10, 30], [20, 40]]);
    let count = 0;
    for (let i = lo; i <= hi; i++) if (isPrime(i)) count++;
    return numeric(`How many <strong>prime numbers</strong> are there between ${lo} and ${hi} (including both)?`,
      count, 0, "prime numbers");
  }

  // =========================================================
  // 7) Factors
  // =========================================================
  function gcf(a, b) {
    while (b) [a, b] = [b, a % b];
    return a;
  }

  function factorProblem() {
    const kind = choice(["count", "largest", "gcf"]);
    if (kind === "count") {
      const n = choice([12, 16, 18, 20, 24, 28, 30, 36, 40, 48]);
      let count = 0;
      for (let d = 1; d <= n; d++) if (n % d === 0) count++;
      return numeric(`How many <strong>factors</strong> does ${n} have? (count every number that divides it exactly)`,
        count, 0, "factors");
    }
    if (kind === "largest") {
      const n = choice([12, 18, 20, 24, 30, 36, 42, 48, 50, 54]);
      let smallestPf = 2;
      while (n % smallestPf !== 0) smallestPf++;
      return numeric(`What is the <strong>largest factor</strong> of ${n} that is smaller than ${n}?`,
        n / smallestPf, 0, "factors");
    }
    const a = choice([12, 18, 24, 30, 36, 48]);
    const b = choice([8, 16, 20, 27, 40, 54, 60]);
    return numeric(`What is the <strong>greatest common factor</strong> (GCF) of ${a} and ${b}?`,
      gcf(a, b), 0, "factors");
  }

  // =========================================================
  // 8) Sets
  // =========================================================
  function setProblem() {
    const universe = Array.from({ length: 12 }, (_, i) => i + 1);
    const a = sample(universe, ri(4, 6)).sort((x, y) => x - y);
    const b = sample(universe, ri(4, 6)).sort((x, y) => x - y);
    const setA = new Set(a), setB = new Set(b);
    const aTxt = "{" + a.join(", ") + "}";
    const bTxt = "{" + b.join(", ") + "}";
    let ans, op;
    if (Math.random() < 0.5) {
      ans = [...setA].filter((x) => setB.has(x)).length;
      op = "A ∩ B (in <strong>both</strong> sets)";
    } else {
      ans = new Set([...a, ...b]).size;
      op = "A ∪ B (in A <strong>or</strong> B, counting each number once)";
    }
    return numeric(`Set A = ${aTxt} and Set B = ${bTxt}.<br>How many elements are in ${op}?`, ans, 0, "sets");
  }

  // =========================================================
  // 9) Inequalities
  // =========================================================
  function inequalityProblem() {
    const kind = choice(["count", "largest", "smallest"]);
    if (kind === "count") {
      const a = ri(1, 10);
      const b = a + ri(3, 9);
      return numeric(`How many <strong>whole numbers</strong> x satisfy ${a} &lt; x ≤ ${b}?`, b - a, 0, "inequality");
    }
    if (kind === "largest") {
      const b = ri(5, 30);
      return numeric(`What is the <strong>largest whole number</strong> x that satisfies x &lt; ${b}?`, b - 1, 0, "inequality");
    }
    const a = ri(3, 25);
    return numeric(`What is the <strong>smallest whole number</strong> x that satisfies x &gt; ${a}?`, a + 1, 0, "inequality");
  }

  // =========================================================
  // 10) Measures (unit conversion)
  // =========================================================
  function measuresProblem() {
    const kind = choice(["m_cm", "km_m", "kg_g", "l_ml", "h_min"]);
    if (kind === "m_cm") {
      const v = ri(1, 12) + choice([0.0, 0.25, 0.5, 0.75]);
      return numeric(`How many <strong>centimeters</strong> are in ${fmt(v)} meters?`, v * 100, 0, "measures");
    }
    if (kind === "km_m") {
      const v = ri(1, 9) + choice([0.0, 0.1, 0.2, 0.5]);
      return numeric(`How many <strong>meters</strong> are in ${fmt(v)} kilometers?`, v * 1000, 0, "measures");
    }
    if (kind === "kg_g") {
      const v = ri(1, 9) + choice([0.0, 0.2, 0.5, 0.75]);
      return numeric(`How many <strong>grams</strong> are in ${fmt(v)} kilograms?`, v * 1000, 0, "measures");
    }
    if (kind === "l_ml") {
      const v = ri(1, 6) + choice([0.0, 0.25, 0.5]);
      return numeric(`How many <strong>milliliters</strong> are in ${fmt(v)} liters?`, v * 1000, 0, "measures");
    }
    const v = choice([1.5, 2, 2.5, 3, 3.5, 4]);
    return numeric(`How many <strong>minutes</strong> are in ${fmt(v)} hours?`, v * 60, 0, "measures");
  }

  // =========================================================
  // 11) Probability (decimal answers, up to 4 places)
  // =========================================================
  function probabilityProblem() {
    const total = choice([2, 4, 5, 8, 10, 16, 20, 25]);
    const favorable = ri(1, total - 1);
    const [colorFav, colorOther] = choice([["red", "blue"], ["green", "yellow"], ["black", "white"]]);
    const ans = round4(favorable / total);
    const question =
      `A bag has ${favorable} ${colorFav} marbles and ${total - favorable} ${colorOther} marbles ` +
      `(${total} in total).<br>What is the <strong>probability</strong> of picking a ` +
      `${colorFav} marble? Write it as a decimal.`;
    return numeric(question, ans, 4, "probability");
  }

  // =========================================================
  // 12) Reading tables
  // =========================================================
  function tableProblem() {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const item = choice(["apples sold", "books read", "goals scored", "cups of juice"]);
    const values = days.map(() => ri(2, 30));

    const title = item.replace(/\b\w/g, (c) => c.toUpperCase());
    const rows = days.map((d, i) => `<tr><td>${d}</td><td>${values[i]}</td></tr>`).join("");
    const tableHtml = `<table class='mini-table'><tr><th>Day</th><th>${title}</th></tr>${rows}</table>`;

    const kind = choice(["cell", "sum", "max", "diff"]);
    let q, ans;
    if (kind === "cell") {
      const i = ri(0, days.length - 1);
      q = `Read the table.<br>${tableHtml}How many ${item} on <strong>${days[i]}</strong>?`;
      ans = values[i];
    } else if (kind === "sum") {
      const [i, j] = sample([0, 1, 2, 3, 4], 2);
      q = `Read the table.<br>${tableHtml}How many ${item} on <strong>${days[i]}</strong> ` +
        `and <strong>${days[j]}</strong> together?`;
      ans = values[i] + values[j];
    } else if (kind === "max") {
      q = `Read the table.<br>${tableHtml}What is the <strong>highest</strong> number of ${item} in one day?`;
      ans = Math.max(...values);
    } else {
      q = `Read the table.<br>${tableHtml}What is the difference between the ` +
        `<strong>highest</strong> and the <strong>lowest</strong> day?`;
      ans = Math.max(...values) - Math.min(...values);
    }
    return numeric(q, ans, 0, "read tables");
  }

  // =========================================================
  // 13) Reading graphics (pictograph)
  // =========================================================
  function graphProblem() {
    const [symbol, thing] = choice([["🍎", "apples"], ["⭐", "stars"], ["📚", "books"], ["⚽", "goals"]]);
    const per = choice([2, 3, 5, 10]);
    const names = sample(["Paulo", "Ana", "Leo", "Bia", "Duda"], 3);
    const counts = names.map(() => ri(2, 6));

    const rows = names.map((n, i) => `<strong>${n}:</strong> ${symbol.repeat(counts[i])}`).join("<br>");
    const chart = `<div class='pictograph'>Each ${symbol} = ${per} ${thing}.<br>${rows}</div>`;

    const kind = choice(["one", "two", "diff"]);
    let q, ans;
    if (kind === "one") {
      const i = ri(0, 2);
      q = `Read the graphic.${chart}How many ${thing} does <strong>${names[i]}</strong> have?`;
      ans = counts[i] * per;
    } else if (kind === "two") {
      q = `Read the graphic.${chart}How many ${thing} do <strong>${names[0]}</strong> and <strong>${names[1]}</strong> have together?`;
      ans = (counts[0] + counts[1]) * per;
    } else {
      q = `Read the graphic.${chart}How many more ${thing} does the person with the <strong>most</strong> have than the person with the <strong>least</strong>?`;
      ans = (Math.max(...counts) - Math.min(...counts)) * per;
    }
    return numeric(q, ans, 0, "read graphics");
  }

  // =========================================================
  // Session generator: always 8 problems
  // =========================================================
  const TOPIC_POOL = [
    integerDivisionProblem,
    additionDecimalProblem,
    subtractionDecimalProblem,
    multiplicationDecimalProblem,
    linearEquationProblem,
    geometryProblem,
    primeProblem,
    factorProblem,
    setProblem,
    inequalityProblem,
    measuresProblem,
    probabilityProblem,
    tableProblem,
    graphProblem,
  ];

  // Always returns exactly 8 problems:
  //   1 concept multiple-choice question (always present)
  //   1 decimal division (quotient with up to 4 decimals)
  //   6 problems from different random topics
  function generateSession() {
    const problems = [conceptProblem(), decimalDivisionProblem()];
    const generators = sample(TOPIC_POOL, 6);
    for (const g of generators) problems.push(g());
    return shuffle(problems);
  }

  return { generateSession };
})();
