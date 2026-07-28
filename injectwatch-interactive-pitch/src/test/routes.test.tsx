import { cloneElement, type ReactElement } from "react";
import { render, screen } from "@testing-library/react";
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
