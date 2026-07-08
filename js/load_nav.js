// ---------- NAVIGATION BAR (ALL PAGES) ----------
async function loadNav() {
  try {
    const response = await fetch("nav_bar.html");
    const html = await response.text();
    document.getElementById("nav_bar").innerHTML = html;

    highlightActiveLink(); // show which page we're on
    initThemeToggle();     // nav is now in the DOM
  } catch (error) {
    console.error("Error loading navbar:", error);
  }
}

// Add .is-active to the link for the current page.
function highlightActiveLink() {
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".app-nav .nav-link").forEach((a) => {
    const target = (a.getAttribute("href") || "").toLowerCase();
    if (target === here || (here === "" && target === "index.html")) {
      a.classList.add("is-active");
      a.setAttribute("aria-current", "page");
    }
  });
}

function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  // Bright "day" theme is the default for kids; night mode is opt-in.
  const saved = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", saved);
  toggle.checked = saved === "dark";

  toggle.addEventListener("change", () => {
    const mode = toggle.checked ? "dark" : "light";
    document.body.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
  });
}

// Apply the saved theme immediately (before nav loads) to avoid a flash.
(function () {
  const saved = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", saved);
})();

loadNav();
