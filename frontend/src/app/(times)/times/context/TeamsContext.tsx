"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Team } from "../../../../../types/team";
import { deleteTeamById, getAllTeams } from "@/app/lib/data";

interface TeamsContextType {
  teams: Team[];
  loading: boolean;
  fetchTeams: () => Promise<void>;
  deleteTeam: (id: number) => Promise<void>;
}

const TeamsContext = createContext<TeamsContextType | null>(null);

export const useTeams = () => {
  const ctx = useContext(TeamsContext);
  if (!ctx) throw new Error("useTeams must be used within a TeamsProvider");
  return ctx;
};

export const TeamsProvider = ({ children }: { children: React.ReactNode }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await getAllTeams();
      setTeams(res);
    } catch (error) {
      console.error("Erro ao buscar times:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTeam = async (id: number) => {
    try {
      await deleteTeamById(id);
      const updated = await getAllTeams();
      setTeams(updated);
    } catch (error) {
      console.error("Erro ao deletar o time:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <TeamsContext.Provider value={{ teams, loading, fetchTeams, deleteTeam }}>
      {children}
    </TeamsContext.Provider>
  );
};
