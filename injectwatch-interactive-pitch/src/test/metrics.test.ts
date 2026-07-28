import { describe, expect, it } from "vitest";
import { scenarioSeries } from "../data/syntheticScenario";
import { computeScenarioMetrics } from "../domain/metrics";

describe("synthetic scenario metrics", () => {
  const metrics = computeScenarioMetrics(scenarioSeries);

  it("computes the baseline and recent injection means", () => {
    expect(metrics.baselineInjectionMean).toBe(95);
    expect(metrics.recentInjectionMean).toBe(77.25);
  });

  it("computes the candidate-window comparisons", () => {
    expect(Number(metrics.injectionDeclinePct.toFixed(1))).toBe(18.7);
    expect(Number(metrics.pressureDelta14.toFixed(2))).toBe(0.8);
    expect(Number(metrics.manifoldPopulationSD.toFixed(2))).toBe(0.02);
  });

  it("derives recovery endpoints from D+4", () => {
    expect(metrics.recoveryInjection).toBe(94);
    expect(metrics.recoveryPressure).toBe(9.48);
  });
});

