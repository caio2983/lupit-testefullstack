"use client";

import Link from "next/link";
import React from "react";
import AddButton from "../AddPlayerOrTeam/AddButton";

export default function ProfilePage({
  type,
  children,
}: {
  type: "player" | "team";
  children: React.ReactNode;
}) {
  return (
    <div className="page-wrapper jogadores-page-wrapper">
      <div className="back-button">
        <Link href="/">Voltar</Link>
      </div>

      <div className="jogadores-page-header">
        <div>{type === "player" ? "Jogadores" : "Times"}</div>
        <AddButton type={type} />
      </div>

      {children}
    </div>
  );
}
