import Link from "next/link";
import { Player } from "../../../types/player";
import { Team, TeamWithPlayerCount } from "../../../types/team";
import KpiCard from "../components/KpiCard/KpiCard";
import PlayerCard from "../components/ProfileCards/PlayerCard/PlayerCard";
import TeamCard from "../components/ProfileCards/TeamCard/TeamCard";
import { getAllPlayers, getAllTeams } from "../lib/data";

export default async function Home() {
  const players = await getAllPlayers();
  const teams = await getAllTeams();

  const calculateAverageAge = (players: Player[]) => {
    if (players.length === 0) return 0;
    const totalAge = players.reduce((sum, player) => sum + player.age, 0);
    return Math.round(totalAge / players.length);
  };

  return (
    <div className="page-wrapper">
      <div className="cards-wrapper">
        <KpiCard
          text={teams.length === 1 ? "Time" : "Times"}
          number={teams.length}
        />
        <KpiCard
          text={players.length === 1 ? "Jogador" : "Jogadores"}
          number={players.length}
        />
        <KpiCard
          text={"Idade média dos jogadores"}
          number={calculateAverageAge(players)}
        />
      </div>

      <div className="profiles-section">
        <div className="home-section-labels">
          <span className="home-item">Jogadores</span>
          <span className="see-more">
            <Link href={"/jogadores"}>Ver Mais</Link>
          </span>
        </div>

        <div className="cards-wrapper">
          {players.length === 0 ? (
            <PlayerCard empty />
          ) : (
            players.map((player: Player) => (
              <PlayerCard
                key={player.id}
                player={player}
                team={teams.find((team: Team) => team.id === player.team_id)}
              />
            ))
          )}
        </div>
      </div>

      <div className="profiles-section">
        <div className="home-section-labels">
          <span className="home-item">Times</span>
          <span className="see-more">
            <Link href={"/times"}>Ver Mais</Link>
          </span>
        </div>

        <div className="cards-wrapper">
          {teams.length === 0 ? (
            <TeamCard empty />
          ) : (
            teams.map((team: TeamWithPlayerCount) => (
              <TeamCard
                key={team.id}
                team={team}
                numberOfPlayers={team.numberOfPlayers}
              />
            ))
          )}
        </div>
      </div>

      <div className="chart-section">
        <div className="home-item">Jogadores por time</div>
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
                    players.filter((p: Player) => p.team_id === team.id)
                      .length /
                    Math.max(
                      ...teams.map(
                        (t: Team) =>
                          players.filter((p: Player) => p.team_id === t.id)
                            .length
                      )
                    ) /
                    2
                  }%`,
                  maxHeight: "100%",
                }}
              >
                <span className="chart-team-name">{team.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="quantidade-de-jogadores">
          <span></span>
          <span>Quantidade de jogadores</span>
        </div>
      </div>
    </div>
  );
}
