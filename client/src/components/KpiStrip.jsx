import React from "react";

export default function KpiStrip({ analytics }) {
  if (!analytics) return null;

  const cells = [
    { label: "Total leads", value: analytics.total, tick: "neutral" },
    { label: "New", value: analytics.new, tick: "amber" },
    { label: "Contacted", value: analytics.contacted, tick: "blue" },
    { label: "Converted", value: analytics.converted, tick: "green" },
    { label: "Conversion rate", value: `${analytics.conversionRate}%`, tick: "neutral" },
  ];

  return (
    <div className="kpi-strip">
      {cells.map((cell) => (
        <div key={cell.label} className={`kpi-cell tick-${cell.tick}`}>
          <span className="kpi-tick" />
          <div className="kpi-label">{cell.label}</div>
          <div className="kpi-value">{cell.value}</div>
        </div>
      ))}
    </div>
  );
}
