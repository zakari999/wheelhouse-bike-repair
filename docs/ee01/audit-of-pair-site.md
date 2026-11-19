# Accessibility Audit: Wheelhouse Bike Repair (Jerry Akuaku's Site)

**Site Audited:** [https://jerryakuaku.github.io/wheelhouse-bike-repair/index.html](https://jerryakuaku.github.io/wheelhouse-bike-repair/index.html)  
**Pair:** Jeremiah Narteh Akuaku  
**Audited By:** Muktar Zakari Junior  
**Standard:** WCAG 2.1 / 2.2 (Levels A & AA)  
**How Tested:** Automated DOM/contrast inspection + manual keyboard navigation (`Tab`, `Shift+Tab`, `Enter`, `Space`), form validation, and 320px mobile reflow checks.

---

## 1. Summary

The site is **fundamentally sound**. It passes **23 core accessibility checks**—including a working skip link, proper form labels with `autocomplete`, strong color contrast, visible focus outlines, native `<details>`/`<summary>` accordions, and clean 320px mobile reflow. No issue completely traps a keyboard-only user.

Testing did uncover **2 Level A failures** and **2 warnings** that create real friction for screen-reader, voice-control, and keyboard-only users (such as a customer with an arm in a cast).

| Status | Count | Overview |
| :--- | :---: | :--- |
| **Fail** | 2 | Repeated `"Ask on WhatsApp"` link text (2.4.4); header buttons precede `<nav>` in tab order (2.4.3) |
| **Warning** | 2 | Form uses native browser tooltips only (3.3.1 / 3.3.3); `<nav>` has no `aria-label` (1.3.1) |
| **Pass** | 23 | Metadata, skip link, landmarks, headings, image `alt` text, form labels & `autocomplete`, contrast, focus visibility, keyboard & 320px reflow |

---

## 2. Prioritized Issues (Ranked by User Impact)

### 1. Identical "Ask on WhatsApp" Links Lack Context (High — Fail)

* **WCAG Rule & Principle:** [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html) (Level A) — **Operable**
* **Who it protects:** Screen-reader users and voice-control users (for example, someone using voice dictation with one arm in a cast) who navigate by listing all links on the page.
* **What we found:** `"Ask on WhatsApp"` appears **7 times** (6 service cards + 1 footer link). Even though each `href` has a different `?text=` message, none of the links have an `aria-label`, so they all sound identical out of context.
* **Why it ranks first:** Screen reader users frequently navigate via link lists (rotor). When all 7 links read identically as "Ask on WhatsApp", the user has no way of knowing which link initiates an enquiry for *Tyre Replacement* versus *Full Rebuild*.
* **Fix:** Give each link a descriptive `aria-label`:

```html
<a
  href="https://wa.me/233244000001?text=Hello%20Wheelhouse%2C%20I%20need%20a%20Basic%20Tune-Up"
  aria-label="Ask on WhatsApp about Basic Tune-Up"
>
  Ask on WhatsApp
</a>
```

---

### 2. Header Tab Order Jumps Over Main Navigation (High — Fail)

* **WCAG Rule & Principle:** [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html) (Level A) — **Operable**
* **Who it protects:** Keyboard-only users, switch-device users, and screen-magnifier users who rely on a predictable, logical tab sequence.
* **What we found:** In the pair's actual audited `<header>` markup, the `.header-actions` container (`Call` and `WhatsApp` buttons) was placed physically **before** `<nav>` in the DOM source order:
  ```html
  <!-- Observed markup in audited site: .header-actions placed before <nav> -->
  <header>
    <a href="index.html">Wheelhouse Bike Repair</a>
    <div class="header-actions">
      <a href="tel:+233322000000" class="btn">Call</a>
      <a href="https://wa.me/233244000001" class="btn">WhatsApp</a>
    </div>
    <nav>
      <a href="#services">Prices</a>
      <a href="#faq">Questions</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  ```
  Consequently, tabbing from the top of the page produced the following sequence: `Skip link` &rarr; `Wheelhouse Bike Repair` &rarr; `Call` &rarr; `WhatsApp` &rarr; `Prices` &rarr; `Questions` &rarr; `About` &rarr; `Contact`.
* **Why it ranks second:** A user exploring the site by keyboard is forced through action buttons before they even discover the primary navigation options, violating natural visual reading and structural order.
* **Fix:** Reorder the DOM so that `<nav>` precedes `.header-actions`:

```html
<!-- Recommended fix: place <nav> before .header-actions -->
<header>
  <a href="index.html">Wheelhouse Bike Repair</a>
  <nav aria-label="Main navigation">
    <a href="#services">Prices</a>
    <a href="#faq">Questions</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </nav>
  <div class="header-actions">
    <a href="tel:+233322000000" class="btn">Call</a>
    <a href="https://wa.me/233244000001" class="btn">WhatsApp</a>
  </div>
</header>
```

---

### 3. Form Relies Only on Native Browser Validation Tooltips (Medium — Warning)

* **WCAG Rules & Principle:** [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html) (Level A) & [3.3.3 Error Suggestion](https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html) (Level AA) — **Understandable**
* **Who it protects:** Screen-reader users, users with cognitive impairments, and one-handed mobile users who may tap submit before filling in all required fields.
* **What we found:** Submitting `form#booking-form` empty shows only the browser's default `"Please fill out this field."` popup on `#name`. These tooltips vanish when focus moves and aren't tied to persistent inline text or screen-reader alert regions.
* **Why it ranks third:** The validation stops submission correctly, but fleeting popups create disorientation when using keyboard-only navigation or screen magnification.
* **Fix:** Add persistent inline error elements linked with `aria-describedby` and `aria-live="polite"`:

```html
<label for="name">Your name *</label>
<input type="text" id="name" name="name" required autocomplete="name" aria-describedby="name-error" />
<p id="name-error" class="error-message" aria-live="polite"></p>
```

---

### 4. Navigation Landmark Is Unnamed (Low — Warning)

* **WCAG Rule & Principle:** [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html) (Level A) — **Perceivable**
* **Who it protects:** Screen-reader users who jump between page landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`).
* **What we found:** `<nav>` has no `aria-label` or `aria-labelledby` attribute.
* **Why it ranks fourth:** While the landmark is correctly detected as `<nav>`, naming it allows users of assistive technology to distinguish primary navigation from future sub-navigation regions.
* **Fix:** Add `aria-label="Main navigation"` to `<nav>` (shown in the Issue 2 snippet above).

---

## 3. What Passed (23 Verified Checks)

| Area | Verified Implementation | WCAG |
| :--- | :--- | :--- |
| **Document & Zoom** | `<!DOCTYPE html>`, `<html lang="en">`, `<title>Wheelhouse Bike Repair</title>`, and `width=device-width, initial-scale=1.0` (zoom enabled) | 1.3.1, 2.4.2, 3.1.1, 1.4.4, 1.4.10 |
| **Skip Link & Landmarks** | `<a href="#main" class="skip-link">` at top of `<body>`, `<header>`, `<main id="main">`, `<footer>`, and working anchors (`#services`, `#faq`, `#about`, `#contact`) | 2.4.1, 1.3.1 |
| **Headings** | One `<h1>` (`"Bike repair in Adum, Kumasi"`) followed cleanly by six `<h2>` section headings with no skipped levels | 1.3.1, 2.4.6 |
| **Images** | Both images (`images/hero.jpg` and `images/kwame.jpg`) have descriptive `alt` text; no unlabelled SVGs | 1.1.1 |
| **Form Labels & Autofill** | All 5 controls (`#name`, `#phone`, `#service`, `#date`, `#notes`) have matching `<label for>`, clear `*` / `required` markers, and `autocomplete="name"` / `autocomplete="tel"` | 1.3.1, 1.3.5, 3.3.2, 4.1.2 |
| **Color & Contrast** | Color is not used alone; all pairs pass AA: header `#ffffff` on `#2c3e50` (**10.98:1**), buttons `#212529` on `#f1c40f` (**9.29:1**), body `#212529` on `#f8f9fa` (**14.74:1**), placeholders `#6c757d` on `#ffffff` (**4.69:1**) | 1.4.1, 1.4.3 |
| **Keyboard & Reflow** | Visible focus rings on all controls, no keyboard traps, native `<details>`/`<summary>` FAQ toggles work with `Enter`/`Space`, and zero horizontal overflow at 320px width | 2.1.1, 2.1.2, 2.4.7, 1.4.10 |
