import { initNavbar } from "./components/navbar.js";
import { initSmoothScroll } from "./components/smoothScroll.js";
import {
  initServiceCardObserver,
  initProjectCardObserver,
  initTestimonialCardObserver,
} from "./utils/observers.js";

const BASE_URL = window.location.origin;
const COMPONENT_PATH = "/components";

async function loadComponents() {
  try {
    const components = [
      {
        id: "navbar-container",
        file: "components/navbar.html",
        callback: initNavbar,
      },
      { id: "popupContainer", file: "components/contactform.html" },
      {
        id: "hero-container",
        file: "components/hero.html",
        callback: setupEstimateButton,
      },
      {
        id: "services",
        file: "components/services.html",
        callback: initServiceCardObserver,
      },
      {
        id: "projects",
        file: "components/projects.html",
        callback: initProjectCardObserver,
      },
      { id: "about", file: "components/about.html" },
      {
        id: "testimonials",
        file: "components/testimonials.html",
        callback: initTestimonialCardObserver,
      },
      { id: "footer", file: "components/footer.html" },
    ];

    for (const component of components) {
      const response = await fetch(component.file);
      const html = await response.text();
      document.getElementById(component.id).innerHTML = html;
      if (component.callback) {
        component.callback();
      }
    }
  } catch (error) {
    console.error("Error loading components:", error);
  }
}

function setupEstimateButton() {
  const estimateBtn = document.getElementById("estimateBtn");
  const popupForm = document.querySelector(".popup-form");
  const closeBtn = document.getElementById("closePopupBtn");

  if (estimateBtn && popupForm && closeBtn) {
    estimateBtn.addEventListener("click", () => {
      popupForm.style.transform = "translateY(0)";
    });

    closeBtn.addEventListener("click", () => {
      popupForm.style.transform = "translateY(-100vh)";
    });
  } else {
    console.error("Required elements not found");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponents();
});
