// ==========================================
// SCHEMESETU - SHARED HELPERS (all pages)
// ==========================================

function esc(text) {
  const d = document.createElement("div");
  d.textContent = text == null ? "" : String(text);
  return d.innerHTML.replace(/"/g, "&quot;");
}

function safeUrl(url) {
  return /^https?:\/\//i.test(url) ? url : "https://www.myscheme.gov.in/";
}

// ---- toast ----
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast"; toast.className = "toast"; toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

// ---- saved schemes (stored in this browser) ----
function getSaved() {
  try { return JSON.parse(localStorage.getItem("savedSchemes") || "[]"); } catch (e) { return []; }
}
function isSaved(id) { return getSaved().includes(id); }
function toggleSaved(id) {
  let list = getSaved();
  list = list.includes(id) ? list.filter(x => x !== id) : list.concat(id);
  localStorage.setItem("savedSchemes", JSON.stringify(list));
  updateSavedCount();
  return list.includes(id);
}
function updateSavedCount() {
  const el = document.getElementById("savedCount");
  if (el) el.textContent = getSaved().length;
}

// ---- scheme card (used on Home and Explore pages) ----
function schemeCard(s) {
  const card = document.createElement("article");
  card.className = "scheme-card";
  const where = s.level === "State" ? s.state : "Central";
  card.innerHTML = `
    <div class="scheme-card-top">
      <div class="scheme-icon">${esc(s.icon || "📋")}</div>
      <div class="badges"><span class="scheme-tag">${esc(s.category)}</span><span class="level-tag ${s.level === "State" ? "state" : ""}">${esc(where)}</span></div>
    </div>
    <h3>${esc(s.name)}</h3>
    <p>${esc(s.description)}</p>
    <div class="scheme-benefit"><small>KEY BENEFIT</small>${esc(s.benefit)}</div>
    <div class="scheme-card-foot">
      <a class="details-link" href="scheme.html?id=${encodeURIComponent(s.id)}">View details →</a>
      <a href="${esc(safeUrl(s.link))}" target="_blank" rel="noopener noreferrer">Official site ↗</a>
    </div>`;
  return card;
}

// ---- header + footer for inner pages ----
(function mountChrome() {
  const head = document.getElementById("site-header");
  const foot = document.getElementById("site-footer");
  if (head) {
    const active = head.dataset.active || "";
    const cls = n => "nav-link" + (n === active ? " active" : "");
    head.innerHTML = `
      <div class="topline"><div class="container top-inner"><span>भारत सरकार • Government Scheme Information Portal</span><span class="top-right">Always confirm details on the official portal</span></div></div>
      <header class="site-header"><div class="container nav-wrap">
        <a class="brand" href="index.html" aria-label="SchemeSetu home"><span class="brand-mark">S</span><span><b>SchemeSetu</b><small>Know your benefits. Take the next step.</small></span></a>
        <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation">☰</button>
        <nav id="mainNav">
          <a href="index.html" class="${cls("home")}">Home</a>
          <a href="schemes.html" class="${cls("schemes")}">Explore Schemes</a>
          <a href="eligibility.html" class="${cls("eligibility")}">Eligibility</a>
          <a href="schemes.html?saved=1" class="${cls("saved")}">Saved (<span id="savedCount">0</span>)</a>
          <a class="btn btn-primary btn-small" href="eligibility.html">Check eligibility →</a>
        </nav></div></header>`;
    document.getElementById("menuToggle").addEventListener("click", () => document.getElementById("mainNav").classList.toggle("open"));
  }
  if (foot) {
    foot.innerHTML = `
      <footer><div class="container footer-main">
        <div class="brand footer-brand"><span class="brand-mark">S</span><span><b>SchemeSetu</b><small>Know your benefits. Take the next step.</small></span></div>
        <div class="footer-links"><a href="index.html">Home</a><a href="schemes.html">Schemes</a><a href="eligibility.html">Eligibility</a><a href="https://www.myscheme.gov.in/" target="_blank" rel="noopener noreferrer">myScheme ↗</a></div>
        <div class="footer-note">An educational project prototype<br>Not an official government website.</div>
      </div><div class="container footer-bottom"><span>© 2026 SchemeSetu. Community awareness initiative.</span><span>Information must be verified with the concerned department.</span></div></footer>`;
  }
  updateSavedCount();
})();