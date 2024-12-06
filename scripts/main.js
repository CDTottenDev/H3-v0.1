import { loadComponents } from "./utils/componentLoader.js";
import { initAllObservers } from "./utils/observers.js";

function isPopoverSupported() {
  return HTMLElement.prototype.hasOwnProperty("showPopover");
}

function initContactForm() {
  const ctaButton = document.getElementById("ctabtnhero");
  const contactForm = document.getElementById("contact-container");

  if (ctaButton && contactForm) {
    ctaButton.addEventListener("click", (e) => {
      e.preventDefault();

      try {
        if (isPopoverSupported() && contactForm.matches("[popover]")) {
          contactForm.showPopover();
        } else {
          contactForm.style.display = "block";
          contactForm.classList.add("fallback-open");
        }
      } catch (error) {
        contactForm.style.display = "block";
        contactForm.classList.add("fallback-open");
      }
    });

    // Close functionality
    const closeForm = () => {
      try {
        if (isPopoverSupported() && contactForm.matches("[popover]")) {
          contactForm.hidePopover();
        } else {
          contactForm.style.display = "none";
          contactForm.classList.remove("fallback-open");
        }
      } catch (error) {
        contactForm.style.display = "none";
        contactForm.classList.remove("fallback-open");
      }
    };

    // Close when clicking outside
    contactForm.addEventListener("click", (e) => {
      if (e.target === contactForm) {
        closeForm();
      }
    });

    // Close with escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeForm();
      }
    });
  }
}

window.openContactForm = function () {
  // Create a modal/popup container
  const modal = document.createElement("div");
  modal.className = "modal";

  // Set the HTML content directly
  modal.innerHTML = `
    <div class="contact-container">
      <div class="popover-header">
        <h2>Construction Job Estimate</h2>
        <button class="close-btn">×</button>
      </div>
      <div class="popover-content">
        <form>
          <div class="form-grid">
            <div class="job-description">
              <div class="form-group">
                <label for="jobDescription">Job Description</label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  placeholder="Please describe your construction project in detail..."
                ></textarea>
              </div>
            </div>

            <div class="right-column">
              <div class="form-group">
                <label for="projectType">Project Type</label>
                <select id="projectType" name="projectType" required>
                  <option value="">Select a project type</option>
                  <option value="excavation">Excavation</option>
                  <option value="grading-sloping">Grading/Sloping</option>
                  <option value="trenching">Trenching</option>
                  <option value="septic">Septic</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div class="form-group">
                <label for="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div class="form-group">
                <button type="submit" class="ctabtnform">
                  Send Estimate Request
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  // Add modal to page
  document.body.appendChild(modal);

  // Add event listener to close button
  const closeBtn = modal.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponents();
  initAllObservers();
  initContactForm();
});
