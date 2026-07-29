"use client";

import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Check,
  CircleCheckBig,
  Clipboard,
  Expand,
  Mail,
  Mic2,
  ShieldCheck,
  Timer,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  buildModules,
  contributorGains,
  decisionQuestions,
  deliverableOutcomes,
  industrialAiChallenges,
  laterHorizons,
  pitchChapters,
  prototypeChoices,
  researchDirections,
  roles,
  statusColumns,
  systemLoop,
} from "../../content/pitchContent";
import { scenarioMetrics } from "../../domain/metrics";
import { AssetPath } from "../common/AssetPath";
import { PrototypeLabel } from "../common/PrototypeLabel";

const EMAIL = "zyan0241@student.monash.edu";
const AUDIENCE_CONTEXT_KEY = "injectwatch:audience-context";

function OpeningChapter() {
  return (
    <div className="opening-layout">
      <div className="opening-copy">
        <span className="pitch-eyebrow">DeepNeuron Project Proposal · Semester 2</span>
        <h1 className="brand-title">Inject<span>Watch</span></h1>
        <p className="display-line">From industrial signals to field decisions.</p>
        <p className="opening-body">
          An interactive project proposal for a human-in-the-loop industrial
          monitoring system, demonstrated through a fully synthetic oilfield
          water-injection scenario.
        </p>
        <div className="badge-row">
          <span>Interactive concept prototype</span>
          <span>Synthetic scenario</span>
          <span>No live field connection</span>
        </div>
        <p className="micro-line">One story · One semester MVP · Multiple engineering roles</p>
      </div>
      <div className="signal-to-decision" aria-label="Signal to decision concept">
        <div className="signal-card">
          <span className="signal-index">01</span>
          <strong>Signal</strong>
          <small>Measured change</small>
        </div>
        <ArrowRight aria-hidden="true" />
        <div className="signal-card is-focus">
          <span className="signal-index">02</span>
          <strong>Evidence</strong>
          <small>Review + uncertainty</small>
        </div>
        <ArrowRight aria-hidden="true" />
        <div className="signal-card is-verified">
          <span className="signal-index">03</span>
          <strong>Decision</strong>
          <small>Approved + verified</small>
        </div>
      </div>
    </div>
  );
}

function WhyItMattersChapter() {
  return (
    <div className="chapter-stack">
      <header className="chapter-heading split">
        <div>
          <span className="pitch-eyebrow">Why it matters</span>
          <h1>Signals matter only when they become decisions.</h1>
        </div>
        <p>
          InjectWatch connects prioritisation, evidence, the next useful check
          and outcome verification in one traceable workflow.
        </p>
      </header>
      <div className="decision-question-grid">
        {decisionQuestions.map((block) => (
          <article className="problem-card" key={block.number}>
            <span>{block.number}</span>
            <h2>{block.title}</h2>
            <p>{block.body}</p>
          </article>
        ))}
      </div>
      <p className="chapter-conclusion">
        The valuable product is not the alert alone. It is the accountable path
        from candidate signal to verified response.
      </p>
    </div>
  );
}

function WaterInjectionChapter() {
  return (
    <div className="chapter-stack compact">
      <header className="chapter-heading split">
        <div>
          <span className="pitch-eyebrow">Our first proving ground</span>
          <h1>Oilfield water injection.</h1>
        </div>
        <p>
          It maintains reservoir pressure and supports production, while
          forcing the team to interpret plans, actual flow and pressure across
          connected assets.
        </p>
      </header>
      <div className="domain-fact-strip">
        <article><span>Purpose</span><strong>Pressure support and production</strong></article>
        <article><span>Core evidence</span><strong>Plan · actual injection · pressures</strong></article>
        <article><span>Operational challenge</span><strong>Consistent interpretation at asset scale</strong></article>
      </div>
      <AssetPath detailed />
      <div className="question-row">
        <article>
          <span>Question 01</span>
          <strong>What needs attention first?</strong>
        </article>
        <article>
          <span>Question 02</span>
          <strong>What evidence or field check would change the decision?</strong>
        </article>
      </div>
      <p className="transfer-line">
        Water injection is the first proving ground. The workflow pattern can
        later extend to pumps, pipelines, energy systems, manufacturing and
        water networks.
      </p>
    </div>
  );
}

function IndustrialAiChapter() {
  return (
    <div className="chapter-stack compact">
      <header className="chapter-heading split">
        <div>
          <span className="pitch-eyebrow">Why industrial AI is hard</span>
          <h1>Event intelligence, not isolated scores.</h1>
        </div>
        <p>
          Labels are incomplete, operating context changes and alerts compete
          for attention. The system must form meaningful events before humans
          can review them.
        </p>
      </header>
      <div className="ai-challenge-grid">
        {industrialAiChallenges.map((item) => (
          <article key={item.code}>
            <span>{item.code}</span>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
      <div className="research-direction-strip">
        <strong>Technical directions</strong>
        <div>
          {researchDirections.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
    </div>
  );
}

function SystemLoopChapter() {
  const gates = new Set([4, 6, 9]);
  return (
    <div className="chapter-stack compact">
      <header className="chapter-heading split">
        <div>
          <span className="pitch-eyebrow">The system idea</span>
          <h1>Detect → Understand → Inspect → Decide → Verify.</h1>
        </div>
        <p>
          Data evidence becomes a targeted field task, physical evidence returns
          for the next decision, and the response remains open until recovery is
          verified.
        </p>
      </header>
      <div className="loop-phase-strip" aria-label="Five phases of the InjectWatch workflow">
        <span><strong>01 · Detect</strong>Form a candidate event</span>
        <span><strong>02 · Understand</strong>Assemble evidence and uncertainty</span>
        <span><strong>03 · Inspect</strong>Collect physical field evidence</span>
        <span><strong>04 · Decide</strong>Act within authority or escalate</span>
        <span><strong>05 · Verify</strong>Close only with outcome evidence</span>
      </div>
      <div className="loop-grid">
        {systemLoop.map((step, index) => (
          <article className={gates.has(index) ? "is-gate" : ""} key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
            {gates.has(index) && <small><ShieldCheck size={14} /> Human gate</small>}
          </article>
        ))}
      </div>
      <p className="human-gate-line">
        <ShieldCheck size={18} /> Three human gates keep inspection, bounded
        action and technical closure reviewable.
      </p>
    </div>
  );
}

function ScenarioChapter() {
  return (
    <div className="scenario-handoff">
      <div className="chapter-heading">
        <span className="pitch-eyebrow">The demo hand-off</span>
        <h1>Six detections become one reviewable event.</h1>
        <p>
          Follow one branch from a data-level hypothesis to a targeted
          inspection, physical field evidence, engineering review and verified
          recovery.
        </p>
        <div className="event-formation-strip">
          <span><strong>6</strong>daily detections</span>
          <ArrowRight aria-hidden="true" />
          <span><strong>1</strong>candidate event</span>
          <ArrowRight aria-hidden="true" />
          <span><strong>#1</strong>risk queue priority</span>
        </div>
      </div>
      <div className="observation-board">
        <div className="board-label">
          <span>Synthetic observation window</span>
          <code>D-20 → D+4</code>
        </div>
        <div className="metric-chips">
          <article>
            <span>Recent injection mean</span>
            <strong>{scenarioMetrics.injectionDeclinePct.toFixed(1)}% below</strong>
            <small>synthetic baseline</small>
          </article>
          <article>
            <span>Wellhead pressure</span>
            <strong>+{scenarioMetrics.pressureDelta14.toFixed(2)} MPa</strong>
            <small>over 14 scenario days</small>
          </article>
          <article>
            <span>Manifold variation</span>
            <strong>σ ≈ {scenarioMetrics.manifoldPopulationSD.toFixed(2)} MPa</strong>
            <small>comparatively stable</small>
          </article>
        </div>
        <p>
          The interface should assemble evidence and request the next useful
          check—not manufacture certainty.
        </p>
      </div>
    </div>
  );
}

function PrototypeChapter() {
  return (
    <div className="chapter-stack compact">
      <header className="chapter-heading split">
        <div>
          <span className="pitch-eyebrow">What this prototype represents</span>
          <h1>The loop is clear. The implementation remains team-owned.</h1>
        </div>
        <p>
          The problem, end-to-end response loop and semester goal are concrete.
          The interface, workflow details and technical choices are starting
          points—not a frozen specification.
        </p>
      </header>
      <div className="prototype-choice-grid">
        {prototypeChoices.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
      <div className="status-columns">
        {statusColumns.map((column) => (
          <article key={column.label}>
            <span>{column.label}</span>
            <h2>{column.title}</h2>
            <ul>
              {column.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

function ContributionsChapter() {
  return (
    <div className="chapter-stack compact">
      <header className="chapter-heading split">
        <div>
          <span className="pitch-eyebrow">Build with us</span>
          <h1>Six contribution tracks. One shared response loop.</h1>
        </div>
        <p>
          Members can focus on the discipline that best matches their interests
          while coordinating through shared event, inspection and outcome
          contracts.
        </p>
      </header>
      <div className="role-grid">
        {roles.map(([title, body], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <p className="shared-interface-line">
        <Users aria-hidden="true" /> Parallel ownership stays integrated because
        every track changes the same candidate-to-outcome story.
      </p>
    </div>
  );
}

function ContributorGainChapter() {
  return (
    <div className="chapter-stack compact">
      <header className="chapter-heading split">
        <div>
          <span className="pitch-eyebrow">What contributors will gain</span>
          <h1>Own a visible deliverable. Learn the whole system.</h1>
        </div>
        <p>
          No oilfield experience is required. Domain onboarding and synthetic
          or explicitly sanitised data provide a safe common starting point.
        </p>
      </header>
      <div className="contributor-gain-grid">
        {contributorGains.map((item) => (
          <article key={item.code}>
            <span>{item.code}</span>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
      <div className="member-value">
        <Users aria-hidden="true" />
        <p>
          Tasks can be scoped to experience while every contributor remains
          connected to code review, testing, continuous integration and system
          integration.
        </p>
      </div>
      <p className="ai-note">
        Leave with evidence of individual ownership inside a portfolio-ready
        team artifact.
      </p>
    </div>
  );
}

function DeliverChapter() {
  return (
    <div className="chapter-stack compact">
      <header className="chapter-heading split">
        <div>
          <span className="pitch-eyebrow">What we aim to deliver</span>
          <h1>A tested, documented and deployable semester MVP.</h1>
        </div>
        <p>
          One complete synthetic fault-response loop—from candidate formation
          through inspection, authorised response and verified outcome.
        </p>
      </header>
      <div className="deliverable-grid">
        {deliverableOutcomes.map((item) => (
          <article key={item.code}>
            <CircleCheckBig size={20} />
            <span>{item.code}</span>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
      <div className="later-horizon-strip">
        <strong>Longer horizon</strong>
        <div>{laterHorizons.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
      <div className="final-invitation">
        <p>
          Water injection is our first proving ground. If this combination of
          AI, engineering and real-world decision-making interests you, help us
          build InjectWatch.
        </p>
        <a className="button primary" href={`mailto:${EMAIL}`}>
          <Mail size={17} /> Join the team
        </a>
      </div>
    </div>
  );
}

function JoinChapter() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="join-layout">
      <span className="pitch-eyebrow">The invitation</span>
      <h1>Help us build the loop.</h1>
      <p className="join-copy">
        One candidate event. One reviewable evidence chain. One verified
        outcome. A system the whole team can point to at the end of the semester.
      </p>
      <div className="join-actions">
        <a className="button primary" href={`mailto:${EMAIL}`}>
          <Mail size={18} /> Join InjectWatch
        </a>
        <button className="button secondary" onClick={copyEmail}>
          {copied ? <Check size={18} /> : <Clipboard size={18} />}
          {copied ? "Email copied" : "Copy email"}
        </button>
      </div>
      <p className="contact-line">Ziyao Yang (Lily) · {EMAIL}</p>
      <div className="closing-manifesto">
        <span>Detect responsibly</span>
        <span>Explain clearly</span>
        <span>Close the loop</span>
      </div>
    </div>
  );
}

function ChapterBody({ id }: { id: string }) {
  if (id === "opening") return <OpeningChapter />;
  if (id === "why-it-matters") return <WhyItMattersChapter />;
  if (id === "water-injection") return <WaterInjectionChapter />;
  if (id === "industrial-ai") return <IndustrialAiChapter />;
  if (id === "system-loop") return <SystemLoopChapter />;
  if (id === "scenario") return <ScenarioChapter />;
  if (id === "prototype") return <PrototypeChapter />;
  if (id === "contributions") return <ContributionsChapter />;
  if (id === "contributor-gain") return <ContributorGainChapter />;
  return <DeliverChapter />;
}

export function GuidedPitchPage() {
  const { chapter } = useParams();
  const navigate = useNavigate();
  const [showSupplement, setShowSupplement] = useState(
    () => typeof window !== "undefined"
      && window.sessionStorage.getItem(AUDIENCE_CONTEXT_KEY) === "open",
  );
  const chapterAliases: Record<string, string> = {
    "04-system-loop": "05-system-loop",
    "05-scenario": "06-scenario",
    "06-build": "10-deliver",
    "07-roles": "08-contributions",
    "08-join": "10-deliver",
  };
  const canonicalChapter = chapterAliases[chapter ?? ""] ?? chapter;
  const currentIndex = useMemo(
    () => Math.max(0, pitchChapters.findIndex((item) => item.route.endsWith(canonicalChapter ?? ""))),
    [canonicalChapter],
  );
  const current = pitchChapters[currentIndex] ?? pitchChapters[0];
  const previous = pitchChapters[currentIndex - 1];
  const next =
    current.id === "scenario"
      ? "/demo/console"
      : pitchChapters[currentIndex + 1]?.route ?? "/";

  useEffect(() => {
    window.sessionStorage.setItem(
      AUDIENCE_CONTEXT_KEY,
      showSupplement ? "open" : "closed",
    );
  }, [showSupplement]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "p") {
        setShowSupplement((value) => !value);
        return;
      }
      if (event.key === "Escape") {
        navigate("/");
        return;
      }
      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        navigate(next, {
          state: current.id === "scenario" ? { pitchMode: true } : undefined,
        });
      }
      if (["ArrowLeft", "PageUp"].includes(event.key) && previous) {
        event.preventDefault();
        navigate(previous.route);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current.id, navigate, next, previous]);

  const requestFullscreen = async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  };

  return (
    <main className={`guided-page ${showSupplement ? "has-supplement" : ""}`}>
      <header className="guided-topbar">
        <Link to="/" className="wordmark">INJECT<span>WATCH</span></Link>
        <div className="guided-meta">
          <span className="guided-speaker"><Mic2 size={14} /> {current.speaker}</span>
          <span className="guided-timing"><Timer size={14} /> {current.timeRange} · {current.targetDuration}</span>
          <button
            className="supplement-toggle"
            aria-controls="audience-context-panel"
            aria-expanded={showSupplement}
            aria-pressed={showSupplement}
            onClick={() => setShowSupplement((value) => !value)}
          >
            <BookOpenText size={14} /> P · Context {showSupplement ? "on" : "off"}
          </button>
          <button aria-label="Toggle full screen" onClick={requestFullscreen}>
            <Expand size={16} />
          </button>
        </div>
      </header>

      <section className={`guided-canvas chapter-${current.id}`}>
        <ChapterBody id={current.id} />
      </section>

      {showSupplement && (
        <aside
          id="audience-context-panel"
          className="supplement-panel"
          aria-label="Optional audience context"
          aria-live="polite"
        >
          <span>Audience context · optional reading</span>
          <h2>{current.supplementTitle}</h2>
          <p>{current.supplementIntro}</p>
          <ul>
            {current.supplementPoints.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </aside>
      )}

      <footer className="guided-footer">
        <button
          className="pitch-nav-button"
          disabled={!previous}
          onClick={() => previous && navigate(previous.route)}
        >
          <ArrowLeft size={18} /> Back
        </button>
        <nav className="chapter-progress" aria-label="Pitch chapter progress">
          {pitchChapters.map((item) => (
            <Link
              key={item.id}
              to={item.route}
              aria-current={item.id === current.id ? "step" : undefined}
              aria-label={`Chapter ${item.index}: ${item.title}`}
            >
              <span>{item.index}</span>
            </Link>
          ))}
        </nav>
        <button
          className="pitch-nav-button is-next"
          onClick={() =>
            navigate(next, {
              state: current.id === "scenario" ? { pitchMode: true } : undefined,
            })
          }
        >
          {current.id === "scenario"
            ? "Enter synthetic console"
            : current.id === "deliver"
              ? "Explore project"
              : "Next"}
          <ArrowRight size={18} />
        </button>
      </footer>
    </main>
  );
}

export function ExplorePage() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: "start" });
    }
  }, [location.hash]);

  return (
    <main className="explore-page">
      <nav className="explore-nav" aria-label="Explore navigation">
        <Link to="/" className="wordmark">INJECT<span>WATCH</span></Link>
        <div>
          <a href="#overview">Overview</a>
          <a href="#why-ai">Why AI is hard</a>
          <a href="#how-it-works">How it works</a>
          <a href="#demo">Demo</a>
          <a href="#build">Build with us</a>
          <a href="#join">Join</a>
        </div>
        <Link className="button small" to="/pitch/01-opening">Guided pitch</Link>
      </nav>
      <section id="overview" className="explore-hero">
        <PrototypeLabel />
        <div className="explore-hero-grid">
          <div>
            <span className="pitch-eyebrow">DeepNeuron Project Proposal · Semester 2</span>
            <h1>From industrial signals to <em>field decisions.</em></h1>
            <p>
              InjectWatch is a student engineering proposal for the missing
              workflow between candidate detection and verified outcome.
            </p>
            <div className="hero-actions">
              <Link className="button primary" to="/pitch/01-opening">
                Start guided pitch <ArrowRight size={18} />
              </Link>
              <a className="button secondary" href="#demo">Explore the project</a>
            </div>
          </div>
          <div className="hero-loop-visual" aria-label="Candidate response loop">
            <div><span>01</span>Detect candidate</div>
            <div><span>02</span>Review evidence</div>
            <div><span>03</span>Approve inspection</div>
            <div><span>04</span>Verify recovery</div>
            <strong>ONE<br />COMPLETE<br />LOOP</strong>
          </div>
        </div>
      </section>

      <section id="why-ai" className="explore-section">
        <div className="explore-section-heading">
          <span>01 · Why industrial AI is hard</span>
          <h2>Event intelligence must connect scores, context and outcomes.</h2>
          <p>
            Incomplete labels, multivariate asset context, operating change and
            limited human attention make industrial monitoring a workflow and
            evaluation problem—not only a detection problem.
          </p>
        </div>
        <div className="ai-challenge-grid is-explore">
          {industrialAiChallenges.map((item) => (
            <article key={item.code}>
              <span>{item.code}</span><h3>{item.title}</h3><p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="explore-section">
        <div className="explore-section-heading">
          <span>02 · How it works</span>
          <h2>Build the decision loop, not just the model.</h2>
          <p>Candidate evidence stays provisional until humans inspect, review, authorise, and verify.</p>
        </div>
        <div className="loop-grid explore-loop">
          {systemLoop.map((step, index) => (
            <article key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong>
            </article>
          ))}
        </div>
      </section>

      <section id="demo" className="explore-section demo-invite">
        <div>
          <span className="pitch-eyebrow">03 · Synthetic product simulation</span>
          <h2>Follow SYN-EV-1042 from queue to verified closure.</h2>
          <p>
            Review separated metrics, approve an inspection, record field
            observations, authorise an abstracted action, and verify recovery.
          </p>
          <Link className="button primary" to="/demo/console">
            Launch synthetic console <ArrowRight size={18} />
          </Link>
        </div>
        <div className="demo-terminal-card">
          <div><span /> <span /> <span /></div>
          <code>candidate_event / SYN-EV-1042</code>
          <strong>Possible local flow restriction</strong>
          <dl>
            <div><dt>Anomaly magnitude</dt><dd>{scenarioMetrics.injectionDeclinePct.toFixed(1)}% decline</dd></div>
            <div><dt>Inspection priority</dt><dd>High · Rank 1</dd></div>
            <div><dt>Evidence status</dt><dd>Partial · 3 supported / 2 unknown</dd></div>
          </dl>
        </div>
      </section>

      <section id="build" className="explore-section">
        <div className="explore-section-heading">
          <span>04 · Build with us</span>
          <h2>One semester MVP. Multiple ways to own it.</h2>
        </div>
        <div className="build-explore-grid">
          {buildModules.map((module) => (
            <article key={module.code}>
              <span>{module.code}</span><h3>{module.title}</h3><p>{module.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="join" className="explore-join">
        <JoinChapter />
      </section>
    </main>
  );
}
