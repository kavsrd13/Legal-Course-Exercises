/* Participant pre-reading: context and instructions, not model answers. */
(function () {
  'use strict';
  const briefings = {
    'ip-audit': {
      role: 'In-house IP adviser to Meridian Group and its agri-tech venture HHA.',
      background: [
        'Himalayan Harvest Analytics has developed OrchardEye, a service that helps apple growers identify disease and connect with buyers. The product combines code, a prediction model, a user interface, a brand, training content and grower information. Different people created these assets, and the records of ownership and permission are incomplete.',
        'A distributor now wants exclusive rights in Bhutan and India, together with access to source code. Management believes that paying employees and suppliers means the company owns everything. Before the board grants valuable rights, it needs a reliable picture of what HHA owns, what it may use, and what still needs investigation.',
        'Your job is to turn a messy collection of assets into a practical IP register and an action plan. You are not expected to know every national IP rule from memory. You must identify the relevant question, the evidence needed and the person responsible for resolving it.'
      ],
      challenge: 'Which assets and rights can HHA confidently protect or license, and what must be resolved before the distributor deal advances?',
      facts: ['The freelancer interface has an invoice but no signed assignment in the evidence pack.', 'The sensor casing has already been publicly displayed.', 'The distributor requests broad exclusivity without performance milestones.'],
      uncertainties: ['Applicable ownership, registration and novelty rules must be checked.', 'Missing paperwork is a reason to investigate, not automatic proof that no rights exist.'],
      outputs: ['A ten-asset IP register and ownership-gap list.', 'Five prioritised actions and a budgeted 90-day remediation plan.', 'A six-point opening licence position with fallbacks.'],
      terms: [['IP asset', 'Something potentially protected by intellectual-property rights, such as code, a brand or a design.'], ['Assignment', 'A transfer of specified rights; the required form and effect depend on applicable law.'], ['Licence', 'Permission to use rights within agreed limits, rather than necessarily transferring ownership.']],
      connection: 'This register supplies the ownership assumptions and licensing positions for Lab 2.'
    },
    'licence-negotiation': {
      role: 'Counsel for DrukLex or Sengri; solo learners review both negotiating positions.',
      background: [
        'DrukLex Solutions owns software used to analyse contracts. Sengri Systems wants to distribute that product to banks and government customers. DrukLex wants revenue and market access while retaining its core technology. Sengri wants enough commercial certainty, support and continuity to justify its investment in onboarding customers.',
        'The proposed term sheet gives Sengri extensive rights while placing substantial obligations on DrukLex. It covers improvements, licence scope, sublicensing, exclusivity, royalties, audits, confidentiality, warranties, liability, termination and source-code delivery. Each term affects other parts of the bargain.',
        'You will prepare a negotiating mandate, review the clauses, draft priority protections and discuss concessions. Agreement is not the only acceptable result: an unresolved issue or a reasoned walk-away is useful when clearly recorded. The role briefs are visible to everyone for this teaching exercise.'
      ],
      challenge: 'What balanced package of scope, economics, remedies and continuity could each side recommend for approval?',
      facts: ['The proposal contains eleven clauses, identified C1–C11.', 'Sengri plans onboarding investment; DrukLex needs to preserve background technology.', 'The business sponsor requires final legal and finance approval.'],
      uncertainties: ['Commercial authority and insurer approval are limited.', 'Governing-law enforceability and public-procurement eligibility are not established by the case.'],
      outputs: ['An eleven-clause review and six replacement clauses.', 'A four-point negotiation record separating agreed terms from open issues.', 'A sponsor recommendation and source-code continuity proposal.'],
      terms: [['Background IP', 'Technology or rights a party brings into the deal rather than creates specifically for it.'], ['Sublicence', 'Permission granted onward to another user or distributor under the primary licence.'], ['Escrow', 'An arrangement for holding material such as source code for release on agreed events.']],
      connection: 'The audit, liability and exit structure will recur in the AI and cloud procurement labs.'
    },
    'verified-ai-review': {
      role: 'A human legal reviewer preparing an internal SaaS contract review for Meridian.',
      background: [
        'Meridian is considering NorthStar’s SaaS agreement. The contract covers a repository, AI-assisted summaries, renewal notice, data use, incidents, availability, liability and exit. Meridian also has a review playbook describing the positions its legal team expects to check.',
        'An AI assistant can make extraction and drafting faster, but its output may misread a clause, omit a restriction or invent a legal authority. The source pack therefore includes a deliberately unreliable simulated response. You will compare its claims with the actual agreement and correct the record.',
        'Use an approved external AI tool if your instructor permits one. If none is available, the supplied simulation provides a complete manual route. The objective is not to obtain a polished-looking answer; it is to create a review that another lawyer can trace back to the source.'
      ],
      challenge: 'Which findings are supported by the supplied text, and how can you turn them into a verified review memo?',
      facts: ['AI-01 is the fictional contract; AI-02 is Meridian’s playbook.', 'AI-03 contains six simulated claims, some intentionally unreliable.', 'A small eDiscovery set is included to practise source IDs and restricted review.'],
      uncertainties: ['Do not invent calendar deadlines when only a relative notice period is supplied.', 'An unsupported legal citation requires primary-source research, not a guess.'],
      outputs: ['A source-bounded prompt, obligation matrix and deviation table.', 'A six-claim verification log and eDiscovery triage.', 'A fact-checked internal memo and VERIFY audit note.'],
      terms: [['Hallucination', 'A generated statement presented plausibly without adequate source support.'], ['Obligation matrix', 'A table identifying who must do what, by when, and with what evidence.'], ['eDiscovery triage', 'An initial classification of documents for relevance, duplication and restricted legal review.']],
      connection: 'The evidence and verification habits are essential for the procurement decisions in Lab 4.'
    },
    'ai-procurement': {
      role: 'A cross-functional AI governance committee advising Meridian: Legal, Risk and IT.',
      background: [
        'Meridian is comparing two AI purchases. TalentPulse ranks job applicants and automatically rejects a proportion of them, including in an EU subsidiary’s recruitment pilot. LexisDraft helps internal lawyers draft and review ordinary commercial contracts. These uses have different purposes, affected people and legal questions.',
        'Both vendors offer terms that need careful review. The terms permit broad retention and model training, allocate output and input risks unevenly, restrict assurance and logs, and provide weak exit support. One vendor advertises “95% accuracy” without explaining the test. Meridian needs evidence and operating controls before a purchase becomes a safe deployment.',
        'You will follow five procurement questions: classify the use, check data, check IP, check liability, and set the internal rule. Keep legal classification, commercial negotiation and company policy separate. Your recommendation should explain who may use each product, on what conditions, and what evidence is still missing.'
      ],
      challenge: 'Can either proposed use advance, and which contract protections and operating controls must be in place first?',
      facts: ['The two products have different intended uses and fees.', 'Vendor clauses C1–C7 are supplied for review.', 'Loss estimates are negotiation assumptions; no fixed liability cap has been approved.'],
      uncertainties: ['EU territorial scope, intended use, actor role and the GPAI model layer require separate analysis.', 'Performance, insurance, data flows, IP provenance and audit capability need evidence.'],
      outputs: ['A two-use classification memo and vendor evidence request.', 'A risk-allocation register and justified liability proposal.', 'Five redlines, a one-line policy, an oversight control and two deployment decisions.'],
      terms: [['AI deployer', 'An organisation using an AI system; the exact legal role depends on the relevant rules and facts.'], ['GPAI', 'General-purpose AI: a model layer that can support multiple downstream applications.'], ['Redline position', 'A proposed contract change and the reason or condition supporting it.']],
      connection: 'Your data, assurance and oversight requirements carry into the privacy and cloud labs.'
    },
    'token-mapping': {
      role: 'A legal adviser explaining a proposed token project to Meridian’s board.',
      background: [
        'Bhutan Orchard Co-operative proposes Green Orchard Units. A unit is recorded on a permissioned ledger and represents a contractual share of export revenue for three years. The facts expressly say that it does not give ownership of orchard land or fruit.',
        'Several organisations support the process: an issuer, a ledger platform, a payment provider and a custodian safeguarding digital keys. Software calculates distributions from revenue figures supplied by a person, and a finance manager must approve payment. The record, the cash movement and the legal entitlement are therefore different things.',
        'You will explain the terms, map the parties and separate four flows: money, token records, personal data and contractual rights. You will then consider failures involving incorrect revenue input, a lost key, an ownership claim and disagreement between code and written terms. No wallet or blockchain programming is needed.'
      ],
      challenge: 'What right does a GOU holder actually have, against whom, and what happens when a supporting mechanism fails?',
      facts: ['There are 10,000 proposed units on a permissioned ledger.', 'Investors pay ordinary money through a payment provider.', 'Code calculates distributions; a human approves payment.'],
      uncertainties: ['Regulatory classification and permissions remain questions for jurisdiction-specific advice.', 'The case does not fully address custody insolvency or disputes.'],
      outputs: ['A plain-language glossary and party/responsibility map.', 'Four distinct transaction flows and a provisional classification.', 'Four failure safeguards and a short board explanation.'],
      terms: [['Ledger', 'A shared or coordinated record of transactions.'], ['Custody', 'Safeguarding the credentials used to control digital assets.'], ['Oracle / data input', 'Information from outside the code used to trigger or calculate an automated step.']],
      connection: 'Use this rights-first approach to assess the more complex offering in Lab 6.'
    },
    'digital-asset-dd': {
      role: 'Legal due-diligence adviser to Meridian’s investment committee.',
      background: [
        'Tshechu Travel Holdings proposes to sell tokens linked to hotel revenue. It plans to market to people in Bhutan, India and the EU and allow trading on an overseas platform. A proposed redemption feature is described without a clear formula or funding arrangement.',
        'The data room has important gaps. The platform’s licence is described as pending; KYC information is limited; custody terms permit pooling; and the code has no documented independent audit or pause mechanism. Marketing refers to approval and guarantees without supporting documents in the pack.',
        'You will map the transaction, build a twelve-risk register and decide what evidence would be needed before the proposal could advance. Numerical scoring helps prioritise work, but it cannot authorise a regulated activity or overcome an unresolved legal blocker. No real transaction, wallet or regulator contact is part of this exercise.'
      ],
      challenge: 'Should the current proposal advance, and what verifiable conditions must precede any launch decision?',
      facts: ['The proposal offers 5,000 tokens at USD 100 each.', 'The described revenue percentage relates to the token pool; it is not stated as a guaranteed individual yield.', 'DD-02 lists eight data-room issues for your investigation.'],
      uncertainties: ['Applicable licensing, AML/CFT and cross-border distribution duties depend on the actual roles and jurisdictions.', 'Revenue, redemption funding, approval claims and customer safeguards are not adequately evidenced in the pack.'],
      outputs: ['A transaction perimeter memo and missing-document request.', 'A twelve-risk register plus AML and custody control plans.', 'Five launch conditions, corrected marketing principles and a committee decision.'],
      terms: [['Regulatory perimeter', 'The boundary between activities that do and do not require particular regulatory treatment.'], ['Beneficial owner', 'The natural person ultimately owning or controlling an entity, subject to the applicable legal definition.'], ['Condition precedent', 'A specified requirement to be satisfied before an action or obligation can proceed.']],
      connection: 'The evidence-based launch gate becomes part of the capstone governance plan.'
    },
    'privacy-dpia': {
      role: 'A privacy adviser reviewing the Foundation’s scholarship portal and its suppliers.',
      background: [
        'Mountain Education Foundation decides scholarship eligibility. DrukID Scholar operates its portal, with backup and analytics suppliers in Germany and the UK. The portal handles applicant identity, household income, examination results, support needs and facial-verification information.',
        'The proposed facial-matching feature raises questions about necessity, exclusion and alternative verification. Existing arrangements also have indefinite retention, weak administrator authentication and unclear supplier permissions. Later in the exercise, a link-exposure incident introduces a separate decision about containment, evidence and notification.',
        'You will map purposes and access before analysing duties. Keep the actual Bhutan processing facts separate from the expressly assumed EU comparison scenario. The presence of an overseas supplier does not, on its own, answer every question about which privacy law applies.'
      ],
      challenge: 'How should the portal be redesigned and governed to reduce harm to applicants, and what must happen if records are exposed?',
      facts: ['The Foundation decides the core eligibility purpose.', 'Eight data categories and multiple supplier locations are described.', 'The incident card describes exposure of 230 files, with incomplete evidence about access.'],
      uncertainties: ['Roles may differ for core hosting and a supplier’s own-purpose reuse.', 'Territorial scope, legal basis, sensitive-data conditions and notification triggers must be assessed for the relevant regime.'],
      outputs: ['An eight-item data inventory and role analysis.', 'A DPIA-style harm register, transfer review and design approval gate.', 'An incident decision log with facts, unknowns, owners and next review.'],
      terms: [['Controller / decision-maker', 'The party determining the purposes and essential means of processing under the relevant legal test.'], ['Processor / service provider', 'A party processing data on another party’s instructions, where that legal role applies.'], ['DPIA', 'A structured assessment of processing risks to people and measures to address them.']],
      connection: 'Your supplier and data-map findings become contractual requirements in Lab 8.'
    },
    'cloud-contract': {
      role: 'Customer-side legal counsel reviewing JigmeCase Cloud with IT and Procurement.',
      background: [
        'Meridian wants a hosted system for legal files. The service will store or access data across several countries, and support access locations are not fully specified. The files may contain confidential, privileged or personal information, so the contract must reflect the actual data map and operational needs.',
        'The proposed terms use broad promises and weak lifecycle controls: an imprecise security commitment, a 95% availability target with broad exclusions, unrestricted subcontracting, limited assurance, indefinite backups and a costly PDF-only exit. A useful review must connect these words to controls someone can test.',
        'You will review nine clauses, allocate shared responsibilities and design an export and deletion test. You do not need to configure a cloud account. Your task is to turn business requirements into measurable contractual and operational commitments.'
      ],
      challenge: 'What must change before Meridian can responsibly rely on this service and leave it without losing control of its records?',
      facts: ['The evidence pack contains nine proposed clauses.', 'The team needs searchable export with attachments and metadata.', 'A 720-hour teaching month is supplied for illustrative availability calculations.'],
      uncertainties: ['Actual support locations, recovery needs, key controls and legal obligations require confirmation.', 'Service credits, audit evidence and exit pricing need negotiation and approval.'],
      outputs: ['A nine-clause deviation table and service/location requirements.', 'A six-control shared-responsibility schedule.', 'A tested-exit plan, replacement exit clause and procurement brief.'],
      terms: [['SLA', 'A service-level agreement defining a commitment, its measurement and relevant remedies.'], ['Shared responsibility', 'The explicit allocation of controls between the customer, supplier and their joint processes.'], ['Portability', 'The ability to export and reuse records in a suitable receiving system.']],
      connection: 'The incident, evidence and recovery provisions will be tested in Lab 9.'
    },
    'cyber-tabletop': {
      role: 'Incident team members: lead, legal adviser, security lead and communications owner.',
      background: [
        'Meridian’s DrukCare Claims unit receives a report of unusual account activity. Its hosted system may hold identifiers, medical details and payment information. Early facts are incomplete, and the team must respond while preserving the ability to investigate what happened.',
        'New information arrives through timed injects. The possible scope expands, a vendor proposes deleting logs, a reporter asks for a definite claim, the insurer requests notice and a vendor account later becomes relevant. These developments test how you distinguish facts, estimates and legal questions under pressure.',
        'Work through the injects in order. Do not assume the later facts were known during an earlier decision. Each response should record what was known at that time, the action chosen, its owner, evidence to preserve and the next review point. This is a tabletop: you will not operate real systems or send real notices.'
      ],
      challenge: 'How can the team contain harm, preserve evidence and make defensible notification and communication decisions as facts change?',
      facts: ['The contract card supplies a vendor notice obligation and evidence-preservation duty.', 'The insurance card uses its own notice and spending conditions.', 'The affected count begins as an estimate, not a confirmed statement of theft.'],
      uncertainties: ['Affected data, access, awareness, cause and jurisdiction must be established.', 'There is no single assumed deadline for all regulators, individuals, insurers and contractual parties.'],
      outputs: ['A chronological decision and preservation log.', 'A five-recipient notification register, holding statement and insurance outline.', 'An updated recovery memo and three contract lessons.'],
      terms: [['Inject', 'A new piece of simulated information introduced at a specific stage.'], ['Evidence hold', 'An instruction to preserve potentially relevant records rather than delete or alter them.'], ['Holding statement', 'A short factual communication acknowledging what is known while investigation continues.']],
      connection: 'Use the response lessons to strengthen the governance and roadmap in Lab 10.'
    },
    'transformation-capstone': {
      role: 'A legal transformation team preparing a decision for Meridian’s business sponsor.',
      background: [
        'Thunder Dragon Legal Office handles recurring contract work but has slow completion, missing ownership, missed renewals, manual re-entry and low use of approved templates. The team wants technology, but first needs a clear process, a manageable pilot and ways to judge whether the change helps.',
        'Three fictional vendors offer different strengths and gaps. A basic repository is cheaper but has unproven support and integration. A workflow suite offers broader functions but still needs diligence. An AI-heavy option promises speed while leaving data use and exit unclear. A weighted score can support comparison, but it cannot replace mandatory approval gates.',
        'Bring together your earlier lab outputs: IP and licence positions, AI controls, token launch gates, privacy/cloud safeguards and cyber-response lessons. If a prior lab was not completed, record the missing dependency rather than inventing its outcome. Your final output should be a roadmap a sponsor could review and act on.'
      ],
      challenge: 'Which bounded pilot should Meridian fund, what conditions must it satisfy, and how will the team measure useful outcomes?',
      facts: ['CAP-01 supplies fictional baseline metrics, including 18-day average completion.', 'The 90-day pilot has 100 planning units, two legal users and part-time IT support.', 'Vendor evidence is incomplete; proposed targets are not achieved results.'],
      uncertainties: ['Vendor scores require stated assumptions and confidence.', 'Live-data use, signature authority, security, integration and exit need explicit approval and acceptance evidence.'],
      outputs: ['A prioritised pilot and five proposed outcome targets.', 'A weighted vendor comparison with separate approval gates.', 'A cross-course governance plan, owned 90-day roadmap and five-minute board pitch.'],
      terms: [['Baseline', 'The starting measurement used to compare later performance.'], ['Pilot', 'A limited, controlled implementation used to test a proposed change.'], ['Acceptance gate', 'The evidence and approval required before moving to a later phase.']],
      connection: 'This is the final portfolio synthesis. Export the roadmap and present the decision you want the sponsor to make.'
    }
  };
  for (const lab of window.COURSE.labs) lab.briefing = briefings[lab.id];
}());
