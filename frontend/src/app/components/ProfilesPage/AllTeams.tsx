"use client";

import React, { useEffect, useState } from "react";
import ProfilePage from "./ProfilePage";
import ProfilesList from "../ProfilesList/ProfilesList";
import { useTeams } from "@/app/TeamsContext/TeamsContext";

export default function AllTeams() {
  const { teams, loading, deleteTeam } = useTeams();
  // O conteúdo ficava piscando entre o Carregando... e o <ProfilesList> mesmo depois de já ter carregado.
  // Isso corrige esse comportamento errado
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    if (!loading && !hasLoadedOnce) {
      setHasLoadedOnce(true);
    }
  }, [loading, hasLoadedOnce]);

  const dataToRender = teams;

  return (
    <ProfilePage type="team">
      {!hasLoadedOnce && loading ? (
        <div>Carregando...</div>
      ) : (
        <ProfilesList
          type="team"
          data={dataToRender}
          deleteProfile={deleteTeam}
        />
      )}
    </ProfilePage>
  );
}
