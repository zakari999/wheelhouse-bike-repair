# Wheelhouse Bike Repair

**AmaliTech NSS — EE01: Web & UI Essentials**

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

**Initial sketches:** See the mobile and desktop sketches in `docs/ee01/`.

## 4. Website Rebuild

The original website was refactored using HTML5 and CSS3, with limited JavaScript for necessary interactions.

### Key Improvements

- Semantic page structure and logical heading hierarchy.
- Mobile-first responsive layouts using CSS Grid and Flexbox.
- Functional section navigation.
- Consistent service-card styling.
- Readable typography and structured spacing.
- Accessible FAQ interactions.
- Improved visibility of contact and workshop information.
- Keyboard accessibility and visible focus indicators.

### Design System

| Element | Implementation |
|---|---|
| Primary colour | Charcoal |
| Accent colour | Rust orange |
| Backgrounds | White and light grey |
| Typography | System sans-serif |
| Layout | Mobile-first, responsive |
| Spacing | Consistent CSS spacing variables |
| Styling | Minimal cards, subtle borders and restrained decoration |

The design choices reflect Wheelhouse's preference for a practical and trustworthy workshop website rather than a trendy or overly decorative interface.

## 5. Additional Improvement — Find Your Repair

Beyond the required rebuild, I implemented a service finder to help customers identify relevant bicycle repair services.

Customers can select a familiar problem, such as:

- Flat Tyre
- Brake Problems
- Gear Problems
- General Servicing

The website filters the existing service list to display the most relevant option.

Customers can also reset the filter to view all six services.

This improvement helps customers explore services without needing to understand technical bicycle repair terminology.

It is intended to guide service discovery, not provide a mechanical diagnosis.

**Detailed explanation:** [Additional Improvement](docs/ee01/improvement.md)

## 6. Testing and Evaluation

The rebuilt website was reviewed at mobile, tablet, and desktop viewport sizes.

Testing focused on:

- Responsive layout behaviour.
- Navigation and contact actions.
- Service finder interactions.
- Keyboard accessibility.
- FAQ functionality.
- Readability and visual consistency.
- Preservation of existing business information.

The final audit documents the evaluation, prioritisation decisions, and remaining limitations.

**Detailed evaluation:** [Final Website Audit](docs/ee01/audit.md)

## 7. Project Documentation

| Document | Purpose |
|---|---|
| [Original Website Diagnosis](docs/ee01/diagnosis.md) | Identified defects, root causes and business impact |
| Initial Sketch & Layout Reasoning | Pre-build structure and design decisions |
| [Additional Improvement](docs/ee01/improvement.md) | Service finder implementation and justification |
| [Final Website Audit](docs/ee01/audit.md) | Semantic HTML, accessibility and visual evaluation |
| [Screenshots](docs/ee01/screenshots/) | Original and rebuilt website evidence |

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

- Online booking and direct website message submission are not currently available.
- The workshop's contact details are preserved from the provided starter files and require verification before real-world deployment.
- The service finder is a discovery tool rather than an automated repair diagnosis system.
- Further accessibility testing would be necessary before a production release.

---

**Project:** Wheelhouse Bike Repair  
**Module:** EE01 — Web & UI Essentials  
**Programme:** AmaliTech National Service Training