# Work log · Pitch content and audience context

Date: 2026-07-29

## Outcome

Expanded the guided presentation so the visible slides cover the complete
three-speaker pitch and can act as reliable speaking prompts. Reframed the
optional `P` panel as audience-facing supplementary context rather than a
verbatim presenter script.

## Content and flow changes

- Rebuilt the guided sequence as ten chapters with presenter ownership and
  script time ranges.
- Added a dedicated **Why industrial AI is hard** chapter covering incomplete
  labels, event formation, multivariate context, operating shift, attention and
  delayed outcomes.
- Added a post-demo **What this prototype represents** chapter that separates
  what is already clear from implementation choices the team should refine.
- Split contribution tracks and contributor gains into Toby and Jeremy
  chapters.
- Strengthened the semester deliverable with tested, documented, deployable and
  complete-loop acceptance outcomes plus longer-horizon research directions.
- Added the six-detection-to-one-event formation reminder to the scenario
  hand-off.
- Updated the synthetic closure action to return to the new prototype chapter.
- Kept aliases for the previous guided-pitch route names.

## Optional audience context

- `P` and the visible toggle still open and close the panel.
- The open state persists across pitch chapters and reopens after the synthetic
  console for the same browser session.
- Each chapter contains a short explanation and three optional reading points.
- The panel describes definitions, research directions and governance
  boundaries; it is not a personal speaker transcript.

## Validation

- ESLint: passed.
- TypeScript type check: passed.
- Vitest: 3 files, 15 tests passed.
- Production vinext build: passed.
- Safety scan: 6 categories passed with no findings.
- Production source-map check: no map files emitted.
