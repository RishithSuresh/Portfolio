// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Contact form handling
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get("name");

    // Show success message
    formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
    formStatus.style.color = "var(--success)";

    // Reset form
    contactForm.reset();

    // Clear message after 5 seconds
    setTimeout(() => {
      formStatus.textContent = "";
    }, 5000);
  });
}

// Scroll animation for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, observerOptions);

// Observe project cards and skill items
document.querySelectorAll(".project-card, .skill-category").forEach((el) => {
  el.classList.add("fade-in-element");
  observer.observe(el);
});

// Add scroll event for navbar styling
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
