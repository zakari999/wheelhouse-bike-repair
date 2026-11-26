## What changed

<!-- One or two sentences per change. Link the issue if there is one (Fixes #12). -->

-

## Why

<!-- The problem this solves for Kwame, a customer, or the other developer. -->

## How to test

<!-- Exact steps a reviewer can follow. Delete any that don't apply. -->

1. `npm install`
2. `npm run lint`: passes with zero errors
3. `npm run format:check`: passes
4. `npm run build`, then `npm run preview`: open the printed URL and check:
   -

## Screenshots

<!-- Required for visual changes. Show desktop and mobile. -->

## Author checklist

- [ ] Branch is `feature/<short-description>` and targets `develop` (not `main`)
- [ ] Commit subjects use an allowed prefix (`feat:` `fix:` `refactor:` `style:` `chore:` `docs:` `test:`), are 50 characters or less, and have no trailing period
- [ ] Pre-commit hook ran (I did not use `--no-verify`)
- [ ] CI checks are green
- [ ] If I changed services or prices, each card's `data-service` matches a booking-form `<option value>`
- [ ] Checked with keyboard only, and at mobile width (≤ 650px)

## For the reviewer

Label every comment **Blocking** (must change before merge) or **Optional** (fine to merge as is), and say what would break in practice if it is left in. Push follow-up fixes as new commits; do not force-push once review has started.
