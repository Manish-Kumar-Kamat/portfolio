// Animate sections on scroll
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    section.setAttribute("data-animate", "");
    observer.observe(section);
  });

  // Smooth scroll for internal links
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link[href^='#']");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  // Highlight nav link on scroll
  window.addEventListener("scroll", () => {
    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });

  // Typing animation for name
  const nameEl = document.querySelector(".typing-name");
  const fullText = nameEl?.dataset.text || "";
  let i = 0;

  function type() {
    if (i < fullText.length) {
      nameEl.textContent += fullText.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  }

  if (nameEl) {
    nameEl.textContent = "";
    type();
  }
});

