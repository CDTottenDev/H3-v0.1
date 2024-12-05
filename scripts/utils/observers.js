import { initCategoryFilter } from "./categoryFilter.js";

const createIntersectionObserver = (
  selector,
  className = "visible",
  threshold = 0.1,
  rootMargin = "0px"
) => {
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) {
    return null;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
        }
      });
    },
    {
      threshold,
      rootMargin,
    }
  );

  elements.forEach((element) => observer.observe(element));
  return observer;
};

export const initServiceCardObserver = () => {
  createIntersectionObserver(".service-card", "visible", 0.1, "50px");
};

export const initProjectCardObserver = () => {
  createIntersectionObserver(".project-card", "visible", 0.1, "50px");
};

export const initTestimonialCardObserver = () => {
  createIntersectionObserver(".testimonial-card", "visible", 0.1, "50px");
};

export const initPageBreakObserver = () => {
  createIntersectionObserver(".page-break-2", "visible", 0, "50px");
};

export const initGalleryObserver = () => {
  createIntersectionObserver(".gallery-item", "visible", 0.1, "50px");
};

export const initProjectGalleryObserver = () => {
  const projectsGallery = document.getElementById("projectsgallery");
  if (!projectsGallery) return;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        initCategoryFilter();

        // We don't need to initialize carousels here anymore
        // as they will be initialized when loaded
      }
    });
  });

  observer.observe(projectsGallery, {
    childList: true,
    subtree: true,
  });
};

export const initAllObservers = () => {
  initServiceCardObserver();
  initProjectCardObserver();
  initTestimonialCardObserver();
  initPageBreakObserver();
  initGalleryObserver();
  initProjectGalleryObserver();
  initCategoryFilter();
};
