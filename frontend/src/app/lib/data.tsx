export async function getAllPlayers() {
  const playersResponse = await fetch("http://localhost:3000/player");
  const players = await playersResponse.json();
  return players;
}

export async function getAllTeams() {
  const teamsResponse = await fetch("http://localhost:3000/team");
  const teams = await teamsResponse.json();

  return teams;
}

export async function getTeamById(id: number | undefined) {
  const response = await fetch(`http://localhost:3000/team/${id}`);
  if (!response.ok) {
    throw new Error(`Falha ao buscar o time com id: ${id}`);
  }
  return await response.json();
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
  image: string | null;
  id: number;
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
