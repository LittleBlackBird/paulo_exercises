// =========================================================
// PARENT PANEL (js/parent.js)
//
// Renders (into #parentPanel, if present):
//   • per-topic accuracy so a parent can see where Paulo struggles
//   • the study streak and number of study days
//   • Backup / export + Import buttons
//   • an optional "one session per day" toggle
//   • a "Print certificate" button once 500 points is reached
// =========================================================

(function () {
  const panel = document.getElementById("parentPanel");
  if (!panel) return;

  const TOPIC_LABELS = {
    "concept": "Math concepts",
    "decimal division": "Division with decimals",
    "division": "Division",
    "addition": "Addition",
    "subtraction": "Subtraction",
    "multiplication": "Multiplication",
    "linear equation": "Linear equations",
    "geometry": "Geometry",
    "prime numbers": "Prime numbers",
    "factors": "Factors",
    "sets": "Sets",
    "inequality": "Inequalities",
    "measures": "Measures",
    "probability": "Probability",
    "read tables": "Reading tables",
    "read graphics": "Reading graphics",
  };

  function statsTableHtml() {
    const stats = PauloSession.getStats();
    const topics = Object.keys(stats).filter((t) => stats[t] && stats[t].total > 0);

    if (!topics.length) {
      return `<p class="stats-empty">No exercises finished yet. Once Paulo answers some questions,
              a per-topic accuracy report will appear here.</p>`;
    }

    // Sort by accuracy ascending, so the weakest topics are at the top.
    topics.sort((a, b) => {
      const accA = stats[a].firstTry / stats[a].total;
      const accB = stats[b].firstTry / stats[b].total;
      return accA - accB;
    });

    const rows = topics.map((t) => {
      const s = stats[t];
      const acc = Math.round((s.firstTry / s.total) * 100);
      const label = TOPIC_LABELS[t] || t;
      const helpNote = s.withHelp > 0 ? ` <span class="stats-help">(${s.withHelp} with help)</span>` : "";
      return `
        <tr>
          <td>${label}${helpNote}</td>
          <td>${s.firstTry}/${s.total}</td>
          <td>
            <div class="stats-bar-track"><div class="stats-bar-fill" style="width:${acc}%"></div></div>
          </td>
          <td>${acc}%</td>
        </tr>`;
    }).join("");

    return `
      <table class="stats-table">
        <thead>
          <tr><th>Topic (weakest first)</th><th>First try</th><th>Accuracy</th><th></th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <p class="parent-sub" style="margin-top:0.6rem;">
        “First try” = solved correctly without a hint or the worked solution.
        “With help” = finished after seeing the worked solution (still counts toward the session).
      </p>`;
  }

  function render() {
    const points = PauloSession.getPoints();
    const streak = PauloSession.currentStreak();
    const longest = PauloSession.longestStreak();
    const days = new Set(PauloSession.getSessionDates()).size;
    const settings = PauloSession.getSettings();
    const reached500 = points >= PauloSession.POINTS_MAX;

    panel.innerHTML = `
      <div class="parent-panel">
        <h3>For parents 👨‍👩‍👧</h3>
        <p class="parent-sub">Progress, backups and settings. This stays only on this computer.</p>

        <div class="session-streak" style="margin-bottom:0.8rem;">
          🔥 Current streak: <strong>${streak} day${streak === 1 ? "" : "s"}</strong>
          · Longest: <strong>${longest}</strong>
          · Study days total: <strong>${days}</strong>
          · Points: <strong>${points}/${PauloSession.POINTS_MAX}</strong>
        </div>

        <div class="parent-toolbar">
          <button class="parent-btn parent-btn-primary" id="exportBtn">⬇️ Backup / export</button>
          <button class="parent-btn" id="importBtn">⬆️ Import backup</button>
          <input type="file" id="importFile" accept="application/json" hidden>
          ${reached500 ? '<button class="parent-btn" id="certBtn">🏆 Print certificate</button>' : ""}
          <label class="parent-daylimit">
            <input type="checkbox" id="onePerDayToggle" ${settings.onePerDay ? "checked" : ""}>
            One session per day
          </label>
        </div>

        <h3 style="font-size:0.98rem;">Where Paulo is doing well — and where he needs practice</h3>
        <div id="statsHost">${statsTableHtml()}</div>
      </div>
    `;

    // Export
    panel.querySelector("#exportBtn").addEventListener("click", () => {
      PauloSession.exportData();
      PauloUI.toast("Backup downloaded 💾");
    });

    // Import
    const fileInput = panel.querySelector("#importFile");
    panel.querySelector("#importBtn").addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", async () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        const ok = await PauloUI.confirm(
          "Import this backup? It will replace the current progress on this computer.",
          { title: "Restore backup", okText: "Import", cancelText: "Cancel" }
        );
        if (!ok) { fileInput.value = ""; return; }
        if (PauloSession.importData(parsed)) {
          PauloUI.toast("Backup restored ✅");
          setTimeout(() => location.reload(), 700);
        } else {
          PauloUI.alert("That file doesn't look like a Paulo's Exercises backup.", { title: "Import failed" });
        }
      } catch (e) {
        PauloUI.alert("Could not read that file. Is it a valid backup?", { title: "Import failed" });
      }
      fileInput.value = "";
    });

    // Certificate
    const certBtn = panel.querySelector("#certBtn");
    if (certBtn) {
      certBtn.addEventListener("click", () => {
        PauloUI.showCertificate({
          points: PauloSession.POINTS_MAX,
          sessions: Math.round(PauloSession.POINTS_MAX / PauloSession.POINTS_PER_SESSION),
          streak: PauloSession.longestStreak(),
        });
      });
    }

    // One-per-day toggle
    panel.querySelector("#onePerDayToggle").addEventListener("change", (e) => {
      PauloSession.setSetting("onePerDay", e.target.checked);
      PauloUI.toast(e.target.checked ? "Limited to one session per day" : "Daily limit turned off");
      PauloSession.renderStatusBar();
    });
  }

  document.addEventListener("DOMContentLoaded", render);
})();
