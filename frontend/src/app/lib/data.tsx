import { Player } from "../../../types/player";
import { Team, TeamWithPlayerCount } from "../../../types/team";

export async function getAllPlayers() {
  const playersResponse = await fetch("http://localhost:3000/player");
  const players = await playersResponse.json();
  return players;
}

export async function getAllTeams(): Promise<TeamWithPlayerCount[]> {
  try {
    const teamsResponse = await fetch("http://localhost:3000/team");
    const teams: Team[] = await teamsResponse.json();

    const players: Player[] = await getAllPlayers();

    const teamsWithPlayerCount: TeamWithPlayerCount[] = teams.map((team) => {
      const numberOfPlayers = players.filter(
        (player) => player.team_id === team.id
      ).length;

      return {
        ...team,
        numberOfPlayers,
      };
    });

    return teamsWithPlayerCount;
  } catch (error) {
    console.error("Erro ao buscar times com jogadores:", error);
    return [];
  }
}

export async function getTeamById(id: number): Promise<Team> {
  if (typeof id !== "number") {
    id = Number(id);
  }

  const response = await fetch(`http://localhost:3000/team/${id}`);

  if (!response.ok) {
    throw new Error(`Erro na resposta HTTP: ${response.status}`);
  }

  const data = await response.json();
  return data as Team;
}

export async function deleteTeamById(id: number | undefined) {
  const response = await fetch(`http://localhost:3000/team/delete/${id}`);
  if (!response.ok) {
    throw new Error(`Falha ao deletar o time com id: ${id}`);
  }
  return await response.json();
}

export async function deletePlayerById(id: number | undefined) {
  const response = await fetch(`http://localhost:3000/player/delete/${id}`);
  if (!response.ok) {
    throw new Error(`Falha ao deletar o jogador com id: ${id}`);
  }
  return await response.json();
}

export async function createTeam(data: { name: string; image: string | null }) {
  const response = await fetch("http://localhost:3000/team", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar time");
  }

  return await response.json();
}

export async function editTeam(data: {
  name: string;

  id: number;
  image: string;
}) {
  const response = await fetch(`http://localhost:3000/team/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      image: data.image,
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao editar time");
  }

  return await response.json();
}

export async function editPlayer(data: {
  name: string;

  id: number;
  image: string | null;
  age: number;
}) {
  const response = await fetch(`http://localhost:3000/player/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao editar jogador");
  }

  return await response.json();
}
