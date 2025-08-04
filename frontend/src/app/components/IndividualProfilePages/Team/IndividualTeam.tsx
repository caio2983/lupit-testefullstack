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

  const { teams } = useTeams();

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const numericId = Number(id);

    async function fetchPlayers() {
      try {
        const res = await getAllPlayers("http://localhost:3001");
        const filteredPlayers = res.filter(
          (player: Player) => player.team_id === numericId
        );
        setPlayers(filteredPlayers);
      } catch (error) {
        console.error("Erro ao buscar jogadores:", error);
      }
    }

    const selectedTeam = teams.find((team: Team) => team.id === numericId);
    if (selectedTeam) {
      setTeam(selectedTeam);
    } else {
      console.warn("Nenhum time encontrado com id:", numericId);
    }

    fetchPlayers();
  }, [id, teams]);

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
