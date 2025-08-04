"use client";

import React, { useEffect, useState } from "react";
import ProfilePage from "./ProfilePage";
import ProfilesList from "../ProfilesList/ProfilesList";
import { usePlayers } from "@/app/PlayersContext/PlayersContext";

export default function AllPlayers() {
  const { players, loading, deletePlayer, fetchTeams } = usePlayers();
  const dataToRender = players;

  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  // O conteúdo ficava piscando entre o Carregando... e o <ProfilesList> mesmo depois de já ter carregado.
  // Isso corrige esse comportamento errado
  useEffect(() => {
    if (!loading && !hasLoadedOnce) {
      setHasLoadedOnce(true);
    }
  }, [loading, hasLoadedOnce]);

  return (
    <ProfilePage type="player">
      {!hasLoadedOnce && loading ? (
        <div>Carregando...</div>
      ) : (
        <ProfilesList
          type="player"
          data={dataToRender}
          deleteProfile={deletePlayer}
          fetchTeams={fetchTeams}
        />
      )}
    </ProfilePage>
  );
}
