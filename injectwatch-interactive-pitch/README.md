# InjectWatch Interactive Pitch Experience

InjectWatch is a responsive, English-first interactive recruitment pitch for a
Monash University DeepNeuron student project. It combines a light editorial
concept layer with a dark synthetic product simulation.

> Concept prototype · Synthetic scenario · No live field connection

The prototype contains no private field data, runtime API calls, backend,
authentication, uploads, camera access, telemetry, analytics, or cross-device
synchronisation.

## What is represented

- **Prototype now:** one deterministic click-through scenario, browser-local
  reducer state, and no backend or field connection.
- **Semester MVP target:** contract-first event and inspection modules, evidence
  views, mock service boundaries, a tested feedback workflow, CI, review, and a
  deployable student demo.
- **Later vision:** governed data-service integration, broader asset structure,
  rules and early-warning models, higher-frequency monitoring, and optional
  reporting.

The semester acceptance line is: **One complete, testable fault-response loop
using synthetic data.**

## Run locally

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by the development server.

## Checks

```bash
npm run lint
npm run typecheck
npm test
npm run safety-scan
npm run build
```

Production builds do not enable source maps.

## Modes and routes

The app uses stable hash routes:

- `#/` — Explore mode
- `#/pitch/01-opening` through `#/pitch/08-join` — Guided Pitch mode
- `#/demo/console` — candidate queue
- `#/demo/event/SYN-EV-1042` — evidence review
- `#/demo/field` — independent, pre-seeded field replay when opened directly
- `#/demo/review` — independent, pre-seeded technical review when opened directly

Guided Pitch controls:

- next: `ArrowRight`, `PageDown`, or `Space`
- back: `ArrowLeft` or `PageUp`
- exit guided mode: `Esc`
- presenter cues: `P`

During the simulation, workflow actions replace ordinary pitch navigation so a
presenter cannot silently skip a required state transition.

## Architecture

- Vinext/Vite + React + TypeScript
- `HashRouter` for direct, portable demo routes
- React Context + `useReducer` for browser-local deterministic story state
- canonical synthetic data in `src/data/`
- computed metrics and derived status selectors in `src/domain/`
- Recharts small multiples with separate flow and pressure axes
- Vitest + React Testing Library

The demo interaction contract is documented in
[`docs/DEMO_CONTRACT.md`](docs/DEMO_CONTRACT.md). The presentation path is in
[`docs/PITCH_RUNBOOK.md`](docs/PITCH_RUNBOOK.md).

## Safe deployment note

Everything bundled into the front end must be treated as public. This repository
has no private-source dependency. A hosted version must preserve the synthetic
prototype disclaimer and must not be connected to field systems without a new,
governed architecture and security review.

The direct mobile field route is a standalone replay. It is not synchronised
with the desktop workflow or any other device.

