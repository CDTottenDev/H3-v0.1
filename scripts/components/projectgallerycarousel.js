export function initProjectGalleryCarousel(popover = null) {
  // Add console logs for debugging
  console.log("Initializing carousel for:", popover?.id);

  const containers = popover
    ? popover.querySelectorAll(".carouselcontainer")
    : document.querySelectorAll(".carouselcontainer");

  console.log("Found containers:", containers.length);

  if (!containers.length) {
    console.warn("No carousel containers found");
    return;
  }

  containers.forEach((container) => {
    // Only initialize if not already initialized
    if (container.dataset.initialized) {
      console.log("Container already initialized");
      return;
    }

    const galleryWheel = container.querySelector(".gallery-wheel");
    const galleryItems = container.querySelectorAll(".gallery-item");
    const focusedImage = container.querySelector(".focused-image");
    const prevButton = container.querySelector(".nav-arrow.prev");
    const nextButton = container.querySelector(".nav-arrow.next");
    const closeBtn = container.querySelector(".close-btn");
    const carousel = container.closest(".project-gallery");

    console.log("Gallery elements:", {
      wheel: galleryWheel,
      items: galleryItems.length,
      focusedImage: focusedImage,
    });

    if (!galleryWheel || !galleryItems.length) {
      console.error("Gallery elements not found in container:", container);
      console.log("Gallery wheel:", galleryWheel);
      console.log("Gallery items:", galleryItems);
      return;
    }

    let currentIndex = 0;
    const itemWidth = 320; // Width + gap

    // Clear existing clones first
    galleryWheel
      .querySelectorAll(".gallery-item.clone")
      .forEach((clone) => clone.remove());

    // Clone items for infinite scroll
    galleryItems.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.classList.add("clone");
      galleryWheel.appendChild(clone);
    });

    function updateGalleryPosition(index, smooth = true) {
      const offset = -(index * itemWidth);
      galleryWheel.style.transition = smooth ? "transform 0.5s ease" : "none";
      galleryWheel.style.transform = `translateX(calc(${offset}px - 50% + ${
        itemWidth / 2
      }px))`;

      // Update active states
      const items = container.querySelectorAll(".gallery-item");
      const originalIndex = index % galleryItems.length;
      items[originalIndex]?.classList.add("active");
      items[originalIndex + galleryItems.length]?.classList.add("active");
    }

    function updateFocusedImage(index) {
      if (!focusedImage) return;

      const originalIndex = index % galleryItems.length;
      const targetImage = galleryItems[originalIndex]?.querySelector("img");

      if (!targetImage) return;

      focusedImage.style.transition = "opacity 0.3s ease";
      focusedImage.style.opacity = "0";

      setTimeout(() => {
        focusedImage.src = targetImage.src;
        focusedImage.style.opacity = "1";
      }, 300);

      currentIndex = originalIndex;
      updateGalleryPosition(originalIndex);
    }

    // Initialize navigation
    if (prevButton) {
      prevButton.addEventListener("click", (e) => {
        e.stopPropagation();
        const newIndex =
          (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateFocusedImage(newIndex);
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", (e) => {
        e.stopPropagation();
        const newIndex = (currentIndex + 1) % galleryItems.length;
        updateFocusedImage(newIndex);
      });
    }

    // Handle close button
    if (closeBtn && carousel) {
      closeBtn.addEventListener("click", () => {
        if (carousel.hidePopover) {
          carousel.hidePopover();
        }
      });
    }

    // Initialize
    updateFocusedImage(0);

    // Handle infinite scroll transition reset
    galleryWheel.addEventListener("transitionend", () => {
      if (currentIndex === -1) {
        currentIndex = galleryItems.length - 1;
        updateGalleryPosition(currentIndex, false);
      } else if (currentIndex === galleryItems.length) {
        currentIndex = 0;
        updateGalleryPosition(currentIndex, false);
      }
    });

    // Add event delegation to handle image clicks in the projectsgallery
    const projectsGallery = document.getElementById("projectsgallery");

    if (!projectsGallery || !carousel) return;

    // Handle carousel closing
    carousel.addEventListener("beforetoggle", (e) => {
      if (e.newState === "closed") {
        // Reset carousel state if needed
        currentIndex = 0;
        updateGalleryPosition(0, false);
      }
    });

    // Ensure carousel closes when outer popover closes
    projectsGallery.addEventListener("beforetoggle", (e) => {
      if (e.newState === "closed" && carousel.matches(":popover-open")) {
        carousel.hidePopover();
      }
    });

    // Mark as initialized
    container.dataset.initialized = "true";
  });

  // // Move the click handler outside the forEach loop
  // const projectsGallery = document.getElementById("projectsgallery");
  // if (projectsGallery && !projectsGallery.dataset.hasClickHandler) {
  //   projectsGallery.addEventListener("click", (e) => {
  //     const imgWithPopover = e.target.closest("img[popovertarget]");
  //     if (imgWithPopover && projectsGallery.matches(":popover-open")) {
  //       const targetId = imgWithPopover.getAttribute("popovertarget");
  //       const targetCarousel = document.getElementById(targetId);
  //       if (targetCarousel) {
  //         targetCarousel.showPopover();
  //       }
  //     }
  //   });
  //   projectsGallery.dataset.hasClickHandler = "true";
  // }
}
