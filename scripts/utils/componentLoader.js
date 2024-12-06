import { CONFIG } from "./config.js";
import { initProjectGalleryCarousel } from "../components/projectgallerycarousel.js";

// Add this helper function at the top
function isPopoverSupported() {
  return HTMLElement.prototype.hasOwnProperty("showPopover");
}

export async function loadEssentialComponents(components) {
  const loadPromises = components.map(async ({ id, file }) => {
    const element = document.getElementById(id);
    if (!element) {
      // Create the element if it doesn't exist
      const newElement = document.createElement("div");
      newElement.id = id;
      document.body.appendChild(newElement);
    }

    try {
      const response = await fetch(`${CONFIG.COMPONENT_PATH}/${file}`);
      const html = await response.text();
      document.getElementById(id).innerHTML = html;
    } catch (error) {
      console.error(`Failed to load component ${file}:`, error);
    }
  });

  await Promise.all(loadPromises);
}

export async function loadComponents() {
  const essentialComponents = [
    { id: "background-logo-container", file: "backgndlogo.html" },
    { id: "navbar-container", file: "navbar.html" },
    { id: "hero-container", file: "hero.html" },
    { id: "page-break", file: "pagebrk.html" },
    { id: "services", file: "services.html" },
    { id: "page-break-2", file: "pagebrk2.html" },
    { id: "projects", file: "projects.html" },
    { id: "about", file: "about.html" },
    { id: "testimonials", file: "testimonials.html" },
    { id: "footer", file: "footer.html" },
  ];

  await loadEssentialComponents(essentialComponents);

  setTimeout(() => {
    initLazyPopovers();
  }, 100);
}

function showElement(element) {
  try {
    if (isPopoverSupported() && element.matches("[popover]")) {
      element.showPopover();
    } else {
      element.style.display = "block";
      element.classList.add("fallback-open");
    }
  } catch (error) {
    console.log("Fallback to basic display");
    element.style.display = "block";
    element.classList.add("fallback-open");
  }
}

function hideElement(element) {
  try {
    if (isPopoverSupported() && element.matches("[popover]")) {
      element.hidePopover();
    } else {
      element.style.display = "none";
      element.classList.remove("fallback-open");
    }
  } catch (error) {
    element.style.display = "none";
    element.classList.remove("fallback-open");
  }
}

function initLazyPopovers() {
  document.querySelectorAll("[popovertarget]").forEach((trigger) => {
    trigger.addEventListener("click", async (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute("popovertarget");
      let popover = document.getElementById(targetId);

      if (!popover) {
        console.warn(`Popover with id ${targetId} not found`);
        return;
      }

      // If it's the contact form, handle it directly
      if (targetId === "contact-container") {
        showElement(popover);
        return;
      }

      if (!popover.hasContent) {
        try {
          let file;
          if (targetId.includes("projectgallerycarousel")) {
            const projectName = targetId
              .replace("projectgallerycarousel", "")
              .toLowerCase();
            file = `popover/projectsgallery/${projectName}.html`;
          } else {
            file =
              targetId === "projectsgallery"
                ? "popover/projectsgallery.html"
                : `popover/${targetId.replace("-container", "")}.html`;
          }

          const response = await fetch(`${CONFIG.COMPONENT_PATH}/${file}`);
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

          const html = await response.text();
          popover.innerHTML = html;
          popover.hasContent = true;

          if (targetId.includes("projectgallerycarousel")) {
            setTimeout(() => initProjectGalleryCarousel(popover), 100);
          }
        } catch (error) {
          console.error(`Failed to load popover ${targetId}:`, error);
          return;
        }
      }

      showElement(popover);
    });
  });
}
