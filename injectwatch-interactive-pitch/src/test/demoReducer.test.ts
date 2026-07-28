import { describe, expect, it } from "vitest";
import { deriveStatuses } from "../domain/selectors";
import {
  demoReducer,
  guidedFeedback,
  initialDemoState,
} from "../state/demoReducer";

describe("demo reducer", () => {
  it("accepts the complete valid transition path", () => {
    const open = demoReducer(initialDemoState, { type: "OPEN_EVENT" });
    const assigned = demoReducer(open, { type: "APPROVE_INSPECTION" });
    const started = demoReducer(assigned, { type: "START_INSPECTION" });
    const submitted = demoReducer(started, {
      type: "SUBMIT_FEEDBACK",
      payload: guidedFeedback,
    });
    const review = demoReducer(submitted, { type: "OPEN_TECHNICAL_REVIEW" });
    const authorised = demoReducer(review, { type: "AUTHORISE_ACTION" });
    const recovery = demoReducer(authorised, { type: "BEGIN_RECOVERY_MONITORING" });
    const closed = demoReducer(recovery, { type: "VERIFY_AND_CLOSE" });

    expect([
      open.step,
      assigned.step,
      started.step,
      submitted.step,
      review.step,
      authorised.step,
      recovery.step,
      closed.step,
    ]).toEqual([
      "evidence_review",
      "inspection_assigned",
      "inspection_in_progress",
      "feedback_submitted",
      "technical_review",
      "action_authorised",
      "recovery_monitoring",
      "closed_verified",
    ]);
  });

  it("ignores invalid transitions and resets exactly", () => {
    expect(demoReducer(initialDemoState, { type: "VERIFY_AND_CLOSE" })).toBe(
      initialDemoState,
    );
    const changed = demoReducer(initialDemoState, { type: "OPEN_EVENT" });
    expect(demoReducer(changed, { type: "RESET_DEMO" })).toEqual(initialDemoState);
  });

  it("derives lifecycle statuses without conflating concepts", () => {
    expect(deriveStatuses("inspection_assigned")).toMatchObject({
      candidateStatus: "investigation_open",
      inspectionStatus: "assigned",
      actionStatus: "not_authorised",
      labelGovernanceStatus: "not_eligible",
    });
    expect(deriveStatuses("closed_verified")).toMatchObject({
      candidateStatus: "closed_verified",
      inspectionStatus: "completed",
      actionStatus: "completed",
      labelGovernanceStatus: "eligible_for_curated_review",
    });
  });
});

