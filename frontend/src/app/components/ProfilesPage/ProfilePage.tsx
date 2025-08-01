"use client";

import Link from "next/link";
import React from "react";
import AddButton from "../AddPlayerOrTeam/AddButton";
import ProfilesList from "../ProfilesList/ProfilesList";
import { useTeams } from "@/app/(times)/times/context/TeamsContext";

export default function ProfilePage({ type }: { type: "player" | "team" }) {
  const { teams, loading } = useTeams();

  const dataToRender = type === "team" ? teams : [];

  return (
    <div className="page-wrapper jogadores-page-wrapper">
      <div className="back-button">
        <Link href="/">Voltar</Link>
      </div>

      <div className="jogadores-page-header">
        <div>{type === "player" ? "Jogadores" : "Times"}</div>
        <AddButton type={type} />
      </div>

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <ProfilesList type={type} data={dataToRender} />
      )}
    </div>
  );
}
