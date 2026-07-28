"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  ConsolePage,
  EventDetailPage,
  FieldPage,
  ReviewPage,
} from "../components/demo/DemoExperience";
import {
  ExplorePage,
  GuidedPitchPage,
} from "../components/pitch/PitchExperience";
import { DemoProvider } from "../state/DemoContext";

function RouteScrollRestoration() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

export function ClientApp() {
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <main className="boot-screen" aria-label="Loading InjectWatch">
        <span>IW</span>
        <p>Preparing the synthetic experience…</p>
      </main>
    );
  }

  return (
    <HashRouter>
      <DemoProvider>
        <RouteScrollRestoration />
        <Routes>
          <Route path="/" element={<ExplorePage />} />
          <Route path="/pitch/:chapter" element={<GuidedPitchPage />} />
          <Route path="/demo/console" element={<ConsolePage />} />
          <Route path="/demo/event/SYN-EV-1042" element={<EventDetailPage />} />
          <Route path="/demo/field" element={<FieldPage />} />
          <Route path="/demo/review" element={<ReviewPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DemoProvider>
    </HashRouter>
  );
}
