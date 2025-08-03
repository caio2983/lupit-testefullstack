import Link from "next/link";
import React from "react";
import PlayerCard from "../../ProfileCards/PlayerCard/PlayerCard";
import { useTeams } from "@/app/(times)/times/context/TeamsContext";

export default function IndividualTeam() {
  return (
    <main className="page-container">
      <div className="back-button">
        <Link href="/times">Voltar</Link>
      </div>

      <div className="individual-team">
        <div className="individual-team-image-wrapper"></div>
        <p>Nome do time</p>
      </div>

      <h1 className="individual-team-list-label">Jogadores</h1>

      <div className="individual-team-players-list">
        <PlayerCard></PlayerCard>
        <PlayerCard></PlayerCard>
        <PlayerCard></PlayerCard>
        <PlayerCard></PlayerCard>
        <PlayerCard></PlayerCard>
        <PlayerCard></PlayerCard>
        <PlayerCard></PlayerCard>
        <PlayerCard></PlayerCard>
        <PlayerCard></PlayerCard>
      </div>
    </main>
  );
}
