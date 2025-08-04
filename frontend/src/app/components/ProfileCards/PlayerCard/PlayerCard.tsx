import React from "react";
import { Player } from "../../../../../types/player";
import { Team } from "../../../../../types/team";

export default function PlayerCard({
  player,
  team,
  empty = false,
}: {
  player?: Player;
  team?: Team;
  empty?: boolean;
}) {
  if (empty) {
    return <div className="profile-card profile-card-empty" />;
  }

  return (
    <div className="profile-card">
      <div className="player-card-image-wrapper"></div>

      <div className="player-card-info">
        <div className="player-card-name">{player?.name}</div>
        <div className="player-card-age">{player?.age} anos</div>
        <div className="player-card-team-image-wrapper"></div>
      </div>
    </div>
  );
}
