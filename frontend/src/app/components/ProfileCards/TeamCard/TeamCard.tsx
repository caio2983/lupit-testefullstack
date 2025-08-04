import React from "react";
import { Team } from "../../../../../types/team";
import Image from "next/image";

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
      <div className="profile-card-image-wrapper">
        <Image
          src={team?.image ? team.image : "/Knight.png"}
          alt="Imagem do time"
          fill
        />
      </div>
      <div className="profile-card-info">
        <p className="profile-card-label">{team?.name}</p>
        <p className="profile-card-detail">
          {numberOfPlayers} {numberOfPlayers === 1 ? "jogador" : "jogadores"}
        </p>
      </div>
    </div>
  );
}
