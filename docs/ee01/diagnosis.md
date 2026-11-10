# EE01 — Existing Website Diagnosis

**Business:** Wheelhouse Bike Repair, Adum Commercial Area, Kumasi  
**Assessment objective:** Analyse (25%)  
**Scope:** Original starter website, before modifications

## 1. Business context and diagnosis goal

Wheelhouse is a small bicycle repair workshop serving customers who may need help urgently. According to the brief, the owner, Kwame, is concerned that visitors comparing workshops on their phones do not see enough evidence that Wheelhouse is reliable and professional. The primary goal is therefore not to make the page look fashionable: it is to help customers understand the services, trust the workshop and contact or find it quickly.

This diagnosis distinguishes **observed defects** from **likely business consequences**. Customer loss or conversion impact has not been measured; those impacts are risks inferred from the client's brief, not proven outcomes.

## 2. Inspection method and evidence

**Source files inspected:** `index.html`, `css/styles.css`, and `js/script.js`.

**Viewport inspection:** Original website viewed in Chrome DevTools at mobile (412 × 924 px in the initial inspection; a separate mobile full-page capture was saved), tablet (768 × 1024 px), and desktop (1440 px wide). The original page was not changed for these screenshots. Because the page lacks a viewport meta declaration, browser emulation can scale the desktop layout down on smaller screens; screenshot appearance should not be mistaken for genuine responsiveness.

**Behaviour inspection:** Original navigation links, FAQ triggers, booking request button and contact message button were clicked. Observations confirmed that the intended interactions did not work. Source inspection explains why.

**Screenshot files:**

- [Original mobile screenshot](screenshots/original-mobile.png)
- [Original tablet screenshot](screenshots/original-tablet.png)
- [Original desktop screenshot](screenshots/original-desktop.png)

The screenshots show visual behaviour; source references below support the technical root causes. Recheck the exact viewport dimensions of each clean capture against the DevTools records if recording precise screenshot metadata.

## 3. Findings, root causes and business impact

### F01 — The layout does not adapt to mobile screens

**Priority: Critical**  
**Evidence:** `index.html` has no `<meta name="viewport" ...>` declaration. In `css/styles.css`, `#topnav`, `#headerbanner`, `#pagewrap`, and `#pagefooter` each use `width: 960px`; there are no media queries or fluid widths. The mobile and tablet previews retain a desktop-style three-column layout and very small scaled text.

**Root cause:** The page was built for one fixed desktop width rather than a responsive range of viewports. The missing viewport declaration compounds the issue on phones.

**Why it matters:** The brief says customers often compare repair shops on their phones while in a hurry therefore, a scaled-down desktop page makes it harder to read and act quickly, weakening confidence before a customer even evaluates the workshop.

**Recommended fix:** Add the viewport meta declaration; use a fluid container with a maximum width, mobile-first styles, responsive card grids and navigation that adapts at narrower widths.

### F02 — Navigation links do not lead to page sections

**Priority: High**  
**Evidence:** In `index.html`, HOME, SERVICES, PRICING, ABOUT and CONTACT all link to `href="#"`. Click testing did not navigate to the corresponding content.

**Root cause:** The navigation was written as placeholder links rather than connected to real section IDs. The wrapper is also a generic `<div id="topnav">` instead of a navigation landmark.

**Why it matters:** Visitors cannot jump directly to services or contact information. A customer trying to reach the workshop quickly must scan or scroll through the page.

**Recommended fix:** Use `<nav aria-label="Primary navigation">` with meaningful fragment links such as `#services` and `#contact`, matched to actual section IDs. Include only links that point to real destinations.

### F03 — Contact information and the main action are buried

**Priority: High**  
**Evidence:** The header contains a business name and tagline but no direct call/contact action. The phone, WhatsApp, address, and hours appear in the later “Find Us & Get In Touch” section, after services, FAQs, about text and the booking form (`index.html`). The phone and WhatsApp details are plain text, not actionable links.

**Root cause:** Content is ordered largely as a catalogue of information, without prioritising the urgent visitor's next action. Contact data is displayed but not integrated into the main customer journey.

**Why it matters:** The owner's chief concern is earning trust from hurried mobile visitors. Requiring customers to search for ways to contact or locate the shop introduces avoidable friction.

**Recommended fix:** Add a prominent, descriptive contact action near the introduction; link to the confirmed telephone number using `tel:` and offer clear directions/location access where verified. Retain complete contact details further down the page.

### F04 — Text hierarchy and readability are weak

**Priority: High**  
**Evidence:** The stylesheet sets service-card body text to `12px` and nav links to `12px`; the footer is `11px`. Several paragraphs in `index.html` have inline font sizes of `12px` or `13px`. The mobile screenshots show the text becoming especially difficult to read.

**Root cause:** Typography uses scattered fixed sizes and inline formatting rather than a coherent, responsive type scale and reusable rules.

**Why it matters:** Customers need to compare repair services, indicative prices, opening hours and practical information quickly. Small text undermines scanning and readability.

**Recommended fix:** Establish readable body text, a limited heading scale, consistent line-height and spacing tokens. Verify readability on real phone-sized viewports, not only desktop.

### F05 — Visual styling lacks a consistent, trust-focused system

**Priority: Medium**  
**Evidence:** The six service cards use six unrelated border/price accent colours defined inline in `index.html` (red, blue, orange, green, purple, teal). The header title is yellow on blue-grey, while section rules are red; spacing and text styles are partly inline and partly in the stylesheet.

**Root cause:** Styles were applied component by component without reusable colour, typography and spacing tokens.

**Why it matters:** The client prefers a dependable trade-workshop identity, not trendiness. Inconsistent accents compete for attention and can make the page feel less deliberate and professional.

**Recommended fix:** Use a restrained palette with clear functional roles, CSS custom properties and consistent card styling. Use colour to support hierarchy and actions rather than giving every service an arbitrary colour.

### F06 — Forms offer no functioning request pathway

**Priority: High**  
**Evidence:** The booking and contact forms end with `<input type="button">` controls in `index.html`, and there are no form submission handlers in the original `js/script.js`. Form submission failed during testing and review. There are no visible instructions about what happens to the submitted information.

**Root cause:** The interface contains form controls, but no implemented submission workflow or confirmation mechanism.

**Why it matters:** A visitor could attempt to request a repair or send a question without actually reaching the business. An apparent contact channel that silently fails is especially damaging to trust.

**Recommended fix:** Be explicit about what works in EE01. Provide reliable, honest contact actions now; do not present a nonfunctional form as a live booking service. Implement the form interactions according to the subsequent Applied JavaScript module's requirements, and do not imply data is sent to the workshop without a real destination.

**Scope note:** The starter `js/script.js` explicitly reserves FAQ, request-tracker and contact-form interactions for Applied JavaScript. Their absence is an **existing limitation**, but does not by itself establish that all must be built during EE01.

### F07 — Form controls lack accessible labels and semantics

**Priority: High**  
**Evidence:** Both forms rely on placeholder text rather than associated `<label>` elements. The contact form uses `type="text"` for email and phone; the message uses a single-line input. Fields do not have meaningful `name` attributes or required constraints.

**Root cause:** Forms were assembled visually without explicit field semantics, native validation choices or clear label/control relationships.

**Why it matters:** Placeholder-only forms can be difficult to use, especially for keyboard users and people using assistive technology. Missing field semantics also complicates future validation and submission.

**Recommended fix:** Use associated labels, suitable input types (`email`, `tel`), `<textarea>` for a message, meaningful names, clear required-field guidance and visible error feedback when the forms are implemented.

### F08 — The page relies heavily on generic containers and presentational markup

**Priority: Medium**  
**Evidence:** Main page regions are generic `div` elements (`#topnav`, `#headerbanner`, `#pagewrap`, `#contact-section`, `#pagefooter`). Services use `<b>` and `<br>` to structure card content, and the shop's contact details are laid out using floated `div` blocks with fixed widths.

**Root cause:** Content structure and visual formatting were combined instead of using semantic landmarks and reusable layout rules.

**Why it matters:** The page is harder to navigate with assistive technology and more difficult to maintain as Wheelhouse's website develops through future modules.

**Recommended fix:** Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` where appropriate, and `<footer>` with a coherent heading hierarchy. Replace `<br>`-driven spacing and floats with CSS Grid/Flexbox and normal document structure.

### F09 — FAQ controls look interactive but are not implemented

**Priority: Medium (deferred interaction)**  
**Evidence:** The questions are marked up as `<div class="faq-trigger">` with sibling answer containers, but `js/script.js` contains only comments. Click testing did not expand/collapse the answers; the answers are already displayed.

**Root cause:** No accordion logic or accessible disclosure control is present.

**Why it matters:** The page suggests an interaction that isn't available. However, customers can still read the answers, so this is lower priority than mobile readability or contact access.

**Recommended fix:** For the current rebuild, keep questions and answers readable with semantic markup; if an accordion is needed later, use accessible `<details><summary>` elements or implement proper keyboard/ARIA behaviour as required by the JavaScript module.

### F10 — Trust claims and practical details need verification

**Priority: Medium (content governance)**  
**Evidence:** The hero describes Wheelhouse as “Kumasi's Most Trusted Bicycle Workshop”; the page lists prices, turnaround times, an opening year, phone/WhatsApp numbers and operating hours. The source files do not provide independent verification for these claims or contact details.

**Root cause:** Marketing claims and operational details appear in static copy with no visible source or maintenance process.

**Why it matters:** The business wants to look dependable. Unsupported superlatives or inaccurate contact and pricing details could have the opposite effect if customers discover discrepancies.

**Recommended fix:** Preserve the supplied information as starter content, but mark any unverified claims or placeholder-looking contact details for confirmation with Kwame. Prefer specific verifiable information (services, process, location and quote-before-repair policy) over unsupported superlatives. Do not fabricate testimonials, credentials or business ratings.

## 4. Recommended priority order

1. **Make the page usable on phones** — viewport setup, fluid layout, readable type and accessible navigation.
2. **Make the business easy to reach** — clear contact/directions actions and better information order, with details verified.
3. **Create a consistent, professional presentation** — a restrained design system, clear section hierarchy and semantic markup.
4. **Address misleading or inaccessible controls** — make every displayed action meaningful, or transparently defer functionality reserved for later modules.
5. **Verify business claims and content** — ensure trust is supported by accurate information rather than decorative claims.

This order follows the business brief: a rushed mobile visitor must quickly understand what Wheelhouse does, why it is credible and how to reach it. It is not a ranking based solely on visual appearance.

## 5. What the rebuild will be checked against

The completed EE01 page should be evaluated for: mobile, tablet and desktop readability; meaningful working navigation; clear primary contact action; semantic page regions and headings; visible keyboard focus; properly labelled controls; consistent colours, type and spacing; truthful handling of any incomplete booking/contact functionality; and correspondence between every major change and an identified user/business need.

A separate **final audit** will record actual post-rebuild test results. This diagnosis is a pre-rebuild record and must not be presented as evidence that fixes have already been implemented.

## 6. Conclusion

The original Wheelhouse page contains useful material—including services, indicative prices, FAQs and an explanation of the repair process—but it does not organise or deliver that information effectively for the urgent mobile customer described in the brief. Its fixed-width implementation, placeholder navigation, buried contact details, small text, inconsistent styling and nonfunctional form pathways are the most consequential findings. The redesign should preserve useful content while making trust, clarity and quick contact the central design priorities.
