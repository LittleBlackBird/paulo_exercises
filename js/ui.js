// =========================================================
// SHARED UI (js/ui.js)
//
// In-page modals, toasts and the printable certificate — used
// everywhere instead of the browser's native alert()/confirm(),
// which look jarring (especially for the celebration moment).
//
// Public API:
//   PauloUI.alert(message, {title})            -> Promise (resolves on OK)
//   PauloUI.confirm(message, {title, okText, cancelText}) -> Promise<boolean>
//   PauloUI.modal({title, html, buttons})      -> Promise (resolves with button value)
//   PauloUI.toast(message)                     -> small auto-dismissing note
//   PauloUI.showCertificate({points, sessions, streak}) -> printable award
// =========================================================

const PauloUI = (() => {
  function ensureRoot() {
    let root = document.getElementById("pauloModalRoot");
    if (!root) {
      root = document.createElement("div");
      root.id = "pauloModalRoot";
      document.body.appendChild(root);
    }
    return root;
  }

  // Generic modal. `buttons` is an array of { label, value, kind }.
  function modal({ title = "", html = "", buttons = [{ label: "OK", value: true, kind: "primary" }], dismissible = true } = {}) {
    return new Promise((resolve) => {
      const root = ensureRoot();

      const overlay = document.createElement("div");
      overlay.className = "paulo-modal-overlay";

      const card = document.createElement("div");
      card.className = "paulo-modal-card";
      card.setAttribute("role", "dialog");
      card.setAttribute("aria-modal", "true");

      card.innerHTML = `
        ${title ? `<h3 class="paulo-modal-title">${title}</h3>` : ""}
        <div class="paulo-modal-body">${html}</div>
        <div class="paulo-modal-actions"></div>
      `;

      const actions = card.querySelector(".paulo-modal-actions");

      function close(value) {
        overlay.classList.remove("is-open");
        setTimeout(() => overlay.remove(), 180);
        document.removeEventListener("keydown", onKey);
        resolve(value);
      }

      buttons.forEach((b) => {
        const btn = document.createElement("button");
        btn.className = "paulo-modal-btn " + (b.kind === "primary" ? "paulo-modal-btn-primary" : "paulo-modal-btn-ghost");
        btn.textContent = b.label;
        btn.addEventListener("click", () => close(b.value));
        actions.appendChild(btn);
      });

      function onKey(e) {
        if (e.key === "Escape" && dismissible) close(undefined);
        if (e.key === "Enter") {
          const primary = buttons.find((b) => b.kind === "primary") || buttons[buttons.length - 1];
          if (primary) close(primary.value);
        }
      }

      overlay.addEventListener("click", (e) => {
        if (e.target === overlay && dismissible) close(undefined);
      });

      overlay.appendChild(card);
      root.appendChild(overlay);
      document.addEventListener("keydown", onKey);

      // trigger transition
      requestAnimationFrame(() => overlay.classList.add("is-open"));
      const firstBtn = actions.querySelector(".paulo-modal-btn-primary") || actions.querySelector(".paulo-modal-btn");
      if (firstBtn) firstBtn.focus();
    });
  }

  function alert(message, { title = "" } = {}) {
    return modal({
      title,
      html: `<p>${message}</p>`,
      buttons: [{ label: "OK", value: true, kind: "primary" }],
    });
  }

  function confirm(message, { title = "", okText = "OK", cancelText = "Cancel" } = {}) {
    return modal({
      title,
      html: `<p>${message}</p>`,
      buttons: [
        { label: cancelText, value: false, kind: "ghost" },
        { label: okText, value: true, kind: "primary" },
      ],
    }).then((v) => v === true);
  }

  // Small toast that fades out on its own.
  function toast(message, ms = 2600) {
    const root = ensureRoot();
    let host = document.getElementById("pauloToastHost");
    if (!host) {
      host = document.createElement("div");
      host.id = "pauloToastHost";
      host.className = "paulo-toast-host";
      root.appendChild(host);
    }
    const t = document.createElement("div");
    t.className = "paulo-toast";
    t.textContent = message;
    host.appendChild(t);
    requestAnimationFrame(() => t.classList.add("is-open"));
    setTimeout(() => {
      t.classList.remove("is-open");
      setTimeout(() => t.remove(), 220);
    }, ms);
  }

  // Printable certificate shown when Paulo reaches 500 points.
  function showCertificate({ points = 500, sessions = 10, streak = 0, date = new Date() } = {}) {
    const dateLabel = date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    const streakLine = streak > 1
      ? `<p class="cert-streak">Longest study streak: <strong>${streak} days</strong> 🔥</p>`
      : "";

    const html = `
      <div class="certificate" id="pauloCertificate">
        <div class="cert-inner">
          <div class="cert-star">🏆</div>
          <p class="cert-kicker">Certificate of Achievement</p>
          <h2 class="cert-name">Paulo</h2>
          <p class="cert-text">
            has completed <strong>${sessions} study sessions</strong> and reached
            <strong>${points} points</strong> in Paulo's Exercises.
          </p>
          <p class="cert-text">Great focus, discipline and effort! 🌟</p>
          ${streakLine}
          <p class="cert-date">${dateLabel}</p>
          <div class="cert-sign">
            <span class="cert-sign-line">Signed by a proud grown-up</span>
          </div>
        </div>
      </div>
    `;

    return modal({
      title: "You did it, Paulo! 🎉",
      html,
      dismissible: true,
      buttons: [
        { label: "Close", value: "close", kind: "ghost" },
        { label: "🖨️ Print certificate", value: "print", kind: "primary" },
      ],
    }).then((v) => {
      if (v === "print") {
        document.body.classList.add("printing-certificate");
        // Rebuild the certificate directly in the page for printing,
        // because the modal will already be closing.
        const printHost = document.createElement("div");
        printHost.className = "cert-print-host";
        printHost.innerHTML = html;
        document.body.appendChild(printHost);
        window.print();
        setTimeout(() => {
          document.body.classList.remove("printing-certificate");
          printHost.remove();
        }, 500);
      }
    });
  }

  return { modal, alert, confirm, toast, showCertificate };
})();
