# Development Setup & CI Workflow

This guide documents the chosen base site, repository structure, local setup, code quality tooling, branch conventions, and GitHub Actions CI/deployment for **Wheelhouse Bike Repair**.

For the full website architecture, design system tokens, accessibility evidence, and EE01 deliverables, see [README.md](README.md). For Vite build details, Husky pre-commit hooks, and the pull request template, see [CONTRIBUTING.md](CONTRIBUTING.md).

## 1. Base Site Decision

The team compared both completed EE01 implementations and selected **Muktar's version** (`index.html`, `css/styles.css`, `js/script.js`, `assets/`, `docs/ee01/`) as the shared codebase baseline on `main`.

### Why This Version Was Kept

- **Semantic HTML5 Structure:** Built with proper landmark regions (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), an unbroken `<h1>` → `<h2>` → `<h3>` heading hierarchy, and native `<details>`/`<summary>` FAQ controls.
- **Verified WCAG 2.2 Level AA Accessibility:** Includes audited high-contrast palette tokens, visible `:focus-visible` focus rings across light and dark surfaces, `aria-live` filter/form status announcements, persistent inline validation error states, full keyboard navigation, and a minimum `14px` font scale.
- **Clean, Modular CSS Architecture:** Uses `:root` custom properties, fluid CSS Grid/Flexbox layouts, zero horizontal overflow down to `320px`, and structured responsive breakpoints, making new sections (`#common-repairs`) and shared tooling clean to layer on without rework.
- **Trade-offs Weighed:** Jeremiah's version was simpler to read as a single-column layout with fewer CSS rules, whereas Muktar's carried more markup (an inline SVG sprite, symptom filter logic, and responsive grids). We kept Muktar's base because adopting the version with stronger verified accessibility and inline form validation upfront prevented re-implementing keyboard, contrast, and error-handling fixes while configuring CI, Vite, and Husky.

## 2. Project Structure

```text
wheelhouse-bike-repair/
├── .github/
│   ├── pull_request_template.md # Standardized PR summary, checklist, and review labels
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI checks and GitHub Pages deploy
├── .husky/
│   └── pre-commit               # Runs npx lint-staged before every commit
├── assets/                      # Workshop photos, Common Repairs cards, map & hero SVG
├── css/
│   └── styles.css               # Design tokens (:root), base styles, components, media queries
├── docs/
│   └── ee01/                    # Audits, diagnosis, fixes, screenshots, and wireframe sketches
├── js/
│   └── script.js                # Navigation drawer, symptom filter, preselection, form & utilities
├── .editorconfig                # UTF-8, LF line endings, and 2-space indentation rules
├── .gitignore                   # Ignores node_modules/, dist/, caches, .env*, OS/IDE files
├── .htmlhintrc                  # HTMLHint configuration (whitelists SVG viewBox casing)
├── .prettierignore              # Excludes dependencies, build output, assets, docs, and README.md
├── .prettierrc                  # Prettier code style configuration
├── .stylelintrc.json            # Stylelint rules extending stylelint-config-standard
├── CONTRIBUTING.md              # Vite build, Husky + lint-staged hooks, and PR review guide
├── eslint.config.js             # ESLint v10 flat config (browser script + Prettier compatibility)
├── index.html                   # Single-page semantic HTML document
├── package.json                 # DevDependencies, engines, lint-staged, and npm scripts
├── package-lock.json            # Locked dependency versions for reproducible npm ci installs
├── README.md                    # Website rebuild documentation, design system, and EE01 evidence
├── SETUP.md                     # Base-site rationale, folder structure, setup, and CI workflow
└── vite.config.js               # Vite build configuration for GitHub Pages (base + dist/)
```

## 3. Prerequisites & Local Setup

- **Node.js `22.22.2+`** (matches `package.json` `engines` and the CI runner version) and **npm**

Install dev dependencies cleanly from the lockfile (which also activates the Husky pre-commit hook):

```bash
git clone https://github.com/zakari999/wheelhouse-bike-repair.git
cd wheelhouse-bike-repair
npm ci
```

Use `npm run dev` for local development with live reload, `npm run build` to bundle the production site into `dist/`, and `npm run preview` to inspect `dist/` locally. Do not open `index.html` directly via `file://`, as browsers block ES module scripts (`<script type="module">`) on local file URLs.

## 4. NPM Scripts (`package.json`)

| Script                 | Command                                                 | Purpose                                                               |
| :--------------------- | :------------------------------------------------------ | :-------------------------------------------------------------------- |
| `npm run dev`          | `vite`                                                  | Starts the local Vite development server with live reload             |
| `npm run build`        | `vite build`                                            | Bundles and hashes assets into `dist/` for GitHub Pages               |
| `npm run preview`      | `vite preview`                                          | Serves the production `dist/` bundle locally                          |
| `npm run lint:html`    | `htmlhint index.html`                                   | Checks HTML syntax, alt text, ID uniqueness, and SVG `viewBox` casing |
| `npm run lint:css`     | `stylelint "css/**/*.css"`                              | Validates stylesheets against `.stylelintrc.json`                     |
| `npm run lint:js`      | `eslint "js/**/*.js"`                                   | Lints browser JavaScript in `js/**/*.js` via flat config              |
| `npm run lint`         | `lint:html && lint:css && lint:js`                      | Runs all three linters sequentially                                   |
| `npm run format:check` | `prettier --check "*.html" "css/**/*.css" "js/**/*.js"` | Verifies Prettier code style without modifying files                  |
| `npm run format`       | `prettier --write "*.html" "css/**/*.css" "js/**/*.js"` | Formats HTML, CSS, and JS files in place                              |
| `npm run prepare`      | `husky`                                                 | Activates Git pre-commit hooks automatically on `npm install`         |

## 5. Tooling Configuration Files

| File                | Role                                                                                                                                         | Consequence for the Team Without It                                                                            |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `.editorconfig`     | Enforces UTF-8, LF line endings, and 2-space indentation (`trim_trailing_whitespace = false` for `*.md`)                                     | Windows (`CRLF`) vs. macOS/Linux (`LF`) edits create whole-file Git diffs and avoidable merge conflicts        |
| `.gitignore`        | Ignores `node_modules/`, `dist/`, `.vite/`, linter caches, `.env*`, OS metadata, and IDE folders                                             | Thousands of dependency and build files pollute commits and trigger merge conflicts in generated output        |
| `.htmlhintrc`       | HTMLHint ruleset; whitelists SVG `viewBox` attribute casing                                                                                  | Duplicate `id`s or unclosed tags silently break `aria-labelledby`, form labels, and anchor navigation          |
| `.stylelintrc.json` | Extends `stylelint-config-standard`; configured for long hex values, `rgba()`, and `prefix` media ranges                                     | Invalid CSS properties or typos (e.g., `colr:`) fail silently in browsers and break responsive layouts         |
| `eslint.config.js`  | ESLint v10 flat config (`globals.browser` + `script` sourceType for `js/**/*.js`, ESM for `eslint.config.js`, plus `eslint-config-prettier`) | Undefined variables or loose `==` comparisons break the booking form or service filter on the live site        |
| `.prettierrc`       | Single quotes, semicolons, 2-space tabs, `printWidth: 100`, `trailingComma: "none"`, `endOfLine: "auto"`                                     | Two developers reformat the same files differently, burying real logic changes inside formatting noise in PRs  |
| `.prettierignore`   | Excludes `node_modules/`, `dist/`, `dist-ssr/`, `package-lock.json`, `assets/`, `docs/`, and `README.md`                                     | Formatting rewrites generated lockfiles or archived audit documents unnecessarily                              |

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
3. Run checks before committing (and follow AmaliTech commit prefixes: `feat:`, `fix:`, `refactor:`, `style:`, `chore:`, `docs:`, `test:`, ≤ 50 characters, imperative mood, no trailing period):
   ```bash
   npm run lint
   npm run format:check
   npm run build
   ```
4. Open a Pull Request into `develop` first, label review comments as **Blocking** or **Optional**, merge via **Create a merge commit** once CI and reviews pass, delete the merged feature branch, and release to `main` via PR from `develop`.

## 7. GitHub Actions CI & GitHub Pages Deploy (Workflow Improvement)

Defined in [.github/workflows/ci.yml](https://www.google.com/search?q=.github/workflows/ci.yml).

### Why This Workflow Improvement Exists

- **Problem it solves:** Local checks and pre-commit hooks can be bypassed (`--no-verify`), forgotten, or pass on one developer's laptop while failing on another's due to mismatched Node versions or untracked local files. Manual deployments also risk publishing unreviewed or unbuilt files straight to Kwame's live site.
- **Who it protects:** Both developers and any future contributor (every PR is verified on a clean Ubuntu + Node 22 runner before it can merge), reviewers (CI catches syntax, lint, formatting, and build failures automatically so reviews focus on customer behaviour), and Kwame's customers (`deploy` runs only on pushes to `main` after `ci` passes).
- **Why it belongs permanently:** As Kwame adds new services, repair guides, or additional developers months from now, this pipeline guarantees every change is checked and deployed reproducibly from the Vite `dist/` bundle without relying on anyone's memory or local machine setup.

### Triggers & Concurrency

- Runs on every `push` and `pull_request` targeting `develop` or `main`.
- Uses workflow-ref concurrency so superseded feature/PR runs cancel cleanly while pushes to `main` complete their deployment uninterrupted.

### Jobs

1. **`ci` (`ubuntu-latest`, `contents: read`):**
   - Checks out the repository (`actions/checkout@v4`) and sets up Node `22` with npm caching (`actions/setup-node@v4`).
   - Runs `npm ci`, `npm run lint`, `npm run format:check`, and `npm run build`.
2. **`deploy` (`needs: ci`, runs only on `push` to `main`):**
   - Grants job-scoped `pages: write` and `id-token: write` permissions to deploy to the `github-pages` environment.
   - Builds the Vite production bundle (`dist/`) and publishes it via `actions/upload-pages-artifact` and `actions/deploy-pages@v4`.

### One-Time Repository Setting

In the GitHub repository, **Settings → Pages → Build and deployment → Source** is set to **GitHub Actions** so merges to `main` deploy automatically via the workflow.
