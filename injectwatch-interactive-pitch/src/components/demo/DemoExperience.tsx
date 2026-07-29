"use client";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Eye,
  FileSearch,
  Info,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Wrench,
  X,
} from "lucide-react";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { candidateEvent, demoRules } from "../../data/syntheticScenario";
import { syntheticQueue } from "../../data/syntheticQueue";
import { scenarioMetrics } from "../../domain/metrics";
import { deriveQueueCounts, deriveStatuses } from "../../domain/selectors";
import type { FieldFeedback, StoryStep } from "../../domain/types";
import { guidedFeedback } from "../../state/demoReducer";
import { useDemo } from "../../state/DemoContext";
import { EvidenceCharts } from "../charts/EvidenceCharts";
import { AssetPath } from "../common/AssetPath";
import { PrototypeLabel } from "../common/PrototypeLabel";

const inspectionChecklist = [
  "Confirm whether an approved operation or set-point change explains the pattern.",
  "Verify instrument status using the approved site procedure.",
  "Compare the physical equipment state with the suggested local-restriction direction.",
  "Record observations, initial judgement and relevant evidence.",
  "Use only routine actions covered by the task authority and approved site procedure; otherwise escalate.",
];

const demoPhases = [
  ["Prioritise", "One event from six detections"],
  ["Understand", "Review the data hypothesis"],
  ["Inspect", "Collect physical evidence"],
  ["Decide", "Act within authority or escalate"],
  ["Verify", "Confirm recovery before closure"],
] as const;

const stepPhase: Record<StoryStep, number> = {
  queue: 0,
  evidence_review: 1,
  inspection_assigned: 2,
  inspection_in_progress: 2,
  feedback_submitted: 2,
  technical_review: 3,
  action_authorised: 3,
  recovery_monitoring: 4,
  closed_verified: 4,
};

function humanise(value: string) {
  return value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function DemoStoryRail({ pitchMode }: { pitchMode: boolean }) {
  const { state } = useDemo();
  const current = stepPhase[state.step];
  return (
    <div className="demo-story-wrap">
      <div className="demo-story-label">
        <span>{pitchMode ? "Guided demo · five narrative beats" : "Candidate-to-outcome workflow"}</span>
        <strong>{current + 1} / {demoPhases.length}</strong>
      </div>
      <ol className="demo-story-rail" aria-label="Demo story progress">
        {demoPhases.map(([label, detail], index) => (
          <li
            className={index === current ? "is-current" : index < current ? "is-complete" : ""}
            aria-current={index === current ? "step" : undefined}
            key={label}
          >
            <i>{index < current ? <Check size={11} /> : index + 1}</i>
            <span><strong>{label}</strong><small>{detail}</small></span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function DemoShell({ children }: { children: ReactNode }) {
  const { state, dispatch } = useDemo();
  const location = useLocation();
  const navigate = useNavigate();
  const pitchMode = Boolean(location.state?.pitchMode);
  const statuses = deriveStatuses(state.step);
  const reset = () => {
    dispatch({ type: "RESET_DEMO" });
    navigate("/demo/console", { state: pitchMode ? { pitchMode: true } : undefined });
  };
  return (
    <main className="demo-shell">
      <header className="demo-header">
        <div className="demo-header-primary">
          <Link to="/pitch/06-scenario" className="return-link">
            <ArrowLeft size={16} /> Return to pitch
          </Link>
          <div className="demo-wordmark">
            <span>IW</span>
            <div><strong>InjectWatch</strong><small>Candidate response simulation</small></div>
          </div>
        </div>
        <PrototypeLabel compact />
        <div className="demo-header-actions">
          <span className="scenario-status">
            <i /> Scenario status · {humanise(statuses.candidateStatus)}
          </span>
          <button onClick={reset}><RotateCcw size={15} /> Reset demo</button>
        </div>
      </header>
      <DemoStoryRail pitchMode={pitchMode} />
      {children}
    </main>
  );
}

function StatusStrip() {
  const { state } = useDemo();
  const counts = deriveQueueCounts(state.step);
  return (
    <dl className="status-strip">
      <div><dt>Active candidates</dt><dd>{counts.activeCandidates}</dd></div>
      <div><dt>Awaiting expert review</dt><dd>{counts.awaitingExpertReview}</dd></div>
      <div><dt>Inspection open</dt><dd>{counts.inspectionOpen}</dd></div>
      <div><dt>Recovery monitoring</dt><dd>{counts.recoveryMonitoring}</dd></div>
    </dl>
  );
}

export function ConsolePage() {
  const { state, dispatch } = useDemo();
  const location = useLocation();
  const navigate = useNavigate();
  const pitchMode = Boolean(location.state?.pitchMode);
  const statuses = deriveStatuses(state.step);
  const openEvent = () => {
    dispatch({ type: "OPEN_EVENT" });
    navigate("/demo/event/SYN-EV-1042", {
      state: { fromWorkflow: true, pitchMode },
    });
  };

  return (
    <DemoShell>
      <div className="console-page">
        <header className="console-title-row">
          <div>
            <span className="console-kicker">Operator workspace · synthetic replay</span>
            <h1>Candidate Event Console</h1>
            <p>Prioritise review without collapsing anomaly, consequence, and evidence into one score.</p>
          </div>
          <div className="console-time"><span>Scenario clock</span><strong>D0 · 08:40</strong></div>
        </header>
        <StatusStrip />
        <section className="queue-section" aria-labelledby="queue-title">
          <div className="queue-heading">
            <div><span>Candidate queue</span><h2 id="queue-title">Review order</h2></div>
            <p>6 candidates · sorted by inspection priority</p>
          </div>
          <div className="queue-table" role="table" aria-label="Synthetic candidate event queue">
            <div className="queue-row queue-header" role="row">
              {["Priority", "Candidate event", "Asset", "Candidate summary", "Consequence", "Evidence", "State", "Merged", "Action"].map(
                (label) => <span role="columnheader" key={label}>{label}</span>,
              )}
            </div>
            {syntheticQueue.map((event, index) => {
              const isPrimary = event.id === "SYN-EV-1042";
              const title =
                isPrimary && state.step === "closed_verified"
                  ? "Verified restriction-related event"
                  : event.title;
              const eventStatus = isPrimary ? statuses.candidateStatus : event.status;
              return (
                <div
                  className={`queue-row ${isPrimary ? "is-primary" : ""}`}
                  role="row"
                  key={event.id}
                >
                  <span role="cell" data-label="Priority">
                    <i className={`priority-dot ${event.inspectionPriority}`} />
                    {humanise(event.inspectionPriority)}{index === 0 ? " · Rank 1" : ""}
                  </span>
                  <code role="cell" data-label="Candidate event">{event.id}</code>
                  <code role="cell" data-label="Asset">{event.assetId}</code>
                  <strong role="cell" data-label="Candidate summary">{title}</strong>
                  <span role="cell" data-label="Consequence">{humanise(event.consequenceBand)}</span>
                  <span role="cell" data-label="Evidence">{humanise(event.evidenceStatus)}</span>
                  <span role="cell" data-label="State">{humanise(eventStatus)}</span>
                  <span role="cell" data-label="Merged">{event.mergedFrom} daily</span>
                  <span role="cell" data-label="Action">
                    {event.drilldownAvailable ? (
                      <button className="table-action" onClick={openEvent}>
                        {state.step === "closed_verified" ? "Review outcome" : "Review evidence"}
                        <ChevronRight size={15} />
                      </button>
                    ) : (
                      <span className="overview-only">Overview only</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </DemoShell>
  );
}

function SemanticMetric({
  label,
  definition,
  value,
  note,
}: {
  label: string;
  definition: string;
  value: string;
  note: string;
}) {
  return (
    <article className="semantic-metric">
      <div>
        <span>{label}</span>
        <button className="info-button" aria-label={`${label}: ${definition}`} title={definition}>
          <Info size={14} />
        </button>
      </div>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

function ApprovalDrawer({
  onApprove,
  onClose,
}: {
  onApprove: () => void;
  onClose: () => void;
}) {
  const primaryRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    primaryRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const approve = () => {
    onApprove();
    onClose();
  };

  return (
    <div className="drawer-backdrop" role="presentation">
      <aside className="approval-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <div className="drawer-heading">
          <div><span>Human approval gate 01</span><h2 id="drawer-title">Approve inspection task</h2></div>
          <button aria-label="Close approval drawer" onClick={onClose}><X size={18} /></button>
        </div>
        <dl className="task-facts">
          <div><dt>Task</dt><dd>SYN-INSP-2101</dd></div>
          <div><dt>Related candidate</dt><dd>SYN-EV-1042</dd></div>
          <div><dt>Assigned team</dt><dd>Field Crew A</dd></div>
          <div><dt>Due</dt><dd>Within 24 hours</dd></div>
          <div><dt>Priority</dt><dd>High</dd></div>
          <div><dt>Approved by role</dt><dd>Technical reviewer</dd></div>
        </dl>
        <div className="task-source-grid">
          <section>
            <span>System-generated draft</span>
            <h3>Data hypothesis</h3>
            <ul>
              <li>Actual injection down while the plan remains stable</li>
              <li>Wellhead pressure up; upstream manifold stable</li>
              <li>Suggested direction: inspect for a possible local restriction</li>
            </ul>
          </section>
          <section>
            <span>Engineer review</span>
            <h3>Task scope and authority</h3>
            <ul>
              <li>Compare local physical state with the data pattern</li>
              <li>Record any conflicting evidence or alternative explanation</li>
              <li>Escalate actions outside approved routine authority</li>
            </ul>
          </section>
        </div>
        <div className="drawer-checklist">
          <h3>Safe inspection checklist</h3>
          {inspectionChecklist.map((item) => (
            <div key={item}><span><Check size={13} /></span><p>{item}</p></div>
          ))}
        </div>
        <p className="safety-note">
          <ShieldCheck size={16} />
          Demo workflow only. It does not replace site procedures or authorised technical judgement.
        </p>
        <div className="drawer-actions">
          <button className="button secondary" onClick={onClose}>Cancel</button>
          <button ref={primaryRef} className="button primary" onClick={approve}>
            Approve & assign <ArrowRight size={17} />
          </button>
        </div>
      </aside>
    </div>
  );
}

const auditEvents = [
  ["queue", "Candidate event assembled", "D-1 · system"],
  ["evidence_review", "Evidence opened for review", "D0 · operator"],
  ["inspection_assigned", "System draft reviewed and assigned", "D0 · technical reviewer"],
  ["feedback_submitted", "Physical evidence and judgement submitted", "D0 · Field Crew A"],
  ["action_authorised", "Bounded scenario action authorised", "D0 · technical reviewer"],
  ["recovery_monitoring", "Recovery window started", "D+1 · scenario replay"],
  ["closed_verified", "Outcome verified and closed", "D+4 · technical reviewer"],
] as const;

function AuditTimeline() {
  const { state } = useDemo();
  const order = [
    "queue",
    "evidence_review",
    "inspection_assigned",
    "inspection_in_progress",
    "feedback_submitted",
    "technical_review",
    "action_authorised",
    "recovery_monitoring",
    "closed_verified",
  ];
  const current = order.indexOf(state.step);
  return (
    <ol className="audit-timeline">
      {auditEvents.map(([step, label, meta]) => {
        const active = current >= order.indexOf(step);
        return (
          <li className={active ? "is-active" : ""} key={step}>
            <i>{active ? <Check size={11} /> : null}</i>
            <div><strong>{label}</strong><span>{meta}</span></div>
          </li>
        );
      })}
    </ol>
  );
}

export function EventDetailPage() {
  const { state, dispatch } = useDemo();
  const location = useLocation();
  const navigate = useNavigate();
  const pitchMode = Boolean(location.state?.pitchMode);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const statuses = deriveStatuses(state.step);
  const approveInspection = () => {
    dispatch({ type: "APPROVE_INSPECTION" });
    if (pitchMode) {
      dispatch({ type: "START_INSPECTION" });
      navigate("/demo/field", {
        state: { fromWorkflow: true, pitchMode: true },
      });
    }
  };

  return (
    <DemoShell>
      <div className="event-page">
        <header className="event-heading">
          <div>
            <Link to="/demo/console" className="breadcrumb">Candidate queue / <strong>SYN-EV-1042</strong></Link>
            <h1>{state.step === "closed_verified" ? "Verified restriction-related event" : candidateEvent.title}</h1>
            <p><code>SYN-EV-1042</code> · <code>SYN-W027</code> · 6 daily detections merged</p>
          </div>
          <span className={`event-state ${state.step === "closed_verified" ? "verified" : ""}`}>
            {humanise(statuses.candidateStatus)}
          </span>
        </header>

        <section className="semantic-grid" aria-label="Separated event semantics">
          <SemanticMetric
            label="Anomaly magnitude"
            definition="How far did the observed signal move?"
            value={`${scenarioMetrics.injectionDeclinePct.toFixed(1)}% recent injection decline`}
            note="Observed change"
          />
          <SemanticMetric
            label="Consequence band"
            definition="How material could continued degradation be in this synthetic story?"
            value="Focus"
            note="Synthetic story consequence"
          />
          <SemanticMetric
            label="Inspection priority"
            definition="How soon should the candidate be reviewed relative to the queue?"
            value="High · Rank 1"
            note="Review order"
          />
          <SemanticMetric
            label="Evidence status"
            definition="How complete is the current evidence?"
            value="Partial · 3 supported / 2 unknown"
            note="Evidence completeness"
          />
        </section>

        <EvidenceCharts />

        <section className="event-support-grid">
          <div className="evidence-groups">
            <div className="support-heading"><span>Evidence review</span><h2>What the candidate is—and is not</h2></div>
            {[
              ["supports", "Supports the candidate", <CheckCircle2 key="a" size={17} />],
              ["weakens_alternative", "Weakens an alternative", <FileSearch key="b" size={17} />],
              ["unknown", "Unknown / needs checking", <AlertCircle key="c" size={17} />],
            ].map(([group, title, icon]) => (
              <article className={`evidence-group ${group}`} key={String(group)}>
                <h3>{icon}{title}</h3>
                <ul>
                  {candidateEvent.evidence
                    .filter((item) => item.group === group)
                    .map((item) => <li key={item.id}>{item.detail}</li>)}
                </ul>
              </article>
            ))}
            <p className="provisional-note">Current conclusion: provisional · exact cause not confirmed</p>
          </div>
          <div className="reason-ranking">
            <div className="support-heading"><span>Qualitative support</span><h2>Candidate-reason ranking</h2></div>
            {candidateEvent.explanations.map((item) => (
              <article key={item.id}>
                <div><strong>{item.label}</strong><span className={item.support}>{humanise(item.support)}</span></div>
                <p>{item.rationale}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rules-section">
          <div className="section-heading-row">
            <div><span className="section-kicker">Fictional logic</span><h2>Why the candidate was assembled</h2></div>
            <span className="quality-pill">25/25 points present · aligned synthetic series</span>
          </div>
          <div className="rule-grid">
            {demoRules.map((rule) => (
              <article key={rule.id}>
                <code>{rule.id}</code><h3>{rule.title}</h3><p>{rule.logic}</p>
                <span>Synthetic demo logic · not a field threshold</span>
              </article>
            ))}
          </div>
        </section>

        <section className="asset-and-audit">
          <div><h2>Scenario asset context</h2><AssetPath /></div>
          <div><h2>Audit timeline</h2><AuditTimeline /></div>
        </section>

        <div className="workflow-action-bar">
          <div>
            <ShieldCheck size={20} />
            <p><strong>Next gate: professional review</strong><span>Approve a bounded inspection task—not a maintenance order.</span></p>
          </div>
          {state.step === "evidence_review" ? (
            <button className="button primary" onClick={() => setDrawerOpen(true)}>
              Approve inspection task <ArrowRight size={17} />
            </button>
          ) : state.step === "inspection_assigned" ? (
            <button
              className="button primary"
              onClick={() =>
                navigate("/demo/field", {
                  state: { fromWorkflow: true, pitchMode },
                })
              }
            >
              Open field view in this browser <Smartphone size={17} />
            </button>
          ) : state.step === "closed_verified" ? (
            <button className="button primary" onClick={() => navigate("/pitch/07-prototype")}>
              Continue to what this prototype represents <ArrowRight size={17} />
            </button>
          ) : (
            <span className="workflow-progress">Workflow in progress · {humanise(state.step)}</span>
          )}
        </div>
      </div>
      {drawerOpen && (
        <ApprovalDrawer
          onApprove={approveInspection}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </DemoShell>
  );
}

function FieldFact({ label, value }: { label: string; value: string }) {
  return <div><span>{label}</span><strong>{value}</strong></div>;
}

function GuidedFieldReport({
  feedback,
  onSubmit,
}: {
  feedback: FieldFeedback;
  onSubmit: () => void;
}) {
  return (
    <section className="guided-field-report" aria-label="Prefilled synthetic field report">
      <div className="guided-field-choices">
        <div>
          <span>Finding alignment</span>
          <strong><CheckCircle2 size={14} /> Consistent with suggestion</strong>
        </div>
        <div>
          <span>Authority outcome</span>
          <strong><LockKeyhole size={14} /> Requires authorisation</strong>
        </div>
      </div>
      <dl>
        <div><dt>Physical observation</dt><dd>{feedback.observedCondition}</dd></div>
        <div><dt>Initial field judgement</dt><dd>{feedback.initialJudgement}</dd></div>
        <div><dt>Action taken</dt><dd>{feedback.inspectionActionRecord}</dd></div>
      </dl>
      <div className="guided-evidence-row">
        <span><Eye size={14} /> {feedback.attachments.length} synthetic evidence placeholders attached</span>
        <small>Observation, judgement and action remain separate.</small>
      </div>
      <button className="button primary full" type="button" onClick={onSubmit}>
        Submit field report <ArrowRight size={17} />
      </button>
    </section>
  );
}

export function FieldPage() {
  const { state, dispatch } = useDemo();
  const location = useLocation();
  const navigate = useNavigate();
  const standalone = !location.state?.fromWorkflow;
  const pitchMode = Boolean(location.state?.pitchMode);
  const [feedback, setFeedback] = useState<FieldFeedback>(guidedFeedback);
  const started = state.step === "inspection_in_progress";
  const submitted = state.step === "feedback_submitted";

  const update = <Key extends keyof FieldFeedback>(
    key: Key,
    value: FieldFeedback[Key],
  ) =>
    setFeedback((current) => ({ ...current, [key]: value }));

  const submitFeedback = () => {
    dispatch({ type: "SUBMIT_FEEDBACK", payload: feedback });
    if (pitchMode) {
      dispatch({ type: "OPEN_TECHNICAL_REVIEW" });
      navigate("/demo/review", {
        state: { fromWorkflow: true, pitchMode: true },
      });
    }
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    submitFeedback();
  };

  return (
    <DemoShell>
      <div className="field-stage">
        <div className="role-switch-note">
          <Smartphone size={18} />
          <div><strong>Role view · Field Crew A</strong><span>Same-browser synthetic role switch</span></div>
        </div>
        <div className="phone-frame">
          <div className="phone-speaker" />
          <div className="field-app">
            <header className="field-header">
              <div><span>INJECTWATCH / FIELD</span><h1>Field inspection</h1></div>
              <span className="assigned-pill">{submitted ? "Submitted" : started ? "In progress" : "Assigned"}</span>
            </header>
            {standalone && (
              <div className="standalone-notice">
                <Info size={17} />
                <p><strong>Standalone synthetic replay</strong> · not synchronised with another device</p>
              </div>
            )}
            <section className="field-facts">
              <FieldFact label="Task" value="SYN-INSP-2101" />
              <FieldFact label="Candidate" value="SYN-EV-1042" />
              <FieldFact label="Asset" value="SYN-W027" />
            </section>
            <section className="field-summary">
              <span>Control-room data hypothesis</span>
              <p>
                Injection declined while wellhead pressure rose and upstream
                pressure stayed stable. Suggested direction: check for a possible
                local restriction; no root cause is confirmed.
              </p>
            </section>
            <section className="field-direction">
              <span>Recommended physical checks</span>
              <p>Compare local equipment state and indication with the expected operating context.</p>
              <small>Routine actions require an approved procedure and task authority. Otherwise, return the evidence.</small>
            </section>
            {!started && !submitted ? (
              <>
                <section className="mobile-checklist">
                  <h2>Safe checklist</h2>
                  {inspectionChecklist.slice(0, 4).map((item) => (
                    <div key={item}><i /><span>{item}</span></div>
                  ))}
                </section>
                <button className="button primary full" onClick={() => dispatch({ type: "START_INSPECTION" })}>
                  Start inspection <ArrowRight size={17} />
                </button>
              </>
            ) : submitted ? (
              <div className="submission-success">
                <CheckCircle2 size={30} />
                <h2>Feedback submitted</h2>
                <p>Technical review required</p>
                <button
                  className="button primary full"
                  onClick={() => {
                    dispatch({ type: "OPEN_TECHNICAL_REVIEW" });
                    navigate("/demo/review", {
                      state: { fromWorkflow: true, pitchMode },
                    });
                  }}
                >
                  Open technical review <ArrowRight size={17} />
                </button>
              </div>
            ) : pitchMode ? (
              <GuidedFieldReport feedback={feedback} onSubmit={submitFeedback} />
            ) : (
              <form className="field-form" onSubmit={submit}>
                <div className="field-choice-grid">
                  <label>
                    Does the finding match the suggested direction?
                    <select
                      value={feedback.findingAlignment}
                      onChange={(event) =>
                        update(
                          "findingAlignment",
                          event.target.value as FieldFeedback["findingAlignment"],
                        )
                      }
                    >
                      <option value="consistent_with_suggestion">Consistent with suggestion</option>
                      <option value="different_issue_found">A different issue was found</option>
                      <option value="still_inconclusive">Still inconclusive</option>
                    </select>
                  </label>
                  <label>
                    What happens next?
                    <select
                      value={feedback.actionDisposition}
                      onChange={(event) =>
                        update(
                          "actionDisposition",
                          event.target.value as FieldFeedback["actionDisposition"],
                        )
                      }
                    >
                      <option value="resolved_under_approved_procedure">Resolved under approved procedure</option>
                      <option value="requires_authorisation">Requires authorisation</option>
                      <option value="requires_further_guidance">Requires further guidance</option>
                    </select>
                  </label>
                </div>
                <label>
                  Physical observations
                  <textarea value={feedback.observedCondition} onChange={(event) => update("observedCondition", event.target.value)} />
                </label>
                <label>
                  Local indication / instrument check
                  <textarea value={feedback.instrumentCheck} onChange={(event) => update("instrumentCheck", event.target.value)} />
                </label>
                <label>
                  Operating context
                  <textarea value={feedback.operationContext} onChange={(event) => update("operationContext", event.target.value)} />
                </label>
                <label>
                  Initial field judgement
                  <textarea value={feedback.initialJudgement} onChange={(event) => update("initialJudgement", event.target.value)} />
                </label>
                <label>
                  Action taken within task authority
                  <textarea value={feedback.inspectionActionRecord} onChange={(event) => update("inspectionActionRecord", event.target.value)} />
                </label>
                <label>
                  Escalation / follow-up note
                  <textarea value={feedback.followUp} onChange={(event) => update("followUp", event.target.value)} />
                </label>
                <div className="synthetic-photos" aria-label="Synthetic photo placeholders">
                  {feedback.attachments.map((item) => (
                    <div key={item.label}><Eye size={17} /><span>{item.label}</span></div>
                  ))}
                </div>
                <p className="field-safety">
                  Field crews may complete routine actions only when covered by an
                  approved procedure and task authority. Observations, judgement
                  and actions remain separate from the final technical conclusion.
                </p>
                <button className="button primary full" type="submit">
                  Submit field report <ArrowRight size={17} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </DemoShell>
  );
}

function ReviewEvidenceColumns() {
  const { state } = useDemo();
  const feedback = state.feedback ?? guidedFeedback;
  return (
    <div className="review-columns">
      <section>
        <span>Evidence layer 01 · control room</span>
        <h2>Sensor pattern and system hypothesis</h2>
        <ul>
          <li>Recent injection mean is {scenarioMetrics.injectionDeclinePct.toFixed(1)}% below baseline.</li>
          <li>Wellhead pressure increased by {scenarioMetrics.pressureDelta14.toFixed(2)} MPa.</li>
          <li>Manifold pressure remains comparatively stable.</li>
          <li>Suggested direction: possible restriction in the local flow path.</li>
        </ul>
        <p>Data-level hypothesis · not a confirmed diagnosis</p>
      </section>
      <section>
        <span>Evidence layer 02 · field</span>
        <h2>Physical observations and field judgement</h2>
        <dl>
          <div><dt>Alignment</dt><dd>{humanise(feedback.findingAlignment)}</dd></div>
          <div><dt>Observed</dt><dd>{feedback.observedCondition}</dd></div>
          <div><dt>Field judgement</dt><dd>{feedback.initialJudgement}</dd></div>
          <div><dt>Authority outcome</dt><dd>{humanise(feedback.actionDisposition)}</dd></div>
          <div><dt>Action record</dt><dd>{feedback.inspectionActionRecord}</dd></div>
          <div><dt>Evidence attached</dt><dd>{feedback.attachments.length} synthetic media placeholders</dd></div>
        </dl>
      </section>
    </div>
  );
}

export function ReviewPage() {
  const { state, dispatch } = useDemo();
  const location = useLocation();
  const navigate = useNavigate();
  const standalone = !location.state?.fromWorkflow;
  const statuses = deriveStatuses(state.step);
  const [selectedDecision, setSelectedDecision] = useState("authorise");
  const [branchMessage, setBranchMessage] = useState("");

  const decisionOptions = useMemo(
    () => [
      ["authorise", "Authorise bounded scenario action", "Accept the escalation and proceed under an approved site procedure"],
      ["inspect", "Request further inspection", "Return a more targeted approved check to the field team"],
      ["monitor", "Continue monitoring", "Keep the candidate open while collecting more evidence"],
    ],
    [],
  );

  const applyDecision = () => {
    if (selectedDecision === "authorise") {
      dispatch({ type: "AUTHORISE_ACTION" });
      return;
    }
    setBranchMessage(
      selectedDecision === "inspect"
        ? "Further inspection would create another field-feedback round. This synthetic pitch continues through the authorised-action branch."
        : "Continued monitoring would keep the candidate open. This synthetic pitch continues through the authorised-action branch.",
    );
  };

  return (
    <DemoShell>
      <div className="review-page">
        <header className="console-title-row">
          <div>
            <span className="console-kicker">Human approval gate 02</span>
            <h1>Technical review & controlled action</h1>
            <p>SYN-EV-1042 · compare control-room evidence with physical field evidence before the next action.</p>
          </div>
          {standalone && <span className="standalone-state">Standalone scenario state</span>}
        </header>
        <StatusStrip />
        <ReviewEvidenceColumns />

        {state.step === "technical_review" && (
          <section className="review-decision">
            <div className="review-conclusion">
              <ShieldCheck size={20} />
              <p>
                The two evidence layers now agree at the local-restriction level.
                The precise component remains unconfirmed, and the field report
                marks the next action outside its current task authority.
              </p>
            </div>
            <div className="decision-options" role="radiogroup" aria-label="Technical review decision">
              {decisionOptions.map(([id, title, detail]) => (
                <label className={selectedDecision === id ? "is-selected" : ""} key={id}>
                  <input
                    type="radio"
                    name="review-decision"
                    checked={selectedDecision === id}
                    onChange={() => {
                      setSelectedDecision(id);
                      setBranchMessage("");
                    }}
                  />
                  <span><strong>{title}</strong><small>{detail}</small></span>
                </label>
              ))}
            </div>
            {branchMessage && <p className="review-branch-note">{branchMessage}</p>}
            <div className="workflow-action-bar embedded">
              <div><LockKeyhole size={20} /><p><strong>Reviewer gate</strong><span>Accept, request another inspection, or keep the event open.</span></p></div>
              <button className="button primary" onClick={applyDecision}>
                {selectedDecision === "authorise" ? "Authorise bounded scenario action" : "Preview this decision path"} <ArrowRight size={17} />
              </button>
            </div>
          </section>
        )}

        {["action_authorised", "recovery_monitoring", "closed_verified"].includes(state.step) && (
          <section className="action-record">
            <div className="record-stamp"><Wrench size={23} /><span>Action record</span></div>
            <div>
              <span className="section-kicker">Authorised action · SYN-ACT-3101</span>
              <h2>Completed in synthetic replay</h2>
              <p>Bounded corrective action completed under an approved site procedure</p>
            </div>
            <dl>
              <div><dt>Performed by role</dt><dd>Authorised field team</dd></div>
              <div><dt>Relative audit time</dt><dd>D0 → D+1 replay transition</dd></div>
            </dl>
            <p className="action-safety">
              Operational authorisation is abstracted in this concept prototype. No field procedure is prescribed.
            </p>
            {state.step === "action_authorised" && (
              <button className="button primary" onClick={() => dispatch({ type: "BEGIN_RECOVERY_MONITORING" })}>
                Begin recovery verification <ArrowRight size={17} />
              </button>
            )}
          </section>
        )}

        {["recovery_monitoring", "closed_verified"].includes(state.step) && (
          <section className={`recovery-panel ${state.step === "closed_verified" ? "is-closed" : ""}`}>
            <div className="recovery-heading">
              <div>
                <span className="section-kicker">D+1 to D+4 · verified window</span>
                <h2>Post-action recovery verification</h2>
              </div>
              <span><CheckCircle2 size={17} /> {state.step === "closed_verified" ? "Closed · recovery verified" : "Monitoring complete"}</span>
            </div>
            <div className="recovery-metrics">
              <article><span>Actual injection</span><strong>{scenarioMetrics.initialInjection.toFixed(1)} → {scenarioMetrics.recoveryInjection.toFixed(1)} m³/d</strong></article>
              <article><span>Wellhead pressure</span><strong>{scenarioMetrics.initialPressure.toFixed(2)} → {scenarioMetrics.recoveryPressure.toFixed(2)} MPa</strong></article>
              <article><span>Manifold pressure</span><strong>Remained stable</strong></article>
            </div>
            <p>
              Evidence now supports a local restriction-related event. The exact
              physical cause remains unclassified in this prototype.
            </p>
            {state.step === "recovery_monitoring" ? (
              <button className="button primary" onClick={() => dispatch({ type: "VERIFY_AND_CLOSE" })}>
                Verify outcome & close event <ClipboardCheck size={17} />
              </button>
            ) : (
              <div className="closed-governance">
                <div className="closure-statuses">
                  <span>Event · Closed · recovery verified</span>
                  <span>Inspection task · Completed</span>
                  <span>Outcome · Recovered</span>
                  <span>Label governance · Eligible for curated review</span>
                </div>
                <p><ShieldCheck size={18} /> Eligible for curated label review. No automatic rule or model update occurs.</p>
                <button className="button primary" onClick={() => navigate("/pitch/07-prototype")}>
                  Continue to what this prototype represents <ArrowRight size={17} />
                </button>
              </div>
            )}
          </section>
        )}

        <section className="review-audit">
          <div><span className="section-kicker">Traceability</span><h2>Scenario audit</h2></div>
          <AuditTimeline />
          <span className="status-code">{humanise(statuses.labelGovernanceStatus)}</span>
        </section>
      </div>
    </DemoShell>
  );
}
