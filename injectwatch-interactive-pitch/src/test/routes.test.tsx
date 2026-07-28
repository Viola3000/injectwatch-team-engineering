import { cloneElement, type ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import {
  EventDetailPage,
  FieldPage,
  ReviewPage,
} from "../components/demo/DemoExperience";
import {
  ExplorePage,
  GuidedPitchPage,
} from "../components/pitch/PitchExperience";
import { guidedFeedback, type DemoState } from "../state/demoReducer";
import { DemoProvider } from "../state/DemoContext";

vi.mock("recharts", async () => {
  const actual = await vi.importActual<typeof import("recharts")>("recharts");
  return {
    ...actual,
    ResponsiveContainer: ({
      children,
    }: {
      children: ReactElement<{ width?: number; height?: number }>;
    }) =>
      cloneElement(children, { width: 900, height: 160 }),
  };
});

function renderRoute(
  route: string,
  element: React.ReactNode,
  initialState?: DemoState,
) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <DemoProvider initialState={initialState}>
        <Routes>
          <Route path="/pitch/:chapter" element={element} />
          <Route path="/demo/event/SYN-EV-1042" element={element} />
          <Route path="/demo/field" element={element} />
          <Route path="/demo/review" element={element} />
          <Route path="/" element={element} />
        </Routes>
      </DemoProvider>
    </MemoryRouter>,
  );
}

describe("stable routes and critical wording", () => {
  it("renders the guided opening", () => {
    renderRoute(
      "/pitch/01-opening",
      <GuidedPitchPage />,
      { step: "queue", feedback: null, technicalReview: null },
    );
    expect(
      screen.getByRole("heading", { name: "InjectWatch" }),
    ).toBeInTheDocument();
    expect(screen.getByText("From industrial signals to field decisions.")).toBeInTheDocument();
  });

  it("shows industrial AI challenges and optional audience context", () => {
    renderRoute(
      "/pitch/04-industrial-ai",
      <GuidedPitchPage />,
      { step: "queue", feedback: null, technicalReview: null },
    );
    expect(
      screen.getByRole("heading", { name: "Event intelligence, not isolated scores." }),
    ).toBeInTheDocument();
    expect(screen.getByText("Incomplete expert labels")).toBeInTheDocument();
    expect(screen.queryByLabelText("Optional audience context")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /P · Context off/ }));

    expect(screen.getByLabelText("Optional audience context")).toBeInTheDocument();
    expect(screen.getByText("Research directions behind the workflow")).toBeInTheDocument();
  });

  it("remembers audience context across guided-page remounts", () => {
    const firstView = renderRoute(
      "/pitch/02-decision-gap",
      <GuidedPitchPage />,
      { step: "queue", feedback: null, technicalReview: null },
    );
    fireEvent.click(screen.getByRole("button", { name: /P · Context off/ }));
    firstView.unmount();

    renderRoute(
      "/pitch/07-prototype",
      <GuidedPitchPage />,
      { step: "queue", feedback: null, technicalReview: null },
    );

    expect(screen.getByLabelText("Optional audience context")).toBeInTheDocument();
    expect(screen.getByText("What is fixed—and what is deliberately open")).toBeInTheDocument();
  });

  it("shows the three-speaker ownership sequence", () => {
    renderRoute(
      "/pitch/08-contributions",
      <GuidedPitchPage />,
      { step: "queue", feedback: null, technicalReview: null },
    );
    expect(screen.getByText("Toby")).toBeInTheDocument();
    expect(screen.getByText("Machine Learning & Evaluation")).toBeInTheDocument();
  });

  it("renders the strengthened semester deliverable", () => {
    renderRoute(
      "/pitch/10-deliver",
      <GuidedPitchPage />,
      { step: "queue", feedback: null, technicalReview: null },
    );
    expect(
      screen.getByRole("heading", {
        name: "A tested, documented and deployable semester MVP.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Temporal / graph research")).toBeInTheDocument();
  });

  it("renders direct event evidence and inspection wording", () => {
    renderRoute(
      "/demo/event/SYN-EV-1042",
      <EventDetailPage />,
      { step: "evidence_review", feedback: null, technicalReview: null },
    );
    expect(screen.getByText("Supports the candidate")).toBeInTheDocument();
    expect(screen.getByText("Weakens an alternative")).toBeInTheDocument();
    expect(screen.getByText("Unknown / needs checking")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Approve inspection task" })).toBeInTheDocument();
  });

  it("labels the direct field route as an independent replay", () => {
    renderRoute(
      "/demo/field",
      <FieldPage />,
      { step: "inspection_assigned", feedback: null, technicalReview: null },
    );
    expect(screen.getByText("Standalone synthetic replay")).toBeInTheDocument();
    expect(screen.getByText(/not synchronised with another device/)).toBeInTheDocument();
  });

  it("shows the closure governance boundary", () => {
    renderRoute(
      "/demo/review",
      <ReviewPage />,
      {
        step: "closed_verified",
        feedback: guidedFeedback,
        technicalReview: {
          candidateEventId: "SYN-EV-1042",
          decision: "authorise_bounded_action",
          conclusion: "Synthetic conclusion",
        },
      },
    );
    expect(
      screen.getByText(
        "Eligible for curated label review. No automatic rule or model update occurs.",
      ),
    ).toBeInTheDocument();
  });

  it("renders the email CTA", () => {
    renderRoute(
      "/",
      <ExplorePage />,
      { step: "queue", feedback: null, technicalReview: null },
    );
    expect(screen.getByRole("link", { name: "Join InjectWatch" })).toHaveAttribute(
      "href",
      "mailto:zyan0241@student.monash.edu",
    );
  });
});
