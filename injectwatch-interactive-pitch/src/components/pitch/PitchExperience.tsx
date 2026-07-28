"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clipboard,
  Expand,
  Mail,
  ShieldCheck,
  Timer,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  buildModules,
  pitchChapters,
  problemBlocks,
  roles,
  statusColumns,
  systemLoop,
} from "../../content/pitchContent";
import { scenarioMetrics } from "../../domain/metrics";
import { AssetPath } from "../common/AssetPath";
import { PrototypeLabel } from "../common/PrototypeLabel";

const EMAIL = "zyan0241@student.monash.edu";

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

function DecisionGapChapter() {
  return (
    <div className="chapter-stack">
      <header className="chapter-heading">
        <span className="pitch-eyebrow">The problem</span>
        <h1>Industrial monitoring has a decision gap.</h1>
        <p>
          Measurements are only useful when a team can turn them into a
          reviewable, prioritised, and traceable decision.
        </p>
      </header>
      <div className="problem-grid">
        {problemBlocks.map((block) => (
          <article className="problem-card" key={block.number}>
            <span>{block.number}</span>
            <h2>{block.title}</h2>
            <p>{block.body}</p>
          </article>
        ))}
      </div>
      <p className="chapter-conclusion">
        The valuable product is the loop between detection and verified action.
      </p>
    </div>
  );
}

function WaterInjectionChapter() {
  return (
    <div className="chapter-stack compact">
      <header className="chapter-heading split">
        <div>
          <span className="pitch-eyebrow">A concrete starting case</span>
          <h1>Start concrete: oilfield water injection.</h1>
        </div>
        <p>
          The operating path creates useful context, but no single signal is a
          complete diagnosis.
        </p>
      </header>
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
        The same architecture can extend to pumps, pipelines, water networks,
        and other industrial assets.
      </p>
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
          <h1>Build the decision loop, not just the model.</h1>
        </div>
        <p>Human approval gates make the evidence chain reviewable.</p>
      </header>
      <div className="loop-grid">
        {systemLoop.map((step, index) => (
          <article className={gates.has(index) ? "is-gate" : ""} key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
            {gates.has(index) && <small><ShieldCheck size={14} /> Human gate</small>}
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

function ScenarioChapter() {
  return (
    <div className="scenario-handoff">
      <div className="chapter-heading">
        <span className="pitch-eyebrow">The demo hand-off</span>
        <h1>One quiet pattern. One complete response loop.</h1>
        <p>
          Actual injection declines gradually while the plan remains stable.
          Wellhead pressure rises, but manifold pressure remains comparatively
          stable. There is no single catastrophic day and no confirmed root cause.
        </p>
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

function BuildChapter() {
  return (
    <div className="chapter-stack compact">
      <header className="chapter-heading split">
        <div>
          <span className="pitch-eyebrow">Semester acceptance line</span>
          <h1>This semester, we build one complete loop.</h1>
        </div>
        <p>One complete, testable fault-response loop using synthetic data.</p>
      </header>
      <div className="module-map">
        <div className="module-centre">
          <span>Semester 2</span>
          <strong>One complete loop</strong>
        </div>
        {buildModules.map((module) => (
          <article key={module.code}>
            <span>{module.code}</span>
            <h2>{module.title}</h2>
            <p>{module.body}</p>
          </article>
        ))}
      </div>
      <div className="semester-line" aria-label="Three phase semester plan">
        <span>Contract and scenario</span><ArrowRight /><span>Build the loop</span>
        <ArrowRight /><span>Integrate, test, and demonstrate</span>
      </div>
    </div>
  );
}

function RolesChapter() {
  return (
    <div className="chapter-stack compact">
      <header className="chapter-heading split">
        <div>
          <span className="pitch-eyebrow">Build with us</span>
          <h1>Bring your discipline. Learn the whole system.</h1>
        </div>
        <p>No oilfield experience needed. Tasks can be scoped to experience.</p>
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
      <div className="member-value">
        <Users aria-hidden="true" />
        <p>
          Work on a real industrial problem structure without sensitive data ·
          practise contracts, review, CI, and testing · leave with a portfolio-ready team artifact.
        </p>
      </div>
      <p className="ai-note">
        AI-assisted development is welcome. Architecture, tests, review, and
        technical ownership remain human responsibilities.
      </p>
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
  if (id === "decision-gap") return <DecisionGapChapter />;
  if (id === "water-injection") return <WaterInjectionChapter />;
  if (id === "system-loop") return <SystemLoopChapter />;
  if (id === "scenario") return <ScenarioChapter />;
  if (id === "build") return <BuildChapter />;
  if (id === "roles") return <RolesChapter />;
  return <JoinChapter />;
}

export function GuidedPitchPage() {
  const { chapter } = useParams();
  const navigate = useNavigate();
  const [showCue, setShowCue] = useState(false);
  const currentIndex = useMemo(
    () => Math.max(0, pitchChapters.findIndex((item) => item.route.endsWith(chapter ?? ""))),
    [chapter],
  );
  const current = pitchChapters[currentIndex] ?? pitchChapters[0];
  const previous = pitchChapters[currentIndex - 1];
  const next =
    current.id === "scenario"
      ? "/demo/console"
      : pitchChapters[currentIndex + 1]?.route ?? "/";

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "p") {
        setShowCue((value) => !value);
        return;
      }
      if (event.key === "Escape") {
        navigate("/");
        return;
      }
      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        navigate(next);
      }
      if (["ArrowLeft", "PageUp"].includes(event.key) && previous) {
        event.preventDefault();
        navigate(previous.route);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate, next, previous]);

  const requestFullscreen = async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  };

  return (
    <main className="guided-page">
      <header className="guided-topbar">
        <Link to="/" className="wordmark">INJECT<span>WATCH</span></Link>
        <div className="guided-meta">
          <span><Timer size={14} /> {current.targetDuration}</span>
          <button aria-pressed={showCue} onClick={() => setShowCue((value) => !value)}>
            P · Cues {showCue ? "on" : "off"}
          </button>
          <button aria-label="Toggle full screen" onClick={requestFullscreen}>
            <Expand size={16} />
          </button>
        </div>
      </header>

      <section className={`guided-canvas chapter-${current.id}`}>
        <ChapterBody id={current.id} />
      </section>

      {showCue && (
        <aside className="presenter-cue" aria-live="polite">
          <span>Presenter cue · {current.targetDuration}</span>
          <p>{current.presenterCue}</p>
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
        <button className="pitch-nav-button is-next" onClick={() => navigate(next)}>
          {current.id === "scenario"
            ? "Enter synthetic console"
            : current.id === "join"
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

      <section id="how-it-works" className="explore-section">
        <div className="explore-section-heading">
          <span>01 · How it works</span>
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
          <span className="pitch-eyebrow">02 · Synthetic product simulation</span>
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
          <span>03 · Build with us</span>
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

