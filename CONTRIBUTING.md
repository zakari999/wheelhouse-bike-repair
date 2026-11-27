# Contributing to Wheelhouse Bike Repair

This guide covers how the site is **built** (Vite), how bad changes are **stopped before they're committed** (Husky + lint-staged), and how changes are **proposed and reviewed** (the pull request template). For the base-site decision, folder structure and what each linter checks, see [SETUP.md](SETUP.md).

## Quick start

```bash
npm install        # installs tools and activates the pre-commit hook
npm run dev        # local server with live reload
npm run build      # production bundle in dist/
npm run preview    # serve dist/ exactly as GitHub Pages will
```

Requires Node.js 22 (the same version CI uses).

---

## 1. Why Vite: predictable builds

**The problem.** Before Vite, "deploying" meant uploading whatever happened to be in the folder. Two developers can have different files on disk: a stray test image, an edit they forgot to save. Nothing guaranteed that what went live was what was reviewed. Browsers also cache `styles.css` and `script.js` by name, so after a price change some customers would keep seeing the old prices until their cache expired.

**What Vite does about it.**

- **One command, one output.** `npm run build` produces `dist/` from the committed source and nothing else. CI runs the same command on a clean machine, so the live site is built from exactly what was merged.
- **Cache-busting file names.** Built files are named after a hash of their content (`index-BbGjdY0h.js`). When the content changes, the name changes, so the browser fetches the new version. Kwame updates a price and every customer sees it on their next visit.
- **Locked versions.** `package-lock.json` pins every tool version. `npm ci` in CI installs exactly those versions, so "it builds on my machine" means it builds everywhere.

### What each file does

| File | Purpose | What breaks without it |
|---|---|---|
| `vite.config.js` → `base: '/wheelhouse-bike-repair/'` | GitHub Pages serves the site from `/<repo-name>/`, not the domain root. `base` prefixes every built asset path with it. | Every CSS, JS and image request 404s on the live site. The page loads as unstyled text. |
| `vite.config.js` → `outDir: 'dist'`, `emptyOutDir: true` | Writes to `dist/` (the folder the Pages workflow uploads) and wipes it first. | Old hashed files from earlier builds pile up and get deployed. |
| `package.json` → `dev` / `build` / `preview` | Standard entry points, so nobody has to remember Vite's CLI. | Each developer runs things differently. |
| `index.html` → `<script type="module">` | Vite only bundles scripts marked as modules. | `script.js` is left out of `dist/`. The menu, service filter and form validation silently stop working on the live site. |
| `.gitignore` → `node_modules/`, `dist/` | Keeps downloaded packages and generated output out of git. | Thousands of package files in every diff, and merge conflicts in generated files nobody wrote. |

---

## 2. Husky + lint-staged: the pre-commit check

**The gap it closes.** CI (see [SETUP.md](SETUP.md)) catches problems, but only *after* code is pushed and a pull request is open. By then the broken commit is already in the shared history. The reviewer's time goes on "missing semicolon" instead of "will this confuse customers?", and if it's merged, the other developer pulls it into their branch. With two people editing the same `index.html`, a formatting-only difference is enough to create a merge conflict.

**What happens now.** When you run `git commit`:

1. **Husky** runs the script in `.husky/pre-commit` (`npx lint-staged`). Git has hook support built in, but hooks live in `.git/hooks`, which is never committed. Husky stores the hook in the repo and the `prepare` script switches it on during `npm install`, so **every** developer gets the same check without setting anything up.
2. **lint-staged** passes **only the files you staged** to the right tools (config in the `lint-staged` field of `package.json`):

   | Staged files | Runs | Catches |
   |---|---|---|
   | `*.html` | `htmlhint`, then `prettier --write` | Duplicate `id`s (which break `aria-labelledby` and nav anchors), unclosed tags, missing `alt` text |
   | `css/**/*.css` | `stylelint --fix`, then `prettier --write` | Invalid properties, duplicate selectors, typos like `colr:` |
   | `*.js` (any folder, including root config files like `vite.config.js`) | `eslint --fix`, then `prettier --write` | Undefined variables, `==` instead of `===`, unused code, and syntax errors in build config that would otherwise only surface in CI |

   Fixable problems (formatting, simple lint rules) are fixed and re-staged automatically. Anything that can't be fixed automatically **aborts the commit** with the error, so it never enters the history.

**Why staged files only.** Linting the whole project on every commit is slow, and it blames you for problems in files you didn't touch. Checking only what you're committing keeps it to a second or two, which matters: a slow hook is a hook people learn to skip.

**Who it protects.**

- **The other developer:** they never pull a branch that fails lint or carries reformatting noise.
- **The reviewer:** the PR diff contains only real changes, so review time goes on behaviour.
- **Kwame and his customers:** a broken `id` or a JS error is caught on a laptop, not on the live site.

**Escape hatch.** `git commit --no-verify` skips the hook. Don't use it. CI runs the same checks on the pull request anyway, so skipping the hook only moves the failure somewhere more public.

> **Dependency note.** The linters and their configs (`.htmlhintrc`, `.stylelintrc.json`, `eslint.config.js`, `.prettierrc`) arrive with the `feature/common-repairs-and-ci` branch. The hook is installed by this branch and starts linting HTML, CSS and JS once both branches are merged into `develop`. Until then, lint-staged reports "no staged files match" for non-code files, as it did for this branch's own commits.

---

## 3. The pull request template

`.github/pull_request_template.md` pre-fills the description box of every new pull request.

**The gap it closes.** Hooks and CI check that code is *valid*. They can't check that it's *right*. Only a human reviewer can catch a service card whose price doesn't match the booking form, or a change that looks fine on desktop but breaks on a phone. Reviewers can only do that if the author says what changed, why, and how to test it. Without a template, descriptions drift towards "updated stuff".

**What it enforces.**

- **What / Why / How to test:** the reviewer can reproduce the change in a few minutes instead of reverse-engineering it from the diff.
- **Author checklist:** branch naming, AmaliTech commit rules, "the hook ran", and two project-specific checks. One is that each `data-service` value matches a booking-form `<option>`: a mismatch silently breaks the "click a service and the form is pre-filled" feature, which no linter can detect.
- **Blocking vs Optional:** reviewers must label every comment and explain the practical consequence. Authors then know what has to be fixed before merging and what is a suggestion, so PRs don't stall on preferences or merge with real problems.

---

## Workflow summary

```
feature/<name>  ──commit──▶  pre-commit hook (lint-staged)
       │                         └─ fails? fix, then commit again
       └──push──▶  PR into develop (template)  ──▶  CI: lint, format, build
                                                 ──▶  peer review: Blocking / Optional
                                                 ──▶  merge commit, delete branch
develop ──PR──▶ main  ──▶  CI builds dist/  ──▶  GitHub Pages
```

1. Branch from `develop`: `feature/<short-description>`.
2. Commit with AmaliTech prefixes. The hook checks staged files.
3. Open a PR into `develop` and fill in the template.
4. CI must be green, and every Blocking comment must be resolved.
5. Merge with **Create a merge commit** (not squash or rebase) so each commit stays traceable, then delete the branch.
6. Release by opening a PR from `develop` into `main`. Merging it deploys `dist/` to GitHub Pages.
