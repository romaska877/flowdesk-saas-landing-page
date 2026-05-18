const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");
const billingToggle = document.getElementById("billingToggle");
const priceElements = document.querySelectorAll(".price");
const faqItems = document.querySelectorAll(".faq-item");
const signupForm = document.getElementById("signupForm");
const emailInput = document.getElementById("emailInput");
const formMessage = document.getElementById("formMessage");
const revealElements = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav-link");
const pageSections = document.querySelectorAll("section[id]");
const counters = document.querySelectorAll(".counter");
const backToTop = document.getElementById("backToTop");
const filterButtons = document.querySelectorAll(".filter-btn");
const featureCards = document.querySelectorAll(".feature-card");
let countersStarted = false;

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  if (navMenu.classList.contains("active")) {
    menuToggle.textContent = "×";
  } else {
    menuToggle.textContent = "☰";
  }
});

navMenu.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    navMenu.classList.remove("active");
    menuToggle.textContent = "☰";
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "Light";
  } else {
    themeToggle.textContent = "Dark";
  }
});

let yearlyBilling = false;

billingToggle.addEventListener("click", () => {
  yearlyBilling = !yearlyBilling;
  billingToggle.classList.toggle("yearly");

  priceElements.forEach((price) => {
    const monthlyPrice = price.dataset.monthly;
    const yearlyPrice = price.dataset.yearly;

    if (yearlyBilling) {
      price.textContent = `£${yearlyPrice}`;
    } else {
      price.textContent = `£${monthlyPrice}`;
    }
  });
});

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const icon = question.querySelector("span");

  question.addEventListener("click", () => {
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
        otherItem.querySelector("span").textContent = "+";
      }
    });

    item.classList.toggle("active");

    if (item.classList.contains("active")) {
      icon.textContent = "−";
    } else {
      icon.textContent = "+";
    }
  });
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();

  if (email === "") {
    formMessage.textContent = "Please enter your email address.";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    formMessage.textContent = "Please enter a valid email address.";
    return;
  }

  formMessage.textContent = "Success! Your free trial request has been received.";
  emailInput.value = "";
});

function formatCounterValue(value) {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "m";
  }

  if (value >= 1000) {
    return Math.floor(value / 1000) + "k";
  }

  return value;
}

function startCounters() {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || "";
    const duration = 1500;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    let current = 0;

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        counter.textContent = formatCounterValue(target) + suffix;
        clearInterval(timer);
      } else {
        counter.textContent = formatCounterValue(Math.floor(current)) + suffix;
      }
    }, stepTime);
  });
}

function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 80) {
      element.classList.add("show");
    }
  });

  const statsSection = document.querySelector(".stats");

  if (statsSection && !countersStarted) {
    const statsTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (statsTop < windowHeight - 80) {
      countersStarted = true;
      startCounters();
    }
  }
}

function updateActiveNavLink() {
  let currentSectionId = "";

  pageSections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
}

function toggleBackToTopButton() {
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    featureCards.forEach((card) => {
      const cardCategory = card.dataset.category;

      if (selectedFilter === "all" || selectedFilter === cardCategory) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
window.addEventListener("scroll", () => {
  revealOnScroll();
  updateActiveNavLink();
  toggleBackToTopButton();
});

window.addEventListener("load", () => {
  revealOnScroll();
  updateActiveNavLink();
  toggleBackToTopButton();
});

revealOnScroll();
updateActiveNavLink();