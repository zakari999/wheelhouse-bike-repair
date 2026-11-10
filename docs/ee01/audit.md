# EE01 — Final Website Audit

## 1. Audit Overview

This audit evaluates the rebuilt Wheelhouse Bike Repair website against semantic HTML, baseline accessibility, responsiveness, and visual consistency.

The main objective was to improve the experience for customers searching for bicycle repairs on their phones while presenting Wheelhouse as a professional and reliable local workshop.

The evaluation focuses on whether the technical and design decisions address the client's actual business needs rather than simply improving the website's appearance.

## 2. Semantic HTML

The original website relied heavily on generic `<div>` elements and did not provide clear semantic page landmarks.

The rebuild in [`index.html`](../../index.html) introduces:

- **Landmark Elements:**
  - `<header class="site-header">` for the top banner and navigation container.
  - `<nav id="primary-nav" class="primary-nav" aria-label="Primary navigation">` for site navigation.
  - `<main id="main-content">` for the central content landmark.
  - `<footer class="site-footer">` for workshop copyright and back-to-top shortcut.
- **Sectioning & Articles:**
  - Major areas wrapped in `<section>` elements (`#hero`, `#services`, `#why-us`, `#about`, `#faq`, `#booking`, `#contact`).
  - Repair cards marked as independent `<article class="service-card" id="...">` elements.
- **Strict Heading Hierarchy:**
  - Single `<h1>` for page identity: `Wheelhouse Bike Repair` (`.hero-title`).
  - `<h2>` for primary section titles (`Workshop Services & Pricing`, `Why Choose Wheelhouse?`, `About Wheelhouse`, `Common Questions`, `Book a Service`, `Find Our Workshop & Get In Touch`).
  - `<h3>` for component titles and card names (`What does your bike need?`, `.service-title`, `Workshop Information`, `Contact the Workshop`).
  - `<h4>` for minor sub-policy headings (`Drop Off Policy`, `Notice: Contact Form Inactive`).
  - No skipped heading levels occur throughout the document.
- **Native Disclosure Controls:**
  - Frequently asked questions use native `<details class="faq-item">` and `<summary class="faq-trigger">` elements.
- **Semantic Forms & States:**
  - Inactive contact form uses `<fieldset disabled class="form-fieldset">`, `<legend class="form-legend">`, explicitly associated `<label>` controls with `for` and `id` pairs, proper `type` attributes (`email`, `tel`), and `<button disabled aria-disabled="true">`.

**Evaluation:** These changes make the page structure meaningful for users and assistive technologies, improving accessibility and maintainability without introducing external framework dependencies.

## 3. Baseline Accessibility

The rebuild addresses several accessibility weaknesses identified in the original implementation.

### Implementation Evidence

1. **Skip-to-Content Link:**
   - Markup: `<a href="#main-content" class="skip-link">Skip to main content</a>` (line 19 of `index.html`).
   - Styling: Positioned off-screen (`top: -60px`), sliding into view on focus (`.skip-link:focus { top: var(--space-md); }`). Allows keyboard users to bypass navigation directly to main content.

2. **Mobile Menu Keyboard Functionality & ARIA Behaviour:**
   - Controls: `<button type="button" class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Toggle navigation menu">`.
   - Interaction: Handled in [`js/script.js`](../../js/script.js). Supports `Enter` and `Space` activation. Pressing `Escape` closes the open menu and explicitly returns focus to `#menu-toggle`. Nav link clicks and clicks outside also safely close the drawer.
   - Fallback: `<noscript>` styling in `<head>` ensures navigation links display statically if JavaScript is unavailable.

3. **Native FAQ Accessibility:**
   - Implemented via HTML5 `<details>` and `<summary>` elements.
   - Keyboard navigable out of the box (Tab and Enter/Space), natively exposing disclosure states (`expanded`/`collapsed`) to screen readers without custom ARIA scripting.

4. **Visible Focus Indicators:**
   - Global stylesheet rule in [`css/styles.css`](../../css/styles.css):
     ```css
     :focus-visible {
       outline: 3px solid var(--color-accent-rust);
       outline-offset: 2px;
     }
     ```
   - Verified across buttons, links, summary triggers, chip filters, and form inputs.

5. **Service Finder Semantics & Live Announcements:**
   - Button group contained in `<div class="repair-finder-grid" role="group" aria-label="Filter repairs by symptom">`.
   - Each chip uses `<button type="button" class="repair-finder-card" aria-pressed="true|false" aria-controls="services-grid">`.
   - Results announced via `<div id="service-filter-status" class="service-filter-status" aria-live="polite" hidden>`.
   - Reset action ("View All Services &rarr;") resets card visibility and restores focus to `filterButtons[0]`.

6. **Colour Contrast & Readability:**
   - Evaluated using standard WCAG contrast ratio calculations:
     - Primary text `#1e2227` on card surface `#ffffff`: **15.65:1** (WCAG AAA compliant; threshold 7.0:1).
     - Primary text `#1e2227` on body canvas `#f4f5f7`: **14.28:1** (WCAG AAA compliant).
     - Accent rust `#c25424` on `#ffffff`: **4.60:1** (WCAG AA compliant for normal text; threshold 4.5:1).
     - Muted slate `#525f6e` on `#ffffff`: **6.47:1** (WCAG AA compliant).
     - Limitation notice text `#78350f` on `#fffbeb`: **8.52:1** (WCAG AAA compliant).
   - Base typography is `1rem` (16px) with a `1.6` line-height, preventing mobile pinch-to-zoom requirements.

### Verification Status & Limitations

- **Checks Directly Verified:**
  - Keyboard tab sequence and focus visibility across all interactive elements.
  - Escape key dismiss and focus return for mobile navigation drawer.
  - `aria-expanded` and `aria-pressed` dynamic state updates in Chromium DevTools accessibility tree.
  - Contrast ratios mathematically verified against WCAG specifications.
- **Checks Requiring Further Manual Verification:**
  - Formal usability testing with end-users relying on screen readers (NVDA, JAWS, VoiceOver, TalkBack).
  - Usability testing under intense outdoor sunlight in Kumasi.

## 4. Responsive Design

The original website used fixed 960px containers and float-based layouts, resulting in severe horizontal overflow and unreadable text on mobile devices.

The rebuild implements a fluid mobile-first architecture:

- **Breakpoints Implemented:**
  - `480px`: Multi-column/row transitions for facts list, notice actions, booking actions, and contact buttons.
  - `600px`: Hero action buttons flex row.
  - `640px`: Workshop services grid expands to 2 columns (`repeat(2, 1fr)`).
  - `768px`: Tablet container horizontal padding increases to 32px; footer layout expands to horizontal row.
  - `992px`: Header navigation transitions from mobile drawer to horizontal desktop bar.
  - `1024px`: Desktop multi-column layout — services grid expands to 3 columns (`repeat(3, 1fr)`); section pair rows and contact grid switch to side-by-side two-column grids (`1fr 1fr`).
- **Container Sizing:** Fluid width with maximum width capped at `1120px` (`--container-max-width`).

### Responsive Evidence & Tested Viewport Widths

1. **Mobile Viewport (Tested at 375px & 412px):**
   - Single-column card stack, accessible touch targets (minimum 44px), collapsible navigation.
   - [Original Mobile Screenshot (412px)](screenshots/original-mobile.png)
   - [Rebuilt Mobile Screenshot (375px / 412px)](screenshots/rebuilt-mobile.png)

2. **Tablet Viewport (Tested at 768px):**
   - 2-column service card layout, horizontal footer arrangement.
   - [Original Tablet Screenshot (768px)](screenshots/original-tablet.png)
   - [Rebuilt Tablet Screenshot (768px)](screenshots/rebuilt-tablet.png)

3. **Desktop Viewport (Tested at 1024px & 1440px):**
   - 3-column service card layout, horizontal navigation, side-by-side section pairings.
   - [Original Desktop Screenshot (1440px)](screenshots/original-desktop.png)
   - [Rebuilt Desktop Screenshot (1024px / 1440px)](screenshots/rebuilt-desktop.png)

**Evaluation:** The responsive layout remains legible and operable across devices without requiring horizontal scrolling.

## 5. Visual Consistency

The original website suffered from inconsistent inline accent colours across service cards, tiny fixed font sizes (11px–12px), and arbitrary inline spacing.

The rebuild establishes a deliberate design system in [`css/styles.css`](../../css/styles.css):

| Token / Category | Exact Value | Purpose in Workshop Identity |
|---|---|---|
| `--color-charcoal-dark` | `#1e2227` | Primary text and dark button fill |
| `--color-charcoal-surface`| `#14171a` | Dark header chrome |
| `--color-charcoal-muted`  | `#525f6e` | Secondary copy and turnaround metadata |
| `--color-text-light`      | `#f3f4f6` | High-contrast light text on dark surfaces |
| `--color-accent-rust`     | `#c25424` | Primary call to action, active borders, and focus rings |
| `--color-accent-rust-hover`| `#9e3f16` | Interactive hover state |
| `--color-bg-body`         | `#f4f5f7` | Neutral light grey background |
| `--color-bg-surface`      | `#ffffff` | Clean white card and panel background |
| `--color-border`          | `#e2e8f0` | Subtle container divisions |
| `--color-notice-bg`       | `#fffbeb` | Amber limitation notice background |
| `--color-notice-border`   | `#f59e0b` | Amber notice border |
| `--color-notice-text`     | `#78350f` | High-contrast notice text |
| `--font-family-base`      | System sans-serif stack | Zero network latency on local mobile networks |
| Spacing scale (`--space-*`)| 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px | Consistent 8-point modular spacing |
| `--container-max-width`   | `1120px` | Centered maximum layout boundary |

**Evaluation:** The restrained design supports Kwame's trade identity: practical, clean, and reliable rather than decorative or trend-driven.

## 6. Prioritisation and Trade-offs

The following decisions were prioritised based on the client's brief.

**First: Mobile usability**

Customers frequently search for repair services urgently using their phones. Fixing the original non-responsive layout was therefore a higher priority than adding visual effects.

**Second: Easy contact**

Prominent contact actions were introduced near the top of the page, reducing the effort required to contact the workshop.

**Third: Trust and clarity**

The website highlights the existing repair process, pricing information, and Kwame's experience to address the owner's concern about professionalism.

**Fourth: Maintainability**

Plain HTML, CSS, and limited JavaScript were preferred over additional frameworks because the project is small and the module focuses on web fundamentals.

## 7. Known Limitations

- The original business contact details require verification before real-world deployment.
- The booking and contact forms are reserved for future development and are not currently active.
- The Find Your Repair feature suggests relevant services but cannot diagnose bicycle problems.
- More extensive accessibility testing would be beneficial before production deployment.

These limitations were considered when deciding which features to implement within the current module.

## 8. Conclusion

The rebuilt website addresses the main weaknesses identified during the original diagnosis through improved page structure, mobile responsiveness, semantic markup, accessible interaction patterns, and visual consistency.

The implementation prioritises clear service information, customer confidence, and convenient contact options.

The resulting design better supports Wheelhouse's business objectives while remaining simple, maintainable, and suitable for future improvements.