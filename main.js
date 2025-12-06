/* ============================
   PORTFOLIO MAIN JAVASCRIPT
   ============================ */

// ===== Smooth Scroll Navigation + Active Link Highlight =====
const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80,
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

// ===== Reveal Animation + Back to Top + Scroll Detection =====
const revealElements = document.querySelectorAll(
  '.home-container, .about-section, .projects-container, .contact-content'
);

revealElements.forEach(el => el.classList.add('reveal'));

// Back to top button
const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #6AA47F;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
`;

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  // Show / Hide back to top button
  backToTop.style.display = window.scrollY > 500 ? "flex" : "none";

  // Reveal elements on scroll
  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;
    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active-reveal');
    }
  });
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

// ===== Typing Animation =====
const typingElement = document.querySelector('.info-home h3');
const words = ["State-Certified Software Engineer", "Web Development", "Salesforce & DevOps"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  const currentWord = words[wordIndex];
  const displayedText = currentWord.substring(0, charIndex);

  typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, typingSpeed);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, typingSpeed / 2);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 1000);
  }
}

document.addEventListener('DOMContentLoaded', type);

// ===== Loading Screen Animation =====
document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay = 0) {
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);
  showElement(mainIcon, 800);
  subIcons.forEach((icon, idx) => showElement(icon, 1600 + idx * 400));
  showElement(designerText, 2800);

  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => loadingScreen.style.display = 'none', 500);
  }, 4000);
});

// ===== Project Modals & Carousel =====
const projectSlides = {
    stages: ["images/stages1.png","images/stages2.png","images/stages3.png"], // <-- ajouté
  nasa: ["images/nasa1.png","images/nasa2.png","images/nasa3.png"],
  gym: ["images/gym1.png","images/gym2.png","images/gym3.png"],
  logima: ["images/logima1.png","images/logima2.png","images/logima3.png"],
  rmi: ["images/rmi1.png","images/rmi2.png"],
  iot: ["images/iot1.png","images/iot2.png"],
  osiris: ["images/osiris1.png","images/osiris2.png"],
  location: ["images/location1.png","images/location2.png"],
  vol: ["images/vol1.png","images/vol2.png"],
  airbooking: ["images/airbooking1.png","images/airbooking2.png"]
};
let currentOpenModal = null;

function openProject(modalId) {
    // si déjà open, ne rien faire
    if (currentOpenModal === modalId) return;

    // close l'ancien si kayn
    if (currentOpenModal) {
        closeProject(currentOpenModal);
    }

    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        currentOpenModal = modalId;
    }
}

function closeProject(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
        if (currentOpenModal === modalId) currentOpenModal = null;
    }
}

// optional: click outside to close
window.onclick = function(event) {
    if (currentOpenModal) {
        const modal = document.getElementById(currentOpenModal);
        if (event.target === modal) {
            closeProject(currentOpenModal);
        }
    }
}

const currentSlideIndex = {};
Object.keys(projectSlides).forEach(key => currentSlideIndex[key] = 0);

function openProject(projectId) {
  const modal = document.getElementById(projectId + 'Modal');
  if (modal) {
    modal.style.display = 'block';
    modal.classList.add('fade-in');
    updateCarousel(projectId);
  }
}

function closeProject(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('fade-in');
    modal.classList.add('fade-out');
    setTimeout(() => modal.style.display = 'none', 300);
  }
}

function updateCarousel(project) {
  const carouselDiv = document.getElementById(project + 'Carousel');
  if (!carouselDiv) return;

  const slides = carouselDiv.querySelectorAll('img');
  slides.forEach((img, idx) => {
    img.style.display = idx === currentSlideIndex[project] ? 'block' : 'none';
  });
}

function changeSlide(project, n) {
  const slides = document.querySelectorAll(`#${project}Carousel img`);
  if (!slides.length) return;

  slides[currentSlideIndex[project]].style.display = 'none';
  currentSlideIndex[project] += n;

  if (currentSlideIndex[project] < 0) currentSlideIndex[project] = slides.length - 1;
  if (currentSlideIndex[project] >= slides.length) currentSlideIndex[project] = 0;

  slides[currentSlideIndex[project]].style.display = 'block';
}


// Close modal when clicking outside content
window.addEventListener('click', function (e) {
  document.querySelectorAll('.project-modal').forEach(modal => {
    if (e.target === modal) closeProject(modal.id);
  });
});
