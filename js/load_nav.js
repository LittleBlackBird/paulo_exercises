// ---------- NAVIGATION BAR (ALL PAGES) ----------
async function loadNav() {
    try {
      const response = await fetch("nav_bar.html");
      const html = await response.text();
      document.getElementById("nav_bar").innerHTML = html;
  
      initThemeToggle(); // ✅ nav is now in DOM
    } catch (error) {
      console.error("Error loading navbar:", error);
    }
  }
  
  function initThemeToggle() {
    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;
  
    const saved = localStorage.getItem("theme") || "dark";
    document.body.setAttribute("data-theme", saved);
    toggle.checked = saved === "dark";
  
    toggle.addEventListener("change", () => {
      const mode = toggle.checked ? "dark" : "light";
      document.body.setAttribute("data-theme", mode);
      localStorage.setItem("theme", mode);
    });
  }
  
  loadNav();
  