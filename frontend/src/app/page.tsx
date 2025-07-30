import { Player } from "../../types/player";
import KpiCard from "./components/KpiCard/KpiCard";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import { getAllPlayersAndTeams } from "./lib/data";

export default async function Home() {
  const { players, teams } = await getAllPlayersAndTeams();

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
          {players.map((player: Player) => (
            <ProfileCard key={player.id} entity={player} type="player" />
          ))}
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
