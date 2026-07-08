// =========================================================
// STUDY SESSION + POINTS MANAGER (shared on all pages)
//
// Rules:
//   - The counter goes from 0 to 500 points.
//   - Each completed study session is worth 50 points.
//   - A session is complete when:
//       * the 8 math exercises are finished (all answered correctly), AND
//       * every task in the Practice Area checklist is checked.
//   - Everything is saved to localStorage as the student goes,
//     so nothing is lost on refresh or when leaving the page.
// =========================================================
const PauloSession = (() => {
  const POINTS_KEY = "pauloPointsV1";
  const SESSION_KEY = "pauloSessionV1";
  const DATES_KEY = "pauloSessionDatesV1";   // list of "YYYY-MM-DD" a session was completed
  const STATS_KEY = "pauloStatsV1";          // per-topic accuracy
  const SETTINGS_KEY = "pauloSettingsV1";    // { onePerDay: true }

  // Every localStorage key the app owns — used by backup/export & import.
  const ALL_KEYS = [
    POINTS_KEY, SESSION_KEY, DATES_KEY, STATS_KEY, SETTINGS_KEY,
    "pauloFeelingNoteV1", "pauloFeelingHistoryV1", "theme",
  ];

  const MATH_GOAL = 8;
  const POINTS_PER_SESSION = 50;
  const POINTS_MAX = 500;

  // ---------- date helpers ----------
  function todayStr(d = new Date()) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function getSessionDates() {
    try {
      const raw = localStorage.getItem(DATES_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch { return []; }
  }

  function recordSessionDate(dateStr = todayStr()) {
    const dates = getSessionDates();
    dates.push(dateStr);
    localStorage.setItem(DATES_KEY, JSON.stringify(dates));
  }

  function completedToday() {
    return getSessionDates().includes(todayStr());
  }

  // Longest run of consecutive calendar days among the recorded dates.
  function currentStreak() {
    const unique = [...new Set(getSessionDates())].sort(); // ascending
    if (!unique.length) return 0;

    // Streak counts consecutive days ending today or yesterday (still "alive").
    const today = todayStr();
    const yesterday = todayStr(new Date(Date.now() - 86400000));
    const last = unique[unique.length - 1];
    if (last !== today && last !== yesterday) return 0;

    let streak = 1;
    for (let i = unique.length - 1; i > 0; i--) {
      const cur = new Date(unique[i] + "T00:00:00");
      const prev = new Date(unique[i - 1] + "T00:00:00");
      const diffDays = Math.round((cur - prev) / 86400000);
      if (diffDays === 1) streak++;
      else break;
    }
    return streak;
  }

  function longestStreak() {
    const unique = [...new Set(getSessionDates())].sort();
    if (!unique.length) return 0;
    let best = 1, run = 1;
    for (let i = 1; i < unique.length; i++) {
      const cur = new Date(unique[i] + "T00:00:00");
      const prev = new Date(unique[i - 1] + "T00:00:00");
      const diffDays = Math.round((cur - prev) / 86400000);
      if (diffDays === 1) { run++; best = Math.max(best, run); }
      else if (diffDays === 0) { /* same day, ignore */ }
      else run = 1;
    }
    return best;
  }

  // ---------- settings ----------
  function getSettings() {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      const s = raw ? JSON.parse(raw) : {};
      return Object.assign({ onePerDay: true }, s);
    } catch { return { onePerDay: true }; }
  }

  function setSetting(key, value) {
    const s = getSettings();
    s[key] = value;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  }

  // ---------- per-topic stats ----------
  function getStats() {
    try {
      const raw = localStorage.getItem(STATS_KEY);
      const s = raw ? JSON.parse(raw) : {};
      return s && typeof s === "object" ? s : {};
    } catch { return {}; }
  }

  function saveStats(s) {
    localStorage.setItem(STATS_KEY, JSON.stringify(s));
  }

  // Called on every wrong attempt.
  function recordWrong(topic) {
    if (!topic) return;
    const stats = getStats();
    stats[topic] = stats[topic] || { total: 0, firstTry: 0, withHelp: 0, wrong: 0 };
    stats[topic].wrong += 1;
    saveStats(stats);
  }

  // Called once when a question is finished (correctly or with help).
  function recordDone(topic, { firstTry = false, withHelp = false } = {}) {
    if (!topic) return;
    const stats = getStats();
    stats[topic] = stats[topic] || { total: 0, firstTry: 0, withHelp: 0, wrong: 0 };
    stats[topic].total += 1;
    if (firstTry) stats[topic].firstTry += 1;
    if (withHelp) stats[topic].withHelp += 1;
    saveStats(stats);
  }

  // ---------- points ----------
  function getPoints() {
    const raw = Number(localStorage.getItem(POINTS_KEY));
    return Number.isFinite(raw) ? Math.min(Math.max(raw, 0), POINTS_MAX) : 0;
  }

  function setPoints(p) {
    localStorage.setItem(POINTS_KEY, String(Math.min(Math.max(p, 0), POINTS_MAX)));
  }

  // ---------- session state ----------
  function emptySession() {
    return {
      problems: null,   // the 8 generated problems (so a refresh restores them)
      results: {},      // { index: { done, value } }
      tasks: {},        // { index: true/false } practice checklist
      tasksTotal: 0,    // how many checklist tasks exist (set by practice page)
      startedAt: null,
    };
  }

  function getSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return emptySession();
      const s = JSON.parse(raw);
      return Object.assign(emptySession(), s);
    } catch {
      return emptySession();
    }
  }

  function saveSession(s) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(s));
  }

  function clearSessionProgress() {
    localStorage.removeItem(SESSION_KEY);
  }

  // ---------- progress helpers ----------
  function mathDone(s) {
    s = s || getSession();
    return Object.values(s.results || {}).filter(r => r && r.done).length;
  }

  function tasksDone(s) {
    s = s || getSession();
    return Object.values(s.tasks || {}).filter(Boolean).length;
  }

  function isMathComplete(s) {
    return mathDone(s) >= MATH_GOAL;
  }

  function areTasksComplete(s) {
    s = s || getSession();
    return s.tasksTotal > 0 && tasksDone(s) >= s.tasksTotal;
  }

  function hasProgress(s) {
    s = s || getSession();
    return mathDone(s) > 0 || tasksDone(s) > 0 || !!s.problems;
  }

  function summary() {
    const s = getSession();
    return {
      points: getPoints(),
      pointsMax: POINTS_MAX,
      mathDone: mathDone(s),
      mathGoal: MATH_GOAL,
      tasksDone: tasksDone(s),
      tasksTotal: s.tasksTotal || 0,
      inProgress: hasProgress(s),
    };
  }

  // ---------- session completion ----------
  // Checks if the whole session is complete. If so:
  //   - If the "one session per day" limit is on and a session was
  //     already completed today, the finished work is HELD (kept in
  //     place, not cleared) and will be awarded automatically the next
  //     day. This keeps 500 points meaning "10 real study days".
  //   - Otherwise, awards 50 points, stamps today's date, clears the
  //     session, updates the streak and celebrates.
  // Returns "awarded" | "held" | false.
  function tryCompleteSession() {
    const s = getSession();
    if (!isMathComplete(s) || !areTasksComplete(s)) return false;

    const settings = getSettings();
    if (settings.onePerDay && completedToday()) {
      // Hold the completed session for tomorrow. Show a gentle note once.
      if (!s.heldNoticeShown) {
        s.heldNoticeShown = true;
        saveSession(s);
        setTimeout(() => {
          if (typeof PauloUI !== "undefined") {
            PauloUI.modal({
              title: "All done for today! 🌙",
              html: `<p>Fantastic work, Paulo — you finished a whole study session!</p>
                     <p>To keep the journey to 500 meaningful, only one session counts per day.
                     Your <strong>+${POINTS_PER_SESSION} points</strong> are saved and will be added
                     <strong>tomorrow</strong>, so come back to grow your streak. 🔥</p>`,
              buttons: [{ label: "Okay!", value: true, kind: "primary" }],
            });
          }
        }, 150);
      }
      renderStatusBar();
      renderReminder();
      return "held";
    }

    const before = getPoints();
    const newPoints = Math.min(before + POINTS_PER_SESSION, POINTS_MAX);
    setPoints(newPoints);
    recordSessionDate();
    clearSessionProgress();
    renderStatusBar();
    renderReminder();

    celebrate(newPoints);
    return "awarded";
  }

  function celebrate(points) {
    const reached500 = points >= POINTS_MAX;
    const streak = currentStreak();
    const streakLine = streak > 1
      ? `<p>🔥 You're on a <strong>${streak}-day streak</strong>. Keep it going tomorrow!</p>`
      : "";

    // Small delay so the last click's feedback renders first.
    setTimeout(() => {
      if (typeof PauloUI === "undefined") return; // safety on pages without ui.js

      if (reached500) {
        const sessions = Math.round(POINTS_MAX / POINTS_PER_SESSION);
        PauloUI.showCertificate({
          points: POINTS_MAX,
          sessions,
          streak: longestStreak(),
        });
      } else {
        PauloUI.modal({
          title: "Study session complete! 🎉",
          html: `<p>Great job, Paulo! You earned <strong>+${POINTS_PER_SESSION} points</strong>.</p>
                 <p>You now have <strong>${points} / ${POINTS_MAX}</strong> points.</p>
                 ${streakLine}`,
          buttons: [{ label: "Yay!", value: true, kind: "primary" }],
        });
      }
    }, 150);
  }

  // ---------- backup / export / import ----------
  function exportData() {
    const data = { _app: "paulo-exercises", _version: 1, exportedAt: new Date().toISOString(), data: {} };
    ALL_KEYS.forEach((k) => {
      const v = localStorage.getItem(k);
      if (v !== null) data.data[k] = v;
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `paulo-progress-${todayStr()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // Restores from a parsed backup object. Returns true on success.
  function importData(parsed) {
    if (!parsed || parsed._app !== "paulo-exercises" || typeof parsed.data !== "object") {
      return false;
    }
    ALL_KEYS.forEach((k) => {
      if (k in parsed.data) localStorage.setItem(k, parsed.data[k]);
    });
    return true;
  }

  // ---------- status bar (rendered on any page with #sessionStatus) ----------
  function renderStatusBar() {
    const el = document.getElementById("sessionStatus");
    if (!el) return;

    const s = summary();
    const pct = Math.round((s.points / s.pointsMax) * 100);
    const sessionsDone = Math.floor(s.points / POINTS_PER_SESSION);

    // Quest trail: a launch rocket, 10 milestone stones (each = one study
    // day / 50 points), and a trophy at 500. Lit stones show a star.
    const totalStones = Math.round(POINTS_MAX / POINTS_PER_SESSION); // 10
    let stones = `<span class="stone stone-start" title="Start">🚀</span>`;
    for (let i = 0; i < totalStones; i++) {
      const done = i < sessionsDone;
      const milestone = (i + 1) * POINTS_PER_SESSION;
      stones += `<span class="stone ${done ? "stone-done" : ""}" title="${milestone} points">${done ? "⭐" : milestone}</span>`;
    }
    stones += `<span class="stone stone-goal ${s.points >= s.pointsMax ? "stone-done" : ""}" title="Goal: ${POINTS_MAX} points">🏆</span>`;
    const stars = stones;

    const taskLabel = s.tasksTotal > 0
      ? `${s.tasksDone}/${s.tasksTotal}`
      : `${s.tasksDone}/? <span class="status-hint">(open the Practice Area)</span>`;

    const streak = currentStreak();
    const daysDone = new Set(getSessionDates()).size;
    const streakLine = streak > 0
      ? `<div class="session-streak">🔥 <strong>${streak}-day streak</strong> · ${daysDone} study day${daysDone === 1 ? "" : "s"} so far</div>`
      : (daysDone > 0
          ? `<div class="session-streak">${daysDone} study day${daysDone === 1 ? "" : "s"} so far — come back today to start a new streak!</div>`
          : `<div class="session-streak">No study days yet — finish a session to begin your streak! 🔥</div>`);

    el.innerHTML = `
      <div class="session-counter">
        <div class="session-counter-top">
          <span class="session-counter-label">Paulo's points</span>
          <span class="session-counter-value">${s.points} / ${s.pointsMax}</span>
        </div>
        <div class="session-progress-track">
          <div class="session-progress-fill" style="width:${pct}%"></div>
        </div>
        <div class="session-stars" title="Each ⭐ = one finished study session (50 points)">${stars}</div>
        <div class="session-current">
          <span>This session:</span>
          <span class="session-chip ${s.mathDone >= s.mathGoal ? "chip-done" : ""}">🧮 Math ${s.mathDone}/${s.mathGoal}</span>
          <span class="session-chip ${s.tasksTotal > 0 && s.tasksDone >= s.tasksTotal ? "chip-done" : ""}">✅ Checklist ${taskLabel}</span>
        </div>
        ${streakLine}
      </div>
    `;
  }

  // ---------- "finish your session" reminder ----------
  // Shown on pages with #sessionReminder (the home page) when a session
  // was started but not completed. Progress is always saved.
  function renderReminder() {
    const el = document.getElementById("sessionReminder");
    if (!el) return;

    const s = summary();
    if (!s.inProgress) {
      el.innerHTML = "";
      return;
    }

    el.innerHTML = `
      <div class="session-reminder">
        <strong>You have an unfinished study session 📌</strong>
        <p>Don't worry — everything you did is saved. Finish it to earn your 50 points!</p>
        <div class="session-reminder-links">
          <a class="session-reminder-btn" href="math_practice.html">Continue math (${s.mathDone}/${s.mathGoal})</a>
          <a class="session-reminder-btn" href="practice.html">Open checklist (${s.tasksDone}/${s.tasksTotal || "?"})</a>
        </div>
      </div>
    `;
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderStatusBar();
    renderReminder();
  });

  return {
    MATH_GOAL,
    POINTS_MAX,
    POINTS_PER_SESSION,
    getPoints,
    getSession,
    saveSession,
    clearSessionProgress,
    mathDone,
    tasksDone,
    isMathComplete,
    areTasksComplete,
    hasProgress,
    summary,
    tryCompleteSession,
    renderStatusBar,
    renderReminder,
    // dates / streak
    getSessionDates,
    completedToday,
    currentStreak,
    longestStreak,
    todayStr,
    // settings
    getSettings,
    setSetting,
    // stats
    getStats,
    recordWrong,
    recordDone,
    // backup
    exportData,
    importData,
  };
})();
