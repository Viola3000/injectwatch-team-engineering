import type { StoryStep } from "./types";

export function deriveStatuses(step: StoryStep) {
  const investigationSteps: StoryStep[] = [
    "inspection_assigned",
    "inspection_in_progress",
    "feedback_submitted",
  ];
  const reviewSteps: StoryStep[] = ["technical_review"];
  const authorisedSteps: StoryStep[] = ["action_authorised"];
  const recoverySteps: StoryStep[] = ["recovery_monitoring"];

  const candidateStatus =
    step === "closed_verified"
      ? "closed_verified"
      : recoverySteps.includes(step)
        ? "recovery_monitoring"
        : authorisedSteps.includes(step)
          ? "action_authorised"
          : reviewSteps.includes(step)
            ? "under_technical_review"
            : investigationSteps.includes(step)
              ? "investigation_open"
              : "candidate";

  const inspectionStatus =
    step === "closed_verified"
      ? "completed"
      : ["feedback_submitted", "technical_review", "action_authorised", "recovery_monitoring"].includes(
            step,
          )
        ? "feedback_submitted"
        : step === "inspection_in_progress"
          ? "in_progress"
          : step === "inspection_assigned"
            ? "assigned"
            : "not_created";

  const actionStatus =
    step === "closed_verified" || step === "recovery_monitoring"
      ? "completed"
      : step === "action_authorised"
        ? "authorised"
        : "not_authorised";

  return {
    candidateStatus,
    inspectionStatus,
    actionStatus,
    labelGovernanceStatus:
      step === "closed_verified" ? "eligible_for_curated_review" : "not_eligible",
  } as const;
}

export function deriveQueueCounts(step: StoryStep) {
  const statuses = deriveStatuses(step);
  return {
    activeCandidates: step === "closed_verified" ? 5 : 6,
    awaitingExpertReview: step === "queue" || step === "evidence_review" ? 1 : 0,
    inspectionOpen: ["assigned", "in_progress", "feedback_submitted"].includes(
      statuses.inspectionStatus,
    )
      ? 1
      : 0,
    recoveryMonitoring: step === "recovery_monitoring" ? 1 : 0,
  };
}

