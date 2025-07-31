import { Player } from "../../../types/player";

import AddButton from "../components/AddPlayerOrTeam/AddButton";
import ProfilesList from "../components/PlayerOrTeamList/ProfilesList";
import { getAllPlayers } from "../lib/data";

export default async function JogadoresPage() {
  const players = await getAllPlayers();
  return (
    <div className="page-wrapper jogadores-page-wrapper">
      <div className="back-button">Voltar</div>
      <div className="jogadores-page-header">
        <div>Jogadores</div>
        <AddButton type="jogadores" />
      </div>

      <ProfilesList type="player" data={players} />
    </div>
  );
}
