import KpiCard from "./components/KpiCard/KpiCard";

export default function Home() {
  return (
    <div className="home-container">
      <div className="kpis-wrapper">
        <KpiCard />
        <KpiCard />
        <KpiCard />
      </div>
    </div>
  );
}
