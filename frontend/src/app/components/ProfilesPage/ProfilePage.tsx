import { getAllPlayers, getAllTeams } from "@/app/lib/data";
import Link from "next/link";
import React from "react";
import AddButton from "../AddPlayerOrTeam/AddButton";
import ProfilesList from "../ProfilesList/ProfilesList";

export default async function ProfilePage({
  type,
}: {
  type: "player" | "team";
}) {
  const data = type === "player" ? await getAllPlayers() : await getAllTeams();

  return (
    <div className="page-wrapper jogadores-page-wrapper">
      <div className="back-button">
        <Link href="/">Voltar</Link>
      </div>

      <div className="jogadores-page-header">
        <div>{type === "player" ? "Jogadores" : "Times"}</div>
        <AddButton type={type === "player" ? "jogadores" : "times"} />
      </div>

      <ProfilesList type={type} data={data} />
    </div>
  );
}
