// Export the functions
export function openPopup() {
  const popup = document.getElementById("popupContainer");
  if (popup) {
    console.log("Opening popup");
    popup.classList.add("active");
  } else {
    console.error("Popup container not found");
  }
}

export function closePopup() {
  const popup = document.getElementById("popupContainer");
  if (popup) {
    console.log("Closing popup");
    popup.classList.remove("active");
    resetForm();
  } else {
    console.error("Popup container not found");
  }
}

function resetForm() {
  document.getElementById("contactForm").reset();
  const errors = document.getElementsByClassName("error");
  for (let error of errors) {
    error.style.display = "none";
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function handleSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  let isValid = true;

  // Validate name
  if (name.trim().length < 2) {
    document.getElementById("nameError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("nameError").style.display = "none";
  }

  // Validate email
  if (!validateEmail(email)) {
    document.getElementById("emailError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("emailError").style.display = "none";
  }

  // Validate message
  if (message.trim().length < 10) {
    document.getElementById("messageError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("messageError").style.display = "none";
  }

  if (isValid) {
    // Here you would typically send the form data to a server
    alert("Form submitted successfully!");
    closePopup();
  }
}
