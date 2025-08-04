"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Player } from "../../../types/player";
import {
  deletePlayerById,
  editPlayer,
  getAllPlayers,
  getAllTeams,
  getPlayerById,
} from "@/app/lib/data";
import { Team, TeamWithPlayerCount } from "../../../types/team";

interface PlayersContextType {
  players: Player[];
  loading: boolean;
  fetchPlayers: () => Promise<void>;
  deletePlayer: (id: number) => Promise<void>;
  updatePlayer: (
    name: string,
    id: number,
    image: string,
    age: number,
    teamId: number
  ) => Promise<void>;
  getPlayerById: (id: number) => Promise<Player>;
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  fetchTeams: () => Promise<TeamWithPlayerCount[]>;
}

const PlayersContext = createContext<PlayersContextType | null>(null);

export const usePlayers = () => {
  const ctx = useContext(PlayersContext);
  if (!ctx) throw new Error("usePlayers must be used within a PlayersProvider");
  return ctx;
};

export const PlayersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const res = await getAllPlayers();
      setPlayers(res);
    } catch (error) {
      console.error("Erro ao buscar times:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePlayer = async (id: number) => {
    try {
      await deletePlayerById(id);
      const updated = await getAllPlayers();
      setPlayers(updated);
    } catch (error) {
      console.error("Erro ao deletar o time:", error);
    }
  };

  const updatePlayer = async (
    name: string,
    id: number,
    image: string,
    age: number,
    teamId: number
  ) => {
    try {
      await editPlayer({ name, id, image, age, teamId });
      const updated = await getAllPlayers();
      setPlayers(updated);
    } catch (error) {
      console.error("Erro ao editar o time:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const teamsWithPlayerCount = await getAllTeams();
      return teamsWithPlayerCount;
    } catch (error) {
      console.error("Erro ao buscar times:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <PlayersContext.Provider
      value={{
        players,
        loading,
        fetchPlayers,
        deletePlayer,
        updatePlayer,
        getPlayerById,
        setPlayers,
        fetchTeams,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};
