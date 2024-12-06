function openProjectPage(projectId) {
  console.log("Opening project:", projectId);
  sessionStorage.setItem("scrollPosition", window.scrollY);
  window.location.href = `/components/popover/projectsgallery/${projectId}.html`;
}

function goBackToGallery() {
  console.log("Going back to gallery");
  sessionStorage.setItem("openGallery", "true");
  window.location.href = "/index.html";
}
