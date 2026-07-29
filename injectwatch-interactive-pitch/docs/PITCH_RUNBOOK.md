# InjectWatch pitch runbook

## 5–7 minute order

| Chapter | Presenter | Route | Script time |
|---|---|---|---:|
| Opening | Lily | `#/pitch/01-opening` | pre-roll |
| Why it matters | Lily | `#/pitch/02-decision-gap` | 0:00–0:30 |
| First proving ground | Lily | `#/pitch/03-water-injection` | 0:30–1:00 |
| Why industrial AI is hard | Lily | `#/pitch/04-industrial-ai` | 1:00–1:38 |
| System loop | Lily | `#/pitch/05-system-loop` | 1:38–2:02 |
| Scenario hand-off and synthetic response loop | Lily | `#/pitch/06-scenario` then `#/demo/console` | 2:02–3:40 |
| What the prototype represents | Lily | `#/pitch/07-prototype` | 3:40–4:10 |
| Contribution tracks | Toby | `#/pitch/08-contributions` | 4:10–4:32 |
| Contributor gains | Jeremy | `#/pitch/09-contributor-gain` | 4:32–4:52 |
| Semester deliverable and invitation | Lily | `#/pitch/10-deliver` | 4:52–5:40 |

## Spoken script · synthetic scenario demonstration

This replaces the spoken demo section from `2:02–3:40`. Text in square
brackets is an interaction cue and is not spoken.

### 2:02–2:19 · Prioritise the event

**Screen: Risk Queue**

> Let me show one synthetic scenario. The plan stays stable, but actual
> injection falls and wellhead pressure rises, while upstream pressure remains
> stable. The system combines six daily detections into one event and ranks it
> first for review.

`[Review evidence]`

### 2:19–2:39 · Turn a data hypothesis into an inspection task

**Screen: Event Evidence → Inspection Task**

> The engineer reviews the aligned charts and the system's suggested
> explanation: a possible local restriction. This is a hypothesis, not a
> diagnosis. The system drafts a targeted inspection, and the engineer checks,
> adds context, and approves it.

`[Approve inspection task → Approve & assign]`

### 2:39–3:00 · Collect physical evidence

**Screen: Field View**

> The field worker receives the data pattern and recommended physical checks.
> On site, they compare the suggestion with the equipment, record observations
> and an initial judgement, and attach supporting evidence. Routine issues can
> be resolved within approved procedures.

`[Review the prefilled field findings → Submit field report]`

### 3:00–3:20 · Compare the two evidence layers

**Screen: Technical Review**

> Here, the findings support the suggested direction, but the next action is
> outside the current task authority. The worker escalates the evidence. The
> engineer compares the original sensor evidence with the physical findings and
> authorises a bounded synthetic action.

`[Authorise bounded scenario action]`

### 3:20–3:40 · Verify the response

**Screen: Recovery Verification → Closed Event**

> Afterwards, injection recovers, wellhead pressure falls, and upstream
> conditions stay stable. The system verifies that response before closure. The
> outcome can enter expert-reviewed label curation, but it does not
> automatically update the model.

`[Begin recovery verification → Verify outcome & close event]`

The script is approximately 185 spoken words. It is written as five narrative
beats rather than a description of each button. At a rehearsal pace of about
113 words per minute, it fits the 98-second demo window while leaving room for
the deliberate clicks.

## Keyboard controls

- `ArrowRight`, `PageDown`, or `Space`: next pitch chapter
- `ArrowLeft` or `PageUp`: previous pitch chapter
- `Esc`: return to Explore mode
- `P`: toggle optional audience context

Audience context is hidden by default. It contains definitions, boundaries and
research extensions rather than a verbatim speaker script. Once opened, it
stays open while the presenter moves between pitch chapters and reopens when
the guided pitch resumes after the synthetic console.

## Exact live click path

1. Select **Start guided pitch**.
2. Advance through Chapter 06.
3. Select **Enter the synthetic console**.
4. On `SYN-EV-1042`, select **Review evidence**.
5. Select **Approve inspection task**.
6. In the drawer, select **Approve & assign**.
7. Review the prefilled synthetic field findings and select **Submit field report**.
8. Select **Authorise bounded scenario action**.
9. Select **Begin recovery verification**.
10. Select **Verify outcome & close event**.
11. Select **Continue to what this prototype represents**.
12. Complete Chapters 07–10.

In Guided Pitch Mode, approval opens the in-progress field task and field
submission opens technical review. Explore Mode preserves the more explicit
role-transition screens.

Do not demonstrate the field route on a second device as a continuation. A
direct phone visit is an independent, pre-seeded synthetic replay and is not
synchronised with the desktop session.

## Reset

Select **Reset demo** in the simulation header. This restores the queue and
clears browser-local feedback. A normal reload also resets the ordinary session
to the route-appropriate deterministic seed.

## Fallback order

1. local interactive site;
2. a pre-recorded screen capture created later;
3. static screenshots created later.

No video, QR code, or fake screenshot is bundled in this build.
