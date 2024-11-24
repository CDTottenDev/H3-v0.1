// Keep track of scroll position
let lastScrollY = window.scrollY;

export function initNavbar() {
  const navbar = document.querySelector(".navbar");

  // Check if navbar exists
  if (!navbar) {
    console.warn("Navbar element not found");
    return;
  }

  // Function to handle navbar visibility
  const handleNavbarVisibility = () => {
    const currentScrollY = window.scrollY;

    // Show navbar only when at top of page
    if (currentScrollY === 0) {
      navbar.classList.remove("navbar-hidden");
    } else {
      // Hide navbar when scrolling down
      navbar.classList.add("navbar-hidden");
    }

    lastScrollY = currentScrollY;
  };

  // Add scroll event listener
  window.addEventListener("scroll", handleNavbarVisibility, { passive: true });

  // Initial check for scroll position
  handleNavbarVisibility();
}
