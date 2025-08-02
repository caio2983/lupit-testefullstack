"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Team, TeamWithPlayerCount } from "../../../../../types/team";
import {
  deleteTeamById,
  editTeam,
  getAllPlayers,
  getAllTeams,
  getTeamById,
} from "@/app/lib/data";
import { Player } from "../../../../../types/player";

interface TeamsContextType {
  teams: Team[];
  loading: boolean;
  fetchTeams: () => Promise<void>;
  deleteTeam: (id: number) => Promise<void>;
  updateTeam: (name: string, image: string | null, id: number) => Promise<void>;
  searchTeamById: (id: number) => Promise<void>;
}

const TeamsContext = createContext<TeamsContextType | null>(null);

export const useTeams = () => {
  const ctx = useContext(TeamsContext);
  if (!ctx) throw new Error("useTeams must be used within a TeamsProvider");
  return ctx;
};

export const TeamsProvider = ({ children }: { children: React.ReactNode }) => {
  const [teams, setTeams] = useState<TeamWithPlayerCount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await getAllTeams();
      const res_all_players = await getAllPlayers();

      const teamsWithPlayerCount: TeamWithPlayerCount[] = res.map(
        (team: Team) => {
          const count = res_all_players.filter(
            (player: Player) => player.team_id === team.id
          ).length;

          return {
            ...team,
            numberOfPlayers: count,
          };
        }
      );

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
      await deleteTeamById(id);
      const updated = await getAllTeams();
      setTeams(updated);
    } catch (error) {
      console.error("Erro ao deletar o time:", error);
    }
  };

  const updateTeam = async (name: string, image: string | null, id: number) => {
    try {
      await editTeam({ name, image, id });
      const updated = await getAllTeams();
      setTeams(updated);
    } catch (error) {
      console.error("Erro ao editar o time:", error);
    }
  };

  const searchTeamById = async (id: number) => {
    try {
      const result = await getTeamById(id);
      return result;
    } catch (error) {
      console.error("Erro ao buscar o time");
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
        searchTeamById,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};
