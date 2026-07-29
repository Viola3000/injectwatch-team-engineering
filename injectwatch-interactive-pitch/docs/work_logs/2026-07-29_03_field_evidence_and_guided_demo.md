# Work log · Field evidence and guided demo

Date: 2026-07-29

## Outcome

Reframed the synthetic demonstration around two evidence layers: the
control-room data hypothesis and the physical evidence returned from the field.
The field role now has explicit bounded autonomy, while the selected pitch
scenario follows the branch that requires engineering authorisation.

## Pitch changes

- Rewrote the `2:02–3:40` spoken demonstration as five timed narrative beats.
- Reduced the spoken copy to approximately 185 words so the 98-second window
  includes deliberate interaction time.
- Updated the system-loop chapter to
  `Detect → Understand → Inspect → Decide → Verify`.
- Expanded the optional audience context with routine-action, escalation and
  evidence-comparison boundaries.

## Demo changes

- Added a five-stage narrative rail across the simulation.
- Split the inspection task into a system-generated draft and engineer-reviewed
  task scope.
- Added structured field choices for finding alignment and action disposition.
- Added separate physical observations, initial judgement, action record,
  follow-up and synthetic evidence placeholders.
- Reworked technical review to compare control-room and physical field evidence.
- Added visible alternative decisions for another inspection or continued
  monitoring while keeping the deterministic pitch on the authorised branch.
- Presented the prefilled field report as a compact evidence summary in Guided
  Pitch Mode while retaining the editable structured form in Explore Mode.
- Shortened Guided Pitch Mode by moving directly into the in-progress field
  task after approval and directly into technical review after field submission.
- Preserved the explicit assigned, start, submitted and open-review screens in
  Explore Mode.

## Validation

- ESLint: passed.
- TypeScript type check: passed.
- Vitest: 3 files, 16 tests passed.
- Production vinext build: passed.
- Safety scan: 6 categories passed with no findings.
