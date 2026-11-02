function showError(field, errorEl, message) {
  field.classList.add("invalid");
  errorEl.textContent = message;
}

function clearError(field, errorEl) {
  field.classList.remove("invalid");
  errorEl.textContent = "";
}

function isNotEmpty(value) {
  return value.trim().length > 0;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

function isFutureDate(dateString) {
  if (!dateString) return false;
  const selected = new Date(dateString);
  const today    = new Date();
  today.setHours(0, 0, 0, 0);
  return selected > today;
}

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {
  enquiryForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const fullName        = document.getElementById("fullName");
    const fullNameError   = document.getElementById("fullNameError");

    const email           = document.getElementById("email");
    const emailError      = document.getElementById("emailError");

    const phone           = document.getElementById("phone");
    const phoneError      = document.getElementById("phoneError");

    const enquiryType     = document.getElementById("enquiryType");
    const enquiryTypeError = document.getElementById("enquiryTypeError");

    const collectionDate  = document.getElementById("collectionDate");
    const collectionDateError = document.getElementById("collectionDateError");

    const message         = document.getElementById("message");
    const messageError    = document.getElementById("messageError");

    const formSuccess     = document.getElementById("formSuccess");
    let isValid = true;
    if (!isNotEmpty(fullName.value)) {
      showError(fullName, fullNameError, "Please enter your full name.");
      isValid = false;
    } else {
      clearError(fullName, fullNameError);
    }
    if (!isNotEmpty(email.value)) {
      showError(email, emailError, "Please enter your email address.");
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      showError(email, emailError, "Please enter a valid email address (e.g. name@example.com).");
      isValid = false;
    } else {
      clearError(email, emailError);
    }
    if (!isNotEmpty(phone.value)) {
      showError(phone, phoneError, "Please enter your phone number.");
      isValid = false;
    } else {
      clearError(phone, phoneError);
    }
    if (!isNotEmpty(enquiryType.value)) {
      showError(enquiryType, enquiryTypeError, "Please select an enquiry type.");
      isValid = false;
    } else {
      clearError(enquiryType, enquiryTypeError);
    }
    if (!isNotEmpty(collectionDate.value)) {
      showError(collectionDate, collectionDateError, "Please enter your required collection date.");
      isValid = false;
    } else if (!isFutureDate(collectionDate.value)) {
      showError(collectionDate, collectionDateError, "Collection date must be a future date.");
      isValid = false;
    } else {
      clearError(collectionDate, collectionDateError);
    }
    if (!isNotEmpty(message.value)) {
      showError(message, messageError, "Please describe your order or enquiry.");
      isValid = false;
    } else if (message.value.trim().length < 10) {
      showError(message, messageError, "Please provide a bit more detail (at least 10 characters).");
      isValid = false;
    } else {
      clearError(message, messageError);
    }
    if (isValid) {
      enquiryForm.style.display = "none";
      formSuccess.classList.remove("hidden");
      formSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const contactName       = document.getElementById("contactName");
    const contactNameError  = document.getElementById("contactNameError");

    const contactEmail      = document.getElementById("contactEmail");
    const contactEmailError = document.getElementById("contactEmailError");

    const subject           = document.getElementById("subject");
    const subjectError      = document.getElementById("subjectError");

    const contactMessage    = document.getElementById("contactMessage");
    const contactMessageError = document.getElementById("contactMessageError");

    const contactSuccess    = document.getElementById("contactSuccess");

    let isValid = true;
    if (!isNotEmpty(contactName.value)) {
      showError(contactName, contactNameError, "Please enter your full name.");
      isValid = false;
    } else {
      clearError(contactName, contactNameError);
    }
    if (!isNotEmpty(contactEmail.value)) {
      showError(contactEmail, contactEmailError, "Please enter your email address.");
      isValid = false;
    } else if (!isValidEmail(contactEmail.value)) {
      showError(contactEmail, contactEmailError, "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError(contactEmail, contactEmailError);
    }
    if (!isNotEmpty(subject.value)) {
      showError(subject, subjectError, "Please enter a subject for your message.");
      isValid = false;
    } else {
      clearError(subject, subjectError);
    }
    if (!isNotEmpty(contactMessage.value)) {
      showError(contactMessage, contactMessageError, "Please enter your message.");
      isValid = false;
    } else if (contactMessage.value.trim().length < 10) {
      showError(contactMessage, contactMessageError, "Your message must be at least 10 characters.");
      isValid = false;
    } else {
      clearError(contactMessage, contactMessageError);
    }
    if (isValid) {
      contactForm.style.display = "none";
      contactSuccess.classList.remove("hidden");
      contactSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}
