# Druk Bank Legal Front Door — Google AI Studio exercise

Day 5 / Module 10 build extension. Open `#/front-door` in the course site. Allow 105 additional minutes, individually or in pairs. Existing capstone timing remains 150 minutes.

Participants build a structured legal-intake web app in Google AI Studio Build, using synthetic facts about a fictional bank in Thimphu. The lesson includes a full copyable/downloadable prompt, a classroom NDA template, 23 deterministic fixtures, a reference simulator and a separate participant submission export.

## Teaching sequence and outputs

| Step | Minutes | Observable output |
|---|---:|---|
| Frame the policy | 15 | Complete decision tree, including missing-input hold and high-risk override |
| Build in AI Studio | 30 | Working form, pure rule function, tracker and document preview |
| Challenge the app | 25 | Participant-app expected/actual test report and boundary evidence |
| Repair and inspect | 20 | Defect log, retest, controlled NDA and high-risk referral |
| Demonstrate and hand over | 15 | Two-minute demonstration, source/prompt and production-control reflection |

The site's reference tests do not validate a separately generated participant app. Participants must run the fixtures in their own build and retain the evidence. Marking a step complete is a self-report, not a competence certificate.

## Policy DB-TRIAGE-v1

Validate first. Incomplete or invalid inputs stay at Intake. For valid inputs, high-risk triggers take priority: total USD commitment at least 100,000, customer/sensitive data, cloud hosting or core banking access. All reasons are retained. Tier 3 assigns senior legal, security and privacy/compliance reviews, followed by executive approval; it cannot authorise deployment or execution.

Tier 1 requires an unchanged, standing-approved, zero-value NDA with no operational personal-data or system-access trigger. Party, purpose and valid date are required to generate the draft. Tier 1 waits for an authorised signature; it is never automatically signed or closed. All other valid low-risk inputs go to mid-level counsel in Tier 2. Changed templates and missing standing approval prevent self-service. Unknown data is never treated as no data.

Thresholds, role assignments, durations and template approval are fictional policy assumptions. None of them is represented as a statutory Bhutan requirement. The prototype uses USD without FX conversion and uses full-term commitment rather than an annual instalment.

## Legal research correction

Do not claim that section 465 certifies an NDA. The published ICM Act 2018 electronic-signature chapter is Chapter 15, sections 302–321. NDI Act 2023 sections 155–157 address signature devices, authenticity and additional standards. Production suitability requires checking current amendments, applicable scope and exclusions, implementing standards, authority, identity, consent, integrity, retention and bank sector obligations. A full current consolidation was not established in this exercise. The sample is classroom drafting material, not actual bank-approved wording.

Sources consulted 8 November 2026:

- [ICM Act 2018, BICMA published text](https://www.bicma.gov.bt/data/publications/act/BICM_Act_2018_English.pdf)
- [NDI Act 2023, Office of the Attorney General](https://oag.gov.bt/wp-content/uploads/2024/08/National-Digital-Identity-Act-2023.pdf)
- [Google AI Studio Build documentation](https://ai.google.dev/gemini-api/docs/aistudio-build-mode)

## Assessment

Twenty points: routing/validation 5; documents/signature gates 5; workflow/evidence 5; handover 5. A participant who has only run the site reference simulator has not completed the app-build task. No real bank data, NDI connection, signature, email, backend, bank approval or production deployment is part of the lab.

## Maintenance

`assets/front-door-core.js` owns the rule function, teaching template, fixtures, legal sources and build prompt. `assets/front-door.js` owns the lesson, simulator and separate browser-local worksheet. Regenerate downloadable prompt/fixtures from the core when rules change. Run `node --test tests/front-door.test.cjs` and `node tests/validate.cjs`; optional UI checks: `node tests/front-door-browser.cjs [absolute-playwright-module-path]`.
