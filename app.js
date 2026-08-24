
const STUDENT_WORD = "smile";
const TEACHER_WORD = "Bubba604";

function checkAccess() {
  const input = document.getElementById("accessInput").value;

  if (input === STUDENT_WORD) {
    localStorage.setItem("role", "student");
    showApp();

  } else if (input === TEACHER_WORD) {
    localStorage.setItem("role", "teacher");
    showApp();

  } else {
    document.getElementById("errorMsg").style.display = "block";
  }
}

function showApp() {
  const login = document.getElementById("loginScreen");
  const app = document.getElementById("appContent");

  // 👇 SAFETY CHECK (this fixes EVERYTHING)
  if (!login || !app) return;

  login.classList.add("fade-out");

  setTimeout(() => {
    login.style.display = "none";
    app.style.display = "block";
    app.classList.add("fade-in");
  }, 1000);

  applyPermissions();
}

function applyPermissions() {
  const role = localStorage.getItem("role");
  const teacherSections = document.querySelectorAll(".teacher-only");

  teacherSections.forEach(section => {
    section.style.display = (role === "teacher") ? "block" : "none";
  });
}

window.addEventListener("load", () => {
  const role = localStorage.getItem("role");
  if (role) showApp();

  const currentPage = window.location.pathname.split("/").pop();

  const navMap = {
    "index.html": "nav-home",
    "inspiration.html": "nav-inspire",
    "events.html": "nav-events",
    "cliff-notes.html": "nav-cliff",
    "explore.html": "nav-explore",
    "memories.html": "nav-memories"
  };

  // Highlight main pages
  if (navMap[currentPage]) {
    const btn = document.querySelector("." + navMap[currentPage]);
    if (btn) btn.classList.add("active-nav");
  }

  // Highlight Cliff Notes for ALL subpages
  if (currentPage.startsWith("cn-")) {
    const cliffBtn = document.querySelector(".nav-cliff");
    if (cliffBtn) cliffBtn.classList.add("active-nav");
  }

  
});


function logout() {
  localStorage.removeItem("role");

  const app = document.getElementById("appContent");
  const login = document.getElementById("loginScreen");

  if (app && login) {
    app.style.display = "none";

    // ✨ reset animation state
    login.classList.remove("fade-out");

    login.style.display = "flex";
  } else {
    window.location.href = "index.html";
  }
}

function highlightText(text, searchTerm) {
    if (!searchTerm) return text;

    const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, "gi");

    // const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, '<span class="highlight">$1</span>');
}

function formatTags(tags,input) {

    if(!tags) return "";

    const shown = tags
      .slice(0,5)
      .map(tag => `
        <span class="tag-pill">
            ${highlightText(tag,input)}
        </span>
      `)
      .join("");

    const extra =
      tags.length > 5
        ? `<span class="tag-pill">+${tags.length-5}</span>`
        : "";

    return shown + extra;

  }



