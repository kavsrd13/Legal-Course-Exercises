# Lab 4 review and redesign

## Evidence reviewed

The supplied `README.md`, `package.json`, `index.html`, `metadata.json` and `vite.config.ts` were readable. They document an AI Procurement & Legal Risk Workbench, two vendor cases, a five-question procurement checklist, contract redlining, dilemmas and exports. The uploaded `index.html` references `/src/main.tsx`; the separately supplied files did not include readable `src` files. The ZIP could not be materialised in the available environment. Consequently, the original interface, scoring, questions, exports and deployment workflow have **not** been run or verified.

## Retained

- The five-question sequence: classify the use, check data, check IP, check liability, set internal controls.
- The contrast between fictional HR recruitment and ordinary legal-drafting products.
- Clause drafting, evidence requests, a risk register and an exportable committee recommendation.
- Clear EU/Bhutan separation and practical human-review requirements.

## Changed

1. Classification is conditional on territorial scope, actor role and intended use. The GPAI model layer is separate from the downstream tool. The workbench does not label every legal assistant as a GPAI provider or every legal use as a high-risk justice use.
2. Liability limits are negotiated against exposure, fees, remedies, insurance and applicable law. The sample's USD 2.5–5 million range is not treated as a mandatory legal rule. Fine reimbursement and insurability require specific review.
3. Input, model and output rights are separated. An output assignment is not a guarantee that copyright subsists or that no third-party right is infringed.
4. Bhutan statutory questions, sector rules and governance frameworks are distinct from EU comparisons. GNH remains a values lens rather than an invented statutory obligation.
5. “95% accuracy” becomes a request for measurable test evidence, error costs, relevant groups and an acceptance process.
6. A quiz records learning progress. No “Certificate of Competence” is issued, and field completion is not a legal-compliance score.
7. The replacement uses buildless HTML/CSS/JavaScript without external AI calls or API keys. Browser-local saving, JSON restoration and readable submission exports are explicit.

## Replacement deliverables

Two conditional classification memos; data/IP redrafts; five-area risk-allocation register; liability proposal with assumptions; five red-line clauses and fallbacks; one-line usage policy; an operational oversight control; and separate deployment decisions for both tools.

## Teaching sequence

| Stage | Minutes | Output |
|---|---:|---|
| Classify use and scope | 20 | Two-use classification memo |
| Data and IP | 25 | Two redrafts and vendor evidence request |
| Accuracy, assurance and liability | 25 | Risk register and negotiation package |
| Five redlines and internal rule | 25 | Clause set and human-review control |
| Committee decision | 15 | Separate tool decisions and conditions |

Suggested discussion: which condition would actually stop deployment? Who must evidence that it is satisfied? What changes if the deployment facts change?
