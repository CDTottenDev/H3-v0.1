function openProjectPage(projectId) {
  console.log("Opening project:", projectId);
  sessionStorage.setItem("scrollPosition", window.scrollY);
  window.location.href = `/components/popover/projectsgallery/${projectId}.html`;
}

function goBackToGallery() {
  console.log("Going back to gallery");
  window.location.href = "/components/popover/projectsgallery.html";
}
