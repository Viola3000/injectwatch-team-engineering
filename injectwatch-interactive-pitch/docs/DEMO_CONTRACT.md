# InjectWatch demo interaction contract

This is a demo interaction contract for one deterministic synthetic story. It
is not a production API contract.

## Domain terms

- **Candidate event:** a reviewable hypothesis assembled from daily detections;
  it is not a confirmed fault.
- **Inspection task:** an expert-approved request for observations and approved
  checks; it is not a maintenance work order.
- **Field feedback:** physical observations, an initial field judgement,
  evidence placeholders and an action/authority disposition recorded by a
  field role. It does not set the final technical cause.
- **Technical review:** the human gate that compares pre-inspection evidence
  with physical field evidence and selects the next branch.
- **Authorised action record:** an abstract synthetic record without operational
  instructions.
- **Recovery review:** a comparison of post-action signals before closure.
- **Curated label review:** a later governed review for which a closed event may
  become eligible. There is no automatic learning.

## Canonical identities

- asset: `SYN-W027`
- candidate event: `SYN-EV-1042`
- inspection task: `SYN-INSP-2101`
- authorised action record: `SYN-ACT-3101`
- demo rules: `DEMO-R1`, `DEMO-R2`, `DEMO-R3`

All scenario time uses relative labels from `D-20` through `D+4`.

## Metric semantics

| Field | Question | Demo display |
|---|---|---|
| Anomaly magnitude | How far did the observed signal move? | `18.7% recent injection decline` |
| Consequence band | How material could continued degradation be in this story? | `Focus` |
| Inspection priority | How soon should this candidate be reviewed relative to the queue? | `High · Rank 1` |
| Evidence status | How complete is the evidence? | `Partial · 3 supported / 2 unknown` |

The four concepts must remain separate. The UI must not convert them into an
unexplained score or root-cause probability.

All displayed comparison values are computed from
`src/data/syntheticScenario.ts` by `src/domain/metrics.ts`.

## Story transitions

```text
queue
→ evidence_review
→ inspection_assigned
→ inspection_in_progress
→ feedback_submitted
→ technical_review
→ action_authorised
→ recovery_monitoring
→ closed_verified
```

The reducer ignores invalid transitions and `RESET_DEMO` restores the exact
initial state.

The domain supports three field dispositions:

- `resolved_under_approved_procedure` for a routine issue completed within task
  authority;
- `requires_authorisation` when the finding is actionable but the next step is
  outside the current task authority;
- `requires_further_guidance` when another evidence-gathering round is needed.

The deterministic pitch story uses `requires_authorisation`. It does not imply
that field crews are unable to complete routine approved actions.

Guided Pitch Mode keeps every professional decision gate but advances across
the role-navigation screens after approval and field submission. Explore Mode
keeps the explicit assigned, start, submitted and open-review transitions.

## Derived lifecycle statuses

The interface derives, rather than stores independently:

- candidate: `candidate` → `investigation_open` →
  `under_technical_review` → `action_authorised` →
  `recovery_monitoring` → `closed_verified`
- inspection: `not_created` → `assigned` → `in_progress` →
  `feedback_submitted` → `completed`
- authorised action: `not_authorised` → `authorised` → `completed`
- label governance: `not_eligible` → `eligible_for_curated_review`

## Evidence categories

- **Supports the candidate:** evidence that strengthens the current hypothesis.
- **Weakens an alternative:** evidence that reduces support for an alternative
  without ruling it out.
- **Unknown / needs checking:** evidence still required before stronger claims.

The pre-inspection conclusion remains provisional.

## Governance boundary

At closure the interface must state:

> Eligible for curated label review. No automatic rule or model update occurs.

## Out of scope

Backend services, databases, authentication, permissions, uploads, camera
access, notifications, cross-device state, model inference, operational
instructions, topology, GIS, production work-order integration, and label-store
mutation are out of scope.
