"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";
import {
  demoReducer,
  type DemoAction,
  type DemoState,
  seedStateForHash,
} from "./demoReducer";

const DemoContext = createContext<
  { state: DemoState; dispatch: Dispatch<DemoAction> } | undefined
>(undefined);

export function DemoProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: DemoState;
}) {
  const [state, dispatch] = useReducer(
    demoReducer,
    initialState ?? (typeof window === "undefined" ? "" : window.location.hash),
    (value) => (typeof value === "string" ? seedStateForHash(value) : value),
  );
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used inside DemoProvider");
  return context;
}
