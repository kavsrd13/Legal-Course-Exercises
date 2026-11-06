# Legal Technology, AI, Digital Assets & Governance

A five-day learning studio with ten guided web workshops, fictional source packs, editable decision tables, local progress, self-check quizzes and portfolio exports. Developed for a small instructor-led group of legal professionals.

## Open locally

Open `index.html` in a modern browser. No build step, package install, external font or API key is required. A local HTTP server is recommended for predictable browser storage and clipboard behaviour:

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080/`.

## Course map

| Day | Lab | Deliverable |
|---|---|---|
| 1 | 1 — IP Portfolio Audit | IP register, ownership gaps, licence position and 90-day plan |
| 1 | 2 — Technology Licence Negotiation | Clause review, six redrafts and negotiated term sheet |
| 2 | 3 — Verified AI Legal Review | Obligation matrix, verified claim log and internal memo |
| 2 | 4 — AI Procurement & Legal Risk | Classification memo, risk grid, five redlines and policy |
| 3 | 5 — Token Rights & Transaction Mapping | Parties/flows map and provisional rights analysis |
| 3 | 6 — Digital-Asset Due Diligence | Twelve-risk register, launch gates and recommendation |
| 4 | 7 — Privacy, Data Mapping & DPIA | Data map, harm assessment and incident decision |
| 4 | 8 — Cloud Contract & Exit Review | Nine-clause review, responsibilities and exit test |
| 5 | 9 — Cyber Incident Legal Tabletop | Sequential decision log, notice outline and contract lessons |
| 5 | 10 — Legal Transformation Capstone | Vendor comparison, governance plan and roadmap |

## Student links

Every workshop has a direct hash route, for example `https://OWNER.github.io/REPOSITORY/#/lab/ai-procurement`. Share a link when needed; all published material remains publicly discoverable. Link distribution is not access control. Hash routing works on a GitHub Pages project path without server rewrite rules.

## GitHub Pages

Run `publish.ps1` from a normal PowerShell terminal with Git, GitHub CLI and Node installed, an authenticated GitHub account, and working network access. It validates source, creates a new course-named public repository only if absent, pushes the main branch and configures Pages from the main branch root. It refuses to overwrite a nonempty existing repository that is not already the local origin. Public visibility is intentional for student access and contains only fictional teaching content.

Run the included validation commands before future updates. Pages uses branch-root publishing and does not require a custom build workflow. A `LINKS.md` file is produced by the publishing script with the actual account and repository URL. Do not treat an expected URL as live until Pages reports a successful build and the URL responds.

## Storage, submissions and limits

Progress is local to the current browser profile; students export Markdown and submit via the instructor's chosen channel. JSON backups can be restored after confirmation. There is no backend, authentication, analytics, central gradebook, real AI integration, live legal assessment or competence certification. The teacher discussion themes and quiz logic are public.

The sample Lab 4 was assessed from readable documentation/configuration. Its React `src` was unavailable for execution; this is a documented replacement rather than a verified patch to the original interface. See `docs/LAB4_REVIEW.md`.

## Maintain and validate

- `assets/course-data.js`: scenarios, documents, fields, quizzes, sources and rubrics.
- `assets/core.js`: validation, data cleaning, completion, scoring and exports.
- `assets/app.js`: interface, navigation, local saving and import/export.
- `assets/styles.css`: responsive and print styles.
- `docs/`: learner, facilitator, source and redesign guidance.

```powershell
node tests/validate.cjs
node --test tests/core.test.cjs
```

All legal materials require instructor revalidation before delivery. The exercises do not provide legal advice or authorise a regulated activity.
