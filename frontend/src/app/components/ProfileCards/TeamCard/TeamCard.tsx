import React from "react";
import { Team } from "../../../../../types/team";

export default function TeamCard({
  team,
  numberOfPlayers,
  empty,
}: {
  team?: Team;
  numberOfPlayers?: number;
  empty?: boolean;
}) {
  if (empty) {
    return <div className="profile-card profile-card-empty" />;
  }

  return (
    <div className="profile-card">
      nome do time : {team?.name}
      <br />
      número de jogadores: {numberOfPlayers}
    </div>
  );
}
