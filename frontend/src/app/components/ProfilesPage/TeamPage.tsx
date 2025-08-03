"use client";

import React from "react";
import ProfilePage from "./ProfilePage";
import ProfilesList from "../ProfilesList/ProfilesList";
import { useTeams } from "@/app/TeamsContext/TeamsContext";

export default function TeamPage() {
  const { teams, loading, deleteTeam } = useTeams();

  const dataToRender = teams;
  return (
    <ProfilePage type="team">
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <ProfilesList
          type={"team"}
          data={dataToRender}
          deleteProfile={deleteTeam}
        />
      )}
    </ProfilePage>
  );
}
