import { Player } from "../../types/player";
import { Team } from "../../types/team";
import KpiCard from "./components/KpiCard/KpiCard";
import PlayerCard from "./components/ProfileCards/PlayerCard/PlayerCard";
import TeamCard from "./components/ProfileCards/TeamCard/TeamCard";

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
            <PlayerCard
              key={player.id}
              player={player}
              team={teams.find((team: Team) => team.id === player.team_id)}
            />
          ))}
        </div>
      </div>

      <div className="profiles-section">
        <span>Times</span>
        <div className="cards-wrapper">
          {teams.map((team: Team) => (
            <TeamCard
              key={team.id}
              team={team}
              numberOfPlayers={
                players.filter((player: Player) => player.team_id === team.id)
                  .length
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
