import { Player, Team } from 'generated/prisma';

async function createTeam(
  baseUrl: string,
  teamData: { name: string; image?: string },
): Promise<Team> {
  const res = await fetch(`${baseUrl}/team`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(teamData),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro criando time: ${text}`);
  }

  return res.json() as Promise<Team>;
}

async function createPlayer(baseUrl: string, playerData: any): Promise<Player> {
  const res = await fetch(`${baseUrl}/player`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(playerData),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro criando player: ${text}`);
  }

  return res.json() as Promise<Player>;
}

async function main() {
  const baseUrl = 'http://backend:3001';
  const teams: Team[] = [];
  for (let i = 1; i <= 5; i++) {
    try {
      const team = await createTeam(baseUrl, { name: `Team${i}` });
      console.log(`Time criado: ${team.name} (id: ${team.id})`);
      teams.push(team);
    } catch (error) {
      console.error(`Erro ao criar time ${i}:`, error);
      process.exit(1);
    }
  }

  const teamIds = teams.map((team) => team.id);

  for (let i = 1; i <= 400; i++) {
    const randomTeamId = teamIds[Math.floor(Math.random() * teamIds.length)];

    const playerData = {
      name: `Player ${i}`,
      age: Math.floor(Math.random() * 18) + 18,
      teamId: randomTeamId,
    };

    try {
      const player = await createPlayer(baseUrl, playerData);
      console.log(`Criado jogador: ${player.name} no time ${player.team_id}`);
    } catch (error) {
      console.error(`Erro no player ${i}:`, error);
    }
  }
}

main().catch((err) => {
  console.error('Erro geral no seed:', err);
  process.exit(1);
});
