export function initCategoryFilter() {
  const checkboxes = document.querySelectorAll('input[name="category"]');
  const imageCards = document.querySelectorAll(".image-card");

  function updateVisibility() {
    const selectedCategories = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    // If no categories are selected, show all cards
    if (selectedCategories.length === 0) {
      imageCards.forEach((card) => (card.style.display = "block"));
      return;
    }

    imageCards.forEach((card) => {
      // Safely get categories, defaulting to empty array if attribute is missing
      const cardCategories = card.dataset.categories
        ? card.dataset.categories.split(",").map((c) => c.trim())
        : [];

      // Show card if it matches any selected category
      const isVisible = cardCategories.some((category) =>
        selectedCategories.includes(category)
      );

      card.style.display = isVisible ? "block" : "none";
    });
  }

  // Add event listeners to checkboxes
  checkboxes.forEach((checkbox) =>
    checkbox.addEventListener("change", updateVisibility)
  );

  // Add click handler for carousel triggers
  document.querySelectorAll(".carousel-trigger").forEach((img) => {
    img.addEventListener("click", async (e) => {
      e.preventDefault();
      const targetId = img.getAttribute("popovertarget");
      const carousel = document.getElementById(targetId);
      if (carousel) {
        carousel.showPopover();
        // Add a small delay to ensure DOM is updated
        setTimeout(() => {
          const container = carousel.querySelector(".carouselcontainer");
          if (container && !container.dataset.initialized) {
            initProjectGalleryCarousel(carousel);
          }
        }, 100);
      }
    });
  });

  // Initial visibility check
  updateVisibility();
}
