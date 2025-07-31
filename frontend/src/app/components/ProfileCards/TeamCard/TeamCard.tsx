import React from "react";
import { Team } from "../../../../../types/team";

export default function TeamCard({
  team,
  numberOfPlayers,
}: {
  team?: Team;
  numberOfPlayers?: number;
}) {
  return (
    <div className="profile-card">
      nome do time : {team?.name}
      <br />
      número de jogadores: {numberOfPlayers}
    </div>
  );
}
