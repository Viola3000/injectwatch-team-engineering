import { scenarioSeries } from "../data/syntheticScenario";
import type { ScenarioPoint } from "./types";

export const mean = (values: number[]) =>
  values.reduce((total, value) => total + value, 0) / values.length;

export const populationSD = (values: number[]) => {
  const average = mean(values);
  return Math.sqrt(mean(values.map((value) => (value - average) ** 2)));
};

export function computeScenarioMetrics(series: ScenarioPoint[]) {
  const baseline = series.filter((point) => point.day >= -20 && point.day <= -14);
  const recent = series.filter((point) => point.day >= -7 && point.day <= -1);
  const comparison = series.filter((point) => point.day >= -14 && point.day <= -1);
  const dMinus14 = series.find((point) => point.day === -14);
  const dMinus1 = series.find((point) => point.day === -1);
  const recovery = series.find((point) => point.day === 4);

  if (!dMinus14 || !dMinus1 || !recovery) {
    throw new Error("Scenario series is missing a required comparison point");
  }

  const baselineInjectionMean = mean(baseline.map((point) => point.actualInjection));
  const recentInjectionMean = mean(recent.map((point) => point.actualInjection));

  return {
    baselineInjectionMean,
    recentInjectionMean,
    injectionDeclinePct:
      ((baselineInjectionMean - recentInjectionMean) / baselineInjectionMean) * 100,
    pressureDelta14: dMinus1.wellheadPressure - dMinus14.wellheadPressure,
    manifoldPopulationSD: populationSD(
      comparison.map((point) => point.manifoldPressure),
    ),
    recoveryInjection: recovery.actualInjection,
    recoveryPressure: recovery.wellheadPressure,
    initialInjection: dMinus1.actualInjection,
    initialPressure: dMinus1.wellheadPressure,
  };
}

export const scenarioMetrics = computeScenarioMetrics(scenarioSeries);

