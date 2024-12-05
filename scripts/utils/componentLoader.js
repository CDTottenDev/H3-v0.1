import { CONFIG } from "./config.js";
import { initProjectGalleryCarousel } from "../components/projectgallerycarousel.js";

export async function loadEssentialComponents(components) {
  const loadPromises = components.map(async ({ id, file }) => {
    const element = document.getElementById(id);
    if (!element) return;

    try {
      const response = await fetch(`${CONFIG.COMPONENT_PATH}/${file}`);
      const html = await response.text();
      element.innerHTML = html;
    } catch (error) {
      console.error(`Failed to load component ${file}:`, error);
    }
  });

  await Promise.all(loadPromises);
}

export async function loadComponents() {
  // Define essential components that should load immediately
  const essentialComponents = [
    { id: "navbar-container", file: "navbar.html" },
    { id: "hero-container", file: "hero.html" },
    { id: "services", file: "services.html" },
    { id: "projects", file: "projects.html" },
    { id: "about", file: "about.html" },
    { id: "testimonials", file: "testimonials.html" },
    { id: "footer", file: "footer.html" },
  ];

  await loadEssentialComponents(essentialComponents);
  initLazyPopovers();
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

      if (!popover.hasContent) {
        try {
          let file;
          if (targetId.includes("projectgallerycarousel")) {
            const projectName = targetId
              .replace("projectgallerycarousel", "")
              .toLowerCase();
            file = `popover/projectsgallery/${projectName}.html`;
            console.log("Loading carousel:", file);
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

          // Initialize carousel after content is loaded
          if (targetId.includes("projectgallerycarousel")) {
            setTimeout(() => initProjectGalleryCarousel(popover), 100);
          }
        } catch (error) {
          console.error(`Failed to load popover ${targetId}:`, error);
          return;
        }
      }

      popover.showPopover();
    });
  });
}
