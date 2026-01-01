// =========================================================
// CONFIG
// =========================================================

// ---------- PYTHON FILE REGISTRY ----------
const PY_FILES = {
    quiz: "python/quiz.py",
  };
  
  // =========================================================
  // PYODIDE HELPERS
  // =========================================================
  
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
  
    // prevent re-loading the same python file
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
  
  // =========================================================
  // QUIZ LOGIC (index.html)
  // =========================================================
  
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
      } else if (num > 21) {
        alert("This is too much, Paulo. Please enter a valid number.");
        return;
      }
  
      const pyodide = await loadPythonFile("quiz");
      const result = await pyodide.runPythonAsync(`division_problems(${num})`);
  
      renderProblems(result.toJs());
    } catch (err) {
        console.error("Python Error:", err);
        alert(`Error: ${err?.message || err}`);
      }
      
  }
  
  function renderProblems(problems) {
    const problemList = document.getElementById("problems");
    if (!problemList) return;
  
    problemList.innerHTML = "";
  
    for (const [question, answer] of problems) {
      const li = document.createElement("li");
      li.classList.add("problem-item");
  
      li.innerHTML = `
        <div class="problem-text">${question}</div>
        <div class="problem-actions">
          <input type="number" class="answer-input" placeholder="Your answer">
          <button class="check-btn">Check</button>
          <span class="feedback"></span>
        </div>
      `;
  
      li.querySelector(".check-btn").addEventListener("click", () => {
        const userInput = li.querySelector(".answer-input").value;
        const feedback = li.querySelector(".feedback");
  
        if (parseInt(userInput, 10) === answer) {
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
  
  // =========================================================
  // PRACTICE PAGE: CHECKLIST REWARD VIDEO
  // =========================================================
  
  const practiceTasks = document.querySelectorAll(".practice-task");
  const PRACTICE_VIDEO_URL = "assets/videos/Dragon1.mp4";
  let practiceRewardPlayed = false;
  
  function checkPracticeCompletion() {
    if (!practiceTasks.length || practiceRewardPlayed) return;
  
    const allDone = Array.from(practiceTasks).every((task) => task.checked);
    if (allDone) {
      practiceRewardPlayed = true;
      window.open(PRACTICE_VIDEO_URL, "_blank", "noopener");
    }
  }
  
  if (practiceTasks.length) {
    practiceTasks.forEach((task) => {
      task.addEventListener("change", checkPracticeCompletion);
    });
  }
  

  
  // ---------- FEELINGS JOURNAL & HISTORY ----------
  const FEELING_NOTE_KEY = "pauloFeelingNoteV1";
  const FEELING_HISTORY_KEY = "pauloFeelingHistoryV1";
  
  const feelingNoteTextarea = document.getElementById("feelingNote");
  const saveFeelingNoteBtn = document.getElementById("saveFeelingNoteBtn");
  const feelingNoteStatus = document.getElementById("feelingNoteStatus");
  
  function loadFeelingNote() {
    if (!feelingNoteTextarea) return;
    const saved = localStorage.getItem(FEELING_NOTE_KEY);
    if (saved) {
      feelingNoteTextarea.value = saved;
    }
  }
  
  function appendFeelingHistoryEntry(noteText) {
    if (!noteText) return;
  
    let history = [];
    try {
      const raw = localStorage.getItem(FEELING_HISTORY_KEY);
      history = raw ? JSON.parse(raw) : [];
    } catch (e) {
      history = [];
    }
  
    const now = new Date();
    const entry = {
      id: Date.now(),
      timestamp: now.toISOString(),
      dateLabel: now.toLocaleDateString(),
      timeLabel: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      feelingId: currentFeeling ? currentFeeling.id : null,
      feelingName: currentFeeling ? currentFeeling.name : null,
      feelingLang: currentFeeling ? currentFeeling.langLabel : null,
      note: noteText,
    };
  
    history.push(entry);
    localStorage.setItem(FEELING_HISTORY_KEY, JSON.stringify(history));
  }
  
  function saveFeelingNote() {
    if (!feelingNoteTextarea) return;
  
    const text = feelingNoteTextarea.value.trim();
    localStorage.setItem(FEELING_NOTE_KEY, text);
  
    appendFeelingHistoryEntry(text);
  
    if (feelingNoteStatus) {
      feelingNoteStatus.textContent = "Saved!";
      feelingNoteStatus.classList.add("visible");
  
      setTimeout(() => {
        feelingNoteStatus.classList.remove("visible");
      }, 1800);
    }
  }
  
  if (feelingNoteTextarea && saveFeelingNoteBtn) {
    loadFeelingNote();
    saveFeelingNoteBtn.addEventListener("click", saveFeelingNote);
  }
  
  // ---------- HISTORY PAGE RENDER ----------
  const historyListEl = document.getElementById("historyList");
  const clearHistoryBtn = document.getElementById("clearHistoryBtn");
  
  function renderHistory() {
    if (!historyListEl) return;
  
    let history = [];
    try {
      const raw = localStorage.getItem(FEELING_HISTORY_KEY);
      history = raw ? JSON.parse(raw) : [];
    } catch (e) {
      history = [];
    }
  
    if (!history.length) {
      historyListEl.innerHTML =
        '<p class="history-empty">No feelings saved yet. Go to the Feelings page and write your first one 💬</p>';
      return;
    }
  
    history.sort((a, b) => {
      const ta = new Date(a.timestamp).getTime();
      const tb = new Date(b.timestamp).getTime();
      return tb - ta;
    });
  
    const pieces = history.map((entry) => {
      const feelingLabel = entry.feelingName
        ? `${entry.feelingName}${entry.feelingLang ? " · " + entry.feelingLang : ""}`
        : "Feeling not selected";
      const dateLabel = `${entry.dateLabel} · ${entry.timeLabel}`;
  
      return `
        <article class="history-item">
          <header class="history-header">
            <span class="history-date">${dateLabel}</span>
            <span class="history-feeling">${feelingLabel}</span>
          </header>
          <p class="history-note">${entry.note || ""}</p>
        </article>
      `;
    });
  
    historyListEl.innerHTML = pieces.join("");
  }
  
  if (historyListEl) {
    renderHistory();
  }
  
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", () => {
      const ok = confirm("Clear all saved feelings? This cannot be undone.");
      if (!ok) return;
      localStorage.removeItem(FEELING_HISTORY_KEY);
      renderHistory();
    });
  }
  