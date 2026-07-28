import type {
  CandidateEvent,
  CandidateExplanation,
  EvidenceItem,
  ScenarioPoint,
} from "../domain/types";

export const scenarioSeries: ScenarioPoint[] = [
  { day: -20, actualInjection: 95, wellheadPressure: 9.38, manifoldPressure: 8.1 },
  { day: -19, actualInjection: 96, wellheadPressure: 9.42, manifoldPressure: 8.12 },
  { day: -18, actualInjection: 94, wellheadPressure: 9.39, manifoldPressure: 8.08 },
  { day: -17, actualInjection: 95, wellheadPressure: 9.41, manifoldPressure: 8.1 },
  { day: -16, actualInjection: 96, wellheadPressure: 9.4, manifoldPressure: 8.11 },
  { day: -15, actualInjection: 94, wellheadPressure: 9.39, manifoldPressure: 8.09 },
  { day: -14, actualInjection: 95, wellheadPressure: 9.4, manifoldPressure: 8.1 },
  { day: -13, actualInjection: 94, wellheadPressure: 9.46, manifoldPressure: 8.08 },
  { day: -12, actualInjection: 93, wellheadPressure: 9.52, manifoldPressure: 8.12 },
  { day: -11, actualInjection: 92, wellheadPressure: 9.58, manifoldPressure: 8.1 },
  { day: -10, actualInjection: 90, wellheadPressure: 9.65, manifoldPressure: 8.08 },
  { day: -9, actualInjection: 88, wellheadPressure: 9.72, manifoldPressure: 8.12 },
  { day: -8, actualInjection: 85, wellheadPressure: 9.79, manifoldPressure: 8.1 },
  { day: -7, actualInjection: 82, wellheadPressure: 9.85, manifoldPressure: 8.08 },
  { day: -6, actualInjection: 81, wellheadPressure: 9.9, manifoldPressure: 8.12 },
  { day: -5, actualInjection: 80, wellheadPressure: 9.96, manifoldPressure: 8.1 },
  { day: -4, actualInjection: 78, wellheadPressure: 10.02, manifoldPressure: 8.08 },
  { day: -3, actualInjection: 76, wellheadPressure: 10.08, manifoldPressure: 8.12 },
  { day: -2, actualInjection: 73, wellheadPressure: 10.14, manifoldPressure: 8.1 },
  { day: -1, actualInjection: 70.75, wellheadPressure: 10.2, manifoldPressure: 8.1 },
  { day: 0, actualInjection: 72, wellheadPressure: 10.18, manifoldPressure: 8.1 },
  { day: 1, actualInjection: 83, wellheadPressure: 10.05, manifoldPressure: 8.12 },
  { day: 2, actualInjection: 88, wellheadPressure: 9.85, manifoldPressure: 8.1 },
  { day: 3, actualInjection: 92, wellheadPressure: 9.63, manifoldPressure: 8.08 },
  { day: 4, actualInjection: 94, wellheadPressure: 9.48, manifoldPressure: 8.1 },
].map((point) => ({
  ...point,
  plannedInjection: 95,
  relativeLabel: point.day === 0 ? "D0" : point.day > 0 ? `D+${point.day}` : `D${point.day}`,
  dataQuality: "good" as const,
}));

export const evidenceItems: EvidenceItem[] = [
  {
    id: "support-injection",
    group: "supports",
    label: "Sustained injection decline",
    detail: "Recent actual-injection mean is 18.7% below the synthetic baseline.",
    sourceMetric: "injectionDeclinePct",
  },
  {
    id: "support-pressure",
    group: "supports",
    label: "Co-trending pressure rise",
    detail: "Wellhead pressure increased by 0.80 MPa over the 14-day comparison window.",
    sourceMetric: "pressureDelta14",
  },
  {
    id: "support-merged",
    group: "supports",
    label: "Repeated daily detection",
    detail: "Six consecutive daily detections were merged into one candidate event.",
  },
  {
    id: "weaken-plan",
    group: "weakens_alternative",
    label: "Plan remains stable",
    detail: "Planned injection remains fixed at 95 m³/d, reducing support for a planned set-point reduction.",
  },
  {
    id: "weaken-manifold",
    group: "weakens_alternative",
    label: "Manifold remains comparatively stable",
    detail: "Manifold pressure remains comparatively stable, reducing support for a station-wide disturbance.",
    sourceMetric: "manifoldPopulationSD",
  },
  {
    id: "unknown-instrument",
    group: "unknown",
    label: "Instrument health",
    detail: "Instrument health has not yet been independently checked.",
  },
  {
    id: "unknown-operation",
    group: "unknown",
    label: "Operation context",
    detail: "Recent valve, line, and approved-operation context is not yet attached to the event.",
  },
];

export const candidateExplanations: CandidateExplanation[] = [
  {
    id: "reason-local",
    label: "Local flow restriction",
    support: "stronger",
    rationale: "Injection decreases while wellhead pressure rises",
  },
  {
    id: "reason-plan",
    label: "Planned set-point change",
    support: "weakened",
    rationale: "Planned injection remains unchanged",
  },
  {
    id: "reason-station",
    label: "Station-wide disturbance",
    support: "weakened",
    rationale: "Manifold pressure remains comparatively stable",
  },
  {
    id: "reason-instrument",
    label: "Instrument or mapping issue",
    support: "unresolved",
    rationale: "Independent data-quality check is still required",
  },
];

export const candidateEvent: CandidateEvent = {
  id: "SYN-EV-1042",
  assetId: "SYN-W027",
  title: "Possible local flow restriction",
  relativeStartDay: -6,
  relativeEndDay: -1,
  mergedDetectionDays: [-6, -5, -4, -3, -2, -1],
  consequenceBand: "focus",
  inspectionPriority: "high",
  evidenceStatus: "partial",
  evidence: evidenceItems,
  explanations: candidateExplanations,
};

export const demoRules = [
  {
    id: "DEMO-R1",
    title: "Sustained injection decline",
    logic: "Recent 7-day actual-injection mean is at least 15% below the synthetic baseline mean",
  },
  {
    id: "DEMO-R2",
    title: "Co-trending pressure rise",
    logic: "Wellhead pressure rises by at least 0.50 MPa over 14 scenario days",
  },
  {
    id: "DEMO-R3",
    title: "Stable manifold context",
    logic: "Manifold pressure population SD remains below 0.05 MPa over the same window",
  },
] as const;

export const assetPath = [
  {
    name: "Injection source",
    measured: "Plan context",
    unknown: "Supply operations",
    contribution: "Reference",
  },
  {
    name: "Trunk context",
    measured: "Not modelled",
    unknown: "Network state",
    contribution: "Open question",
  },
  {
    name: "Manifold",
    measured: "Pressure",
    unknown: "Local distribution",
    contribution: "Alternative evidence",
  },
  {
    name: "Single-well line",
    measured: "No direct sensor",
    unknown: "Condition",
    contribution: "Inspection target",
  },
  {
    name: "Wellhead / wellbore",
    measured: "Injection + pressure",
    unknown: "Exact mechanism",
    contribution: "Candidate evidence",
  },
] as const;
