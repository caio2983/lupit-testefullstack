import { Player } from "../../../types/player";
import { Team, TeamWithPlayerCount } from "../../../types/team";

export async function getAllPlayers(baseUrl: string) {
  const playersResponse = await fetch(`${baseUrl}/player`);
  const players = await playersResponse.json();
  return players;
}

export async function getAllTeams(
  baseUrl: string
): Promise<TeamWithPlayerCount[]> {
  try {
    const teamsResponse = await fetch(`${baseUrl}/team`);
    const teams: Team[] = await teamsResponse.json();

    const players: Player[] = await getAllPlayers(baseUrl);

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

export async function getTeamById(baseUrl: string, id: number): Promise<Team> {
  if (typeof id !== "number") {
    id = Number(id);
  }

  const response = await fetch(`${baseUrl}/team/${id}`);

  if (!response.ok) {
    throw new Error(`Erro na resposta HTTP: ${response.status}`);
  }

  const data = await response.json();
  return data as Team;
}

export async function getPlayerById(
  baseUrl: string,
  id: number
): Promise<Player> {
  if (typeof id !== "number") {
    id = Number(id);
  }

  const response = await fetch(`${baseUrl}/player/${id}`);

  if (!response.ok) {
    throw new Error(`Erro na resposta HTTP: ${response.status}`);
  }

  const data = await response.json();
  return data as Player;
}

export async function deleteTeamById(baseUrl: string, id: number | undefined) {
  const response = await fetch(`${baseUrl}/team/delete/${id}`);
  if (!response.ok) {
    throw new Error(`Falha ao deletar o time com id: ${id}`);
  }
  return await response.json();
}

export async function deletePlayerById(
  baseUrl: string,
  id: number | undefined
) {
  const response = await fetch(`${baseUrl}/player/delete/${id}`);
  if (!response.ok) {
    throw new Error(`Falha ao deletar o jogador com id: ${id}`);
  }
  return await response.json();
}

export async function createTeam(
  baseUrl: string,
  data: { name: string; image: string | null }
) {
  const response = await fetch(`${baseUrl}/team`, {
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

export async function editTeam(
  baseUrl: string,
  data: { name: string; id: number; image: string }
) {
  const response = await fetch(`${baseUrl}/team/${data.id}`, {
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

export async function editPlayer(
  baseUrl: string,
  data: { name: string; id: number; image: string; age: number; teamId: number }
) {
  const response = await fetch(`${baseUrl}/player/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      image: data.image,
      age: data.age,
      team_id: data.teamId,
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao editar jogador");
  }

  return await response.json();
}
