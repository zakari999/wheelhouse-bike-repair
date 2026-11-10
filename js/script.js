// Wheelhouse Bike Repair — script.js

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

  // Close with Escape key
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

function init() {
  initMobileMenu();
  initServiceFilter();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// === SECTION 1: Common questions accordion ===
// Each .faq-trigger should expand and collapse its paired .faq-body when clicked.

// === SECTION 2: Service request tracker ===
// When the booking form is submitted, add the customer's name and request
// to the list below the form. Prevent the page from refreshing on submit.

// === SECTION 3: Contact form ===
// Validate the contact form before submission.
// Show a success message when all fields are correctly filled in.
// If a required field is missing, tell the user what needs to be fixed.
