// ----------------------
// LOADING SCREEN
// ----------------------
window.addEventListener("load", () => {
  const loading = document.getElementById("loading-screen");
  const icons = document.querySelectorAll(".hidden");

  let delay = 300;

  icons.forEach((el) => {
    setTimeout(() => {
      el.classList.remove("hidden");
      el.classList.add("show");
    }, delay);
    delay += 300;
  });

  // Hide loading screen
  setTimeout(() => {
    loading.style.opacity = "0";
    setTimeout(() => {
      loading.style.display = "none";
    }, 500);
  }, 2000);
});

// ----------------------
// NAVIGATION ACTIVE HIGHLIGHT
// ----------------------
const navLinks = document.querySelectorAll(".ul-list li");

navLinks.forEach((li) => {
  li.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    li.classList.add("active");
  });
});

// ----------------------
// SMOOTH SCROLL
// ----------------------
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// ----------------------
// PROJECT CARD CLICK HANDLER
// ----------------------
function openProject(projectName) {
  alert("Opening project: " + projectName);
}
