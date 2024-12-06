export function initCategoryFilter() {
  const checkboxes = document.querySelectorAll('input[name="category"]');
  const imageCards = document.querySelectorAll(".image-card");

  // Debug logging
  console.log("Found checkboxes:", checkboxes.length);
  console.log("Found image cards:", imageCards.length);

  function updateVisibility() {
    const selectedCategories = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    console.log("Selected categories:", selectedCategories);

    if (selectedCategories.length === 0) {
      imageCards.forEach((card) => (card.style.display = "block"));
      return;
    }

    imageCards.forEach((card) => {
      const cardCategories = (card.dataset.categories || "")
        .split(",")
        .map((c) => c.trim());
      const isVisible = cardCategories.some((category) =>
        selectedCategories.includes(category)
      );

      card.style.display = isVisible ? "block" : "none";
    });
  }

  // Add event listeners to checkboxes
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateVisibility);
    // Debug logging
    console.log("Added listener to:", checkbox.value);
  });

  // Initial visibility check
  updateVisibility();
}
