
const STUDENT_WORD = "circle";
const TEACHER_WORD = "luminary";

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

  if (login && app) {
    login.style.display = "none";
    app.style.display = "block";
  }

  applyPermissions();
}

function applyPermissions() {
  const role = localStorage.getItem("role");
  const teacherSections = document.querySelectorAll(".teacher-only");

  teacherSections.forEach(section => {
    section.style.display = (role === "teacher") ? "block" : "none";
  });
}

function logout() {
  localStorage.removeItem("role");

  const app = document.getElementById("appContent");
  const login = document.getElementById("loginScreen");

  if (app && login) {
    app.style.display = "none";
    login.style.display = "flex";
  } else {
    window.location.href = "index.html";
  }
}

window.onload = function () {
  const role = localStorage.getItem("role");

  if (role) {
    showApp();
  }
};

