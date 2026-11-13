# Wheelhouse Bike Repair

A responsive website rebuild for Wheelhouse Bike Repair, a small bicycle repair and tune-up workshop located in Adum Commercial Area, Kumasi, Ghana.

This project focuses on improving mobile usability, accessibility, visual consistency, and customer confidence while maintaining a simple, professional design suited to a local repair workshop.

## 1. Project Overview

Wheelhouse Bike Repair is operated by Kwame, who handles most repairs personally.

The original website contained useful information about the workshop and its services but had several usability and accessibility issues.

These included a fixed-width layout, poor mobile responsiveness, inconsistent styling, non-functional navigation, and contact information that was difficult to reach quickly.

The objective of this rebuild was to address these issues and make it easier for customers to understand Wheelhouse's services and contact the workshop.

## 2. Project Objectives

- Rebuild the existing website using semantic HTML.
- Implement a responsive, mobile-first layout.
- Improve accessibility and navigation.
- Establish a consistent colour palette, typography scale, and spacing system.
- Make service information and contact options easier to access.
- Introduce one additional improvement that addresses a genuine customer need.

## 3. Initial Sketch & Layout Reasoning

The proposed layout follows a mobile-first approach because Wheelhouse's customers often search for repair services on their phones, especially when they need urgent assistance.

The header and hero section come first to introduce the business and provide immediate access to contact information and workshop location details.

The services section follows so customers can quickly identify whether Wheelhouse can handle their repair needs.

The trust and about sections highlight Kwame's experience and the workshop's repair process, addressing the client's concern about professionalism and reliability.

FAQs and service enquiry options appear afterwards to provide additional information and alternative ways to contact the workshop.

The location section provides the workshop's address, opening hours, and contact information.

On desktop, related sections are arranged side by side to make better use of the available space while maintaining the same content priorities.

This structure prioritises customer confidence, accessibility, and ease of contact rather than unnecessary visual decoration.

**Pre-Implementation Layout Sketch:**
The initial layout planning was conducted before implementation using draw.io to define mobile and desktop wireframes, content hierarchy, and section relationships. The original dual-format draw.io file and exported diagram are tracked in the repository:
- [Pre-Implementation Wireframe Sketch (draw.io / PNG)](docs/ee01/sketches/Sketch%20Description.drawio.png)


## 4. Website Rebuild

The original website was refactored using HTML5 and CSS3, with limited JavaScript for necessary interactions.

### Key Improvements

- Semantic page structure and logical heading hierarchy (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Mobile-first responsive layouts using CSS Grid and Flexbox.
- Functional section navigation and keyboard-accessible mobile menu.
- Consistent service-card styling with uniform pricing and turnaround metadata.
- Readable typography scale and structured spacing tokens.
- Accessible FAQ interactions using native HTML5 `<details>` and `<summary>`.
- Prominent contact and workshop information with direct `tel:`, WhatsApp, and email links.
- Keyboard accessibility, visible `:focus-visible` indicators, and skip-to-content bypass link.
- Functional service booking tracker and contact message forms with accessible inline validation, live screen reader announcements, and keyboard focus management.

### Implemented Design System

The design system is implemented using CSS custom properties defined in [`css/styles.css`](css/styles.css) under `:root`.

#### 1. Colour Palette

| Token | Hex Value | Role / Usage in Workshop Interface |
|---|---|---|
| `--color-charcoal-dark` | `#1e2227` | Primary text, brand headings, and dark active button states |
| `--color-charcoal-surface` | `#14171a` | Dark header background and high-contrast site chrome |
| `--color-charcoal-muted` | `#525f6e` | Secondary body text, subheadings, and metadata |
| `--color-text-light` | `#f3f4f6` | High-contrast light text on dark charcoal surfaces |
| `--color-accent-rust` | `#c25424` | Primary call-to-action buttons, interactive links, and focus rings |
| `--color-accent-rust-hover` | `#9e3f16` | Hover and active interaction states for buttons and links |
| `--color-accent-rust-subtle` | `#fbeee7` | Tinted accent backgrounds and subtle interactive highlights |
| `--color-bg-body` | `#f4f5f7` | Neutral light grey background for overall page canvas |
| `--color-bg-surface` | `#ffffff` | Clean white background for service cards and content panels |
| `--color-border` | `#e2e8f0` | Subtle container and card division borders |
| `--color-border-dark` | `#cbd5e1` | Medium border contrast for interactive chip controls |
| `--color-notice-bg` | `#fffbeb` | Warm amber background for limitation notice box |
| `--color-notice-border` | `#f59e0b` | Amber accent border for limitation notice box |
| `--color-notice-text` | `#78350f` | High-contrast dark amber text for limitation messages |

#### 2. Typography Scale

The type scale uses a responsive system sans-serif stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`) to ensure zero-latency font loading on mobile networks in Kumasi.

| Token | CSS rem | Pixel Equivalent | Implementation Usage |
|---|---|---|---|
| `--font-size-xs` | `0.75rem` | 12px | Footer copyright, badge labels, and minor metadata |
| `--font-size-sm` | `0.875rem` | 14px | Service turnaround meta, fact labels, and form help text |
| `--font-size-base` | `1.000rem` | 16px | Body copy, primary navigation links, button text (`line-height: 1.6`) |
| `--font-size-md` | `1.125rem` | 18px | Section subheadings and service finder title |
| `--font-size-lg` | `1.250rem` | 20px | Service card titles and FAQ summary triggers |
| `--font-size-xl` | `1.500rem` | 24px | Major section `<h2>` headings on mobile viewports |
| `--font-size-2xl` | `1.875rem` | 30px | Major section `<h2>` headings on desktop viewports |
| `--font-size-3xl` | `2.250rem` | 36px | Main page `<h1>` hero title |

#### 3. Spacing Tokens

Spacing is governed by an 8-point harmonic modular scale (`1rem = 16px`):

| Token | CSS rem | Pixel Equivalent | Usage |
|---|---|---|---|
| `--space-2xs` | `0.25rem` | 4px | Inline icon gaps, badge padding, subtle offsets |
| `--space-xs` | `0.50rem` | 8px | Button padding (vertical), filter grid gap |
| `--space-sm` | `0.75rem` | 12px | List item margins, compact component padding |
| `--space-md` | `1.00rem` | 16px | Standard mobile container padding, card inner padding |
| `--space-lg` | `1.50rem` | 24px | Section content spacing, card margins |
| `--space-xl` | `2.00rem` | 32px | Section grid gaps, desktop container padding |
| `--space-2xl` | `3.00rem` | 48px | Vertical section padding on mobile viewports |
| `--space-3xl` | `4.00rem` | 64px | Vertical section padding on desktop viewports |

#### 4. Container Width & Responsive Breakpoints

- **Maximum Container Width:** `--container-max-width: 1120px` (centered with fluid horizontal padding).
- **Responsive Media Query Breakpoints:**
  - `480px` (`min-width: 480px`): Fact list rows, notice action buttons, booking actions, and contact buttons transition from full-width stacked columns to inline flex rows.
  - `600px` (`min-width: 600px`): Hero call-to-action buttons ("Call Workshop" and "Location & Hours") expand into a side-by-side flex row.
  - `640px` (`min-width: 640px`): Workshop services grid transitions from a single mobile column to a 2-column grid (`repeat(2, 1fr)`).
  - `768px` (`min-width: 768px`): Container horizontal padding increases to `--space-xl` (`32px`); footer transitions from stacked to a space-between horizontal flex row.
  - `992px` (`min-width: 992px`): Navigation breakpoint — mobile hamburger menu toggle (`#menu-toggle`) hides (`display: none`), and primary navigation links (`#primary-nav`) switch from an absolute-positioned dropdown drawer to a static horizontal desktop navigation bar.
  - `1024px` (`min-width: 1024px`): Desktop multi-column layout — services grid expands to a 3-column grid (`repeat(3, 1fr)`); section pairs ("Why Choose Wheelhouse" + "About Wheelhouse", "FAQs" + "Book a Service") form side-by-side two-column grids (`1fr 1fr`); contact section (`.contact-grid`) transitions into a side-by-side layout.

#### 5. How Design Choices Support Wheelhouse's Workshop Identity

Kwame operates an active bicycle repair workshop in Adum Commercial Area, Kumasi. His clientele consists of daily bicycle commuters, parents, and cycling enthusiasts who need reliable repairs, honest quotes, and fast service.

- **Utilitarian & Grounded:** Charcoal dark (`#1e2227`) and muted slate (`#525f6e`) convey workshop tools, steel, and mechanical dependability without appearing corporate or detached.
- **Warm Craftsmanship:** Rust orange (`#c25424`) reflects craftsmanship, workshop grease, and warm local approachability while providing high-contrast visual affordance for urgent actions (such as phone calls).
- **High Readability in Sunlight:** The high-contrast off-white body (`#f4f5f7`) and pure white panels (`#ffffff`) ensure prices and turnaround times remain effortlessly legible on mobile screens under direct Ghanaian sunlight.
- **Performance Without Bloat:** Using standard system fonts eliminates external font network downloads, ensuring instant rendering on mobile networks in Kumasi.

## 5. Additional Improvement — Find Your Repair

Beyond the baseline rebuild, I implemented the "Find Your Repair" service finder (`.repair-finder`) to solve a critical customer friction point: visitors frequently know what is wrong with their bike (e.g. "my chain slips" or "flat tyre"), but do not know the trade names used by bicycle mechanics.

The feature presents **6 interactive filter controls** (1 "Show All" control plus 5 symptom-based problem filters):

1. **All Services (6)** (`data-service-target="all"`): Resets the filter and displays the complete 6-service workshop catalogue.
2. **Flat Tyre / Puncture** (`data-service-target="service-tyre"`): Highlights and filters directly to **Tyre & Tube Replacement**.
3. **Brake Problems** (`data-service-target="service-brakes"`): Highlights and filters directly to **Brake Overhaul**.
4. **Gear Slipping** (`data-service-target="service-gears"`): Highlights and filters directly to **Gear System Overhaul**.
5. **General Tune-Up** (`data-service-target="service-tuneup"`): Highlights and filters directly to **Basic Tune-Up**.
6. **Full Rebuild** (`data-service-target="service-rebuild"`): Highlights and filters directly to **Full Bike Rebuild**.

*(Note: Custom Builds & Upgrades remains accessible as part of the full catalogue when "All Services" is selected.)*

### Interactive Behaviour & Implementation

- **HTML Controls:** Implemented as semantic `<button type="button" class="repair-finder-card">` controls with embedded inline SVG iconography and text labels within a `<div class="repair-finder-grid" role="group" aria-label="Filter repairs by symptom">`.
- **JavaScript Filtering:** [`js/script.js`](js/script.js) listens for button clicks, toggles the `hidden` attribute across `.service-card` elements, applies the `.is-filtered` CSS class to the grid, and updates the `aria-pressed` state. Clicking an already active button toggles it back to show all services.
- **Accessibility & Status Announcements:** A status region with `aria-live="polite"` (`#service-filter-status`) dynamically announces matching results to assistive technology (e.g., *"Showing matching repair: Brake Overhaul"*). A dedicated reset button (`#reset-service-filter`) allows keyboard and screen reader users to restore all cards and smoothly shifts focus back to the primary filter control.
- **Visual Evidence:**
  - [Service Finder Default State Screenshot](docs/ee01/screenshots/service-finder-default.png)
  - [Service Finder Filtered State Screenshot](docs/ee01/screenshots/service-finder-filtered.png)

**Detailed documentation:** [Additional Improvement Report](docs/ee01/improvement.md)

## 6. Testing, Evaluation & Evidence

The rebuilt website was systematically evaluated across mobile, tablet, and desktop viewports against semantic markup, responsive adaptability, keyboard accessibility, and visual consistency.

### Responsive Design Evidence & Viewport Verification

Testing was conducted across three defined viewport categories in accordance with AmaliTech EE01 testing protocols:

1. **Mobile Viewport (Tested at 375px & 412px):**
   - Single-column fluid stack; full touch target heights (minimum 44px); collapsible header menu drawer; horizontally wrapped repair-finder chip buttons.
   - [Original Mobile Screenshot (412px)](docs/ee01/screenshots/original-mobile.png) — *Evidence of fixed 960px container, microscopic scaled text, and horizontal overflow.*
   - [Rebuilt Mobile Screenshot (375px / 412px)](docs/ee01/screenshots/rebuilt-mobile.png) — *Evidence of fluid responsive layout, readable typography, and accessible tap targets.*

2. **Tablet Viewport (Tested at 768px):**
   - 2-column service cards grid (`640px` breakpoint); increased container padding (`32px`); horizontal footer arrangement.
   - [Original Tablet Screenshot (768px)](docs/ee01/screenshots/original-tablet.png) — *Evidence of awkward desktop scaling and non-responsive container margins.*
   - [Rebuilt Tablet Screenshot (768px)](docs/ee01/screenshots/rebuilt-tablet.png) — *Evidence of balanced 2-column grid and fluid container spacing.*

3. **Desktop Viewport (Tested at 1024px & 1440px):**
   - 3-column service cards grid; static horizontal header navigation; side-by-side section rows ("Why Wheelhouse" + "About", "FAQs" + "Book a Service", and "Workshop Details" + "Contact Action Panel"); centered container capped at `1120px`.
   - [Original Desktop Screenshot (1440px)](docs/ee01/screenshots/original-desktop.png) — *Evidence of outdated fixed 960px layout with inconsistent inline accent colours.*
   - [Rebuilt Desktop Screenshot (1024px / 1440px)](docs/ee01/screenshots/rebuilt-desktop.png) — *Evidence of modern, professional 3-column layout and coherent trade workshop design system.*

### Accessibility Implementation Evidence

The rebuild was engineered with baseline accessibility embedded into the markup and styling:

1. **Semantic HTML Landmarks:**
   - `<header class="site-header">` (site banner landmark)
   - `<nav id="primary-nav" class="primary-nav" aria-label="Primary navigation">` (primary navigation landmark)
   - `<main id="main-content">` (main content landmark)
   - `<section>` wrappers for major page areas (`#hero`, `#services`, `#why-us`, `#about`, `#faq`, `#booking`, `#contact`)
   - `<article class="service-card" id="...">` for each self-contained repair service offering
   - `<footer class="site-footer">` (contentinfo footer landmark)

2. **Strict Heading Hierarchy:**
   - Single `<h1>`: `Wheelhouse Bike Repair` (`.hero-title`)
   - `<h2>` level for major sections (`Workshop Services & Pricing`, `Why Choose Wheelhouse?`, `About Wheelhouse`, `Common Questions`, `Book a Service`, `Find Our Workshop & Get In Touch`)
   - `<h3>` level for sub-sections and cards (`What does your bike need?`, individual service card titles, `Workshop Information`, `Contact the Workshop`)
   - `<h4>` level for minor policy titles (`Drop Off Policy`)
   - No skipped heading levels throughout the entire document.

3. **Skip-to-Content Bypass Link:**
   - Implemented as `<a href="#main-content" class="skip-link">Skip to main content</a>` positioned at the top of `<body>`.
   - Hidden off-screen by default (`top: -60px`) and slides into clear view upon keyboard focus (`:focus { top: 1rem; }`), allowing keyboard users to bypass header navigation directly to main content.

4. **Mobile Navigation Keyboard Support & ARIA Behaviour:**
   - Toggle button `<button id="menu-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Toggle navigation menu">`.
   - Toggling state dynamically updates `aria-expanded` between `"true"` and `"false"`.
   - Supports keyboard triggering via `Enter` and `Space`.
   - Pressing the `Escape` key immediately closes the navigation drawer and safely returns keyboard focus to the menu toggle button.
   - Selecting any navigation link inside the menu closes the drawer automatically.
   - Includes `<noscript>` fallback styles in `<head>` ensuring navigation links remain fully visible and usable if JavaScript is disabled.

5. **Native FAQ Disclosure Accessibility:**
   - Built using native HTML5 `<details class="faq-item">` and `<summary class="faq-trigger">` elements.
   - Provides native browser keyboard navigation (Tab and Enter/Space) and natively exposes expanded/collapsed states to screen readers without relying on custom ARIA scripts.

6. **Visible Focus Indicators:**
   - Global `:focus-visible` styling applied in [`css/styles.css`](css/styles.css):
     ```css
     :focus-visible {
       outline: 3px solid var(--color-accent-rust);
       outline-offset: 2px;
     }
     ```
   - Guarantees clear visual affordance across all interactive buttons, navigation links, skip link, summary elements, and input fields.

7. **Service Finder Semantics & Live Announcements:**
   - Button group is semantically contained in `<div class="repair-finder-grid" role="group" aria-label="Filter repairs by symptom">`.
   - Each chip uses `<button type="button" class="repair-finder-card" aria-pressed="true|false" aria-controls="services-grid">`.
   - Results are announced to screen readers via an `aria-live="polite"` region (`#service-filter-status`).
   - The "View All Services" reset button smoothly shifts focus back to the first filter button (`showAllServices(true)`).

8. **Colour Contrast & Readability Verification:**
   - Calculated relative luminance and contrast ratios confirm WCAG AA / AAA compliance:
     - Charcoal text (`#1e2227`) on white card background (`#ffffff`): **15.65:1** (exceeds WCAG AAA requirement of 7.0:1).
     - Charcoal text (`#1e2227`) on body canvas (`#f4f5f7`): **14.28:1** (exceeds WCAG AAA requirement of 7.0:1).
     - Accent rust (`#c25424`) on white background: **4.60:1** (exceeds WCAG AA requirement of 4.5:1 for standard text).
     - Muted slate text (`#525f6e`) on white background: **6.47:1** (exceeds WCAG AA requirement of 4.5:1).
     - Limitation notice text (`#78350f`) on amber background (`#fffbeb`): **8.52:1** (exceeds WCAG AAA requirement of 7.0:1).
   - Base font size set to `1rem` (16px) with a `1.6` line-height, ensuring comfortable reading without zooming.

### Verified Checks vs. Manual Limitations

- **Directly Verified Checks:**
  - Automated HTML5 syntax validation.
  - Keyboard navigation inspection (Tab order, Enter/Space activation, Escape key dismiss, focus return).
  - Contrast ratio verification using WCAG formulas.
  - Multi-viewport layout testing in Chromium DevTools (375px, 412px, 768px, 1024px, 1440px).
- **Checks Requiring Further Manual Verification:**
  - Full end-user testing across dedicated screen readers (NVDA on Windows, VoiceOver on iOS/macOS, TalkBack on Android).
  - Physical device testing under high ambient glare in Kumasi.

**Detailed audit documentation:** [Final Website Audit Report](docs/ee01/audit.md)

## 7. Project Documentation

| Document | Purpose |
|---|---|
| [Original Website Diagnosis](docs/ee01/diagnosis.md) | Identified defects, root causes, and business impact |
| [Pre-Implementation Layout Sketch](docs/ee01/sketches/Sketch%20Description.drawio.png) | Pre-build wireframe structure and mobile-first layout planning |
| [Additional Improvement](docs/ee01/improvement.md) | Service finder implementation, controls, and customer justification |
| [Final Website Audit](docs/ee01/audit.md) | Semantic HTML, accessibility implementation, and responsive evaluation |

## 8. Technologies Used

- HTML5
- CSS3
- JavaScript
- Git and GitHub

The website uses a lightweight implementation without external UI frameworks.

## 9. Running the Project Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/zakari999/wheelhouse-bike-repair.git
   ```

2. Navigate into the project:

   ```bash
   cd wheelhouse-bike-repair
   ```

3. Open the project in VS Code.

4. Run `index.html` using Live Server or another local development server.

No build process or package installation is required.

## 10. Known Limitations

- The booking and contact forms provide functional client-side submission and queue tracking; persistence to a live backend database is reserved for subsequent server-side modules.
- The workshop's contact details are preserved from the provided starter files and require verification before real-world deployment.
- The service finder is a discovery tool rather than an automated repair diagnosis system.
- Further accessibility testing across physical assistive technologies would be necessary before a production release.

---

**Project:** Wheelhouse Bike Repair  
**Module:** EE01 — Web & UI Essentials  
**Programme:** AmaliTech National Service Training