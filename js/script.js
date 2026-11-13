// Wheelhouse Bike Repair — script.js

// Skip link keyboard focus management
function initSkipLink() {
  const skipLink = document.querySelector('.skip-link');
  const mainContent = document.getElementById('main-content');
  if (skipLink && mainContent) {
    skipLink.addEventListener('click', function () {
      mainContent.focus();
    });
  }
}

// Mobile navigation toggle
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const primaryNav = document.getElementById('primary-nav');

  if (!menuToggle || !primaryNav) return;

  function setMenuState(open) {
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    primaryNav.classList.toggle('nav-open', open);
  }

  // Toggle on button click (also triggered by Enter / Space on button)
  menuToggle.addEventListener('click', function () {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  // Close with Escape key and return focus
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && primaryNav.classList.contains('nav-open')) {
      setMenuState(false);
      menuToggle.focus();
    }
  });

  // Close when selecting any navigation link
  primaryNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      setMenuState(false);
    });
  });

  // Close when clicking outside of the header
  document.addEventListener('click', function (e) {
    if (
      primaryNav.classList.contains('nav-open') &&
      !menuToggle.contains(e.target) &&
      !primaryNav.contains(e.target)
    ) {
      setMenuState(false);
    }
  });
}

// Service Problem Filter (EE01 Create Criterion)
function initServiceFilter() {
  const filterButtons = document.querySelectorAll('.repair-finder-card');
  const serviceCards = document.querySelectorAll('.services-grid .service-card');
  const servicesGrid = document.getElementById('services-grid');
  const filterStatus = document.getElementById('service-filter-status');
  const filterStatusCount = document.getElementById('filter-status-count');
  const resetBtn = document.getElementById('reset-service-filter');

  if (!filterButtons.length || !serviceCards.length) return;

  function showAllServices(shouldFocusFirstBtn) {
    serviceCards.forEach(function (card) {
      card.hidden = false;
    });

    filterButtons.forEach(function (btn) {
      const isAllBtn = btn.getAttribute('data-service-target') === 'all';
      btn.setAttribute('aria-pressed', isAllBtn ? 'true' : 'false');
    });

    if (servicesGrid) {
      servicesGrid.classList.remove('is-filtered');
    }

    if (filterStatus) {
      filterStatus.hidden = true;
    }

    if (filterStatusCount) {
      filterStatusCount.textContent = 'Showing all 6 services';
    }

    if (shouldFocusFirstBtn && filterButtons.length > 0) {
      filterButtons[0].focus();
    }
  }

  function filterToService(targetId, activeBtn) {
    let matchedServiceName = '';

    serviceCards.forEach(function (card) {
      if (card.id === targetId) {
        card.hidden = false;
        const titleEl = card.querySelector('.service-title');
        if (titleEl) {
          matchedServiceName = titleEl.textContent.trim();
        }
      } else {
        card.hidden = true;
      }
    });

    filterButtons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn === activeBtn ? 'true' : 'false');
    });

    if (servicesGrid) {
      servicesGrid.classList.add('is-filtered');
    }

    if (filterStatus) {
      filterStatus.hidden = false;
    }

    if (filterStatusCount) {
      filterStatusCount.textContent = matchedServiceName
        ? `Showing matching repair: ${matchedServiceName}`
        : 'Showing 1 matching service';
    }
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetId = btn.getAttribute('data-service-target');
      const isCurrentlyActive = btn.getAttribute('aria-pressed') === 'true';

      if (targetId === 'all') {
        showAllServices(false);
      } else if (isCurrentlyActive) {
        showAllServices(false);
      } else {
        filterToService(targetId, btn);
      }
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      showAllServices(true);
    });
  }
}

// Helper: Escape text for safe HTML insertion
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Helper: Clear field error states
function clearFieldError(input, errorEl) {
  input.classList.remove('is-invalid');
  input.removeAttribute('aria-invalid');
  input.removeAttribute('aria-describedby');
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.hidden = true;
  }
}

// Helper: Set accessible field error states
function setFieldError(input, errorEl, message) {
  input.classList.add('is-invalid');
  input.setAttribute('aria-invalid', 'true');
  if (errorEl) {
    input.setAttribute('aria-describedby', errorEl.id);
    errorEl.textContent = message;
    errorEl.hidden = false;
  }
}

// === SECTION 2: Service request tracker (Booking Form) ===
// When the booking form is submitted, add the customer's name and request
// to the list below the form. Prevent the page from refreshing on submit.
function initBookingForm() {
  const form = document.getElementById('booking-form');
  const nameInput = document.getElementById('booking-name');
  const needInput = document.getElementById('booking-need');
  const nameError = document.getElementById('booking-name-error');
  const needError = document.getElementById('booking-need-error');
  const feedback = document.getElementById('booking-feedback');
  const bookingList = document.getElementById('booking-list');
  const emptyPlaceholder = document.getElementById('booking-empty-placeholder');

  if (!form || !nameInput || !needInput) return;

  nameInput.addEventListener('input', function () {
    clearFieldError(nameInput, nameError);
  });
  needInput.addEventListener('input', function () {
    clearFieldError(needInput, needError);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const need = needInput.value.trim();

    let hasError = false;
    let firstInvalidField = null;

    if (!name) {
      setFieldError(nameInput, nameError, 'Please enter your name.');
      hasError = true;
      firstInvalidField = nameInput;
    } else {
      clearFieldError(nameInput, nameError);
    }

    if (!need) {
      setFieldError(needInput, needError, 'Please describe what your bike needs.');
      hasError = true;
      if (!firstInvalidField) firstInvalidField = needInput;
    } else {
      clearFieldError(needInput, needError);
    }

    if (hasError) {
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    // Remove empty placeholder when first entry is added
    if (emptyPlaceholder) {
      emptyPlaceholder.remove();
    }

    // Build tracker item with semantic elements
    const item = document.createElement('div');
    item.className = 'booking-item';

    const header = document.createElement('div');
    header.className = 'booking-item-header';

    const nameEl = document.createElement('strong');
    nameEl.className = 'booking-item-name';
    nameEl.textContent = name;

    const badge = document.createElement('span');
    badge.className = 'booking-badge';
    badge.textContent = 'Received \u2022 Drop-Off Pending';

    header.appendChild(nameEl);
    header.appendChild(badge);

    const needEl = document.createElement('p');
    needEl.className = 'booking-item-need';
    needEl.textContent = need;

    const timeEl = document.createElement('span');
    timeEl.className = 'booking-item-time';
    timeEl.textContent = 'Logged just now';

    item.appendChild(header);
    item.appendChild(needEl);
    item.appendChild(timeEl);

    if (bookingList) {
      bookingList.insertBefore(item, bookingList.firstChild);
    }

    if (feedback) {
      feedback.innerHTML = `<div class="alert-success" role="status"><strong>Request Logged:</strong> Thank you, ${escapeHtml(name)}! Your repair request has been added to our queue below. Drop off your bicycle at Shop 4, Adum during workshop hours.</div>`;
    }

    form.reset();
  });
}

// === SECTION 3: Contact form ===
// Validate the contact form before submission.
// Show a success message when all fields are correctly filled in.
// If a required field is missing, tell the user what needs to be fixed.
function initContactForm() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const nameError = document.getElementById('contact-name-error');
  const emailError = document.getElementById('contact-email-error');
  const messageError = document.getElementById('contact-message-error');
  const feedback = document.getElementById('contact-feedback');

  if (!form || !nameInput || !emailInput || !messageInput) return;

  nameInput.addEventListener('input', function () {
    clearFieldError(nameInput, nameError);
  });
  emailInput.addEventListener('input', function () {
    clearFieldError(emailInput, emailError);
  });
  messageInput.addEventListener('input', function () {
    clearFieldError(messageInput, messageError);
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    let hasError = false;
    let firstInvalidField = null;

    if (!name) {
      setFieldError(nameInput, nameError, 'Please enter your name.');
      hasError = true;
      firstInvalidField = nameInput;
    } else {
      clearFieldError(nameInput, nameError);
    }

    if (!email) {
      setFieldError(emailInput, emailError, 'Please enter your email address.');
      hasError = true;
      if (!firstInvalidField) firstInvalidField = emailInput;
    } else if (!emailRegex.test(email)) {
      setFieldError(emailInput, emailError, 'Please enter a valid email address (e.g. name@example.com).');
      hasError = true;
      if (!firstInvalidField) firstInvalidField = emailInput;
    } else {
      clearFieldError(emailInput, emailError);
    }

    if (!message) {
      setFieldError(messageInput, messageError, 'Please enter your message.');
      hasError = true;
      if (!firstInvalidField) firstInvalidField = messageInput;
    } else {
      clearFieldError(messageInput, messageError);
    }

    if (hasError) {
      if (feedback) {
        feedback.innerHTML = '<div class="alert-error" role="alert">Please correct the highlighted fields above before submitting.</div>';
      }
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    // Success
    if (feedback) {
      feedback.innerHTML = `<div class="alert-success" role="status"><strong>Message Sent:</strong> Thank you, ${escapeHtml(name)}! Kwame has received your message and will reply to <em>${escapeHtml(email)}</em> during workshop hours.</div>`;
    }

    form.reset();
  });
}

function init() {
  initSkipLink();
  initMobileMenu();
  initServiceFilter();
  initBookingForm();
  initContactForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
