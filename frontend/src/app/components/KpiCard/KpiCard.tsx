import React from "react";

export default function KpiCard({
  text,
  number,
}: {
  text: string;
  number?: number;
}) {
  return (
    <div className="kpi-card">
      {number !== undefined && <span className="kpi-number">{number}</span>}
      <span className="kpi-text">{text}</span>
    </div>
  );
}
