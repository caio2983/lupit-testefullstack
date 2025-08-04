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
import { TeamWithPlayerCount } from "../../../types/team";

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

interface PlayersProviderProps {
  children: React.ReactNode;
  baseUrl: string;
}

export const PlayersProvider = ({
  children,
  baseUrl,
}: PlayersProviderProps) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const res = await getAllPlayers(baseUrl);
      setPlayers(res);
    } catch (error) {
      console.error("Erro ao buscar jogadores:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePlayer = async (id: number) => {
    try {
      await deletePlayerById(baseUrl, id);
      const updated = await getAllPlayers(baseUrl);
      setPlayers(updated);
    } catch (error) {
      console.error("Erro ao deletar o jogador:", error);
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
      await editPlayer(baseUrl, { name, id, image, age, teamId });
      const updated = await getAllPlayers(baseUrl);
      setPlayers(updated);
    } catch (error) {
      console.error("Erro ao editar o jogador:", error);
    }
  };

  const fetchTeams = async (): Promise<TeamWithPlayerCount[]> => {
    setLoading(true);
    try {
      const teamsWithPlayerCount = await getAllTeams(baseUrl);
      return teamsWithPlayerCount;
    } catch (error) {
      console.error("Erro ao buscar times:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <PlayersContext.Provider
      value={{
        players,
        loading,
        fetchPlayers,
        deletePlayer,
        updatePlayer,
        getPlayerById: (id: number) => getPlayerById(baseUrl, id),
        setPlayers,
        fetchTeams,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};
