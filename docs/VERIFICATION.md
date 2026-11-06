# Initial build verification record

Checked on 6 November 2026.

## Passed

- Content/structure checks: 10 labs, 50 steps, 30 knowledge questions, unique answer keys, matching step/lab timing, valid source references and existing linked local resources.
- JavaScript syntax checks.
- Six core tests covering explicit review gates, full-course JSON round trips, vendor-score constraints, invalid input filtering, separate quiz results and complete long-response exports.
- Chrome headless browser flow covering all 50 step routes and completion of all ten labs.
- Browser saving and reload, edit invalidation, required-field gates, quiz feedback, JSON and Markdown downloads, confirmation before reset/restore, invalid route handling and mobile page-overflow checks.
- Visual inspection of the course overview, the Lab 4 workbench and a 390-pixel mobile layout.
- PowerShell parsing of the publishing script.

## Limits and status at initial packaging

- The original Lab 4 React application was not run: readable src files were unavailable and the original ZIP could not be materialised.
- HTTP/localhost browser testing was blocked by the execution environment. The browser suite passed using local file URLs. Relative asset paths and hash routes were checked; the hosted project path still needs a post-deployment smoke check.
- The publishing script has not completed a remote push or Pages activation. `gh api user` could not connect to `api.github.com` from the command line. The connected GitHub tool separately confirmed account `kavsrd13`; no repeated OAuth login is required based on this network failure.
- A connected lookup for `kavsrd13/legal-technology-ai-digital-assets-governance` returned 404 at the time of checking. No course repository or live deployment is claimed.
- The source desk is a legal-research starting point; this record does not certify current consolidated law or a compliant live transaction.

The optional browser smoke script requires a separately installed Playwright package and Chrome. The primary validation and core tests use Node built-ins and need no package installation.

## Publication follow-up

The owner subsequently created `kavsrd13/Legal-Course-Exercises`. The complete course source was uploaded through the connected GitHub integration. GitHub Pages is configured to publish from `main` and `/` (root). The original command-line access failures above describe the initial packaging environment; they do not describe the later GitHub upload. Current deployment results are recorded in the repository's Actions history. See `LINKS.md` at the repository root for the course index and ten individual lab URLs.

## Participant pre-read enhancement

All ten labs now have expanded participant briefings, visible objectives, required source-reading lists, glossaries and deliverables before the tasks. The browser suite verified two-statement readiness gating for all ten labs, including entry through a numbered task URL and continuation to its requested step. All 50 task flows, exports, resets/restoration and mobile layouts passed again. Seven core tests passed, including preservation of the pre-read timestamp in backups and preservation of answers from older backups without that timestamp. Content validation checked briefing completeness for every lab. The complete participant pack is in `PARTICIPANT_PRE_READS.md`.
