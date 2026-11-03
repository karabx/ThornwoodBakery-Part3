// Validation patterns
const NAME_PATTERN = /^[A-Za-z\u00C0-\u024F][A-Za-z\u00C0-\u024F' -]{1,59}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^(\+27|0)[1-9]\d{8}$/;
const BUDGET_PATTERN = /^\d+(\.\d{1,2})?$/;
// Where contact form emails go. The nearest location chooses between the two store addresses
const DEFAULT_RECIPIENT = "melville@thornwoodbakery.co.za";
const LOCATION_RECIPIENTS = {
  melville: "melville@thornwoodbakery.co.za",
  greenside: "greenside@thornwoodbakery.co.za"
};

// Date helpers. Dates are built from local parts to avoid time zone shifts
function pad(number) {
  return String(number).padStart(2, "0");
}

function toISODate(date) {
  return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
}

// Turns a YYYY-MM-DD value into a Date and returns null for impossible dates such as 31 February
function parseISODate(value) {
  const parts = value.split("-").map(Number);
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  const valid = date.getFullYear() === parts[0] && date.getMonth() === parts[1] - 1 && date.getDate() === parts[2];
  return valid ? date : null;
}

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

// Counts Monday to Friday days between two dates, used for the 5 business day lead time
function businessDaysBetween(start, end) {
  let count = 0;
  const cursor = new Date(start);
  while (cursor < end) {
    cursor.setDate(cursor.getDate() + 1);
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) count++;
  }
  return count;
}

// Removes spaces, hyphens and brackets so phone numbers can be checked against one pattern
function cleanPhone(value) {
  return value.replace(/[\s\-()]/g, "");
}

// Small helper for creating elements with text. textContent keeps user input safe
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// Show or clear an error: red border, aria-invalid and the message under the field
function showError(field, errorEl, message) {
  field.classList.add("invalid");
  field.setAttribute("aria-invalid", "true");
  errorEl.textContent = message;
}

function clearError(field, errorEl) {
  field.classList.remove("invalid");
  field.removeAttribute("aria-invalid");
  errorEl.textContent = "";
}

// Validates one field with its rule and shows the result
function checkField(def) {
  const field = document.getElementById(def.id);
  const errorEl = document.getElementById(def.id + "Error");
  const message = def.validate(field.value.trim(), field);
  if (message) {
    showError(field, errorEl, message);
  } else {
    clearError(field, errorEl);
  }
  return !message;
}

// Validate on blur. Once a field has an error it is re-checked as the user types so the message clears
function bindValidation(defs) {
  defs.forEach(function (def) {
    const field = document.getElementById(def.id);
    field.setAttribute("aria-describedby", def.id + "Error");
    field.addEventListener("blur", function () {
      checkField(def);
    });
    const liveEvent = field.tagName === "SELECT" || field.type === "date" ? "change" : "input";
    field.addEventListener(liveEvent, function () {
      if (field.classList.contains("invalid")) checkField(def);
    });
  });
}

// Validates every field on submit and moves focus to the first problem
function validateAll(defs) {
  let firstInvalid = null;
  defs.forEach(function (def) {
    if (!checkField(def) && !firstInvalid) {
      firstInvalid = document.getElementById(def.id);
    }
  });
  if (firstInvalid) firstInvalid.focus();
  return !firstInvalid;
}

// Live x / 1000 counter under a textarea
function addCharCounter(field, max) {
  const counter = el("span", "char-count", "0 / " + max);
  field.parentNode.insertBefore(counter, field.nextSibling);
  function update() {
    counter.textContent = field.value.length + " / " + max;
  }
  field.addEventListener("input", update);
  update();
}

// Rules shared by both forms
function validateName(value) {
  if (!value) return "Please enter your full name.";
  if (!NAME_PATTERN.test(value)) return "Use letters only, between 2 and 60 characters.";
  return "";
}

function validateEmail(value) {
  if (!value) return "Please enter your email address.";
  if (value.length > 100 || !EMAIL_PATTERN.test(value)) return "Please enter a valid email address (e.g. name@example.com).";
  return "";
}

function validatePhone(value, required) {
  if (!value) return required ? "Please enter your phone number." : "";
  if (!PHONE_PATTERN.test(cleanPhone(value))) return "Enter a South African number such as 071 234 5678 or +27 71 234 5678.";
  return "";
}

function validateMessage(value, emptyMessage) {
  if (!value) return emptyMessage;
  if (value.length < 10) return "Please add a bit more detail (at least 10 characters).";
  if (value.length > 1000) return "Please keep your message under 1000 characters.";
  return "";
}

// ENQUIRY FORM (enquiry.html)
const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {
  // Prices and labels used to build the quick quote
  const CAKE_BASE_PRICES = { "birthday-cake": 450, "wedding-cake": 1800, "baby-shower-cake": 550, "other-cake": 500 };
  const SIZE_MULTIPLIERS = { "10-15": 1, "20-25": 1.4, "30-40": 1.9, "50+": 2.8 };
  const TYPE_LABELS = {
    "birthday-cake": "birthday cake",
    "wedding-cake": "wedding cake",
    "baby-shower-cake": "baby shower cake",
    "other-cake": "custom cake",
    "product-enquiry": "product enquiry"
  };

  // The date picker only allows tomorrow up to 12 months ahead
  const collectionDate = document.getElementById("collectionDate");
  const tomorrow = addDays(startOfToday(), 1);
  collectionDate.min = toISODate(tomorrow);
  collectionDate.max = toISODate(addDays(startOfToday(), 365));

  // Validation rules for each enquiry field
  const enquiryDefs = [
    { id: "fullName", validate: validateName },
    { id: "email", validate: validateEmail },
    { id: "phone", validate: function (value) { return validatePhone(value, true); } },
    {
      id: "enquiryType",
      validate: function (value) {
        return value ? "" : "Please select an enquiry type.";
      }
    },
    {
      id: "collectionDate",
      validate: function (value) {
        if (!value) return "Please choose your required collection date.";
        const date = parseISODate(value);
        if (!date) return "Please enter a valid date.";
        if (date < tomorrow) return "Collection date must be a future date.";
        if (date > addDays(startOfToday(), 365)) return "Please choose a date within the next 12 months.";
        if (date.getDay() === 0) return "We are closed on Sundays. Please choose another day.";
        return "";
      }
    },
    {
      id: "budget",
      validate: function (value) {
        if (!value) return "";
        const amount = value.replace(/^R\s?/i, "").replace(/[\s,]/g, "");
        if (!BUDGET_PATTERN.test(amount)) return "Enter your budget as a number, for example R600.";
        if (Number(amount) > 100000) return "Please enter a budget below R100 000.";
        return "";
      }
    },
    {
      id: "message",
      validate: function (value) {
        return validateMessage(value, "Please describe your order or enquiry.");
      }
    }
  ];

  bindValidation(enquiryDefs);
  addCharCounter(document.getElementById("message"), 1000);

  // Links from the product modal (enquiry.html?product=...) pre-select the enquiry type and message
  const params = new URLSearchParams(window.location.search);
  const productParam = params.get("product");
  if (productParam && /^[a-z0-9-]{1,50}$/.test(productParam)) {
    const typeSelect = document.getElementById("enquiryType");
    const known = Array.prototype.some.call(typeSelect.options, function (option) {
      return option.value === productParam;
    });
    if (known) {
      typeSelect.value = productParam;
    } else {
      typeSelect.value = "product-enquiry";
      const readable = productParam.replace(/-/g, " ");
      document.getElementById("message").value = "I would like to know more about the " + readable + ".";
      document.getElementById("message").dispatchEvent(new Event("input"));
    }
  }

  const formResult = document.getElementById("formSuccess");
  const formError = document.getElementById("formError");
  const submitButton = enquiryForm.querySelector("button[type='submit']");

  function roundToTen(number) {
    return Math.round(number / 10) * 10;
  }

  function formatRand(number) {
    return "R" + String(number).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  // Builds the cost, budget and availability lines shown after submitting
  function buildQuote(values) {
    const type = values.enquiryType;
    const collection = parseISODate(values.collectionDate);
    const today = startOfToday();
    const lines = [];

    if (type === "product-enquiry") {
      lines.push({ label: "Cost", text: "Our breads and pastries are priced individually, from R28 for a croissant to R60 for a seeded rye loaf. See the products page for the full list." });
      lines.push({ label: "Availability", text: "Breads and pastries are baked fresh each morning and are available until sold out. For large or wholesale quantities, please give us 2 business days notice." });
      return lines;
    }

    const base = CAKE_BASE_PRICES[type];
    const multiplier = SIZE_MULTIPLIERS[values.cakeSize] || 1;
    const low = roundToTen(base * multiplier);
    const high = roundToTen(low * 1.3);
    lines.push({ label: "Estimated cost", text: formatRand(low) + " to " + formatRand(high) + ", depending on flavour and decoration. We confirm the final price once the design is agreed." });

    const budgetValue = values.budget.replace(/^R\s?/i, "").replace(/[\s,]/g, "");
    if (budgetValue && BUDGET_PATTERN.test(budgetValue)) {
      const budget = Number(budgetValue);
      lines.push({
        label: "Your budget",
        text: budget >= low
          ? "Your budget of " + formatRand(budget) + " fits within our estimate."
          : "Your budget of " + formatRand(budget) + " is a little below our estimate, so we may suggest a smaller size or simpler decoration."
      });
    }

    let enough;
    let leadText;
    if (type === "wedding-cake") {
      enough = collection >= addDays(today, 14);
      leadText = "at least 14 days";
    } else {
      enough = businessDaysBetween(today, collection) >= 5;
      leadText = "at least 5 business days";
    }
    lines.push({
      label: "Availability",
      text: enough
        ? "Your date is within our usual lead time of " + leadText + " and is currently open."
        : "Your date is sooner than our usual lead time of " + leadText + ". We may still be able to help and will confirm within 24 hours. A rush fee could apply."
    });
    return lines;
  }

  // Replaces the form with the response panel: reference number, quote lines and next steps
  function showResult(values) {
    const reference = "TB-" + Date.now().toString(36).toUpperCase();
    const firstName = values.fullName.split(/\s+/)[0];
    formResult.replaceChildren();
    formResult.appendChild(el("h3", "", "Thank you, " + firstName + "!"));
    formResult.appendChild(
      el("p", "", "We have received your " + TYPE_LABELS[values.enquiryType] + " enquiry. Your reference is " + reference + ".")
    );
    const list = el("dl", "result-list");
    buildQuote(values).forEach(function (line) {
      list.appendChild(el("dt", "", line.label));
      list.appendChild(el("dd", "", line.text));
    });
    formResult.appendChild(list);
    formResult.appendChild(el("p", "", "A member of our team will contact you within 24 hours to confirm the details."));
    enquiryForm.classList.add("hidden");
    formResult.classList.remove("hidden");
    formResult.focus();
    formResult.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function setSending(sending) {
    submitButton.disabled = sending;
    submitButton.textContent = sending ? "Sending..." : "Submit Enquiry";
  }

  // Stop the normal page reload, ignore bots, validate, then send the data with fetch (AJAX)
  enquiryForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    formError.classList.add("hidden");

    if (enquiryForm.elements["bot-field"] && enquiryForm.elements["bot-field"].value) return;
    if (!validateAll(enquiryDefs)) return;

    const formData = new FormData(enquiryForm);
    const values = Object.fromEntries(formData.entries());
    values.budget = values.budget || "";

    setSending(true);
    try {
      // Netlify Forms expects the fields as URL-encoded data posted to the form action
      const response = await fetch(enquiryForm.getAttribute("action"), {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      });
      if (!response.ok) throw new Error("Request failed with status " + response.status);
      showResult(values);
    // Network or server problem: show an error message so the user can try again
    } catch (error) {
      formError.textContent = "Sorry, we could not send your enquiry just now. Please try again, or call us on 011 555 1234.";
      formError.classList.remove("hidden");
      formError.scrollIntoView({ behavior: "smooth", block: "center" });
    } finally {
      setSending(false);
    }
  });
}

// CONTACT FORM (contact.html)
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const contactDefs = [
    { id: "contactName", validate: validateName },
    { id: "contactEmail", validate: validateEmail },
    { id: "contactPhone", validate: function (value) { return validatePhone(value, false); } },
    {
      id: "messageType",
      validate: function (value) {
        return value ? "" : "Please choose the type of message.";
      }
    },
    {
      id: "subject",
      validate: function (value) {
        if (!value) return "Please enter a subject for your message.";
        if (value.length < 3 || value.length > 80) return "Your subject must be between 3 and 80 characters.";
        return "";
      }
    },
    {
      id: "contactMessage",
      validate: function (value) {
        return validateMessage(value, "Please enter your message.");
      }
    }
  ];

  bindValidation(contactDefs);
  addCharCounter(document.getElementById("contactMessage"), 1000);

  const preview = document.getElementById("contactSuccess");

  // Builds the email: recipient from the nearest location, subject from the message type and body from the fields
  function compileEmail(values) {
    const recipient = LOCATION_RECIPIENTS[values.preferredLocation] || DEFAULT_RECIPIENT;
    const subject = "[Website] " + values.messageTypeLabel + ": " + values.subject;
    const bodyLines = [
      "Hello Thornwood Bakery,",
      "",
      values.contactMessage,
      "",
      "Message type: " + values.messageTypeLabel,
      "Name: " + values.contactName,
      "Email: " + values.contactEmail
    ];
    if (values.contactPhone) bodyLines.push("Phone: " + values.contactPhone);
    if (values.locationLabel) bodyLines.push("Nearest location: " + values.locationLabel);
    return { recipient: recipient, subject: subject, body: bodyLines.join("\n") };
  }

  // Shows the email preview with buttons to open it in the email app, copy it or edit it
  function showPreview(email) {
    preview.replaceChildren();
    preview.appendChild(el("h3", "", "Your email is ready"));
    preview.appendChild(el("p", "", "Check the details below, then send it from your own email app."));

    const box = el("div", "email-preview");
    box.appendChild(el("p", "", "To: " + email.recipient));
    box.appendChild(el("p", "", "Subject: " + email.subject));
    box.appendChild(el("pre", "", email.body));
    preview.appendChild(box);

    const actions = el("div", "preview-actions");
    const send = el("a", "btn btn-primary", "Open in my email app");
    // mailto link with the subject and body encoded
    send.href = "mailto:" + email.recipient + "?subject=" + encodeURIComponent(email.subject) + "&body=" + encodeURIComponent(email.body);
    actions.appendChild(send);

    const copy = el("button", "btn btn-outline", "Copy message");
    copy.type = "button";
    copy.addEventListener("click", function () {
      if (!navigator.clipboard) {
        copy.textContent = "Copy not supported";
        return;
      }
      navigator.clipboard.writeText(email.body).then(function () {
        copy.textContent = "Copied";
      });
    });
    actions.appendChild(copy);

    const edit = el("button", "btn btn-outline", "Edit message");
    edit.type = "button";
    edit.addEventListener("click", function () {
      preview.classList.add("hidden");
      contactForm.classList.remove("hidden");
      document.getElementById("contactMessage").focus();
    });
    actions.appendChild(edit);

    preview.appendChild(actions);
    contactForm.classList.add("hidden");
    preview.classList.remove("hidden");
    preview.focus();
    preview.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Validate, then compile the email and show the preview
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (contactForm.elements["bot-field"] && contactForm.elements["bot-field"].value) return;
    if (!validateAll(contactDefs)) return;

    const values = Object.fromEntries(new FormData(contactForm).entries());
    const typeSelect = document.getElementById("messageType");
    const locationSelect = document.getElementById("preferredLocation");
    values.messageTypeLabel = typeSelect.options[typeSelect.selectedIndex].text;
    values.locationLabel = values.preferredLocation ? locationSelect.options[locationSelect.selectedIndex].text : "";
    showPreview(compileEmail(values));
  });
}
