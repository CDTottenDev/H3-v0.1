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
  const modal = document.createElement("div");
  modal.className = "modal";

  // Updated HTML to match contact.html structure
  modal.innerHTML = `
    <div class="contact-container" id="contact-container">
      <div class="popover-header">
        <h2>Construction Job Estimate</h2>
        <button class="close-btn">×</button>
      </div>
      <div class="popover-content">
        <form action="https://formspree.io/f/xnnqyngz" method="POST" class="contact-form" id="contact-form">
          <div class="form-grid">
            <div class="form-group job-description">
              <label for="message">Job Description</label>
              <textarea name="message" id="message" rows="8" required></textarea>
            </div>

            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" name="name" id="name" required />
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" name="email" id="email" required />
            </div>

            <div class="form-group">
              <label for="phone">Phone</label>
              <input type="tel" name="phone" id="phone" required />
            </div>

            <div class="form-group">
              <label for="location">Location</label>
              <input type="text" name="location" id="location" required />
            </div>
          </div>

          <button type="submit" class="submit-button">Send Message</button>
        </form>
      </div>
    </div>
  `;

  // Add form submission handler
  const form = modal.querySelector("#contact-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          form.reset();
          alert("Message sent successfully!");
          document.body.removeChild(modal); // Close the modal after successful submission
        } else {
          alert("Error sending message. Please try again.");
        }
      })
      .catch((error) => {
        alert("Error sending message. Please try again.");
      });
  });

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
