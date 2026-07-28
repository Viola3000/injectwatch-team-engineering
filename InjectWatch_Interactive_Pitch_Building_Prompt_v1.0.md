# InjectWatch Interactive Pitch Experience
## Complete Building Prompt v1.0

Copy everything from **BEGIN BUILD PROMPT** to **END BUILD PROMPT** into the implementation agent. The prompt is intentionally self-contained. The builder must not need access to private research materials, field data, or earlier conversations.

---

# BEGIN BUILD PROMPT

You are a senior product engineer, information designer, and front-end implementation lead. Build a polished, responsive **InjectWatch Interactive Pitch Experience** for a Monash University DeepNeuron student-project recruitment pitch.

Do not stop at a plan or wireframe. Inspect the current repository, implement the working experience, test it, visually review it at the required breakpoints, and leave clear documentation and a work log. Make reasonable implementation decisions within this specification without asking for more business data. Stop only for a genuine permission, dependency, or conflicting-user-change blocker.

## 1. Mission

Build one coherent web experience with two deliberately different layers:

1. **Pitch / Concept layer**  
   A guided, editorial presentation explaining the problem, the system idea, the semester build target, the roles, and the member value.

2. **Synthetic Product Simulation layer**  
   A dark industrial-console simulation showing one complete candidate-event response loop:

   `daily detections → merged candidate event → evidence review → expert-approved inspection → field feedback → technical review → authorised synthetic action → recovery verification → controlled label-review eligibility`

This replaces the main PowerPoint during a 5–7 minute live pitch. It is not a slide deck embedded in a website, and it is not a generic SaaS dashboard with an “About” page added later.

The central line is:

> **From industrial signals to field decisions.**

The semester acceptance line is:

> **One complete, testable fault-response loop using synthetic data.**

## 2. Audience and communication goal

Primary audience:

- Monash students and DeepNeuron members;
- mostly early- to mid-degree students;
- mixed experience across frontend, backend, data, visualisation, UI/UX, QA, DevOps, and AI-assisted development;
- little or no oilfield domain knowledge.

Within six minutes, they should understand:

- why industrial monitoring has a decision-workflow problem;
- why oilfield water injection is a concrete starting case;
- what InjectWatch proposes to build;
- how one candidate event moves from detection to verified outcome;
- what is prototype now, semester target, and later vision;
- what technical module and role they could own;
- what practical experience they would gain.

Tone:

- confident, technical, clear, and restrained;
- student-project ambitious, not corporate-buzzword-heavy;
- honest about uncertainty and current capability;
- visually distinctive without pretending to be an already deployed production system.

The deployed UI is English-dominant.

## 3. Non-negotiable truth and safety boundaries

These constraints override visual convenience.

### 3.1 Prototype status

Every product-simulation screen must visibly carry:

> **Concept prototype · Synthetic scenario · No live field connection**

Do not use “live”, “real-time”, “currently deployed”, “production AI”, or any wording that implies a field connection.

Clearly distinguish:

- **Prototype now:** this click-through, one deterministic synthetic scenario, browser-local state;
- **Semester MVP target:** a tested, contract-first student engineering system with event logic, evidence views, mock API boundaries, feedback workflow, and deployment;
- **Later vision:** integration with governed data services, rules and early-warning models, broader asset structure, high-frequency monitoring, notifications, and richer reporting.

Interactive does not mean already implemented in the field.

### 3.2 Data and repository safety

- Work only inside the current clean demo/team repository.
- Do not inspect sibling directories, private research repositories, data folders outside this repo, personal files, or external project workspaces.
- Do not request or use raw field data.
- Do not copy existing private Git history.
- Use only the synthetic IDs, relative scenario days, rules, and values supplied in this prompt.
- Do not include real company or oilfield names, real well IDs, real dates, real thresholds, real alarm records, real people, field notes, row-level explanations, or private model outputs.
- Treat everything bundled into the front-end as public, even if the source repository is private.
- Do not add uploads, telemetry, analytics, tracking pixels, or runtime network requests.
- Do not add secrets or environment variables.
- Do not add source maps to the production build.

Use these fictional namespaces only:

- asset: `SYN-W###`
- candidate event: `SYN-EV-####`
- inspection task: `SYN-INSP-####`
- demo rule: `DEMO-R#`

Use relative timeline labels such as `D-20`, `D0`, and `D+4`; do not introduce calendar dates.

### 3.3 Human-in-the-loop safety

- The system creates a **candidate event**, not a confirmed fault.
- Before professional review, the CTA is **Approve inspection task**, never “Create maintenance work order”.
- Field crew record observations and approved actions; they do not declare the final technical root cause.
- Do not provide operational repair instructions, valve commands, pressure-control instructions, or safety-critical procedures.
- Any field action text must say it was performed under an approved site procedure by authorised personnel.
- The product must be allowed to say “insufficient evidence” or “inconclusive”.
- A closed outcome becomes only **eligible for curated label review**.
- Never claim that feedback automatically retrains or updates a model.

Use this exact governance statement at closure:

> **Eligible for curated label review. No automatic rule or model update occurs.**

### 3.4 No cross-device synchronisation fiction

This prototype has no backend and no shared state.

- The formal live demonstration switches operator and field roles inside the same browser session.
- On desktop, the field experience appears in a phone-frame presentation.
- A direct mobile visit to the field route loads an independent, pre-seeded synthetic “assigned task” replay.
- The mobile screen must say:

> **Standalone synthetic replay · not synchronised with another device**

- Do not say or imply that scanning a QR code continues the desktop session.
- Do not render a fake QR code. Hide the QR component until a real destination is configured later.

## 4. Scope

### In scope

- Vite + React + TypeScript static web application;
- hash routing;
- guided pitch mode and free explore mode;
- one synthetic candidate-event story;
- browser-local reducer state;
- responsive desktop, laptop, tablet, and phone layouts;
- accessible keyboard navigation;
- deterministic charts and computed scenario metrics;
- inspection approval, field feedback, technical review, an abstracted authorised-action record, recovery verification, and closure;
- a Reset demo action;
- tests, README, demo contract, pitch runbook, work log, and production build.

### Out of scope

- backend, database, authentication, permissions service;
- real file or photo uploads;
- camera access;
- email, SMS, push, or real notifications;
- cross-device state;
- live data or real API calls;
- model inference;
- LLM integration;
- real topology;
- hardware integration;
- map/GIS;
- production work-order integration;
- actual label-store mutation;
- a multi-scenario product;
- deployment, commit, push, or pull request unless separately authorised.

## 5. Technical baseline

Prefer the following unless an existing repository already has a compatible stack:

- Vite;
- React;
- TypeScript in strict mode;
- React Router with `HashRouter`;
- React Context + `useReducer`;
- Recharts for charts;
- Lucide React for restrained interface icons;
- CSS variables and authored CSS; do not use a component kit that makes the site look like a generic admin template;
- Vitest + React Testing Library;
- Playwright for the guided happy-path smoke test if the environment supports it.

Do not add Redux, a state machine package, a backend-as-a-service, Tailwind UI templates, Material UI, Ant Design, or a heavy animation framework.

If the repository already contains a compatible implementation, preserve it and refactor only what is needed. Preserve unrelated user changes.

## 6. Experience architecture

### 6.1 Modes

#### Guided Pitch Mode

Designed for a live 5–7 minute presentation:

- one chapter per viewport;
- no vertical scrolling at 1440×900 and 1280×720;
- fixed `Back` and `Next` controls;
- visible chapter progress;
- keyboard controls:
  - `ArrowRight`, `PageDown`, or `Space`: next;
  - `ArrowLeft` or `PageUp`: back;
  - `Esc`: exit guided mode;
  - `P`: toggle presenter cues;
- presenter cues hidden by default;
- an optional user-clicked full-screen button;
- clear transition from light concept layer into dark product simulation, then back to the concept layer;
- deterministic route and state so it can be screen-recorded.

Inside the simulation, replace the ordinary chapter `Next` control with the highlighted workflow action. Do not let the global presenter control silently skip required reducer transitions.

#### Explore Mode

Designed for people opening the site later:

- sticky navigation;
- sections can scroll naturally;
- navigation items: `Overview`, `How it works`, `Demo`, `Build with us`, `Join`;
- visitors can relaunch or reset the scenario;
- no presenter cues unless explicitly toggled.

### 6.2 Route structure

Use stable hash routes:

```text
#/                         Explore landing
#/pitch/01-opening
#/pitch/02-decision-gap
#/pitch/03-water-injection
#/pitch/04-system-loop
#/pitch/05-scenario
#/demo/console
#/demo/event/SYN-EV-1042
#/demo/field
#/demo/review
#/pitch/06-build
#/pitch/07-roles
#/pitch/08-join
```

Direct routes must render safely:

- `#/demo/console` starts at the queue;
- `#/demo/event/SYN-EV-1042` seeds `evidence_review`;
- `#/demo/field` seeds `inspection_assigned` and displays the standalone non-synchronisation notice;
- `#/demo/review` seeds the approved synthetic field feedback and opens `technical_review`, with a visible `Standalone scenario state` label.

### 6.3 Outer versus inner navigation

The concept layer and simulation layer must not look like the same product shell.

- Concept layer: editorial, light, generous, presentation-like.
- Simulation layer: dark, compact, evidence-focused industrial console.
- The simulation header must contain `Return to pitch`, `Scenario status`, and `Reset demo`.
- Do not put “Architecture”, “Team roles”, or “Join” inside the simulated operator sidebar. Those are pitch content, not production-console functions.

## 7. Guided pitch chapters and exact content

Store pitch copy in a typed content file, not scattered through JSX. Each chapter should have a title, short body, visual specification, target duration, and hidden presenter cue.

### Chapter 01 — Opening

Target: 25 seconds.

Eyebrow:

> DeepNeuron Project Proposal · Semester 2

Title:

> InjectWatch

Headline:

> From industrial signals to field decisions.

Body:

> An interactive project proposal for a human-in-the-loop industrial monitoring system, demonstrated through a fully synthetic oilfield water-injection scenario.

Visible badges:

- Interactive concept prototype
- Synthetic scenario
- No live field connection

Primary CTA:

> Start guided pitch

Secondary CTA:

> Explore the project

Small closing line:

> One story · One semester MVP · Multiple engineering roles

Presenter cue:

> Industrial monitoring projects often stop at a model score or a dashboard. InjectWatch asks what happens next: who reviews the signal, what evidence they see, what action is approved, and whether the outcome is verified.

### Chapter 02 — The decision gap

Target: 40 seconds.

Title:

> Industrial monitoring has a decision gap.

Intro:

> Measurements are only useful when a team can turn them into a reviewable, prioritised, and traceable decision.

Show three compact problem blocks:

1. **More signals than attention**  
   Long time series across many assets make manual screening difficult to sustain.

2. **A score is not a diagnosis**  
   A useful system must show evidence, alternatives, uncertainty, and the next discriminating check.

3. **Feedback disappears**  
   Inspection and recovery outcomes are often disconnected from the event that triggered them.

Closing statement:

> The valuable product is the loop between detection and verified action.

Do not add unsupported market statistics or fake performance numbers.

Presenter cue:

> The bottleneck is not simply predicting an anomaly. It is managing the path from a weak signal to an accountable field decision without losing the evidence or the feedback.

### Chapter 03 — Concrete starting case

Target: 45 seconds.

Title:

> Start concrete: oilfield water injection.

Body:

> Water injection helps maintain reservoir pressure and support production. The operating path includes upstream supply, trunk lines, manifolds, single-well lines, the wellhead, and the wellbore. Daily planned injection, actual injection, and pressure signals provide useful evidence, but no single signal is a complete diagnosis.

Render one clearly labelled conceptual path:

```text
Injection source → Trunk context → Manifold → Single-well line → Wellhead / wellbore
```

Keep five nodes maximum in one row. Each node shows:

- what is measured in this synthetic scenario;
- what remains unknown;
- how that node contributes to the candidate reasoning.

Under the diagram, show:

> Scenario asset path · not a full-field topology

Two questions:

- **What needs attention first?**
- **What evidence or field check would change the decision?**

Transferability line:

> The same architecture can extend to pumps, pipelines, water networks, and other industrial assets.

Presenter cue:

> Water injection gives us a concrete chain of assets and decisions. We can start narrow, build one credible loop, and later transfer the architecture without pretending every industry has the same fault logic.

### Chapter 04 — The system loop

Target: 50 seconds.

Title:

> Build the decision loop, not just the model.

Render this concept architecture as an authored responsive diagram, not as product navigation:

```text
Field measurements
→ Candidate detection
→ Event merging
→ Evidence and priority
→ Expert-approved inspection
→ Field feedback
→ Technical review and action authorisation
→ Authorised action record
→ Recovery verification
→ Curated learning review
```

Lay the steps out in two rows rather than forcing one long horizontal chain. Visually mark the three human approval gates:

- inspection approval;
- bounded-action authorisation;
- technical closure and label-review eligibility.

Below it, show three honest status columns:

#### Prototype now

- one deterministic synthetic story;
- browser-local state;
- no backend or live connection;
- designed for pitch and interaction testing.

#### Semester MVP target

- contract-first event and inspection modules;
- evidence-rich interface;
- mock API boundary;
- tested human-feedback workflow;
- CI, code review, and deployable demo.

#### Later vision

- governed data-service integration;
- rules plus early-warning models;
- broader asset relationships;
- higher-frequency monitoring;
- optional notifications and reporting.

Use visible status labels: `NOW`, `SEMESTER TARGET`, `LATER`.

Presenter cue:

> This page separates what you can click today from what the team would build this semester and what belongs to a longer research and product vision. The project succeeds this semester if one full loop is engineered well.

### Chapter 05 — Scenario hand-off

Target: 25 seconds before entering the simulation.

Title:

> One quiet pattern. One complete response loop.

Body:

> In the synthetic scenario, actual injection declines gradually while the plan remains stable. Wellhead pressure rises, but manifold pressure remains comparatively stable. There is no single catastrophic day and no confirmed root cause.

Show three factual observation chips:

- Recent injection mean: `18.7% below synthetic baseline`
- Wellhead pressure: `+0.80 MPa over 14 scenario days`
- Manifold variation: `σ ≈ 0.02 MPa`

CTA:

> Enter the synthetic console

Small note:

> The interface should assemble evidence and request the next useful check—not manufacture certainty.

Presenter cue:

> This is deliberately not a dramatic spike. Six daily detections become one candidate event. We will see why it is prioritised, approve an inspection, review the field feedback, authorise a synthetic action, and verify whether the signal recovered.

### Chapter 06 — Build target

Target: 45 seconds.

Title:

> This semester, we build one complete loop.

Render a 2×2 module map around the centre label `One complete loop`:

1. **Data contracts & synthetic testbed**
   - typed event schema;
   - deterministic synthetic scenarios;
   - mock API boundaries.

2. **Detection & event logic**
   - daily signal rules;
   - event merging and deduplication;
   - priority and status logic.

3. **Evidence interface & visualisation**
   - aligned time-series views;
   - evidence, counter-evidence, and unknowns;
   - reviewable candidate-event pages.

4. **Workflow, feedback & integration**
   - inspection approval;
   - field feedback;
   - technical review and action authorisation;
   - recovery verification;
   - audit trail, tests, CI, and deployment.

Show a small three-phase semester line:

```text
Contract and scenario → Build the loop → Integrate, test, and demonstrate
```

Do not show the full research roadmap or imply that the student team will access private field data.

Presenter cue:

> The scope is intentionally narrow. The team can work contract-first with synthetic data, split ownership by module, and still finish with a coherent end-to-end artifact rather than six unrelated mini-projects.

### Chapter 07 — Roles and member value

Target: 35 seconds.

Title:

> Bring your discipline. Learn the whole system.

Role cards:

- **Frontend & Product UX** — interaction flow, responsive console, accessible components;
- **Backend & API Contracts** — mock services, domain contracts, workflow boundaries;
- **Data & Event Logic** — deterministic signals, event merging, evaluation-ready outputs;
- **Data Visualisation** — truthful industrial time-series and evidence views;
- **QA, DevOps & Integration** — tests, CI, demo reliability, deployment;
- **Bounded ML extensions** — early-warning or ranking experiments only after the event contract and evaluation target are clear.

Member outcomes:

- work on a real industrial problem structure without handling sensitive data;
- practise contract-first engineering, pull requests, review, CI, and testing;
- contribute to a complete demonstrable system;
- leave with a portfolio-ready team artifact and a defensible technical story.

Add:

> AI-assisted development is welcome. Architecture, tests, review, and technical ownership remain human responsibilities.

Presenter cue:

> You do not need oilfield experience. The domain story and synthetic contract provide the common ground. Different disciplines own modules, but everyone can see how their work changes the same event loop.

### Chapter 08 — Close and join

Target: 20 seconds.

Title:

> Help us build the loop.

Closing copy:

> One candidate event. One reviewable evidence chain. One verified outcome. A system the whole team can point to at the end of the semester.

CTA:

> Join InjectWatch

Contact:

> Ziyao Yang (Lily) · zyan0241@student.monash.edu

Use a working `mailto:` link and a copy-email action.

Do not render a QR code until a real signup or project URL is configured.

Final line:

> Detect responsibly · explain clearly · close the loop

Presenter cue:

> If you want to build more than a model demo—something that connects data, software, visualisation, and human decisions—join us.

## 8. Synthetic product simulation

The simulation must use one canonical data object. All tables, charts, metrics, status counts, evidence statements, and recovery values must derive from it. Do not duplicate or hand-type the same metric in multiple components.

### 8.1 Scenario identity

```text
Asset: SYN-W027
Candidate event: SYN-EV-1042
Inspection task: SYN-INSP-2101
Authorised action record: SYN-ACT-3101
Initial title: Possible local flow restriction
Closed title: Verified restriction-related event
Merged detections: 6 daily detections, D-6 through D-1
Timeline: D-20 through D+4
```

The closed title must not claim an exact physical component or material mechanism. The prototype supports a restriction-related event after field feedback, technical review, an authorised synthetic action, and recovery; it does not prove the precise physical root cause.

### 8.2 Metric semantics

Never collapse these into one “risk score”:

| UI field | Question answered | Display |
|---|---|---|
| Anomaly magnitude | How far did the observed signal move? | `18.7% recent injection decline` |
| Consequence band | How material could continued degradation be in this synthetic story? | `Focus` |
| Inspection priority | How soon should the candidate be reviewed relative to the queue? | `High · Rank 1` |
| Evidence status | How complete is the current evidence? | `Partial · 3 supported / 2 unknown` |

Do not show root-cause probabilities, diagnostic-confidence percentages, circular risk gauges, or unexplained 0–100 scores.

Add accessible tooltip definitions for the four concepts.

### 8.3 Synthetic queue

Use this deterministic queue. Only the first row has full drill-down.

```ts
export const syntheticQueue = [
  {
    id: 'SYN-EV-1042',
    assetId: 'SYN-W027',
    title: 'Possible local flow restriction',
    inspectionPriority: 'high',
    consequenceBand: 'focus',
    evidenceStatus: 'partial',
    status: 'awaiting_review',
    mergedFrom: 6,
    drilldownAvailable: true,
  },
  {
    id: 'SYN-EV-1038',
    assetId: 'SYN-W014',
    title: 'Sustained under-injection pattern',
    inspectionPriority: 'medium',
    consequenceBand: 'watch',
    evidenceStatus: 'partial',
    status: 'monitoring',
    mergedFrom: 4,
    drilldownAvailable: false,
  },
  {
    id: 'SYN-EV-1034',
    assetId: 'SYN-W041',
    title: 'Pressure variability candidate',
    inspectionPriority: 'medium',
    consequenceBand: 'watch',
    evidenceStatus: 'limited',
    status: 'needs_data_review',
    mergedFrom: 3,
    drilldownAvailable: false,
  },
  {
    id: 'SYN-EV-1029',
    assetId: 'SYN-W052',
    title: 'Flat pressure signal candidate',
    inspectionPriority: 'medium',
    consequenceBand: 'watch',
    evidenceStatus: 'limited',
    status: 'data_check',
    mergedFrom: 5,
    drilldownAvailable: false,
  },
  {
    id: 'SYN-EV-1021',
    assetId: 'SYN-W063',
    title: 'Plan-versus-actual mismatch',
    inspectionPriority: 'low',
    consequenceBand: 'watch',
    evidenceStatus: 'partial',
    status: 'monitoring',
    mergedFrom: 2,
    drilldownAvailable: false,
  },
  {
    id: 'SYN-EV-1017',
    assetId: 'SYN-W088',
    title: 'Station-coincident change',
    inspectionPriority: 'low',
    consequenceBand: 'focus',
    evidenceStatus: 'limited',
    status: 'monitoring',
    mergedFrom: 3,
    drilldownAvailable: false,
  },
] as const;
```

Rows without drill-down must use a quiet `Overview only` label. Do not open a dead page or show a noisy error toast.

### 8.4 Canonical time series

Use this data exactly. `plannedInjection` is 95 m³/d for all points.

```ts
export const scenarioSeries = [
  { day: -20, actualInjection: 95,    wellheadPressure: 9.38, manifoldPressure: 8.10 },
  { day: -19, actualInjection: 96,    wellheadPressure: 9.42, manifoldPressure: 8.12 },
  { day: -18, actualInjection: 94,    wellheadPressure: 9.39, manifoldPressure: 8.08 },
  { day: -17, actualInjection: 95,    wellheadPressure: 9.41, manifoldPressure: 8.10 },
  { day: -16, actualInjection: 96,    wellheadPressure: 9.40, manifoldPressure: 8.11 },
  { day: -15, actualInjection: 94,    wellheadPressure: 9.39, manifoldPressure: 8.09 },
  { day: -14, actualInjection: 95,    wellheadPressure: 9.40, manifoldPressure: 8.10 },
  { day: -13, actualInjection: 94,    wellheadPressure: 9.46, manifoldPressure: 8.08 },
  { day: -12, actualInjection: 93,    wellheadPressure: 9.52, manifoldPressure: 8.12 },
  { day: -11, actualInjection: 92,    wellheadPressure: 9.58, manifoldPressure: 8.10 },
  { day: -10, actualInjection: 90,    wellheadPressure: 9.65, manifoldPressure: 8.08 },
  { day: -9,  actualInjection: 88,    wellheadPressure: 9.72, manifoldPressure: 8.12 },
  { day: -8,  actualInjection: 85,    wellheadPressure: 9.79, manifoldPressure: 8.10 },
  { day: -7,  actualInjection: 82,    wellheadPressure: 9.85, manifoldPressure: 8.08 },
  { day: -6,  actualInjection: 81,    wellheadPressure: 9.90, manifoldPressure: 8.12 },
  { day: -5,  actualInjection: 80,    wellheadPressure: 9.96, manifoldPressure: 8.10 },
  { day: -4,  actualInjection: 78,    wellheadPressure: 10.02, manifoldPressure: 8.08 },
  { day: -3,  actualInjection: 76,    wellheadPressure: 10.08, manifoldPressure: 8.12 },
  { day: -2,  actualInjection: 73,    wellheadPressure: 10.14, manifoldPressure: 8.10 },
  { day: -1,  actualInjection: 70.75, wellheadPressure: 10.20, manifoldPressure: 8.10 },
  { day: 0,   actualInjection: 72,    wellheadPressure: 10.18, manifoldPressure: 8.10 },
  { day: 1,   actualInjection: 83,    wellheadPressure: 10.05, manifoldPressure: 8.12 },
  { day: 2,   actualInjection: 88,    wellheadPressure: 9.85, manifoldPressure: 8.10 },
  { day: 3,   actualInjection: 92,    wellheadPressure: 9.63, manifoldPressure: 8.08 },
  { day: 4,   actualInjection: 94,    wellheadPressure: 9.48, manifoldPressure: 8.10 },
].map(point => ({
  ...point,
  plannedInjection: 95,
  relativeLabel: point.day === 0 ? 'D0' : point.day > 0 ? `D+${point.day}` : `D${point.day}`,
  dataQuality: 'good' as const,
}));
```

Calculate, test, and display:

```text
baselineInjectionMean = mean(actualInjection from D-20 through D-14) = 95.00
recentInjectionMean   = mean(actualInjection from D-7 through D-1)   = 77.25
injectionDeclinePct   = (95.00 - 77.25) / 95.00 × 100               = 18.7% rounded to 1 decimal
pressureDelta14       = pressure(D-1) - pressure(D-14)               = +0.80 MPa
manifoldPopulationSD  = population SD from D-14 through D-1         ≈ 0.02 MPa rounded to 2 decimals
recoveryInjection     = actualInjection(D+4)                         = 94.0 m³/d
recoveryPressure      = wellheadPressure(D+4)                        = 9.48 MPa
```

Do not hardcode the displayed computed results independently from the series.

### 8.5 Fictional demo logic

Use these only as visibly fictional demo rules:

| Rule | Human-readable logic | UI meaning |
|---|---|---|
| `DEMO-R1` | Recent 7-day actual-injection mean is at least 15% below the synthetic baseline mean | Sustained injection decline |
| `DEMO-R2` | Wellhead pressure rises by at least 0.50 MPa over 14 scenario days | Co-trending pressure rise |
| `DEMO-R3` | Manifold pressure population SD remains below 0.05 MPa over the same window | Reduces support for a station-wide disturbance |

Every rule card must say:

> Synthetic demo logic · not a field threshold

Never say `DEMO-R3` “rules out” an upstream cause.

### 8.6 Evidence model

Show evidence in three honest groups:

#### Supports the candidate

1. `Recent actual-injection mean is 18.7% below the synthetic baseline.`
2. `Wellhead pressure increased by 0.80 MPa over the 14-day comparison window.`
3. `Six consecutive daily detections were merged into one candidate event.`

#### Weakens an alternative

1. `Planned injection remains fixed at 95 m³/d, reducing support for a planned set-point reduction.`
2. `Manifold pressure remains comparatively stable, reducing support for a station-wide disturbance.`

#### Unknown / needs checking

1. `Instrument health has not yet been independently checked.`
2. `Recent valve, line, and approved-operation context is not yet attached to the event.`

Add an explicit exit:

> Current conclusion: provisional · exact cause not confirmed

### 8.7 Candidate-reason ranking

Use qualitative evidence support, never probability:

| Candidate explanation | Evidence support | Why |
|---|---|---|
| Local flow restriction | Stronger | Injection decreases while wellhead pressure rises |
| Planned set-point change | Weakened | Planned injection remains unchanged |
| Station-wide disturbance | Weakened | Manifold pressure remains comparatively stable |
| Instrument or mapping issue | Unresolved | Independent data-quality check is still required |

The labels may be `Stronger`, `Weakened`, or `Unresolved`. Do not use percentages or make them sum to 100.

## 9. Simulation screens and interactions

### 9.1 Console

Title:

> Candidate Event Console

Subtitle:

> Synthetic queue · scenario replay

Use a compact derived status strip, not oversized stat cards:

- Active candidates
- Awaiting expert review
- Inspection open
- Recovery monitoring

Counts must update when the main event moves through the reducer.

Show the queue in a dense, readable table on desktop and stacked rows on mobile. Columns:

- Priority
- Candidate event
- Asset
- Candidate summary
- Consequence band
- Evidence
- State
- Daily detections merged

The first row is visually dominant without using a giant red treatment. Its CTA is:

> Review evidence

### 9.2 Event detail and evidence

Header:

> Possible local flow restriction

Subheader:

> SYN-EV-1042 · SYN-W027 · 6 daily detections merged

Show the four separated semantic fields from section 8.2.

#### Charts

Render three aligned small-multiple time-series panels with one shared relative-day x-axis:

1. **Planned vs actual injection** — unit `m³/d`
2. **Wellhead pressure** — unit `MPa`
3. **Manifold pressure** — unit `MPa`

Requirements:

- never put injection and pressure on one y-axis;
- label every unit;
- show readable ticks;
- use consistent relative-day positions;
- shade the candidate event window `D-6` through `D-1`;
- mark `D0` as `Inspection / approved action`;
- shade `D+1` through `D+4` as `Recovery verification`;
- show a dashed synthetic baseline where useful;
- show a tooltip with exact values and phase;
- include a visible legend;
- provide an accessible text/table summary for screen readers;
- no radar, donut, gauge, sparkline-only evidence, or 3D chart.

#### Supporting regions

Below or beside the charts, include:

- evidence groups;
- candidate-reason ranking;
- fictional demo-rule cards;
- the five-node scenario asset path;
- data-quality summary: `25/25 points present · aligned synthetic series`;
- compact audit timeline.

CTA:

> Approve inspection task

Do not use “maintenance work order”.

### 9.3 Inspection approval drawer

Open a right-side drawer on desktop and bottom sheet on mobile.

Title:

> Approve inspection task

Fields:

- Task: `SYN-INSP-2101`
- Related candidate: `SYN-EV-1042`
- Assigned team: `Field Crew A`
- Due: `Within 24 hours`
- Priority: `High`
- Approved by role: `Technical reviewer`

Checklist:

- Confirm whether an approved operation or set-point change explains the pattern.
- Verify instrument status using the approved site procedure.
- Inspect the relevant line/valve context under the approved site procedure.
- Record observations; do not perform or prescribe a corrective action as part of this inspection task.
- Attach synthetic photo placeholders if useful.

Safety note:

> Demo workflow only. It does not replace site procedures or authorised technical judgement.

Primary action:

> Approve & assign

After assignment, provide one clear CTA:

> Open field view in this browser

Do not mention sending the task to a real phone.

### 9.4 Field view

On desktop, render a credible phone frame. On a phone-sized viewport, use the full screen.

Header:

> Field inspection

Show:

- task ID;
- candidate ID;
- asset ID;
- assigned status;
- safe checklist;
- a short evidence summary;
- Start inspection action.

In guided mode, prefill editable synthetic feedback so the live demonstration remains fast:

- Result: `Confirmed observation`
- Observed condition: `Signs consistent with a local restriction`
- Instrument check: `No obvious issue observed under approved check`
- Operation context: `No planned set-point reduction recorded in the scenario`
- Inspection action: `No corrective action performed during inspection`
- Follow-up: `Technical review and action decision required`
- Attachments: two labelled synthetic photo placeholders; no file input

Allow these result choices:

- Confirmed observation
- Not confirmed
- Inconclusive

The field form must not ask the crew to set a final technical cause.

Primary action:

> Submit for technical review

After submission:

> Feedback submitted · technical review required

### 9.5 Technical review, authorised action, and close

Title:

> Technical review & controlled action

First show a two-column or stacked review layout:

1. **Pre-inspection evidence**
2. **Field feedback**

Technical review conclusion:

> Field observations strengthen the local restriction explanation. The exact physical mechanism remains unclassified.

The reviewer must choose one of:

- Authorise bounded scenario action
- Continue monitoring
- Return for further inspection

The guided path uses:

> Authorise bounded scenario action

Primary review action:

> Authorise bounded scenario action

Then reveal a separate action record:

- Action ID: `SYN-ACT-3101`
- Status: `Authorised · completed in synthetic replay`
- Performed by role: `Authorised field team`
- Description: `Bounded corrective action completed under an approved site procedure`

Add a relative-time audit entry that makes the synthetic time jump explicit. Do not visually imply that a real-world corrective action completed instantaneously.

Show this exact safety statement:

> Operational authorisation is abstracted in this concept prototype. No field procedure is prescribed.

The action must never include physical instructions, settings, valve commands, chemical details, or maintenance steps.

Primary action after the synthetic action record:

> Begin recovery verification

Only after that action should the recovery panel become active.

Recovery title:

> Post-action recovery verification

Recovery panel:

- Actual injection: `70.8 → 94.0 m³/d`
- Wellhead pressure: `10.20 → 9.48 MPa`
- Manifold pressure: `remained stable`
- Recovery window: `D+1 to D+4`

These displayed values must be derived from the canonical series.

Closure conclusion:

> Evidence now supports a local restriction-related event. The exact physical cause remains unclassified in this prototype.

Primary action:

> Verify outcome & close event

Closed state:

- Event status: `Closed · recovery verified`
- Inspection task: `Completed`
- Outcome: `Recovered`
- Label governance: `Eligible for curated review`

Use this exact statement:

> Eligible for curated label review. No automatic rule or model update occurs.

CTA:

> Continue to what we build together

This returns to Chapter 06.

## 10. State and domain contract

Use a simple reducer for the pitch prototype, with domain types that do not confuse lifecycle concepts.

### 10.1 Story state

```ts
type StoryStep =
  | 'queue'
  | 'evidence_review'
  | 'inspection_assigned'
  | 'inspection_in_progress'
  | 'feedback_submitted'
  | 'technical_review'
  | 'action_authorised'
  | 'recovery_monitoring'
  | 'closed_verified';
```

Reducer actions:

```ts
type DemoAction =
  | { type: 'OPEN_EVENT' }
  | { type: 'APPROVE_INSPECTION' }
  | { type: 'START_INSPECTION' }
  | { type: 'SUBMIT_FEEDBACK'; payload: FieldFeedback }
  | { type: 'OPEN_TECHNICAL_REVIEW' }
  | { type: 'AUTHORISE_ACTION' }
  | { type: 'BEGIN_RECOVERY_MONITORING' }
  | { type: 'VERIFY_AND_CLOSE' }
  | { type: 'RESET_DEMO' };
```

Do not allow invalid transitions. Derive UI statuses from `StoryStep`:

```text
Candidate event:
candidate → investigation_open → under_technical_review → action_authorised → recovery_monitoring → closed_verified

Inspection task:
not_created → assigned → in_progress → feedback_submitted → completed

Authorised action:
not_authorised → authorised → completed

Label governance:
not_eligible → eligible_for_curated_review
```

### 10.2 Core types

Create and document at least these interfaces:

```ts
type EvidenceLevel = 'stronger' | 'weakened' | 'unresolved';
type EvidenceStatus = 'limited' | 'partial' | 'sufficient_for_inspection';
type InspectionPriority = 'low' | 'medium' | 'high';
type ConsequenceBand = 'watch' | 'focus' | 'critical';

interface ScenarioPoint {
  day: number;
  relativeLabel: string;
  plannedInjection: number;
  actualInjection: number;
  wellheadPressure: number;
  manifoldPressure: number;
  dataQuality: 'good' | 'missing' | 'questionable';
}

interface EvidenceItem {
  id: string;
  group: 'supports' | 'weakens_alternative' | 'unknown';
  label: string;
  detail: string;
  sourceMetric?: string;
}

interface CandidateExplanation {
  id: string;
  label: string;
  support: EvidenceLevel;
  rationale: string;
}

interface CandidateEvent {
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

interface InspectionTask {
  id: string;
  candidateEventId: string;
  status: 'not_created' | 'assigned' | 'in_progress' | 'feedback_submitted' | 'completed';
  assignedTeam: string;
  dueLabel: string;
  checklist: Array<{ id: string; label: string; complete: boolean }>;
  timeline: Array<{ state: string; relativeTime: string; actorRole: string }>;
}

interface FieldFeedback {
  inspectionTaskId: string;
  result: 'confirmed_observation' | 'not_confirmed' | 'inconclusive';
  observedCondition: string;
  instrumentCheck: string;
  operationContext: string;
  inspectionActionRecord: string;
  followUp: string;
  attachments: Array<{ kind: 'synthetic_placeholder'; label: string }>;
}

interface TechnicalReview {
  candidateEventId: string;
  decision: 'authorise_bounded_action' | 'continue_monitoring' | 'return_for_review';
  conclusion: string;
}

interface CorrectiveActionRecord {
  id: string;
  candidateEventId: string;
  status: 'not_authorised' | 'authorised' | 'completed';
  description: string;
  authorisedByRole: string;
  performedByRole: string;
}

interface RecoveryReview {
  candidateEventId: string;
  decision: 'verify_and_close' | 'continue_monitoring' | 'return_for_review';
  outcome: 'recovered' | 'not_recovered' | 'inconclusive';
  conclusion: string;
  labelGovernanceStatus: 'not_eligible' | 'eligible_for_curated_review';
}
```

Document the contract in `docs/DEMO_CONTRACT.md`. Call it a **demo interaction contract**, not a production API contract.

## 11. Visual and interaction design system

### 11.1 Overall art direction

The visual language should feel like a precise field notebook and modern control room, not:

- generic SaaS;
- cyberpunk;
- neon AI;
- glassmorphism;
- a crypto dashboard;
- a PowerPoint pasted onto a webpage;
- an oil-and-gas stock-photo site.

Do not use stock images. Use typography, authored diagrams, restrained icons, and truthful data graphics.

### 11.2 Colour tokens

Define these as CSS variables and use them consistently:

```css
:root {
  --pitch-bg: #f4f7fa;
  --pitch-surface: #ffffff;
  --pitch-ink: #102c46;
  --pitch-muted: #5d7185;
  --navy-950: #071a2a;
  --navy-900: #102f4c;
  --navy-800: #193f61;
  --blue-600: #2f6fb5;
  --teal-600: #148a87;
  --amber-500: #e59600;
  --red-600: #cf4338;
  --green-600: #2f9552;
  --slate-100: #edf2f6;
  --slate-200: #d8e1e8;
  --slate-500: #6f8292;
  --console-bg: #081722;
  --console-surface: #102432;
  --console-surface-2: #143041;
  --console-border: #284557;
  --console-text: #eaf2f7;
  --console-muted: #9bb0be;
}
```

Colour meaning:

- amber: attention / transition / pitch accent;
- teal: stable system context / verified neutral-positive state;
- blue: planned or reference series;
- red: critical exception only, never the default high-priority colour;
- green: verified recovery only;
- grey: unknown, unavailable, or inactive.

Never rely on colour alone; use text and icon labels.

### 11.3 Typography

Use a locally bundled or system font stack, with no runtime font request:

```css
font-family: Inter, "IBM Plex Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Use a mono stack for IDs, units, and numerical readouts:

```css
font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
```

Do not use a decorative serif. Use strong editorial scale in the pitch layer and denser technical scale in the console.

### 11.4 Layout

- pitch max content width: 1180px;
- console max width: 1440px with 24px outer padding;
- 4px spacing base;
- card radius: 10–14px;
- border-first hierarchy; very restrained shadows;
- no huge decorative empty zones;
- no giant number cards;
- no decorative circular charts;
- no more than five nodes in a horizontal concept diagram;
- use responsive two-row arrangements rather than crushing labels.

### 11.5 Motion

- transitions 150–240ms;
- use subtle opacity and 8–16px movement;
- no parallax, floating particles, looping animations, or autoplay;
- honour `prefers-reduced-motion`;
- status changes may use a brief restrained highlight, not confetti.

### 11.6 Responsive behaviour

Required visual QA sizes:

- 1440×900;
- 1280×720;
- 1024×768;
- 390×844.

Requirements:

- no horizontal page scroll;
- no clipped labels or axes;
- guided pitch chapters fit without vertical scroll at both desktop pitch sizes;
- concept diagrams reflow into two rows or a vertical stack;
- console table becomes meaningful stacked rows;
- field view becomes full-bleed on mobile;
- touch targets at least 44×44px;
- sticky navigation must not cover content.

## 12. Accessibility

- semantic landmarks and heading order;
- visible focus states;
- full keyboard operability;
- `aria-current` for chapter progress;
- labelled form controls;
- descriptive button text;
- accessible drawer/bottom-sheet focus management;
- escape closes overlays;
- charts have text summaries or accessible data tables;
- status is not encoded by colour alone;
- meet WCAG AA contrast for normal text;
- reduced-motion support.

## 13. Suggested file structure

Adapt if the repo already has conventions:

```text
src/
  app/
    App.tsx
    router.tsx
  components/
    common/
    pitch/
    demo/
    charts/
  content/
    pitchContent.ts
  data/
    syntheticQueue.ts
    syntheticScenario.ts
  domain/
    types.ts
    metrics.ts
    selectors.ts
  state/
    DemoContext.tsx
    demoReducer.ts
  styles/
    tokens.css
    global.css
    pitch.css
    console.css
  test/
    metrics.test.ts
    demoReducer.test.ts
    guidedPitch.test.tsx
docs/
  DEMO_CONTRACT.md
  PITCH_RUNBOOK.md
  work_logs/
    index.md
scripts/
  safety-scan.mjs
README.md
```

Avoid one enormous component. Keep the canonical scenario data independent of presentation components.

## 14. Functional requirements

The implementation is complete only when:

1. both Guided Pitch and Explore modes work;
2. all stable routes render directly;
3. keyboard chapter navigation works;
4. presenter cues toggle without appearing by default;
5. the concept layer and simulation layer are visually and semantically distinct;
6. the queue renders and only `SYN-EV-1042` drills down;
7. all displayed metrics are computed from the canonical series;
8. charts use correct units and separate y-axes;
9. evidence shows support, weakened alternatives, and unknowns;
10. inspection approval creates an inspection task, not a maintenance order;
11. same-browser role switching preserves state;
12. standalone mobile field route uses pre-seeded state and shows the non-synchronisation notice;
13. field feedback does not set the final cause or authorise corrective action;
14. technical review is a distinct gate before the abstracted synthetic action;
15. the action record contains no operational procedure or instructions;
16. recovery verification starts only after the authorised-action step;
17. review shows post-action recovery and uncertainty;
18. closure changes the status strip and queue state;
19. closure shows controlled label-review eligibility and no automatic learning;
20. Reset demo restores the initial state;
21. the final CTA has a working mail link and copy-email action;
22. no fake QR is visible;
23. reload resets the ordinary demo session.

## 15. Tests and validation

### 15.1 Unit tests

At minimum test:

- baseline mean equals 95.00;
- recent mean equals 77.25;
- decline rounds to 18.7%;
- pressure delta rounds to +0.80 MPa;
- manifold population SD rounds to 0.02 MPa;
- recovery endpoint equals 94.0 m³/d and 9.48 MPa;
- reducer accepts every valid transition;
- reducer rejects or safely ignores invalid transitions;
- Reset returns the exact initial state;
- derived event/task/label statuses match each story step.

### 15.2 Component and route tests

Test:

- guided opening;
- direct event route;
- standalone field route notice;
- evidence-group headings;
- inspection approval CTA wording;
- closure governance statement;
- email CTA.

### 15.3 End-to-end happy path

If Playwright is available, automate:

```text
start guided pitch
→ enter console
→ open SYN-EV-1042
→ approve and assign inspection
→ open field view
→ start inspection
→ submit synthetic feedback
→ open technical review
→ authorise bounded synthetic action
→ begin recovery monitoring
→ verify and close
→ continue to Build with us
```

### 15.4 Build checks

Run the repository’s equivalent of:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Add scripts if missing. Do not claim a check passed if it was not run.

### 15.5 Visual QA

Use the local preview and inspect all four required viewport sizes. Check:

- overflow;
- clipped copy;
- chart labels and tooltips;
- drawer and phone-frame behaviour;
- focus states;
- console-to-pitch transition;
- closed-state updates;
- reduced-motion mode.

Do not accept placeholder-looking UI, unreadable mini charts, or generic auto-generated dashboard composition.

### 15.6 Safety scan

Create a small local script that scans `src/`, `public/`, and `dist/` for:

- spreadsheet or raw-data assets;
- calendar-style dates in user-facing scenario content;
- non-synthetic well/event/task identifiers;
- terms that imply live/real-time field connectivity;
- accidental private-path references;
- file inputs, camera APIs, analytics, or telemetry.

The scan must allow the required disclaimer phrase but flag unsupported claims such as “live data” or “real-time monitoring”.

Report only categories and paths, never sensitive content.

## 16. Documentation

### README

Include:

- what the artifact is;
- prototype/semester target/later vision distinction;
- install/run/test/build commands;
- routes and modes;
- synthetic-data and no-live-connection statement;
- no cross-device synchronisation;
- architecture summary;
- safe deployment note;
- no private-source dependency.

### `docs/DEMO_CONTRACT.md`

Document:

- domain terms;
- metric semantics;
- canonical IDs;
- state transitions;
- reducer-derived statuses;
- evidence categories;
- label-governance boundary;
- out-of-scope production concerns.

### `docs/PITCH_RUNBOOK.md`

Document:

- 5–7 minute chapter order;
- target timing;
- keyboard controls;
- exact live click path;
- Reset procedure;
- fallback order:
  1. live interactive site;
  2. pre-recorded screen capture created later;
  3. static screenshots created later;
- note that phone QR exploration is independent, not synchronised.

Do not create the video or fake screenshot content in this task.

## 17. Work log and traceability

Every file-changing implementation task must create a work log and update its index.

Create:

```text
docs/work_logs/YYYY-MM-DD_NN_injectwatch_interactive_pitch_build.md
```

Use the current local execution date and the next unused sequence number.

Use these fixed headings:

1. `Task Brief`
2. `Context`
3. `Decisions Made`
4. `Actions Completed`
5. `Files Changed`
6. `Safety / Privacy Check`
7. `Git Status / Diff Scope`
8. `What Was Intentionally Not Done`
9. `Next Steps`
10. `Related Commits`

Update:

```text
docs/work_logs/index.md
```

In `Safety / Privacy Check`, explicitly record:

- raw data read: No;
- sensitive data printed: No;
- external/private repository accessed: No;
- data directory modified: No, except prompt-supplied synthetic source files;
- uploads/camera/telemetry added: No;
- git push: No;
- git history rewrite: No;
- full-field data accessed or processed: No.

Do not put raw values beyond the approved synthetic scenario into the work log.

## 18. Execution sequence

1. Read repository instructions and inspect `git status --short` plus the relevant file tree.
2. Confirm the work stays inside the current demo repository.
3. Identify and preserve unrelated changes.
4. Scaffold only if necessary.
5. Implement tokens, domain types, canonical data, and metric functions first.
6. Implement the reducer and test its state transitions.
7. Build the pitch shell and routes.
8. Build the console, evidence charts, and inspection approval.
9. Build the field and review/closure states.
10. Add the Build/Role/Join chapters.
11. Add accessibility, responsive behaviour, and presenter controls.
12. Add tests, safety scan, README, contract, runbook, work log, and index entry.
13. Run lint, typecheck, tests, build, and safety scan.
14. Start local preview and complete visual QA at all required viewports.
15. Review `git diff --stat` and `git status --short`.
16. Provide a final implementation report.

Do not commit, push, deploy, open a PR, or modify files outside the current repository unless the user gives separate explicit authorisation.

## 19. Priority and cut line

If time becomes constrained, preserve in this order:

### P0 — Never cut

- truthful prototype labelling;
- guided concept narrative;
- one complete simulation loop;
- canonical computed metrics;
- evidence plus uncertainty;
- expert-approved inspection;
- field feedback;
- distinct technical review and action authorisation;
- abstracted authorised-action record;
- recovery verification;
- controlled label-review boundary;
- responsive and accessible core flow;
- tests, build, and work log.

### P1 — Simplify if needed

- decorative chart annotations;
- secondary queue rows beyond six;
- presenter-cue styling;
- advanced transition polish.

### P2 — Defer

- full-screen API polish;
- screenshot automation;
- extra explore-mode animation;
- optional secondary diagrams.

Never cut a loop step in order to preserve decoration.

## 20. Anti-pattern checklist

The build is not acceptable if it:

- looks like a generic admin-template dashboard;
- mixes pitch architecture into the simulated product navigation;
- presents a candidate event as a confirmed root cause before review;
- calls an inspection task a maintenance work order;
- uses one axis for flow and pressure;
- omits units, relative-day ticks, or event/action/recovery markers;
- shows only supporting evidence;
- uses root-cause probabilities or unexplained scores;
- says stable manifold pressure excludes all upstream causes;
- implies cross-device state;
- shows a fake QR;
- implies automatic retraining from field feedback;
- includes real-looking company, person, asset, threshold, or calendar-date content;
- uses “live” or “real-time” claims;
- depends on an external private document at runtime;
- contains decorative gauges, radar charts, or oversized empty cards;
- hides the synthetic disclaimer;
- ends without a clear student recruitment CTA.

## 21. Final response format

When implementation is complete, report:

1. outcome first;
2. pages/routes implemented;
3. key interaction path;
4. tests and build commands actually run with results;
5. visual QA sizes checked;
6. safety scan result;
7. files changed, grouped by purpose;
8. work-log path;
9. anything intentionally deferred;
10. confirmation that no commit, push, deployment, private-data access, or external repository access occurred.

Do not paste large generated files into the final response. Link or name them clearly.

# END BUILD PROMPT

---

## Owner review note

This v1.0 prompt deliberately resolves the open decisions as follows:

- the main artifact is an interactive pitch experience, not PPT plus dashboard;
- concept architecture and simulated operator UI remain visibly separate;
- the live path uses one browser session;
- mobile exploration is independent and pre-seeded;
- the product uses candidate-event language until technical closure;
- inspection is separated from maintenance;
- field observation, technical review, authorised synthetic action, and recovery verification are separate stages;
- anomaly magnitude, consequence, priority, and evidence status are separate concepts;
- synthetic scenario metrics are internally reproducible;
- recovery verification is part of the demonstrated loop;
- feedback does not automatically enter a gold-standard label store or retrain a model;
- the student team never needs private field data.
