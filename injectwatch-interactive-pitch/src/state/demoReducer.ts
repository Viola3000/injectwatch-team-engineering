import type {
  FieldFeedback,
  StoryStep,
  TechnicalReview,
} from "../domain/types";

export interface DemoState {
  step: StoryStep;
  feedback: FieldFeedback | null;
  technicalReview: TechnicalReview | null;
}

export type DemoAction =
  | { type: "OPEN_EVENT" }
  | { type: "APPROVE_INSPECTION" }
  | { type: "START_INSPECTION" }
  | { type: "SUBMIT_FEEDBACK"; payload: FieldFeedback }
  | { type: "OPEN_TECHNICAL_REVIEW" }
  | { type: "AUTHORISE_ACTION" }
  | { type: "BEGIN_RECOVERY_MONITORING" }
  | { type: "VERIFY_AND_CLOSE" }
  | { type: "RESET_DEMO" };

export const guidedFeedback: FieldFeedback = {
  inspectionTaskId: "SYN-INSP-2101",
  result: "confirmed_observation",
  findingAlignment: "consistent_with_suggestion",
  actionDisposition: "requires_authorisation",
  observedCondition:
    "Local physical indications are consistent with a restriction in the inspected path",
  instrumentCheck:
    "Local indication differs from the expected operating state; no obvious instrument fault under the approved check",
  operationContext: "No planned set-point reduction recorded in the scenario",
  initialJudgement:
    "Physical findings support the suggested local-restriction direction; the exact component or mechanism is not confirmed",
  inspectionActionRecord:
    "No corrective action performed; the next action is outside the current inspection-task authority",
  followUp:
    "Return physical evidence for engineering review and bounded-action authorisation",
  attachments: [
    { kind: "synthetic_placeholder", label: "Synthetic field photo · local indicator" },
    { kind: "synthetic_placeholder", label: "Synthetic field photo · inspection context" },
  ],
};

export const initialDemoState: DemoState = {
  step: "queue",
  feedback: null,
  technicalReview: null,
};

export function seedStateForHash(hash: string): DemoState {
  if (hash.includes("/demo/review")) {
    return {
      step: "technical_review",
      feedback: guidedFeedback,
      technicalReview: null,
    };
  }
  if (hash.includes("/demo/field")) {
    return { step: "inspection_assigned", feedback: null, technicalReview: null };
  }
  if (hash.includes("/demo/event/")) {
    return { step: "evidence_review", feedback: null, technicalReview: null };
  }
  return initialDemoState;
}

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "OPEN_EVENT":
      return state.step === "queue" ? { ...state, step: "evidence_review" } : state;
    case "APPROVE_INSPECTION":
      return state.step === "evidence_review"
        ? { ...state, step: "inspection_assigned" }
        : state;
    case "START_INSPECTION":
      return state.step === "inspection_assigned"
        ? { ...state, step: "inspection_in_progress" }
        : state;
    case "SUBMIT_FEEDBACK":
      return state.step === "inspection_in_progress"
        ? { ...state, step: "feedback_submitted", feedback: action.payload }
        : state;
    case "OPEN_TECHNICAL_REVIEW":
      return state.step === "feedback_submitted"
        ? { ...state, step: "technical_review" }
        : state;
    case "AUTHORISE_ACTION":
      return state.step === "technical_review"
        ? {
            ...state,
            step: "action_authorised",
            technicalReview: {
              candidateEventId: "SYN-EV-1042",
              decision: "authorise_bounded_action",
              conclusion:
                "Field observations strengthen the local restriction explanation. The exact physical mechanism remains unclassified.",
            },
          }
        : state;
    case "BEGIN_RECOVERY_MONITORING":
      return state.step === "action_authorised"
        ? { ...state, step: "recovery_monitoring" }
        : state;
    case "VERIFY_AND_CLOSE":
      return state.step === "recovery_monitoring"
        ? { ...state, step: "closed_verified" }
        : state;
    case "RESET_DEMO":
      return initialDemoState;
    default:
      return state;
  }
}
