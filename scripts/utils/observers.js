const createIntersectionObserver = (selector, className = "visible") => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
        }
      });
    },
    { threshold: 0.1 }
  );

  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => observer.observe(element));
};

export const initServiceCardObserver = () => {
  createIntersectionObserver(".service-card");
};

export const initProjectCardObserver = () => {
  createIntersectionObserver(".project-card");
};

export const initTestimonialCardObserver = () => {
  createIntersectionObserver(".testimonial-card");
};
