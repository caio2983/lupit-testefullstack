import React from "react";
import { Player } from "../../../../../types/player";
import { Team } from "../../../../../types/team";
import Image from "next/image";

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
      <div className="profile-card-image-wrapper">
        <Image
          src={player?.image ? player.image : "/Knight.png"}
          alt="Imagem do jogador"
          fill
        ></Image>
      </div>

      <div className="profile-card-info">
        <div className="profile-card-label">{player?.name}</div>
        <div className="profile-card-detail">{player?.age} anos</div>
        <div className="player-card-team-image-wrapper">
          <Image
            src={team?.image ? team.image : "/Knight.png"}
            alt="Imagem do jogador"
            fill
          ></Image>
        </div>
      </div>
    </div>
  );
}
