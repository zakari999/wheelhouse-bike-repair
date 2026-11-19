# EE01 — Final Website Audit

**Project:** Wheelhouse Bike Repair  
**Document:** Post-Rebuild Audit & Evaluation  
**Module:** EE01 — Web & UI Essentials  

---

## 1. Audit Overview

This audit systematically evaluates the rebuilt Wheelhouse Bike Repair website against semantic HTML structure, WCAG 2.2 Level AA accessibility, multi-device responsiveness, and design-system consistency.

The primary objective was to transform an inaccessible, fixed-width desktop site into a fast, fluid, and fully accessible mobile-first web experience suited to Kwame's bicycle repair workshop in Adum Commercial Area, Kumasi.

---

## 2. Semantic HTML Architecture

The original website relied heavily on unsemantic `<div>` containers, non-functional `#` links, and inline presentation. The rebuild introduces a fully semantic HTML5 structure:

- **HTML5 Landmarks:**
  - `<header class="site-header" id="top">` (banner landmark)
  - `<nav class="main-nav" id="main-nav" aria-label="Primary navigation">` (navigation landmark)
  - `<main id="main">` (main content landmark)
  - `<footer class="footer">` (contentinfo landmark)
- **Sectioning & Content Partitioning:**
  - Distinct `<section>` wrappers for each content area:
    - `.hero` (`aria-labelledby="hero-title"`)
    - `.problem-section` (`id="problems" aria-labelledby="problem-title"`)
    - `.services-section` (`id="services" aria-labelledby="services-title"`)
    - `.process-section` (`id="how-it-works" aria-labelledby="process-title"`)
    - `.about-section` (`id="about" aria-labelledby="about-title"`)
    - `.booking-section` (`id="booking" aria-labelledby="booking-title"`)
    - `.faq-section` (`id="faq" aria-labelledby="faq-title"`)
    - `.visit-section` (`id="visit" aria-labelledby="visit-title"`)
  - Each repair offering is encapsulated in an independent `<article class="service-card">` element with unique data attributes.
- **Strict Heading Hierarchy (No Skipped Levels):**
  - Single `<h1>`: `Bike trouble? We'll get you rolling again.` (`#hero-title`)
  - `<h2>` level for major sections (`#problem-title`, `#services-title`, `#process-title`, `#about-title`, `#booking-title`, `#faq-title`, `#visit-title`)
  - `<h3>` level for sub-components (service card titles, 3 process step titles, repair form card title)
  - Completely verified with zero skipped heading levels throughout the entire DOM.
- **Native Disclosure Controls:**
  - Frequently asked questions use native HTML5 `<details>` and `<summary>` elements, providing native disclosure mechanics without fragile JavaScript toggle hacks.
- **Semantic Forms & Labels:**
  - Every form input and select element (`#customer-name`, `#customer-phone`, `#service-select`, `#repair-notes`) has an explicitly associated `<label>` using matching `for` and `id` pairs.
  - Native constraints (`required`, `aria-required="true"`, `type="tel"`, `maxlength`).

---

## 3. Baseline Accessibility (WCAG 2.2 Level AA Verification)

### Implementation Evidence

#### 1. Skip-to-Content Bypass Link (WCAG 2.4.1)
- **Markup:** `<a class="skip-link" href="#main">Skip to main content</a>` positioned at the top of `<body>`.
- **CSS:** Positioned off-screen (`top: -100px`) and slides into clear view upon keyboard focus (`.skip-link:focus { top: 12px; }`). Allows keyboard users to immediately bypass the header navigation.

#### 2. Mobile Menu Keyboard Operability & ARIA States (WCAG 2.1.1, 4.1.2)
- **Markup:** `<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Open navigation menu">`.
- **Interaction:** Triggerable via Enter and Space keys. Toggling updates `aria-expanded="true|false"` and dynamically switches `aria-label` between *"Open navigation menu"* and *"Close navigation menu"*.
- **Keyboard Dismiss:** Pressing the `Escape` key immediately closes the navigation drawer and programmatically returns focus to `.menu-toggle`.

#### 3. Accessible FAQ Disclosure & Focus Visibility (WCAG 2.4.7)
- **Markup:** Native `<details>` and `<summary>` elements.
- **CSS Focus Styling:**
  ```css
  .faq-list summary:focus-visible {
    outline: 3px solid var(--forest);
    outline-offset: 2px;
    background: #f2f7ef;
    color: var(--forest);
    border-radius: 4px;
  }
  ```
  Addresses Finding 1 of the peer audit. When focused, the entire summary bar illuminates with a soft green background tint (`#f2f7ef`) and a crisp `3px solid var(--forest)` outline, ensuring focus is never clipped.

#### 4. High-Contrast Keyboard Focus Indicators & Verified Tab Order (WCAG 2.4.3 & 2.4.7)
- **Light Surfaces:** `outline: 3px solid var(--forest); outline-offset: 3px;` (**12.86:1** contrast).
- **Dark Surfaces (`#visit`, `.footer`):** `outline: 3px solid var(--lime) !important; outline-offset: 3px !important;` (**10.05:1** to **12.63:1** contrast).
- **Header Nav Links:** Tabbing into header links applies `color: #102b21; outline: 2px solid var(--forest); outline-offset: 4px; border-radius: 3px;`.
- **FAQ Summaries:** `outline: 3px solid var(--forest); outline-offset: 2px; background: #f2f7ef; color: var(--forest); border-radius: 4px;`.
- **Floating Back-to-Top Button:** Double focus ring (`outline: 3px solid var(--forest); box-shadow: 0 0 0 5px var(--lime);`).

##### Verified Sequential Tab-Order Results:
Tested via manual keyboard navigation without mouse interaction across Chrome, Edge, and Firefox:

| Tab Stop # | Component / Focus Target | Element | Focus Indicator Applied | Contrast Ratio | Keyboard Operability |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **1** | Skip-to-content bypass | `.skip-link` | Slides down to `top: 12px`, `3px solid var(--forest)` | **12.86:1** | Enter jumps focus to `#main` |
| **2** | Logo link | `a.brand` | `outline: 2px solid var(--forest); outline-offset: 4px;` | **12.86:1** | Enter navigates to `#top` |
| **3** | Mobile menu button *(Mobile)* | `button.menu-toggle` | `outline: 3px solid var(--forest); outline-offset: 3px;` | **12.86:1** | Enter/Space toggles drawer; Escape closes |
| **4–8** | Primary navigation links | `.main-nav > a` | `outline: 2px solid var(--forest); color: #102b21;` | **12.86:1** | Enter jumps to target section anchor |
| **9** | Header booking CTA | `.nav-cta` | `outline: 3px solid var(--forest); outline-offset: 3px;` | **12.86:1** | Enter jumps to `#booking` |
| **10** | Hero request repair button | `.hero-actions .btn-lime` | `outline: 3px solid var(--forest); outline-offset: 3px;` | **12.86:1** | Enter jumps to `#booking` |
| **11** | Hero explore services button | `.hero-actions .btn-ghost` | `outline: 3px solid var(--forest); outline-offset: 3px;` | **12.86:1** | Enter jumps to `#services` |
| **12–15** | Symptom filter cards | `.problem-card` (01–04) | `outline: 3px solid var(--forest); outline-offset: 3px;` | **12.86:1** | Enter/Space toggles filter; smooth-scrolls |
| **16** | Reset filter button | `#reset-services` | `outline: 2px solid var(--forest); outline-offset: 3px;` | **12.86:1** | Activates via Enter/Space: restores all 6 cards; JavaScript explicitly shifts keyboard focus back to 1st symptom card (Stop 12, `.problem-card[data-filter="tyre"]`) |
| **17–22** | Service card action links | `.service-link` (1–6) | `outline: 2px solid var(--forest); text-decoration: underline;` | **12.86:1** | Enter jumps to `#booking` & pre-selects dropdown |
| **23** | About section location link | `.about-text .text-link` | `outline: 2px solid var(--forest); text-decoration: underline;` | **12.86:1** | Enter jumps to `#visit` |
| **24–27** | Repair booking form controls | `input`, `select`, `textarea` | `border-color: var(--forest); box-shadow: 0 0 0 3px rgba(...)` | **12.86:1** | Standard typing; invalid fields get red ring |
| **28** | Form submit button | `#repair-form button` | `outline: 3px solid var(--forest); outline-offset: 3px;` | **12.86:1** | Enter submits form or focuses first invalid field |
| **29–33** | FAQ question disclosures | `.faq-list summary` | `outline: 3px solid var(--forest); background: #f2f7ef;` | **12.86:1** | Enter/Space expands and collapses answers |
| **34** | Google Maps directions link | `#visit .btn` | `outline: 3px solid var(--lime) !important;` | **10.05:1** | Enter opens Google Maps in new tab |
| **35–41** | Footer navigation links | `.footer a` | `outline: 3px solid var(--lime) !important;` | **12.63:1** | Enter jumps to anchor or dials telephone |
| **42** | Floating "Back to top" | `#back-to-top` | `outline: 3px solid var(--forest); box-shadow: 0 0 0 5px var(--lime);` | **12.86:1** | Enter scrolls to top and returns focus to `#top` |

#### 5. Persistent Form Validation & Screen-Reader Feedback (WCAG 3.3.1, 3.3.2, 4.1.3)
- `<form id="repair-form" novalidate>` prevents fleeting native browser balloons.
- Field errors (`#name-error`, `#phone-error`, `#service-error`) are connected via `aria-describedby` and marked with `role="alert"`.
- When invalid: inputs receive `.has-error` and `aria-invalid="true"`.
- The overall error message is announced via `<div id="form-status" class="form-status error" role="alert" aria-live="polite">`.
- Keyboard focus automatically shifts to the first invalid field upon submission.
- Errors clear dynamically as soon as the user enters valid text.

#### 6. Problem Selector Control Semantics (WCAG 4.1.2)
- Button group contained in `<div class="problem-grid" role="group" aria-label="Filter repair services by symptom">`.
- Each button uses `<button class="problem-card" type="button" data-filter="..." aria-pressed="true|false" aria-controls="services-grid" aria-label="...">`.
- Filter results announced dynamically via `<p id="filter-note" class="filter-note" role="status" aria-live="polite">`.
- Activating a filter smoothly scrolls to `#services` and highlights the matching card without disorienting the keyboard user.

#### 7. Colour Contrast Verification (WCAG 1.4.3 & 1.4.11)

| Color Pair | Foreground | Background | Contrast Ratio | WCAG AA / AAA |
| :--- | :--- | :--- | :--- | :--- |
| Primary text on paper | `#182f27` | `#ffffff` | **14.24:1** | Passes AAA |
| Primary text on cream | `#182f27` | `#f7f7f1` | **13.24:1** | Passes AAA |
| Muted copy on paper | `#3d5044` | `#ffffff` | **8.64:1** | Passes AAA |
| Muted copy on cream | `#3d5044` | `#f7f7f1` | **8.04:1** | Passes AAA |
| Lime on visit dark green | `#def58c` | `#173d2f` | **10.05:1** | Passes AAA |
| Lime on footer dark green | `#def58c` | `#102b21` | **12.63:1** | Passes AAA |
| White on forest green | `#ffffff` | `#15382b` | **12.86:1** | Passes AAA |
| White on footer green | `#ffffff` | `#102b21` | **15.11:1** | Passes AAA |
| Form error text on white | `#b3261e` | `#ffffff` | **7.60:1** | Passes AAA |
| Error banner text on bg | `#991b1b` | `#fdf2f2` | **7.58:1** | Passes AAA |
| Success banner text on bg | `#1e4620` | `#edf7ed` | **9.80:1** | Passes AAA |

---

### Testing Scope (What Was and Wasn't Tested)

- **What Was Tested:**
  - Automated HTML5 syntax validation (100% balanced and closed tags).
  - Keyboard navigation inspection across all 42 interactive tab stops (Tab order, Enter/Space activation, Escape key dismissal, focus retention).
  - Contrast ratios mathematically verified across all text and UI boundaries.
  - Multi-viewport layout verified in Chromium DevTools (320px, 360px, 375px, 412px, 768px, 850px, 1024px, 1150px, 1440px).
  - Reflow verified at 200% and 400% zoom and 320px width without content clipping.
  - Resolved both WCAG failures from the peer audit (Finding 1: FAQ focus; Finding 2: colour contrast) and the usability issue (Finding 3: service action affordance).
- **What Wasn't Tested:**
  - Non-Chromium/Windows screen readers (JAWS, macOS/iOS VoiceOver, Android TalkBack).
  - Physical field trials with customers on handheld smartphones in direct outdoor Ghanaian sunlight.

---

## 4. Responsive Design & Breakpoint Architecture

The fluid layout is governed by 5 explicit breakpoints in [`css/styles.css`](../../css/styles.css):

- **`1150px` (`@media (max-width: 1150px)`):** Container capped at `min(100% - 52px, 1256px)`; hero height scaled to `590px`.
- **`850px` (`@media (max-width: 850px)`):** Mobile navigation drawer activates; services grid shifts to 2 columns (`repeat(2, 1fr)`); booking grid shifts to 2 columns.
- **`650px` (`@media (max-width: 650px)`):** Single-column layout across all grids; sticky bottom action bar (`.mobile-cta`) activates; container padding `calc(100% - 38px)`; floating back-to-top button repositions to `bottom: 84px; right: 18px;`.
- **`400px` (`@media (max-width: 400px)`):** Compact mobile scaling for `.about-stamp` (`86px × 86px`, `5px` border) to fit iPhone SE without clipping.
- **`360px` (`@media (max-width: 360px)`):** Ultra-compact breakpoint for smaller devices; hero title scales to `34px`, providing generous horizontal margins and preventing line overflow down to 320px.

### Responsive Screenshots & Verification

1. **Mobile Viewport (375px & 412px):**
   - Single-column fluid stack, accessible touch targets (minimum 44px), mobile drawer menu.
   - [Rebuilt Mobile Screenshot](screenshots/rebuilt-mobile.png) | [Original Mobile Screenshot](screenshots/original-mobile.png)

2. **Tablet Viewport (768px & 850px):**
   - Balanced 2-column service cards grid, comfortable container padding.
   - [Rebuilt Tablet Screenshot](screenshots/rebuilt-tablet.png) | [Original Tablet Screenshot](screenshots/original-tablet.png)

3. **Desktop Viewport (1024px & 1440px):**
   - 3-column service cards grid, static horizontal header navigation, side-by-side section pairings.
   - [Rebuilt Desktop Screenshot](screenshots/rebuilt-desktop.png) | [Original Desktop Screenshot](screenshots/original-desktop.png)

---

## 5. Visual Consistency & Implemented Design System

All visual rules are consolidated in [`css/styles.css`](../../css/styles.css) (976 lines):

| Token / Category | Exact Value | Purpose in Workshop Identity |
| :--- | :--- | :--- |
| `--ink` | `#182f27` | Primary text and headings |
| `--ink-2` | `#244638` | Secondary copy and navigation links |
| `--forest` | `#15382b` | Deep forest brand green, dark button fill, primary focus ring |
| `--forest-deep` | `#102b21` | Deepest brand green, site footer background |
| `--lime` | `#def58c` | High-contrast lime accent, primary CTA button fill, dark focus ring |
| `--lime-dark` | `#c5ed63` | Interactive hover state for lime buttons |
| `--cream` | `#f7f7f1` | Warm off-white page background canvas |
| `--paper` | `#ffffff` | Pure white background for content cards |
| `--muted` | `#3d5044` | Secondary copy and metadata |
| `--line` | `#e3e9e1` | Subtle decorative divider lines and container borders (decorative; 1.21:1 on `#ffffff`, exempt under WCAG 1.4.11) |
| `--shadow` | `0 20px 60px rgba(15, 38, 24, 0.08)` | Tactile soft card shadow |

---

## 6. Prioritisation and Trade-offs

1. **First: Mobile Usability & Performance:** Replaced the non-responsive 960px container with a fluid layout and lightweight CSS/JS without external frameworks.
2. **Second: Transparent Service & Direct Contact:** Positioned direct phone and WhatsApp booking pathways throughout the user journey.
3. **Third: Customer Confidence & Accessibility:** Maintained WCAG AAA contrast, clear focus indicators, persistent form feedback, and honest indicative pricing.
4. **Fourth: Maintainability:** Clean, documented codebase with a stylesheet kept under 1,000 lines (currently **976 lines**).

---

## 7. Known Limitations

- **Indicative Starting Prices:** Published rates are indicative starting prices; final quotes are confirmed by Kwame after bicycle inspection.
- **Service Discovery vs. Diagnostics:** The problem selector assists in finding everyday services, but mechanical repairs require physical inspection.
- **Demonstration Contact Data:** The business phone numbers (`0244 000 001` and `0322 000 000`) are sample demonstration data provided in the EE01 project brief for testing WhatsApp click-to-chat and `tel:` call link functionality; Kwame's live verified SIM numbers will replace them prior to commercial production launch.

---

## 8. Conclusion

The rebuilt website completely resolves the defects identified during the initial diagnosis and peer accessibility audit. Through semantic HTML structure, fluid mobile-first responsiveness, high-contrast accessible design tokens, persistent form error feedback, and the interactive problem selector, the website provides a trustworthy, professional digital presence for Wheelhouse Bike Repair.
