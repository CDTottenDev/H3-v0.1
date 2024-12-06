document.addEventListener("DOMContentLoaded", function () {
  // Add click handlers to all image cards
  const imageCards = document.querySelectorAll(".image-card");
  imageCards.forEach((card) => {
    card.addEventListener("click", function () {
      const projectId = this.getAttribute("data-project-id");
      if (projectId) {
        openProjectPage(projectId);
      }
    });
  });
});
