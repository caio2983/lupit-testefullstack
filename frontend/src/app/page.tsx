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

      <div className="chart-section">
        <div className="jogadores-por-time">Jogadores por time</div>
        <div className="chart">
          <div className="chart-legend">
            <span className="scale-and-line">
              <span className="scale">200</span>
              <span className="line"></span>
              <span className="scale line-end">{""}</span>
            </span>
            <span className="scale-and-line">
              <span className="scale">150</span>
              <span className="line"></span>
              <span className="scale line-end">{""}</span>
            </span>
            <span className="scale-and-line">
              <span className="scale">100</span>
              <span className="line"></span>
              <span className="scale line-end">{""}</span>
            </span>
            <span className="scale-and-line">
              <span className="scale">50</span>
              <span className="line"></span>
              <span className="scale line-end">{""}</span>
            </span>
            <span className="scale">0</span>
          </div>
          <div className="bars-wrapper">
            {teams.map((team: Team) => (
              <div
                className="column"
                key={team.id}
                style={{
                  height: `${
                    (players.filter((p: Player) => p.team_id === team.id)
                      .length /
                      Math.max(
                        ...teams.map(
                          (t: Team) =>
                            players.filter((p: Player) => p.team_id === t.id)
                              .length
                        )
                      )) *
                      100 -
                    20
                  }%`,
                }}
              >
                {
                  players.filter((player: Player) => player.team_id === team.id)
                    .length
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
