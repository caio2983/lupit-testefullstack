"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Team, TeamWithPlayerCount } from "../../../types/team";
import {
  deleteTeamById,
  editTeam,
  getAllTeams,
  getTeamById,
} from "@/app/lib/data";

interface TeamsContextType {
  teams: TeamWithPlayerCount[];
  loading: boolean;
  fetchTeams: () => Promise<void>;
  deleteTeam: (id: number) => Promise<void>;
  updateTeam: (name: string, id: number, image: string) => Promise<void>;
  getTeamById: (id: number) => Promise<Team>;
  setTeams: React.Dispatch<React.SetStateAction<TeamWithPlayerCount[]>>;
}

const TeamsContext = createContext<TeamsContextType | null>(null);

export const useTeams = () => {
  const ctx = useContext(TeamsContext);
  if (!ctx) throw new Error("useTeams must be used within a TeamsProvider");
  return ctx;
};

interface TeamsProviderProps {
  children: React.ReactNode;
  baseUrl: string;
}

export const TeamsProvider = ({ children, baseUrl }: TeamsProviderProps) => {
  const [teams, setTeams] = useState<TeamWithPlayerCount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const teamsWithPlayerCount = await getAllTeams(baseUrl);
      console.log("teams with player count:", teamsWithPlayerCount);
      setTeams(teamsWithPlayerCount);
    } catch (error) {
      console.error("Erro ao buscar times:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTeam = async (id: number) => {
    try {
      await deleteTeamById(baseUrl, id);
      const updated = await getAllTeams(baseUrl);
      setTeams(updated);
    } catch (error) {
      console.error("Erro ao deletar o time:", error);
    }
  };

  const updateTeam = async (name: string, id: number, image: string) => {
    try {
      await editTeam(baseUrl, { name, id, image });
      const updated = await getAllTeams(baseUrl);
      setTeams(updated);
    } catch (error) {
      console.error("Erro ao editar o time:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <TeamsContext.Provider
      value={{
        teams,
        loading,
        fetchTeams,
        deleteTeam,
        updateTeam,
        getTeamById: (id: number) => getTeamById(baseUrl, id),
        setTeams,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};
