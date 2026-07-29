export interface PitchChapterContent {
  id: string;
  route: string;
  index: number;
  eyebrow?: string;
  title: string;
  headline?: string;
  body: string;
  speaker: "Lily" | "Toby" | "Jeremy";
  timeRange: string;
  targetDuration: string;
  supplementTitle: string;
  supplementIntro: string;
  supplementPoints: string[];
}

export const pitchChapters: PitchChapterContent[] = [
  {
    id: "opening",
    route: "/pitch/01-opening",
    index: 1,
    eyebrow: "DeepNeuron Project Proposal · Semester 2",
    title: "InjectWatch",
    headline: "From industrial signals to field decisions.",
    body: "An interactive project proposal for a human-in-the-loop industrial monitoring system, demonstrated through a fully synthetic oilfield water-injection scenario.",
    speaker: "Lily",
    timeRange: "Opening",
    targetDuration: "10 sec",
    supplementTitle: "How to read this prototype",
    supplementIntro:
      "InjectWatch is a concept proposal, not a live operating system. It makes the candidate-to-outcome workflow tangible before the implementation team fixes its final architecture.",
    supplementPoints: [
      "All operational data, thresholds, identities, and outcomes shown here are synthetic.",
      "Human review remains explicit at inspection, action authorisation, and closure.",
      "The prototype demonstrates a decision pattern that can transfer beyond water injection.",
    ],
  },
  {
    id: "why-it-matters",
    route: "/pitch/02-decision-gap",
    index: 2,
    title: "Signals matter only when they become decisions.",
    body: "Industrial teams need more than detection: they need a prioritised, evidence-backed and verifiable path from a weak signal to an accountable response.",
    speaker: "Lily",
    timeRange: "0:00–0:30",
    targetDuration: "30 sec",
    supplementTitle: "The decision gap",
    supplementIntro:
      "A model score is an input to a decision, not the decision itself. Operational value appears only when evidence, responsibility and outcome remain connected.",
    supplementPoints: [
      "Prioritisation translates many competing signals into a reviewable work queue.",
      "Evidence should include uncertainty, alternatives and the next discriminating check.",
      "Verification reconnects field outcomes to the event that triggered the response.",
    ],
  },
  {
    id: "water-injection",
    route: "/pitch/03-water-injection",
    index: 3,
    title: "Our first proving ground: oilfield water injection.",
    body: "Water injection maintains reservoir pressure and supports production. Engineers interpret planned and actual injection together with pressures across connected assets, where no single signal is a complete diagnosis.",
    speaker: "Lily",
    timeRange: "0:30–1:00",
    targetDuration: "30 sec",
    supplementTitle: "Why start with a concrete operating system",
    supplementIntro:
      "A bounded proving ground gives the team real asset relationships, signals and decision questions without claiming that every industrial domain shares the same fault logic.",
    supplementPoints: [
      "The scenario links a supply path, manifold, branch, injection well and reservoir context.",
      "Daily values are intentionally simple enough for a semester MVP and rigorous testing.",
      "The same workflow pattern can later support pumps, pipelines, manufacturing, energy and water networks.",
    ],
  },
  {
    id: "industrial-ai",
    route: "/pitch/04-industrial-ai",
    index: 4,
    title: "Industrial AI must reason beyond isolated scores.",
    body: "At the centre of InjectWatch is event intelligence: turning incomplete labels, timestamp-level signals and changing multivariate context into reviewable candidate events.",
    speaker: "Lily",
    timeRange: "1:00–1:38",
    targetDuration: "38 sec",
    supplementTitle: "Research directions behind the workflow",
    supplementIntro:
      "The interface is intentionally model-agnostic. It creates a stable event and evaluation contract before the team compares more advanced methods.",
    supplementPoints: [
      "Weak supervision can use partial expert feedback without pretending labels are complete.",
      "Event formation groups repeated timestamp detections into a unit humans can investigate.",
      "Dataset shift, graph relationships and physical constraints become research extensions once the baseline loop is testable.",
    ],
  },
  {
    id: "system-loop",
    route: "/pitch/05-system-loop",
    index: 5,
    title: "Detect → Understand → Inspect → Decide → Verify.",
    body: "InjectWatch connects data evidence with physical field evidence. Engineers review system-drafted inspection tasks, field crews record observations and approved routine actions, and uncertain or higher-authority decisions return for technical review before outcome verification.",
    speaker: "Lily",
    timeRange: "1:38–2:02",
    targetDuration: "24 sec",
    supplementTitle: "Why the workflow keeps human gates",
    supplementIntro:
      "Human-in-the-loop does not mean adding a final approval button. Review responsibilities are placed where uncertainty, field work and operational consequence change.",
    supplementPoints: [
      "Inspection approval turns a data hypothesis into a bounded task with physical checks, context and authority limits.",
      "Field crews can resolve routine issues within approved procedures; uncertain, complex or higher-authority findings are escalated.",
      "Technical review compares sensor evidence with field observations before selecting the next action.",
      "Closure requires post-action evidence; it does not automatically update a rule or model.",
    ],
  },
  {
    id: "scenario",
    route: "/pitch/06-scenario",
    index: 6,
    title: "Six detections become one reviewable event.",
    body: "The system prioritises a data-level hypothesis, an engineer turns it into a targeted inspection, and the field crew returns physical observations and an initial judgement. In this scenario, the next action requires engineering authorisation before recovery can be verified.",
    speaker: "Lily",
    timeRange: "2:02–3:40",
    targetDuration: "98 sec · including demo",
    supplementTitle: "How to interpret SYN-EV-1042",
    supplementIntro:
      "The scenario is deliberately gradual rather than catastrophic. Its purpose is to demonstrate evidence assembly, human review and outcome verification—not a field-valid diagnostic threshold.",
    supplementPoints: [
      "Six consecutive daily detections are merged into one candidate event to reduce alert fragmentation.",
      "Stable manifold pressure weakens a broad upstream explanation but does not prove the suggested local restriction.",
      "Routine findings may be resolved under approved procedures; this demo follows the branch that requires engineering review.",
      "The technical reviewer compares the original sensor evidence with the field worker's physical evidence and judgement.",
      "The final closed event is only eligible for later expert-reviewed label curation.",
    ],
  },
  {
    id: "prototype",
    route: "/pitch/07-prototype",
    index: 7,
    title: "The loop is clear. The implementation remains team-owned.",
    body: "This lightweight prototype fixes the problem, end-to-end loop and semester acceptance line. Its interface, visualisations, workflow details and technical choices are starting points for the implementation team to test and refine.",
    speaker: "Lily",
    timeRange: "3:40–4:10",
    targetDuration: "30 sec",
    supplementTitle: "What is fixed—and what is deliberately open",
    supplementIntro:
      "A useful concept prototype should remove ambiguity about the product problem while preserving room for evidence-led engineering choices.",
    supplementPoints: [
      "User needs, data availability, technical feasibility and testing should shape the final MVP.",
      "The current browser-local state is a demonstrator, not a proposed production architecture.",
      "Open choices create meaningful ownership rather than asking contributors to reproduce a finished design.",
    ],
  },
  {
    id: "contributions",
    route: "/pitch/08-contributions",
    index: 8,
    title: "Six contribution tracks. One shared response loop.",
    body: "Members can focus on the discipline that best matches their interests while coordinating through shared contracts and contributing to the same end-to-end system.",
    speaker: "Toby",
    timeRange: "4:10–4:32",
    targetDuration: "22 sec",
    supplementTitle: "How parallel ownership stays integrated",
    supplementIntro:
      "The project is divided by responsibility, not into unrelated mini-projects. Shared event, inspection and outcome contracts keep the work convergent.",
    supplementPoints: [
      "Frontend, backend, data, visualisation, QA and ML work against the same synthetic story.",
      "Each track can define a visible deliverable and clear acceptance criteria.",
      "Integration reviews expose how one module changes evidence, workflow or evaluation downstream.",
    ],
  },
  {
    id: "contributor-gain",
    route: "/pitch/09-contributor-gain",
    index: 9,
    title: "Own a visible deliverable. Learn the whole system.",
    body: "No oilfield experience is required. Domain onboarding, synthetic or explicitly sanitised data and scoped ownership let contributors learn through code review, testing, CI and system integration.",
    speaker: "Jeremy",
    timeRange: "4:32–4:52",
    targetDuration: "20 sec",
    supplementTitle: "A project designed for different experience levels",
    supplementIntro:
      "Tasks can vary in complexity while still contributing to the same portfolio-ready team artifact.",
    supplementPoints: [
      "Newer members can own bounded UI, test, data-contract or visualisation deliverables.",
      "Experienced members can lead architecture, evaluation, integration and review.",
      "Synthetic-first development makes assumptions inspectable and avoids dependence on sensitive field data.",
    ],
  },
  {
    id: "deliver",
    route: "/pitch/10-deliver",
    index: 10,
    title: "A tested, documented and deployable semester MVP.",
    body: "Our target is one complete synthetic fault-response loop that the team can explain, test and demonstrate. With more time, the same architecture can support more scenarios, early warning, shift monitoring and advanced temporal or graph-based research.",
    speaker: "Lily",
    timeRange: "4:52–5:40",
    targetDuration: "48 sec",
    supplementTitle: "The semester acceptance line",
    supplementIntro:
      "Scope discipline is part of the engineering contribution: finish one credible loop before expanding the number of models, scenarios or integrations.",
    supplementPoints: [
      "The MVP should be reproducible, reviewable and safe to demonstrate with synthetic data.",
      "Documentation should cover domain assumptions, contracts, evaluation and the operating runbook.",
      "Water injection is the proving ground; the reusable contribution is the candidate-to-outcome architecture.",
    ],
  },
];

export const decisionQuestions = [
  {
    number: "01",
    title: "What needs attention?",
    body: "Turn competing signals into a prioritised, reviewable candidate queue.",
  },
  {
    number: "02",
    title: "What evidence supports it?",
    body: "Keep aligned measurements, alternatives and uncertainty beside the event.",
  },
  {
    number: "03",
    title: "What should be checked next?",
    body: "Ask for the field observation most likely to change the decision.",
  },
  {
    number: "04",
    title: "Did the response work?",
    body: "Verify recovery and reconnect the outcome to the original candidate.",
  },
] as const;

export const industrialAiChallenges = [
  {
    code: "LABELS",
    title: "Incomplete expert labels",
    body: "Operational truth is sparse and often requires expert validation.",
  },
  {
    code: "EVENTS",
    title: "Scores are not events",
    body: "Timestamp-level detections must become coherent, reviewable episodes.",
  },
  {
    code: "CONTEXT",
    title: "Multivariate context",
    body: "Connected sensors and assets can support or weaken an explanation.",
  },
  {
    code: "CHANGE",
    title: "Operating conditions shift",
    body: "Normal behaviour can change across regimes, seasons and interventions.",
  },
  {
    code: "ATTENTION",
    title: "Alerts compete",
    body: "Limited human attention makes consequence and evidence quality matter.",
  },
  {
    code: "EVALUATION",
    title: "Outcomes arrive later",
    body: "Useful evaluation must connect detection, action and verified response.",
  },
] as const;

export const researchDirections = [
  "Weak supervision",
  "Multivariate detection",
  "Event formation",
  "Risk ranking",
  "Early warning",
  "Dataset shift",
  "Graph / physics-informed learning",
] as const;

export const systemLoop = [
  "Field measurements",
  "Candidate detection",
  "Event merging",
  "Evidence and priority",
  "Expert-approved inspection",
  "Field feedback",
  "Technical review and action authorisation",
  "Authorised action record",
  "Recovery verification",
  "Curated learning review",
] as const;

export const statusColumns = [
  {
    label: "NOW",
    title: "Prototype now",
    items: [
      "One deterministic synthetic story",
      "Browser-local state",
      "No backend or field connection",
      "Pitch and interaction testing",
    ],
  },
  {
    label: "SEMESTER TARGET",
    title: "Semester MVP target",
    items: [
      "Contract-first event and inspection modules",
      "Evidence-rich interface",
      "Mock API boundary",
      "Tested human-feedback workflow",
    ],
  },
  {
    label: "LATER",
    title: "Later vision",
    items: [
      "Governed data-service integration",
      "Rules plus early-warning models",
      "Broader asset relationships",
      "Optional notifications and reporting",
    ],
  },
] as const;

export const prototypeChoices = [
  {
    label: "CLEAR NOW",
    title: "Problem and loop",
    body: "The decision gap, human gates, synthetic story and semester acceptance line are explicit.",
  },
  {
    label: "TEAM-OWNED",
    title: "Implementation choices",
    body: "Interfaces, visual language, services, event logic and evaluation details remain open.",
  },
  {
    label: "DECIDED BY",
    title: "Evidence and testing",
    body: "Available data, user needs, feasibility, review and integration tests guide refinement.",
  },
] as const;

export const buildModules = [
  {
    code: "M1",
    title: "Data contracts & synthetic testbed",
    body: "Typed event schema · deterministic scenarios · mock API boundaries",
  },
  {
    code: "M2",
    title: "Detection & event logic",
    body: "Daily signal rules · event merging · priority and status logic",
  },
  {
    code: "M3",
    title: "Evidence interface & visualisation",
    body: "Aligned time series · alternatives · unknowns · reviewable evidence",
  },
  {
    code: "M4",
    title: "Workflow, feedback & integration",
    body: "Approval · field feedback · recovery · audit trail · tests · CI",
  },
] as const;

export const roles = [
  ["Frontend & Product UX", "Interaction flow, responsive console, accessible components"],
  ["Backend & API Contracts", "Mock services, domain contracts, workflow boundaries"],
  ["Data & Event Logic", "Deterministic signals, event merging, evaluation-ready outputs"],
  ["Data Visualisation", "Truthful industrial time-series and evidence views"],
  ["QA, DevOps & Integration", "Tests, CI, demo reliability, deployment"],
  ["Machine Learning & Evaluation", "Ranking, early-warning and evaluation experiments after contracts are clear"],
] as const;

export const contributorGains = [
  {
    code: "01",
    title: "Domain onboarding",
    body: "Learn the necessary water-injection context without needing prior oilfield experience.",
  },
  {
    code: "02",
    title: "Scoped ownership",
    body: "Own a visible deliverable matched to your experience and interests.",
  },
  {
    code: "03",
    title: "Engineering practice",
    body: "Use review, tests, continuous integration and system integration in a real team workflow.",
  },
  {
    code: "04",
    title: "Portfolio evidence",
    body: "Show how your contribution connects to a complete, explainable product artifact.",
  },
] as const;

export const deliverableOutcomes = [
  {
    code: "TESTED",
    title: "Repeatable behaviour",
    body: "Deterministic scenarios, automated checks and a rehearsed end-to-end path.",
  },
  {
    code: "DOCUMENTED",
    title: "Reviewable decisions",
    body: "Domain assumptions, data contracts, evaluation boundaries and operating runbooks.",
  },
  {
    code: "DEPLOYABLE",
    title: "Shareable MVP",
    body: "A safe synthetic demonstration the whole team can run and explain.",
  },
  {
    code: "COMPLETE",
    title: "One closed loop",
    body: "Candidate detection through inspection, authorised response and verified outcome.",
  },
] as const;

export const laterHorizons = [
  "Multiple scenarios",
  "Early-warning experiments",
  "Shift monitoring",
  "Temporal / graph research",
] as const;
