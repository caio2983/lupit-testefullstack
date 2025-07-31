// export async function getAllPlayersAndTeams() {
//   const playersResponse = await fetch("http://localhost:3000/player");
//   const players = await playersResponse.json();

//   const teamsResponse = await fetch("http://localhost:3000/team");
//   const teams = await teamsResponse.json();

//   return { players, teams };
// }

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
