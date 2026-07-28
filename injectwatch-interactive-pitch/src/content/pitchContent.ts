export interface PitchChapterContent {
  id: string;
  route: string;
  index: number;
  eyebrow?: string;
  title: string;
  headline?: string;
  body: string;
  targetDuration: string;
  presenterCue: string;
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
    targetDuration: "25 sec",
    presenterCue:
      "Industrial monitoring projects often stop at a model score or a dashboard. InjectWatch asks what happens next: who reviews the signal, what evidence they see, what action is approved, and whether the outcome is verified.",
  },
  {
    id: "decision-gap",
    route: "/pitch/02-decision-gap",
    index: 2,
    title: "Industrial monitoring has a decision gap.",
    body: "Measurements are only useful when a team can turn them into a reviewable, prioritised, and traceable decision.",
    targetDuration: "40 sec",
    presenterCue:
      "The bottleneck is not simply predicting an anomaly. It is managing the path from a weak signal to an accountable field decision without losing the evidence or the feedback.",
  },
  {
    id: "water-injection",
    route: "/pitch/03-water-injection",
    index: 3,
    title: "Start concrete: oilfield water injection.",
    body: "Water injection helps maintain reservoir pressure and support production. Daily planned injection, actual injection, and pressure signals provide useful evidence, but no single signal is a complete diagnosis.",
    targetDuration: "45 sec",
    presenterCue:
      "Water injection gives us a concrete chain of assets and decisions. We can start narrow, build one credible loop, and later transfer the architecture without pretending every industry has the same fault logic.",
  },
  {
    id: "system-loop",
    route: "/pitch/04-system-loop",
    index: 4,
    title: "Build the decision loop, not just the model.",
    body: "Three human approval gates keep inspection, bounded action, and technical closure reviewable.",
    targetDuration: "50 sec",
    presenterCue:
      "This page separates what you can click today from what the team would build this semester and what belongs to a longer research and product vision. The project succeeds this semester if one full loop is engineered well.",
  },
  {
    id: "scenario",
    route: "/pitch/05-scenario",
    index: 5,
    title: "One quiet pattern. One complete response loop.",
    body: "Actual injection declines gradually while the plan remains stable. Wellhead pressure rises, but manifold pressure remains comparatively stable. There is no single catastrophic day and no confirmed root cause.",
    targetDuration: "25 sec",
    presenterCue:
      "This is deliberately not a dramatic spike. Six daily detections become one candidate event. We will see why it is prioritised, approve an inspection, review the field feedback, authorise a synthetic action, and verify whether the signal recovered.",
  },
  {
    id: "build",
    route: "/pitch/06-build",
    index: 6,
    title: "This semester, we build one complete loop.",
    body: "Contract-first modules converge on one testable candidate-event response loop using synthetic data.",
    targetDuration: "45 sec",
    presenterCue:
      "The scope is intentionally narrow. The team can work contract-first with synthetic data, split ownership by module, and still finish with a coherent end-to-end artifact rather than unrelated mini-projects.",
  },
  {
    id: "roles",
    route: "/pitch/07-roles",
    index: 7,
    title: "Bring your discipline. Learn the whole system.",
    body: "Different disciplines own modules, but everyone can see how their work changes the same event loop.",
    targetDuration: "35 sec",
    presenterCue:
      "You do not need oilfield experience. The domain story and synthetic contract provide the common ground. Different disciplines own modules, but everyone can see how their work changes the same event loop.",
  },
  {
    id: "join",
    route: "/pitch/08-join",
    index: 8,
    title: "Help us build the loop.",
    body: "One candidate event. One reviewable evidence chain. One verified outcome. A system the whole team can point to at the end of the semester.",
    targetDuration: "20 sec",
    presenterCue:
      "If you want to build more than a model demo—something that connects data, software, visualisation, and human decisions—join us.",
  },
];

export const problemBlocks = [
  {
    number: "01",
    title: "More signals than attention",
    body: "Long time series across many assets make manual screening difficult to sustain.",
  },
  {
    number: "02",
    title: "A score is not a diagnosis",
    body: "A useful system must show evidence, alternatives, uncertainty, and the next discriminating check.",
  },
  {
    number: "03",
    title: "Feedback disappears",
    body: "Inspection and recovery outcomes are often disconnected from the event that triggered them.",
  },
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
  ["Bounded ML extensions", "Ranking experiments after event contracts and evaluation are clear"],
] as const;

