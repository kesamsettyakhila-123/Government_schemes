// ==========================================
// SCHEMESETU - HOME PAGE (index.html)
// Needs data.js and common.js loaded first
// ==========================================

const $ = id => document.getElementById(id);

// 1. POPULAR SCHEMES (links to full pages)
const POPULAR_IDS = ["pm-kisan", "pmjay", "nsp", "pmay-g", "sukanya", "mudra"];

function renderPopular() {
  const grid = $("schemeGrid");
  grid.innerHTML = "";
  POPULAR_IDS.map(getScheme).filter(Boolean).forEach(s => grid.appendChild(schemeCard(s)));
  $("resultCount").textContent = `Showing ${grid.children.length} of ${SCHEMES.length} schemes`;
  $("emptyState").classList.add("hidden");
}
renderPopular();

// 2. SEARCH + CATEGORY -> Explore page
function goExplore() {
  const p = new URLSearchParams();
  const q = $("schemeSearch").value.trim();
  const cat = $("categoryFilter").value;
  if (q) p.set("q", q);
  if (cat && cat !== "all") p.set("category", cat);
  location.href = "schemes.html" + (p.toString() ? "?" + p : "");
}
$("searchBtn").addEventListener("click", goExplore);
$("schemeSearch").addEventListener("keydown", e => { if (e.key === "Enter") goExplore(); });
$("categoryFilter").addEventListener("change", goExplore);
document.querySelectorAll(".category-chip").forEach(btn => {
  btn.addEventListener("click", () => {
    const c = btn.dataset.category;
    location.href = "schemes.html" + (c === "all" ? "" : "?category=" + encodeURIComponent(c));
  });
});
$("clearFilters").addEventListener("click", () => { $("schemeSearch").value = ""; renderPopular(); });

// 3. QUICK ELIGIBILITY -> full Eligibility page
$("eligibilityForm").addEventListener("submit", e => {
  e.preventDefault();
  if (!$("consent").checked) return showToast("Please accept the eligibility disclaimer.");
  const age = Number($("age").value);
  if (!(age >= 1 && age <= 120)) return showToast("Please enter a valid age.");
  // home form stores the UPPER bound of each range; eligibility page uses the LOWER bound
  const lower = { "100000": 0, "200000": 100000, "500000": 200000, "1000000": 500000 };
  const p = new URLSearchParams({
    age, gender: $("gender").value, state: $("state").value,
    income: lower[$("income").value] ?? 0, occupation: $("occupation").value || "Other"
  });
  location.href = "eligibility.html?" + p;
});
$("resetEligibility").addEventListener("click", () => $("eligibilityForm").reset());

// 4. LOGIN / REGISTER (demo - passwords are hashed, but this is still frontend-only)
let authMode = "register";
const authModal = $("authModal");

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function openAuth(mode) {
  authMode = mode;
  const isReg = mode === "register";
  $("authTitle").textContent = isReg ? "Create your account" : "Welcome back";
  $("authDescription").textContent = isReg ? "Save your profile and explore schemes." : "Login to your SchemeSetu account.";
  $("authName").parentElement.classList.toggle("hidden", !isReg);
  $("authName").required = isReg;
  $("authSubmit").textContent = isReg ? "Create account →" : "Login →";
  $("switchAuth").innerHTML = isReg ? 'Already have an account? <button type="button">Login</button>' : 'New user? <button type="button">Create account</button>';
  authModal.classList.remove("hidden");
}
$("loginOpen").addEventListener("click", () => openAuth("login"));
$("registerOpen").addEventListener("click", () => openAuth("register"));
$("switchAuth").addEventListener("click", e => { if (e.target.tagName === "BUTTON") openAuth(authMode === "register" ? "login" : "register"); });

$("authForm").addEventListener("submit", async e => {
  e.preventDefault();
  const name = $("authName").value.trim();
  const email = $("authEmail").value.trim().toLowerCase();
  const hash = await sha256($("authPassword").value);
  const users = JSON.parse(localStorage.getItem("schemeUsers") || "[]");

  if (authMode === "register") {
    if (users.some(u => u.email === email)) return showToast("Email already registered. Please login.");
    users.push({ name, email, hash });
    localStorage.setItem("schemeUsers", JSON.stringify(users));
    showToast("Account created successfully!");
  } else {
    const user = users.find(u => u.email === email && u.hash === hash);
    if (!user) return showToast("Invalid email or password.");
    showToast("Welcome back, " + user.name + "!");
  }
  authModal.classList.add("hidden");
  e.target.reset();
});

// 5. ADMIN DASHBOARD (demo - new schemes appear on all pages in this browser)
function saveCustom(list) { localStorage.setItem("customSchemes", JSON.stringify(list)); }

function updateAdminDashboard() {
  $("adminSchemeCount").textContent = SCHEMES.length;
  const box = $("adminSchemeList");
  box.innerHTML = "";
  const custom = loadCustomSchemes();
  SCHEMES.forEach(s => {
    const row = document.createElement("div");
    row.className = "admin-scheme-row";
    const label = document.createElement("span");
    label.textContent = `${s.name} (${s.category})`;
    row.appendChild(label);
    if (custom.some(c => c.id === s.id)) {
      const del = document.createElement("button");
      del.textContent = "Delete";
      del.addEventListener("click", () => {
        saveCustom(loadCustomSchemes().filter(c => c.id !== s.id));
        SCHEMES.splice(SCHEMES.findIndex(x => x.id === s.id), 1);
        updateAdminDashboard(); renderPopular();
        showToast("Scheme deleted.");
      });
      row.appendChild(del);
    } else {
      const lock = document.createElement("small");
      lock.textContent = "built-in";
      row.appendChild(lock);
    }
    box.appendChild(row);
  });
}
$("adminOpen").addEventListener("click", () => { updateAdminDashboard(); $("adminModal").classList.remove("hidden"); });

$("addSchemeForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("newSchemeName").value.trim();
  const category = $("newSchemeCategory").value;
  if (!name) return;
  if (SCHEMES.some(s => s.name.toLowerCase() === name.toLowerCase())) return showToast("This scheme already exists.");
  const scheme = {
    id: "custom-" + Date.now(), name, category, level: "Central", icon: "📋", tags: [],
    description: "New scheme added by administrator.", benefit: "Please verify benefit details on the official portal.",
    eligibility: ["Please verify eligibility criteria."], documents: ["Please check the official portal."],
    steps: ["Visit the official portal and follow the instructions."],
    link: "https://www.myscheme.gov.in/", rules: {}
  };
  saveCustom(loadCustomSchemes().concat(scheme));
  SCHEMES.push(scheme);
  e.target.reset();
  updateAdminDashboard(); renderPopular();
  showToast("New scheme added successfully!");
});

// 6. MOBILE NAV, MODALS
$("menuToggle").addEventListener("click", () => $("mainNav").classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(l => l.addEventListener("click", () => $("mainNav").classList.remove("open")));
document.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", () => $(b.dataset.close).classList.add("hidden")));
document.querySelectorAll(".modal-backdrop").forEach(bd => bd.addEventListener("click", e => { if (e.target === bd) bd.classList.add("hidden"); }));
document.addEventListener("keydown", e => {
  if (e.key === "Escape") document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.add("hidden"));
});