"use client";

import React from "react";
import ProfilePage from "./ProfilePage";
import ProfilesList from "../ProfilesList/ProfilesList";
import { usePlayers } from "@/app/(jogadores)/jogadores/context/PlayersProvider";

export default function PlayerPage() {
  const { players, loading } = usePlayers();
  const dataToRender = players;
  return (
    <ProfilePage type="player">
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <ProfilesList type={"player"} data={dataToRender} />
      )}
    </ProfilePage>
  );
}
