"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { scenarioSeries } from "../../data/syntheticScenario";

type SeriesKey =
  | "actualInjection"
  | "plannedInjection"
  | "wellheadPressure"
  | "manifoldPressure";

interface PanelProps {
  title: string;
  unit: string;
  keys: Array<{ key: SeriesKey; label: string; colour: string; dashed?: boolean }>;
  domain: [number, number];
  showXAxis?: boolean;
}

function phaseForDay(day: number) {
  if (day >= -6 && day <= -1) return "Candidate event window";
  if (day === 0) return "Inspection / approved action";
  if (day >= 1) return "Recovery verification";
  return "Synthetic baseline context";
}

function ChartTooltip({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: number;
  unit: string;
}) {
  if (!active || !payload?.length || label === undefined) return null;
  const dayLabel = label === 0 ? "D0" : label > 0 ? `D+${label}` : `D${label}`;
  return (
    <div className="chart-tooltip">
      <strong>{dayLabel}</strong>
      <span>{phaseForDay(label)}</span>
      {payload.map((item) => (
        <span key={item.name} style={{ color: item.color }}>
          {item.name}: {Number(item.value).toFixed(unit === "MPa" ? 2 : 1)} {unit}
        </span>
      ))}
    </div>
  );
}

function ChartPanel({ title, unit, keys, domain, showXAxis = false }: PanelProps) {
  return (
    <section className="chart-panel" aria-label={`${title}, ${unit}`}>
      <div className="chart-panel-heading">
        <h3>{title}</h3>
        <span>{unit}</span>
      </div>
      <div className="chart-canvas" aria-hidden="true">
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={0}
        minHeight={126}
        initialDimension={{ width: 900, height: 126 }}
      >
          <LineChart
            data={scenarioSeries}
            margin={{ top: 8, right: 14, left: -10, bottom: showXAxis ? 2 : -8 }}
          >
            <CartesianGrid stroke="#284557" strokeDasharray="2 6" vertical={false} />
            <XAxis
              dataKey="day"
              type="number"
              domain={[-20, 4]}
              ticks={[-20, -14, -6, -1, 0, 4]}
              tickFormatter={(value: number) =>
                value === 0 ? "D0" : value > 0 ? `D+${value}` : `D${value}`
              }
              hide={!showXAxis}
              stroke="#9bb0be"
              tick={{ fill: "#9bb0be", fontSize: 11 }}
            />
            <YAxis
              domain={domain}
              stroke="#9bb0be"
              tick={{ fill: "#9bb0be", fontSize: 11 }}
              width={50}
            />
            <ReferenceArea x1={-6} x2={-1} fill="#e59600" fillOpacity={0.12} />
            <ReferenceArea x1={1} x2={4} fill="#2f9552" fillOpacity={0.1} />
            <ReferenceLine
              x={0}
              stroke="#e59600"
              strokeDasharray="4 4"
              label={{ value: "D0", fill: "#e8b849", fontSize: 10, position: "insideTopRight" }}
            />
            <Tooltip content={<ChartTooltip unit={unit} />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="plainline"
              wrapperStyle={{ fontSize: 11, color: "#9bb0be", top: -31 }}
            />
            {keys.map((item) => (
              <Line
                key={item.key}
                type="monotone"
                dataKey={item.key}
                name={item.label}
                stroke={item.colour}
                strokeWidth={2}
                dot={false}
                strokeDasharray={item.dashed ? "6 4" : undefined}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export function EvidenceCharts() {
  return (
    <section className="evidence-charts" aria-labelledby="evidence-chart-title">
      <div className="section-heading-row">
        <div>
          <span className="section-kicker">Aligned evidence</span>
          <h2 id="evidence-chart-title">One relative timeline, three distinct measures</h2>
        </div>
        <div className="phase-legend" aria-label="Scenario phases">
          <span><i className="phase-candidate" />D-6 to D-1 · candidate</span>
          <span><i className="phase-action" />D0 · action</span>
          <span><i className="phase-recovery" />D+1 to D+4 · recovery</span>
        </div>
      </div>
      <div className="chart-stack">
        <ChartPanel
          title="Planned vs actual injection"
          unit="m³/d"
          domain={[65, 100]}
          keys={[
            { key: "plannedInjection", label: "Planned", colour: "#65a4e5", dashed: true },
            { key: "actualInjection", label: "Actual", colour: "#e59600" },
          ]}
        />
        <ChartPanel
          title="Wellhead pressure"
          unit="MPa"
          domain={[9.2, 10.4]}
          keys={[
            { key: "wellheadPressure", label: "Wellhead", colour: "#e59600" },
          ]}
        />
        <ChartPanel
          title="Manifold pressure"
          unit="MPa"
          domain={[8.0, 8.2]}
          showXAxis
          keys={[
            { key: "manifoldPressure", label: "Manifold", colour: "#43aaa6" },
          ]}
        />
      </div>
      <div className="sr-only">
        <table>
          <caption>Accessible synthetic scenario data from D-20 through D+4</caption>
          <thead>
            <tr>
              <th>Day</th>
              <th>Planned injection m³/d</th>
              <th>Actual injection m³/d</th>
              <th>Wellhead pressure MPa</th>
              <th>Manifold pressure MPa</th>
            </tr>
          </thead>
          <tbody>
            {scenarioSeries.map((point) => (
              <tr key={point.day}>
                <td>{point.relativeLabel}</td>
                <td>{point.plannedInjection}</td>
                <td>{point.actualInjection}</td>
                <td>{point.wellheadPressure}</td>
                <td>{point.manifoldPressure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
