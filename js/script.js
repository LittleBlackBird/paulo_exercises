// =========================================================
// QUIZ — 8 exercises per study session
// Division (incl. decimals up to 4 places), concepts (multiple
// choice), linear equations, geometry, primes, factors, sets,
// inequalities, measures, probability, tables and graphics.
// All progress is saved to localStorage as Paulo goes.
//
// The generator was converted from Python (python/quiz.py) to
// JavaScript (js/quiz.js), so Pyodide is no longer needed and
// the page loads instantly.
// =========================================================

const QUESTIONS_PER_SESSION = 8;

// ---------- QUIZ LOGIC ----------
const generateBtn = document.getElementById("generateBtn");

if (generateBtn) {
  generateBtn.addEventListener("click", onGenerateClick);

  // On page load: restore a saved, unfinished set of problems (nothing is lost)
  document.addEventListener("DOMContentLoaded", () => {
    const session = PauloSession.getSession();
    if (session.problems && session.problems.length) {
      renderProblems(session.problems, session.results || {});
      updateQuizProgress();
      if (!PauloSession.isMathComplete(session)) {
        setQuizMessage("Welcome back, Paulo! Your session was saved — continue where you stopped. 💾");
      }
    }
  });
}

async function onGenerateClick() {
  const session = PauloSession.getSession();

  // Ask before throwing away an unfinished session — progress is saved.
  if (session.problems && !PauloSession.isMathComplete(session)) {
    const done = PauloSession.mathDone(session);
    const keep = await PauloUI.modal({
      title: "You have a saved session 💾",
      html: `<p>Paulo, you still have an unfinished session (<strong>${done}/${QUESTIONS_PER_SESSION}</strong> done).</p>
             <p>Would you like to continue it, or start a brand-new one?</p>`,
      buttons: [
        { label: "Start new", value: false, kind: "ghost" },
        { label: "Continue saved", value: true, kind: "primary" },
      ],
    });
    if (keep === undefined) return; // dismissed — change nothing
    if (keep) {
      renderProblems(session.problems, session.results || {});
      updateQuizProgress();
      return;
    }
  }

  await startNewSession();
}

async function startNewSession() {
  try {
    setQuizMessage("Preparing your 8 exercises… 🧮");
    const problems = PauloQuiz.generateSession();

    // Save the new problem set (keeps checklist progress from the Practice Area)
    const session = PauloSession.getSession();
    session.problems = problems;
    session.results = {};
    session.startedAt = session.startedAt || Date.now();
    PauloSession.saveSession(session);
    PauloSession.renderStatusBar();

    renderProblems(problems, {});
    updateQuizProgress();
    setQuizMessage("");
  } catch (err) {
    console.error(err);
    if (typeof PauloUI !== "undefined") PauloUI.toast("Sorry — could not generate the exercises.");
  }
}

function setQuizMessage(text) {
  const el = document.getElementById("quizMessage");
  if (el) el.textContent = text;
}

function updateQuizProgress() {
  const el = document.getElementById("quizProgress");
  if (!el) return;
  const done = PauloSession.mathDone();
  el.textContent = `Solved: ${done} / ${QUESTIONS_PER_SESSION}`;
  el.classList.toggle("quiz-progress-done", done >= QUESTIONS_PER_SESSION);
}

// ---------- SAVE ANSWERS AS PAULO GOES ----------
function saveResult(index, data) {
  const session = PauloSession.getSession();
  session.results = session.results || {};
  session.results[index] = Object.assign({}, session.results[index], data);
  PauloSession.saveSession(session);
  PauloSession.renderStatusBar();
}

function onExerciseSolved() {
  updateQuizProgress();

  const session = PauloSession.getSession();
  if (PauloSession.isMathComplete(session)) {
    // Sync the automatic "math" task in the Practice Area checklist,
    // so the session can complete even if math was finished last.
    if (session.mathTaskIndex !== undefined && session.mathTaskIndex !== null) {
      session.tasks = session.tasks || {};
      session.tasks[session.mathTaskIndex] = true;
      PauloSession.saveSession(session);
    }
    if (PauloSession.areTasksComplete(session)) {
      // Whole session done → +50 points (handled inside)
      PauloSession.tryCompleteSession();
      setQuizMessage("");
    } else {
      setQuizMessage(
        "🎯 All 8 math exercises done! Now finish the checklist in the Practice Area to complete your session and earn 50 points."
      );
    }
  }
}

// ---------- RENDER + CHECK ----------
function renderProblems(items, savedResults) {
  const problemList = document.getElementById("problems");
  if (!problemList) return;

  problemList.innerHTML = "";

  items.forEach((item, index) => {
    const saved = (savedResults && savedResults[index]) || {};
    const li = document.createElement("li");
    li.classList.add("problem-item");

    if (item.type === "mc") {
      renderMultipleChoice(li, item, index, saved);
    } else {
      renderNumeric(li, item, index, saved);
    }

    problemList.appendChild(li);
  });
}

// Multiple-choice question (one correct answer)
// Learning feedback: after 2 wrong tries → hint; after 3 → worked
// solution, and the question is marked "learned with help".
function renderMultipleChoice(li, item, index, saved) {
  const choicesHtml = item.choices
    .map((c, i) => `<button class="choice-btn" data-choice="${i}">${c}</button>`)
    .join("");

  li.innerHTML = `
    <div class="problem-text">${item.q}</div>
    <div class="choices">${choicesHtml}</div>
    <div class="problem-hint" hidden></div>
    <div class="problem-solution" hidden></div>
    <span class="feedback"></span>
  `;

  const feedback = li.querySelector(".feedback");
  const hintEl = li.querySelector(".problem-hint");
  const solutionEl = li.querySelector(".problem-solution");
  const buttons = [...li.querySelectorAll(".choice-btn")];

  let wrongCount = saved.wrong || 0;

  function showHint() {
    hintEl.innerHTML = item.hint || "Read the question again, slowly.";
    hintEl.hidden = false;
  }

  function lockCorrect(chosenIndex, withHelp) {
    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === chosenIndex) b.classList.add("choice-correct");
    });
    feedback.innerHTML = withHelp
      ? '✅ Learned with help <span class="badge-learned">learned with help</span>'
      : "✅ Correct!";
    feedback.classList.remove("feedback-wrong");
    feedback.classList.add("feedback-right");
  }

  function revealSolution() {
    // Show the worked solution and highlight the correct choice.
    solutionEl.innerHTML = item.solution || "";
    solutionEl.hidden = false;
    showHint();
    lockCorrect(item.a, true);
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (saved.done) return;
      const chosen = Number(btn.dataset.choice);

      if (chosen === item.a) {
        saved.done = true;
        const firstTry = wrongCount === 0;
        lockCorrect(chosen, false);
        saveResult(index, { done: true, value: chosen, wrong: wrongCount, learnedWithHelp: false });
        PauloSession.recordDone(item.topic, { firstTry, withHelp: false });
        onExerciseSolved();
      } else {
        btn.classList.add("choice-wrong");
        btn.disabled = true; // a used wrong choice can't be clicked again
        wrongCount += 1;
        PauloSession.recordWrong(item.topic);
        saveResult(index, { done: false, value: chosen, wrong: wrongCount });

        feedback.textContent = "❌ Try again.";
        feedback.classList.remove("feedback-right");
        feedback.classList.add("feedback-wrong");

        if (wrongCount >= 3) {
          // Third mistake → worked solution, mark learned-with-help
          saved.done = true;
          revealSolution();
          saveResult(index, { done: true, value: item.a, wrong: wrongCount, learnedWithHelp: true });
          PauloSession.recordDone(item.topic, { firstTry: false, withHelp: true });
          onExerciseSolved();
        } else if (wrongCount >= 2) {
          showHint();
        }
      }
    });
  });

  // Restore saved state
  if (saved.done) {
    if (saved.learnedWithHelp) revealSolution();
    else lockCorrect(item.a, false);
  } else {
    if (wrongCount >= 2) showHint();
    if (typeof saved.value === "number" && saved.value !== item.a) {
      const b = buttons[saved.value];
      if (b) { b.classList.add("choice-wrong"); b.disabled = true; }
    }
  }
}

// Numeric question (typed answer; decimals up to 4 places)
// Learning feedback: after 2 wrong tries → hint; after 3 → worked
// solution, and the question is marked "learned with help".
function renderNumeric(li, item, index, saved) {
  li.innerHTML = `
    <div class="problem-text">${item.q}</div>
    <div class="problem-actions">
      <input type="number" class="answer-input" placeholder="Your answer" step="0.0001">
      <button class="check-btn">Check</button>
      <span class="feedback"></span>
    </div>
    <div class="problem-hint" hidden></div>
    <div class="problem-solution" hidden></div>
  `;

  const input = li.querySelector(".answer-input");
  const checkBtn = li.querySelector(".check-btn");
  const feedback = li.querySelector(".feedback");
  const hintEl = li.querySelector(".problem-hint");
  const solutionEl = li.querySelector(".problem-solution");

  let wrongCount = saved.wrong || 0;

  function showHint() {
    hintEl.innerHTML = item.hint || "Try breaking the problem into smaller steps.";
    hintEl.hidden = false;
  }

  function lockDone(withHelp) {
    input.disabled = true;
    checkBtn.disabled = true;
    feedback.innerHTML = withHelp
      ? '✅ Learned with help <span class="badge-learned">learned with help</span>'
      : "✅ Correct!";
    feedback.classList.remove("feedback-wrong");
    feedback.classList.add("feedback-right");
  }

  function revealSolution() {
    solutionEl.innerHTML = item.solution || `The correct answer is <strong>${item.a}</strong>.`;
    solutionEl.hidden = false;
    showHint();
    input.value = item.a;
    lockDone(true);
  }

  checkBtn.addEventListener("click", () => {
    if (saved.done) return;

    const userRaw = input.value;
    const userVal = Number(userRaw);

    if (!Number.isFinite(userVal) || userRaw === "") {
      feedback.textContent = "❗ Type a number.";
      feedback.classList.remove("feedback-right");
      feedback.classList.add("feedback-wrong");
      return;
    }

    const expected = Number(item.a);
    // Compare rounded to 4 decimal places (answers never have more than that)
    const ok = Math.abs(userVal - expected) < 0.00005 ||
               userVal.toFixed(4) === expected.toFixed(4);

    if (ok) {
      saved.done = true;
      const firstTry = wrongCount === 0;
      lockDone(false);
      saveResult(index, { done: true, value: userRaw, wrong: wrongCount, learnedWithHelp: false });
      PauloSession.recordDone(item.topic, { firstTry, withHelp: false });
      onExerciseSolved();
    } else {
      wrongCount += 1;
      PauloSession.recordWrong(item.topic);
      saveResult(index, { done: false, value: userRaw, wrong: wrongCount });

      feedback.textContent = "❌ Try again.";
      feedback.classList.remove("feedback-right");
      feedback.classList.add("feedback-wrong");

      if (wrongCount >= 3) {
        saved.done = true;
        revealSolution();
        saveResult(index, { done: true, value: String(item.a), wrong: wrongCount, learnedWithHelp: true });
        PauloSession.recordDone(item.topic, { firstTry: false, withHelp: true });
        onExerciseSolved();
      } else if (wrongCount >= 2) {
        showHint();
      }
    }
  });

  // Restore saved state
  if (saved.value !== undefined && saved.value !== null) {
    input.value = saved.value;
  }
  if (saved.done) {
    if (saved.learnedWithHelp) revealSolution();
    else lockDone(false);
  } else if (wrongCount >= 2) {
    showHint();
  }
}

// =========================================================
// PRACTICE AREA — checklist saved as Paulo goes
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const tasks = [...document.querySelectorAll(".practice-task")];
  if (!tasks.length) return;

  const session = PauloSession.getSession();

  // Tell the session how many checklist tasks exist
  if (session.tasksTotal !== tasks.length) {
    session.tasksTotal = tasks.length;
    PauloSession.saveSession(session);
  }

  // The math task is tracked automatically from the Math Practice page
  const mathTask = document.querySelector(".practice-task[data-task='math']");
  if (mathTask) {
    const done = PauloSession.mathDone(session);
    mathTask.checked = PauloSession.isMathComplete(session);
    mathTask.disabled = true;
    const counter = document.getElementById("mathTaskCount");
    if (counter) counter.textContent = `(${done}/${PauloSession.MATH_GOAL} done)`;
    session.tasks = session.tasks || {};
    session.mathTaskIndex = tasks.indexOf(mathTask); // remembered so the math page can sync it too
    session.tasks[session.mathTaskIndex] = mathTask.checked;
  }

  // Restore manual checkboxes
  tasks.forEach((t, i) => {
    if (t === mathTask) return;
    if (session.tasks && session.tasks[i]) t.checked = true;
  });
  PauloSession.saveSession(session);
  PauloSession.renderStatusBar();

  // If everything was already finished (e.g. the math was the last thing
  // done, on the other page), complete the session now.
  PauloSession.tryCompleteSession();

  // Save every change immediately
  document.addEventListener("change", (e) => {
    if (!e.target.classList.contains("practice-task")) return;

    const idx = tasks.indexOf(e.target);
    const s = PauloSession.getSession();
    s.tasks = s.tasks || {};
    s.tasks[idx] = e.target.checked;
    s.tasksTotal = tasks.length;
    PauloSession.saveSession(s);
    PauloSession.renderStatusBar();

    // Whole session complete? (math + all checklist tasks)
    PauloSession.tryCompleteSession();
  });
});
