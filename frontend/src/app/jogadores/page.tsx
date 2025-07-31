import AddButton from "../components/AddPlayerOrTeam/AddButton";

export default function JogadoresPage() {
  return (
    <div className="page-wrapper jogadores-page-wrapper">
      <div className="back-button">Voltar</div>
      <div className="jogadores-page-header">
        <div>Jogadores</div>
        <AddButton type="jogadores" />
      </div>
    </div>
  );
}
