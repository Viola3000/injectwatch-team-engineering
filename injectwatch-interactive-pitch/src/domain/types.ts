export type EvidenceLevel = "stronger" | "weakened" | "unresolved";
export type EvidenceStatus = "limited" | "partial" | "sufficient_for_inspection";
export type InspectionPriority = "low" | "medium" | "high";
export type ConsequenceBand = "watch" | "focus" | "critical";

export interface ScenarioPoint {
  day: number;
  relativeLabel: string;
  plannedInjection: number;
  actualInjection: number;
  wellheadPressure: number;
  manifoldPressure: number;
  dataQuality: "good" | "missing" | "questionable";
}

export interface EvidenceItem {
  id: string;
  group: "supports" | "weakens_alternative" | "unknown";
  label: string;
  detail: string;
  sourceMetric?: string;
}

export interface CandidateExplanation {
  id: string;
  label: string;
  support: EvidenceLevel;
  rationale: string;
}

export interface CandidateEvent {
  id: string;
  assetId: string;
  title: string;
  relativeStartDay: number;
  relativeEndDay: number;
  mergedDetectionDays: number[];
  consequenceBand: ConsequenceBand;
  inspectionPriority: InspectionPriority;
  evidenceStatus: EvidenceStatus;
  evidence: EvidenceItem[];
  explanations: CandidateExplanation[];
}

export interface InspectionTask {
  id: string;
  candidateEventId: string;
  status:
    | "not_created"
    | "assigned"
    | "in_progress"
    | "feedback_submitted"
    | "completed";
  assignedTeam: string;
  dueLabel: string;
  checklist: Array<{ id: string; label: string; complete: boolean }>;
  timeline: Array<{ state: string; relativeTime: string; actorRole: string }>;
}

export interface FieldFeedback {
  inspectionTaskId: string;
  result: "confirmed_observation" | "not_confirmed" | "inconclusive";
  observedCondition: string;
  instrumentCheck: string;
  operationContext: string;
  inspectionActionRecord: string;
  followUp: string;
  attachments: Array<{ kind: "synthetic_placeholder"; label: string }>;
}

export interface TechnicalReview {
  candidateEventId: string;
  decision:
    | "authorise_bounded_action"
    | "continue_monitoring"
    | "return_for_review";
  conclusion: string;
}

export interface CorrectiveActionRecord {
  id: string;
  candidateEventId: string;
  status: "not_authorised" | "authorised" | "completed";
  description: string;
  authorisedByRole: string;
  performedByRole: string;
}

export interface RecoveryReview {
  candidateEventId: string;
  decision: "verify_and_close" | "continue_monitoring" | "return_for_review";
  outcome: "recovered" | "not_recovered" | "inconclusive";
  conclusion: string;
  labelGovernanceStatus: "not_eligible" | "eligible_for_curated_review";
}

export type StoryStep =
  | "queue"
  | "evidence_review"
  | "inspection_assigned"
  | "inspection_in_progress"
  | "feedback_submitted"
  | "technical_review"
  | "action_authorised"
  | "recovery_monitoring"
  | "closed_verified";

