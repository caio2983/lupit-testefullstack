import React from "react";
import { Player } from "../../../../types/player";
import { Team } from "../../../../types/team";

export default function PlayerCard({
  player,
  team,
}: {
  player?: Player;
  team?: Team;
}) {
  return (
    <div className="profile-card">
      {player?.name}
      time: {team?.name}
    </div>
  );
}
