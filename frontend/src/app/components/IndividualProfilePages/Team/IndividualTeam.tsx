"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import PlayerCard from "../../ProfileCards/PlayerCard/PlayerCard";
import { useTeams } from "@/app/TeamsContext/TeamsContext";
import { getAllPlayers, getTeamById } from "@/app/lib/data";
import { Player } from "../../../../../types/player";
import { Team } from "../../../../../types/team";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function IndividualTeam() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [team, setTeam] = useState<Team | null>(null);
  const [teamId, setTeamId] = useState<number>(0);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const teamId = Number(id);
    setTeamId(teamId);

    async function fetchPlayers() {
      try {
        const res = await getAllPlayers();
        setPlayers(res);
      } catch (error) {
        console.error("Erro ao buscar jogadores:", error);
      }
    }

    async function fetchTeam() {
      try {
        const res = await getTeamById(teamId);
        setTeam(res);
      } catch (error) {
        console.error("erro ao buscar o time", error);
      }
    }

    fetchPlayers();
    fetchTeam();
  }, []);

  return (
    <main className="page-container">
      <div className="back-button">
        <Link href="/times">Voltar</Link>
      </div>

      <div className="individual-team">
        <div className="individual-team-image-wrapper">
          <Image
            src={team?.image ? team.image : "/Knight.png"}
            alt="Imagem do time"
            fill
          />
        </div>
        <p>{team?.name}</p>
      </div>

      <h1 className="individual-team-list-label">Jogadores</h1>

      <div className="individual-team-players-list">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </main>
  );
}
