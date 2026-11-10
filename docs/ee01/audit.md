# EE01 — Final Website Audit

## 1. Audit Overview

This audit evaluates the rebuilt Wheelhouse Bike Repair website against semantic HTML, baseline accessibility, responsiveness, and visual consistency.

The main objective was to improve the experience for customers searching for bicycle repairs on their phones while presenting Wheelhouse as a professional and reliable local workshop.

The evaluation focuses on whether the technical and design decisions address the client's actual business needs rather than simply improving the website's appearance.

## 2. Semantic HTML

The original website relied heavily on generic `<div>` elements and did not provide clear semantic page landmarks.

The rebuild introduces:

- `<header>`, `<nav>`, `<main>`, and `<footer>` for page structure.
- `<section>` elements for major content areas.
- `<article>` elements for individual repair services.
- A logical heading hierarchy.
- Meaningful navigation links connected to page sections.
- Native `<details>` and `<summary>` elements for frequently asked questions.

**Evaluation:** These changes make the page structure more meaningful and help users and assistive technologies identify important content.

Semantic HTML was prioritised because it improves accessibility and maintainability without introducing additional dependencies.

## 3. Baseline Accessibility

The rebuild addresses several accessibility weaknesses identified in the original implementation.

Key improvements include:

- Readable typography and improved text spacing.
- Keyboard-accessible navigation and interactive controls.
- Visible focus indicators.
- A skip-to-content link.
- Descriptive navigation labels.
- Responsive layouts that reduce the need for horizontal scrolling.
- Native HTML elements where appropriate.

The service finder should also support keyboard interaction and communicate changes in the displayed services.

**Evaluation:** These improvements make the website more usable for people navigating with different devices and input methods.

However, a visual review alone does not establish full accessibility compliance. Further automated and assistive-technology testing would provide stronger evidence.

## 4. Responsive Design

The original website used fixed 960px containers and float-based layouts, resulting in poor mobile presentation.

The rebuild uses:

- A mobile-first layout.
- Flexible containers.
- CSS Grid and Flexbox.
- Responsive breakpoints.
- A single-column service layout on mobile.
- Multi-column arrangements on larger screens.

Responsive behaviour was checked at mobile, tablet, and desktop viewport sizes.

**Evaluation:** The new layout is designed to remain readable and navigable across different screen widths, particularly for customers accessing the website on mobile devices.

## 5. Visual Consistency

The original website used multiple unrelated service-card accent colours, small typography, and inconsistent spacing.

The rebuild establishes a deliberate design system:

| Element | Design decision |
|---|---|
| Primary colours | Charcoal and rust orange |
| Backgrounds | White and subtle off-white |
| Typography | Consistent system sans-serif |
| Spacing | Reusable spacing variables |
| Service cards | Consistent borders, padding, and typography |
| Interactive elements | Consistent button and focus styles |

**Evaluation:** The restrained design supports Kwame's preference for a professional workshop website rather than a trendy or decorative interface.

The design system also makes future changes easier to maintain across subsequent modules.

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