import KpiCard from "./components/KpiCard/KpiCard";
import ProfileCard from "./components/ProfileCard/ProfileCard";

export default function Home() {
  return (
    <div className="home-container">
      <div className="cards-wrapper">
        <KpiCard />
        <KpiCard />
        <KpiCard />
      </div>

      <div className="profiles-section">
        <span>Jogadores</span>
        <div className="cards-wrapper">
          <ProfileCard type="player" />
          <ProfileCard type="player" />
          <ProfileCard type="player" />
          <ProfileCard type="player" />
          <ProfileCard type="player" />
          <ProfileCard type="player" />
          <ProfileCard type="player" />
          <ProfileCard type="player" />
          <ProfileCard type="player" />
        </div>
      </div>

      <div className="profiles-section">
        <span>Times</span>
        <div className="cards-wrapper">
          <ProfileCard type="team" />
          <ProfileCard type="team" />
          <ProfileCard type="team" />
          <ProfileCard type="team" />
          <ProfileCard type="team" />
          <ProfileCard type="team" />
          <ProfileCard type="team" />
          <ProfileCard type="team" />
          <ProfileCard type="team" />
        </div>
      </div>
    </div>
  );
}
