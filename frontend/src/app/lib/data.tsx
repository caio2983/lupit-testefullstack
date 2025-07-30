export async function getAllPlayersAndTeams() {
  const playersResponse = await fetch("http://localhost:3000/player");
  const players = await playersResponse.json();

  const teamsResponse = await fetch("http://localhost:3000/team");
  const teams = await teamsResponse.json();

  return { players, teams };
}
