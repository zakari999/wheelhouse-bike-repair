# Development Setup & CI Workflow

This guide documents local setup, code quality tooling, branch conventions, and GitHub Actions CI/deployment for **Wheelhouse Bike Repair**.

For the website architecture, design system, accessibility evidence, and EE01 deliverables, see [README.md](README.md).

---

## 1. Prerequisites & Local Setup

- **Node.js `22`** (matches CI runner version; works on Node LTS) and **npm**

Install dev dependencies cleanly from the lockfile:

```bash
git clone https://github.com/zakari999/wheelhouse-bike-repair.git
cd wheelhouse-bike-repair
npm ci
```

To preview the site locally during development, serve the project root with VS Code Live Server or a static HTTP server (for example `python -m http.server 8000` and open `http://localhost:8000`). If a Vite `build` / `dev` script is added later in `package.json`, use `npm run dev` / `npm run build`.

---

## 2. NPM Scripts (`package.json`)

| Script                 | Command                                                 | Purpose                                                               |
| :--------------------- | :------------------------------------------------------ | :-------------------------------------------------------------------- |
| `npm run lint:html`    | `htmlhint index.html`                                   | Checks HTML syntax, alt text, ID uniqueness, and SVG `viewBox` casing |
| `npm run lint:css`     | `stylelint "css/**/*.css"`                              | Validates stylesheets against `.stylelintrc.json`                     |
| `npm run lint:js`      | `eslint "js/**/*.js"`                                   | Lints browser JavaScript in `js/**/*.js` via flat config              |
| `npm run lint`         | `lint:html && lint:css && lint:js`                      | Runs all three linters sequentially                                   |
| `npm run format:check` | `prettier --check "*.html" "css/**/*.css" "js/**/*.js"` | Verifies Prettier code style without modifying files                  |
| `npm run format`       | `prettier --write "*.html" "css/**/*.css" "js/**/*.js"` | Formats HTML, CSS, and JS files in place                              |

---

## 3. Tooling Configuration Files

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

## 4. Branch & Pull Request Workflow

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

## 5. GitHub Actions CI & GitHub Pages Deploy

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
