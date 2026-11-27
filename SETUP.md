# Development Setup & CI Workflow

This guide documents the chosen base site, repository structure, local setup, code quality tooling, branch conventions, and GitHub Actions CI/deployment for **Wheelhouse Bike Repair**.

For the full website architecture, design system tokens, accessibility evidence, and EE01 deliverables, see [README.md](README.md).

---

## 1. Base Site Decision

The team selected this Wheelhouse Bike Repair site (`index.html`, `css/styles.css`, `js/script.js`, `assets/`, `docs/ee01/`) as the shared codebase baseline for collaborative development.

### Why This Version Was Kept

- **Semantic HTML5 Structure:** Built with proper landmark regions (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), an unbroken `<h1>` → `<h2>` → `<h3>` heading hierarchy, and native `<details>`/`<summary>` FAQ controls.
- **Verified WCAG 2.2 Level AA Accessibility:** Includes audited high-contrast palette tokens, visible `:focus-visible` focus rings across light and dark surfaces, `aria-live` filter/form status announcements, persistent validation error states, full keyboard navigation, and a minimum `14px` font scale.
- **Clean, Modular CSS Architecture:** Uses `:root` custom properties, fluid CSS Grid/Flexbox layouts, zero horizontal overflow down to `320px`, and structured responsive breakpoints, making new sections (`#common-repairs`) and shared tooling clean to layer on without rework.

---

## 2. Project Structure

```text
wheelhouse-bike-repair/
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions CI checks and GitHub Pages deploy
├── assets/                  # Workshop photos, Common Repairs cards, map & hero SVG
├── css/
│   └── styles.css           # Design tokens (:root), base styles, components, media queries
├── docs/
│   └── ee01/                # Audits, diagnosis, fixes, screenshots, and wireframe sketches
├── js/
│   └── script.js            # Navigation drawer, symptom filter, preselection, form & utilities
├── .editorconfig            # UTF-8, LF line endings, and 2-space indentation rules
├── .gitignore               # Ignores node_modules/, dist/, caches, .env*, OS/IDE files
├── .htmlhintrc              # HTMLHint configuration (whitelists SVG viewBox casing)
├── .prettierignore          # Excludes dependencies, build output, assets, docs, and README.md
├── .prettierrc              # Prettier code style configuration
├── .stylelintrc.json        # Stylelint rules extending stylelint-config-standard
├── eslint.config.js         # ESLint v10 flat config (browser script + Prettier compatibility)
├── index.html               # Single-page semantic HTML document
├── package.json             # DevDependencies and lint/format npm scripts
├── package-lock.json        # Locked dependency versions for reproducible npm ci installs
├── README.md                # Website rebuild documentation, design system, and EE01 evidence
└── SETUP.md                 # Base-site rationale, folder structure, setup, and CI workflow
```

---

## 3. Prerequisites & Local Setup

- **Node.js `22`** (matches CI runner version; works on Node LTS) and **npm**

Install dev dependencies cleanly from the lockfile:

```bash
git clone https://github.com/zakari999/wheelhouse-bike-repair.git
cd wheelhouse-bike-repair
npm ci
```

To preview the site locally during development, serve the project root with VS Code Live Server or a static HTTP server (for example `python -m http.server 8000` and open `http://localhost:8000`). If a Vite `build` / `dev` script is added later in `package.json`, use `npm run dev` / `npm run build`.

---

## 4. NPM Scripts (`package.json`)

| Script                 | Command                                                 | Purpose                                                               |
| :--------------------- | :------------------------------------------------------ | :-------------------------------------------------------------------- |
| `npm run lint:html`    | `htmlhint index.html`                                   | Checks HTML syntax, alt text, ID uniqueness, and SVG `viewBox` casing |
| `npm run lint:css`     | `stylelint "css/**/*.css"`                              | Validates stylesheets against `.stylelintrc.json`                     |
| `npm run lint:js`      | `eslint "js/**/*.js"`                                   | Lints browser JavaScript in `js/**/*.js` via flat config              |
| `npm run lint`         | `lint:html && lint:css && lint:js`                      | Runs all three linters sequentially                                   |
| `npm run format:check` | `prettier --check "*.html" "css/**/*.css" "js/**/*.js"` | Verifies Prettier code style without modifying files                  |
| `npm run format`       | `prettier --write "*.html" "css/**/*.css" "js/**/*.js"` | Formats HTML, CSS, and JS files in place                              |

---

## 5. Tooling Configuration Files

| File                | Role                                                                                                                                         |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `.editorconfig`     | Enforces UTF-8, LF line endings, and 2-space indentation (`trim_trailing_whitespace = false` for `*.md`)                                     |
| `.gitignore`        | Ignores `node_modules/`, `dist/`, `.vite/`, linter caches, `.env*`, OS metadata, and IDE folders                                             |
| `.htmlhintrc`       | HTMLHint ruleset; whitelists SVG `viewBox` attribute casing                                                                                  |
| `.stylelintrc.json` | Extends `stylelint-config-standard`; configured for long hex values, `rgba()`, `prefix` media ranges                                         |
| `eslint.config.js`  | ESLint v10 flat config (`globals.browser` + `script` sourceType for `js/**/*.js`, ESM for `eslint.config.js`, plus `eslint-config-prettier`) |
| `.prettierrc`       | Single quotes, semicolons, 2-space tabs, `printWidth: 100`, `trailingComma: "none"`, `endOfLine: "auto"`                                     |
| `.prettierignore`   | Excludes `node_modules/`, `dist/`, `dist-ssr/`, `package-lock.json`, `assets/`, `docs/`, and `README.md`                                     |

---

## 6. Branch & Pull Request Workflow

1. Keep `develop` synced with `main` before starting new work:
   ```bash
   git checkout develop
   git pull origin develop
   ```
2. Create a feature branch from `develop`:
   ```bash
   git checkout -b feature/<short-topic>
   ```
3. Run checks before committing:
   ```bash
   npm run lint
   npm run format:check
   ```
4. Open a Pull Request into `develop` first, wait for CI checks to pass, and merge to `main` via PR only after integration testing on `develop`.

---

## 7. GitHub Actions CI & GitHub Pages Deploy

Defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

### Triggers & Concurrency

- Runs on every `push` and `pull_request` targeting `develop` or `main`.
- Uses workflow-ref concurrency so superseded feature/PR runs cancel cleanly while pushes to `main` complete their deployment uninterrupted.

### Jobs

1. **`ci` (`ubuntu-latest`, `contents: read`):**
   - Checks out repository (`actions/checkout@v4`) and sets up Node `22` with npm caching (`actions/setup-node@v4`).
   - Runs `npm ci`, `npm run lint`, and `npm run format:check`.
   - Automatically runs `npm run build` whenever `scripts.build` is defined in `package.json` (and skips cleanly otherwise so pre-Vite PRs pass green).
2. **`deploy` (`needs: ci`, runs only on `push` to `main`):**
   - Grants job-scoped `pages: write` and `id-token: write` permissions to deploy to the `github-pages` environment.
   - If `scripts.build` exists in `package.json`, installs dependencies, runs `npm run build`, and publishes `dist/`.
   - Otherwise stages runtime files (`index.html`, `css/`, `js/`, `assets/`) into `_site/` and publishes `_site/`.
   - Uploads and deploys via `actions/upload-pages-artifact@v3` and `actions/deploy-pages@v4`.

### One-Time Repository Setting

In the GitHub repository, verify **Settings → Pages → Build and deployment → Source** is set to **GitHub Actions** so merges to `main` deploy automatically via the workflow.
