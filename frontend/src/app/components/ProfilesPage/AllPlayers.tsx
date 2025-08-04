"use client";

import React from "react";
import ProfilePage from "./ProfilePage";
import ProfilesList from "../ProfilesList/ProfilesList";
import { usePlayers } from "@/app/PlayersContext/PlayersContext";

export default function AllPlayers() {
  const { players, loading, deletePlayer, fetchTeams } = usePlayers();
  const dataToRender = players;
  return (
    <ProfilePage type="player">
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <ProfilesList
          type={"player"}
          data={dataToRender}
          deleteProfile={deletePlayer}
          fetchTeams={fetchTeams}
        />
      )}
    </ProfilePage>
  );
}
