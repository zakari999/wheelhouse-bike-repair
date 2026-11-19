# EE01 — Write-up of Fixes: Verification of Audit Findings

**Project:** Wheelhouse Bike Repair  
**Document:** Write-up of Fixes (What Changed, Why, and Hand Verification)  
**Standard:** WCAG 2.2 Level AA  
**Audit Received:** [Peer Accessibility Audit by Jeremiah Narteh Akuaku](peer-accessibility-audit.md)  
**Live Site:** [https://zakari999.github.io/wheelhouse-bike-repair/](https://zakari999.github.io/wheelhouse-bike-repair/)

---

## 1. Overview of the Fix Process

Following receipt of the peer accessibility audit from Jeremiah Narteh Akuaku, every flagged issue and advisory recommendation was systematically resolved in code, verified by hand without reliance solely on automated scanners, and documented below.

This write-up covers:
1. **Finding 1:** Keyboard focus visibility on FAQ questions (WCAG 2.4.7)
2. **Finding 2:** Color contrast on content boxes (WCAG 1.4.3)
3. **Finding 3:** Interactive affordance of the "Get a Quote" link (WCAG 3.2.4)
4. **Advisory 1:** Outdated copyright year
5. **Advisory 2:** Missing hero imagery illustrating workshop operations
6. **Advisory 3:** Text wrapping and cramped contact details on mobile
7. **Core Verification:** Semantic structure, text resizing & 400% reflow, and full keyboard navigation

---

## 2. Fixes for Flagged Audit Findings

### Finding 1: A Keyboard User Cannot See Where They Are in the FAQ

- **Audit Observation:** Collapsed FAQ summaries showed zero visible focus indicator when navigating via `Tab`. When expanded, the only indicator was a thin orange bottom border that was easily clipped.
- **WCAG Success Criterion:** [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) (Level AA) — **Operable**
- **Who It Affects:** Keyboard-only users (such as a customer with an arm in a cast), switch-access users, and screen-magnifier users who lose their position on the page.

#### What Was Changed:
Replaced the fragile border-only indicator with a high-contrast focus style in [`css/styles.css`](../../css/styles.css):

```css
.faq-list summary:focus-visible {
  outline: 3px solid var(--forest);
  outline-offset: 2px;
  background: #f2f7ef;
  color: var(--forest);
  border-radius: 4px;
}
```

#### Why:
A full background highlight (`#f2f7ef`) combined with a `3px solid var(--forest)` outline and positive `2px` offset ensures the focus boundary sits outside the element's box, preventing clipping by parent containers and providing **12.86:1** contrast against white and cream backgrounds.

#### How It Was Verified by Hand:
1. Loaded `index.html` in Chrome without mouse interaction.
2. Pressed `Tab` through the page to the Frequently Asked Questions section.
3. Confirmed that every `<summary>` illuminates with a crisp green outline and soft background tint when focused.
4. Pressed `Enter` and `Space` to toggle questions open and closed, confirming focus remains visible in both expanded and collapsed states.

---

### Finding 2: Orange Text on Grey Boxes Falls Short of Contrast Threshold

- **Audit Observation:** Orange text (`#C25424`) on light grey containers (`#F1F3F5`) scored **4.11:1**, failing the WCAG AA minimum threshold of 4.5:1.
- **WCAG Success Criterion:** [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) (Level AA) — **Perceivable**
- **Who It Affects:** People with low vision, older users, individuals with color-vision deficiencies, and anyone viewing a mobile screen under direct Ghanaian sunlight in Kumasi.

#### What Was Changed:
Discarded the arbitrary starter colors and implemented a unified, high-contrast trade-workshop design system under `:root` in [`css/styles.css`](../../css/styles.css):
- Primary text (`--ink: #182f27`) on white: **14.24:1** (Passes AAA)
- Primary text (`--ink: #182f27`) on cream (`#f7f7f1`): **13.24:1** (Passes AAA)
- Forest green (`--forest: #15382b`) on white: **12.86:1** (Passes AAA)
- Brand lime (`--lime: #def58c`) on dark forest (`#15382b` / `#102b21`): **10.05:1** to **12.63:1** (Passes AAA)
- Form error text (`#b3261e`) on white: **7.60:1** (Passes AAA)

#### Why:
Elevating each foreground and background pair well above the 4.5:1 minimum threshold satisfies WCAG Level AA (and Level AAA) contrast requirements (1.4.3 and 1.4.6), ensuring legibility for users with low vision or color-vision deficiencies.

#### How It Was Verified by Hand:
1. Recalculated relative luminance values mathematically for every paired token.
2. Re-scanned with WebAIM WAVE and Chrome DevTools Lighthouse Accessibility Audit.
3. Verified zero contrast errors across all cards, buttons, badges, and footer links.

---

### Finding 3: "Get a Quote" Does Not Look Clickable

- **Audit Observation:** The "Get a Quote" link in the Custom Builds card was styled identically to the static, unclickable price tags ("From GH₵ 150") in adjacent cards, misleading sighted users into thinking it was plain text.
- **WCAG Success Criterion:** [3.2.4 Consistent Identification](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html) (Level AA) — **Understandable**
- **Who It Affects:** All sighted users, particularly people with cognitive or learning disabilities who rely on clear, consistent visual cues to identify clickable actions.

#### What Was Changed:
Separated service price displays from interactive action links. In [`index.html`](../../index.html) and [`css/styles.css`](../../css/styles.css), every service card now features an explicit circular `.service-link` action button with an arrow icon and descriptive `aria-label`:

```html
<a href="#booking" class="service-link" data-service="Custom builds &amp; upgrades"
  aria-label="Enquire about custom builds and upgrades">
  <svg class="icon" aria-hidden="true">
    <use href="#i-arrow-up" />
  </svg>
</a>
```

```css
.service-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e7f2db;
  color: #15382b;
  display: grid;
  place-items: center;
  transition: background 0.2s, color 0.2s, transform 0.2s;
}
.service-link:hover {
  background: #cde98c;
  color: #102b21;
  transform: scale(1.05);
}
.accent-card .service-link {
  background: #15382b;
  color: #ffffff;
}
```

#### Why:
Links now possess distinct interactive affordances (distinct circular button container, directional arrow icon, tactile hover scaling, accessible descriptive `aria-label`, and high-contrast 3px focus ring) that clearly distinguish them from static price labels.

#### How It Was Verified by Hand:
1. Visually compared static starting prices against action links.
2. Tapped and keyboard-tabbed to each service card link.
3. Confirmed that clicking any service link smoothly navigates to `#booking` and automatically pre-selects that specific service in the booking dropdown.

---

## 3. Fixes for Advisory Recommendations

### Advisory 1: Outdated Copyright Year

- **Audit Observation:** Footer displayed "©2023", undermining trust and currency for an active business.
- **What Was Changed:** Replaced the hardcoded year with an unpopulated `<span id="year"></span>`, dynamically set upon page load by `initYear()` in [`js/script.js`](../../js/script.js) using `new Date().getFullYear()`, preventing a stale static fallback.
- **How Verified:** Inspected rendered DOM across refreshes.

### Advisory 2: Missing Hero Imagery

- **Audit Observation:** No image at the top showed what the business does at a glance.
- **What Was Changed:** Integrated a high-resolution workshop photo of Kwame working on a bicycle ([`assets/kwame-workshop.jpg`](../../assets/kwame-workshop.jpg)) with descriptive `alt="Kwame working on a bicycle in the Wheelhouse repair workshop in Kumasi"`, accompanied by an inline SVG fallback.
- **How Verified:** Inspected responsive scaling across mobile (375px), tablet (768px), and desktop (1440px) viewports.

### Advisory 3: Contact Details Wrapping on Mobile

- **Audit Observation:** "Prefer email?" text wrapped awkwardly beside the email link on phone screens.
- **What Was Changed:** Restructured the booking and contact sections into responsive single-column stacked cards on viewports below 650px.
- **How Verified:** Tested in Chrome DevTools device mode at 320px and 375px widths, confirming ample breathing room without overlapping text.

---

## 4. Verification of Core Assessment Objectives

### 1. Semantic Page Structure (WCAG 1.3.1)
- Valid HTML5 landmark structure: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- Heading hierarchy strictly enforced without skipped levels: single `<h1>` &rarr; `<h2>` section headings &rarr; `<h3>` card titles.
- Zero unclosed tags or syntax violations (verified via standard parser).

### 2. Text Resizing and 400% Zoom Reflow (WCAG 1.4.4 & 1.4.10)
- Tested at **200%** and **400%** browser zoom in Chrome and Edge, and at an explicit **320px** viewport width.
- Multi-column grids collapse to a single fluid column using CSS Grid and Flexbox (`grid-template-columns: 1fr; width: 100%`).
- Verified that all text, cards, buttons, and forms wrap naturally within the inline flow; no text is clipped, no interactive controls are truncated, and two-dimensional scrolling is entirely avoided without relying on overflow masking.

### 3. Keyboard Navigation & Focus Operability (WCAG 2.1.1, 2.1.2, 2.4.7)
- **Skip Link:** `<a class="skip-link" href="#main">Skip to main content</a>` slides down upon focus, allowing keyboard users to bypass navigation.
- **Tab Order:** Follows a logical top-to-bottom sequence throughout the page.
- **No Traps:** Tab and Shift+Tab navigate into and out of all forms, details toggles, dialogs, and mobile drawers freely.
- **Floating Back-to-Top Button:** Enters tab order only when scrolled past 350px (`visibility: visible`); provides high-contrast double focus ring (`outline: 3px solid var(--forest); box-shadow: 0 0 0 5px var(--lime);`).
- **Dark Surface Focus Rings:** Buttons and links in the `#visit` section and `.footer` use `outline: 3px solid var(--lime) !important;` to ensure visibility against dark green surfaces.

---

## 5. Summary of Verification Status

| Deliverable Requirement | Verification Method | Status |
| :--- | :--- | :--- |
| **All Peer Audit Issues Fixed** | Manual keyboard & DOM inspection of each finding | **100% Fixed** |
| **Hand Verification** | Keyboard traversal, NVDA screen-reader speech, 400% zoom | **Verified** |
| **Why Each Change Was Made** | Documented above with WCAG principles and user impact | **Complete** |
| **Further Improvement Included** | Find Your Repair symptom filter documented in [improvement.md](improvement.md) | **Complete** |
| **Audit of Pair Site Included** | Jerry Akuaku audit documented in [audit-of-pair-site.md](audit-of-pair-site.md) | **Complete** |
