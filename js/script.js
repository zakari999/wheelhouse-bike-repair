// ==========================================================================
// Wheelhouse Bike Repair — Interactive Behaviour & Lead Generation
// Kumasi, Ghana | Accessible, Mobile-First JavaScript
// ==========================================================================

const CONTACT = {
  whatsappInternational: '233244000001', // Displayed on site as 0244 000 001.
  phoneDisplay: '0322 000 000',
  email: 'wheelhouse@email.com'
};

// --------------------------------------------------------------------------
// 1. Mobile Navigation Menu
// --------------------------------------------------------------------------
function initNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('#main-nav');
  const header = document.querySelector('.site-header');

  if (!menuToggle || !mainNav) return;

  function setMenuState(open) {
    mainNav.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute(
      'aria-label',
      open ? 'Close navigation menu' : 'Open navigation menu'
    );
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  // Close when selecting any nav link
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuState(false));
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
      setMenuState(false);
      menuToggle.focus();
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      mainNav.classList.contains('is-open') &&
      header &&
      !header.contains(e.target)
    ) {
      setMenuState(false);
    }
  });
}

// --------------------------------------------------------------------------
// 2. Problem Selector & Service Filter (EE01 Create Criterion)
// --------------------------------------------------------------------------
function initServiceFilter() {
  const problemButtons = document.querySelectorAll('.problem-card');
  const serviceCards = [...document.querySelectorAll('.service-card')];
  const filterNote = document.querySelector('#filter-note');
  const resetBtn = document.querySelector('#reset-services');

  if (!problemButtons.length || !serviceCards.length) return;

  const categoryNames = {
    tyre: 'Flat tyre (Tyre & tube replacement)',
    brakes: 'Brake trouble (Brake overhaul)',
    gears: 'Slipping gears (Gear system overhaul)',
    tuneup: 'General maintenance (Basic tune-up)'
  };

  function applyFilter(category, clickedButton) {
    const isCurrentlyActive = clickedButton && clickedButton.getAttribute('aria-pressed') === 'true';

    // Toggle off if clicking the already active button
    if (isCurrentlyActive || category === 'all') {
      serviceCards.forEach(card => {
        card.hidden = false;
        card.classList.remove('filter-highlight');
      });

      problemButtons.forEach(btn => {
        btn.setAttribute('aria-pressed', 'false');
      });

      if (filterNote) {
        filterNote.hidden = false;
        filterNote.textContent = 'Showing all 6 services.';
        // Hide after short duration or keep clear
        setTimeout(() => {
          if (!document.querySelector('.problem-card[aria-pressed="true"]')) {
            filterNote.hidden = true;
          }
        }, 3000);
      }
      return;
    }

    // Filter to selected category
    let matchedCard = null;
    serviceCards.forEach(card => {
      const isMatch = card.dataset.category === category;
      card.hidden = !isMatch;
      card.classList.remove('filter-highlight');
      if (isMatch) {
        matchedCard = card;
      }
    });

    problemButtons.forEach(btn => {
      btn.setAttribute('aria-pressed', btn === clickedButton ? 'true' : 'false');
    });

    if (filterNote) {
      filterNote.hidden = false;
      const label = categoryNames[category] || category;
      filterNote.textContent = `Showing 1 matching service for ${label}. Select “View all services” to see every option.`;
    }

    // Scroll smoothly so both the filter status and full matching service card stay comfortably framed
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setTimeout(() => {
        const header = document.querySelector('.site-header');
        const mobileCta = document.querySelector('.mobile-cta');
        const sectionHead = servicesSection.querySelector('.section-head');
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const ctaVisible = mobileCta && window.getComputedStyle(mobileCta).display !== 'none';
        const ctaHeight = ctaVisible ? mobileCta.getBoundingClientRect().height : 0;

        const minTop = headerHeight + 20;
        const usableBottom = window.innerHeight - ctaHeight - 24;
        const headTop = (sectionHead || servicesSection).getBoundingClientRect().top + window.scrollY;
        const anchorEl = (filterNote && !filterNote.hidden) ? filterNote : (matchedCard || servicesSection);
        const anchorTop = anchorEl.getBoundingClientRect().top + window.scrollY;
        const resultBottom = (matchedCard || anchorEl).getBoundingClientRect().bottom + window.scrollY;

        const idealScrollY = headTop - minTop;
        const fitCardScrollY = resultBottom - usableBottom;
        const maxFilterScrollY = anchorTop - minTop;
        const targetScrollY = Math.max(0, Math.min(maxFilterScrollY, Math.max(idealScrollY, fitCardScrollY)));

        window.scrollTo({
          top: targetScrollY,
          behavior: isReduced ? 'auto' : 'smooth'
        });

        if (matchedCard && !isReduced) {
          matchedCard.classList.remove('filter-highlight');
          void matchedCard.offsetWidth;
          matchedCard.classList.add('filter-highlight');
        }
      }, 60);
    }
  }

  problemButtons.forEach(button => {
    button.addEventListener('click', () => {
      applyFilter(button.dataset.filter, button);
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      applyFilter('all', null);
      if (problemButtons.length > 0) {
        problemButtons[0].focus();
      }
    });
  }
}

// --------------------------------------------------------------------------
// 3. Service Card to Booking Pre-selection
// --------------------------------------------------------------------------
function initServicePreselection() {
  const serviceSelect = document.querySelector('#service-select');
  const serviceLinks = document.querySelectorAll('.service-link');

  if (!serviceSelect || !serviceLinks.length) return;

  serviceLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetService = link.dataset.service;
      if (targetService) {
        serviceSelect.value = targetService;
        serviceSelect.classList.remove('has-error');
        serviceSelect.removeAttribute('aria-invalid');
        const serviceError = document.querySelector('#service-error');
        if (serviceError) serviceError.textContent = '';
      }
    });
  });
}

// --------------------------------------------------------------------------
// 4. Repair Request Form (Accessible Validation & WhatsApp Generator)
// --------------------------------------------------------------------------
function initRepairForm() {
  const repairForm = document.querySelector('#repair-form');
  const nameInput = document.querySelector('#customer-name');
  const phoneInput = document.querySelector('#customer-phone');
  const serviceSelect = document.querySelector('#service-select');
  const notesInput = document.querySelector('#repair-notes');
  const nameError = document.querySelector('#name-error');
  const phoneError = document.querySelector('#phone-error');
  const serviceError = document.querySelector('#service-error');
  const formStatus = document.querySelector('#form-status');

  if (!repairForm) return;

  function setFieldError(input, errorEl, message) {
    if (!input || !errorEl) return;
    input.classList.add('has-error');
    input.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
  }

  function clearFieldError(input, errorEl) {
    if (!input || !errorEl) return;
    input.classList.remove('has-error');
    input.removeAttribute('aria-invalid');
    errorEl.textContent = '';
  }

  function checkFormStatus() {
    if (!formStatus) return;
    const hasAnyError = repairForm.querySelector('.has-error');
    if (!hasAnyError && formStatus.classList.contains('error')) {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }
  }

  // Clear errors dynamically on user input
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim()) {
        clearFieldError(nameInput, nameError);
        checkFormStatus();
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      if (phoneInput.value.trim()) {
        clearFieldError(phoneInput, phoneError);
        checkFormStatus();
      }
    });
  }

  if (serviceSelect) {
    serviceSelect.addEventListener('change', () => {
      if (serviceSelect.value) {
        clearFieldError(serviceSelect, serviceError);
        checkFormStatus();
      }
    });
  }

  repairForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = String(nameInput ? nameInput.value : '').trim();
    const phone = String(phoneInput ? phoneInput.value : '').trim();
    const service = String(serviceSelect ? serviceSelect.value : '').trim();
    const notes = String(notesInput ? notesInput.value : '').trim();

    let hasErrors = false;
    let firstInvalidField = null;

    if (!name) {
      setFieldError(nameInput, nameError, 'Please enter your name.');
      hasErrors = true;
      if (!firstInvalidField) firstInvalidField = nameInput;
    } else {
      clearFieldError(nameInput, nameError);
    }

    if (!phone) {
      setFieldError(phoneInput, phoneError, 'Please enter your phone number.');
      hasErrors = true;
      if (!firstInvalidField) firstInvalidField = phoneInput;
    } else {
      clearFieldError(phoneInput, phoneError);
    }

    if (!service) {
      setFieldError(serviceSelect, serviceError, 'Please select a service.');
      hasErrors = true;
      if (!firstInvalidField) firstInvalidField = serviceSelect;
    } else {
      clearFieldError(serviceSelect, serviceError);
    }

    if (hasErrors) {
      if (formStatus) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill out all required fields marked below.';
      }
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    // All fields are valid
    if (formStatus) {
      formStatus.className = 'form-status success';
      formStatus.textContent = 'Your message is ready in WhatsApp. Please tap Send there to contact the workshop.';
    }

    const messageLines = [
      'Hello Wheelhouse! I would like to enquire about a bike repair.',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      notes ? `Description: ${notes}` : '',
      '',
      'Please let me know the next steps. Thank you!'
    ].filter((line, idx, arr) => line || (idx > 0 && arr[idx - 1] !== ''));

    const message = messageLines.join('\n');
    const url = `https://wa.me/${CONTACT.whatsappInternational}?text=${encodeURIComponent(message)}`;

    const popup = window.open(url, '_blank', 'noopener,noreferrer');
    if (!popup) {
      window.location.href = url;
    }
  });
}

// --------------------------------------------------------------------------
// 5. Hero Image Offline Fallback Handler
// --------------------------------------------------------------------------
function initHeroFallback() {
  const heroPhoto = document.querySelector('.hero-photo');
  if (!heroPhoto) return;

  heroPhoto.addEventListener('error', () => {
    heroPhoto.style.display = 'none';
  });
}

// --------------------------------------------------------------------------
// 6. Dynamic Year
// --------------------------------------------------------------------------
function initYear() {
  const yearEl = document.querySelector('#year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

// --------------------------------------------------------------------------
// 7. Floating Back to Top Button (Accessible Keyboard Navigation & Scroll)
// --------------------------------------------------------------------------
function initBackToTop() {
  const backToTopBtn = document.querySelector('#back-to-top');
  if (!backToTopBtn) return;

  function toggleButton() {
    const shouldShow = window.scrollY > 350;
    backToTopBtn.classList.toggle('is-visible', shouldShow);
  }

  window.addEventListener('scroll', toggleButton, { passive: true });
  toggleButton();

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: isReduced ? 'auto' : 'smooth'
    });

    const topTarget = document.querySelector('#top') || document.body;
    if (topTarget) {
      topTarget.setAttribute('tabindex', '-1');
      topTarget.focus({ preventScroll: true });
    }
  });
}

// --------------------------------------------------------------------------
// Initialize All Behaviors
// --------------------------------------------------------------------------
function init() {
  initNavigation();
  initServiceFilter();
  initServicePreselection();
  initRepairForm();
  initHeroFallback();
  initYear();
  initBackToTop();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ==========================================================================
// Preserved Starter Sections for Future Applied JavaScript Modules
// ==========================================================================

// === SECTION 1: Common questions accordion ===
// Each .faq-trigger should expand and collapse its paired .faq-body when clicked.

// === SECTION 2: Service request tracker ===
// When the booking form is submitted, add the customer's name and request
// to the list below the form. Prevent the page from refreshing on submit.

// === SECTION 3: Contact form ===
// Validate the contact form before submission.
// Show a success message when all fields are correctly filled in.
// If a required field is missing, tell the user what needs to be fixed.
