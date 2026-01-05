// =========================================================
// QUIZ (Pyodide) - Division + Decimal (+, −, ×)
// =========================================================

// ---------- PYTHON FILE REGISTRY ----------
const PY_FILES = {
  quiz: "python/quiz.py",
};

// ---------- PYODIDE HELPERS ----------
let pyodideReady = null;
const loadedPythonFiles = new Set();

async function getPyodide() {
  if (!pyodideReady) {
    if (typeof loadPyodide === "undefined") {
      throw new Error("Pyodide not available.");
    }
    pyodideReady = loadPyodide();
  }
  return pyodideReady;
}

async function loadPythonFile(pyKey) {
  if (!PY_FILES[pyKey]) {
    throw new Error(`Python file key not found: ${pyKey}`);
  }
  if (loadedPythonFiles.has(pyKey)) return await getPyodide();

  const pyodide = await getPyodide();
  const path = PY_FILES[pyKey];

  const resp = await fetch(path);
  if (!resp.ok) throw new Error(`Failed to load ${path}`);

  const code = await resp.text();
  await pyodide.runPythonAsync(code);

  loadedPythonFiles.add(pyKey);
  return pyodide;
}

// ---------- QUIZ LOGIC ----------
const generateBtn = document.getElementById("generateBtn");

if (generateBtn) {
  generateBtn.addEventListener("click", runPython);
}

async function runPython() {
  try {
    const numInput = document.getElementById("num_problems");
    if (!numInput) return;

    const num = Number(numInput.value);

    if (!num || num < 1) {
      alert("Zero não, Zé do Prego. Coloca outro número aí.");
      return;
    }
    if (num > 21) {
      alert("This is too much, Paulo. Please enter a valid number.");
      return;
    }

    const pyodide = await loadPythonFile("quiz");

    // Call the mixed generator (division + decimal add/sub/mul)
    const result = await pyodide.runPythonAsync(`mixed_problems(${num})`);

    renderProblems(result.toJs());
  } catch (err) {
    console.error(err);
    alert("An error occurred while generating problems.");
  }
}

// ---------- RENDER + CHECK ----------
function renderProblems(items) {
  const problemList = document.getElementById("problems");
  if (!problemList) return;

  problemList.innerHTML = "";

  for (const [question, answer] of items) {
    const li = document.createElement("li");
    li.classList.add("problem-item");
    li.innerHTML = `
      <div class="problem-text">${question}</div>
      <div class="problem-actions">
        <input type="number" class="answer-input" placeholder="Your answer" step="0.001">
        <button class="check-btn">Check</button>
        <span class="feedback"></span>
      </div>
    `;

    li.querySelector(".check-btn").addEventListener("click", () => {
      const userRaw = li.querySelector(".answer-input").value;
      const feedback = li.querySelector(".feedback");

      const userVal = Number(userRaw);
      if (!Number.isFinite(userVal)) {
        feedback.textContent = "❗ Type a number.";
        feedback.classList.remove("feedback-right");
        feedback.classList.add("feedback-wrong");
        return;
      }

      const expected = Number(answer);

      // Allow tiny tolerance to avoid floating-point issues
      const ok = Math.abs(userVal - expected) < 0.001;

      if (ok) {
        feedback.textContent = "✅ Correct!";
        feedback.classList.remove("feedback-wrong");
        feedback.classList.add("feedback-right");
      } else {
        feedback.textContent = "❌ Try again.";
        feedback.classList.remove("feedback-right");
        feedback.classList.add("feedback-wrong");
      }
    });

    problemList.appendChild(li);
  }
}
