const gallery = document.querySelector(".gallery");
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal-content");
const closeButton = document.querySelector(".close-button");

gallery.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    modal.classList.add("active");
    modalImg.src = e.target.src;
  }
});

function closeModal() {
  modal.classList.remove("active");
}

closeButton.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
