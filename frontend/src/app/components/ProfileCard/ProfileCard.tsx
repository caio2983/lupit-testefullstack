import React from "react";
import { Player } from "../../../../types/player";

// Os cards de Jogador e de Time têm layouts semelhantes, então decidi montar um único componente para os dois
// Nesse componente, coloquei uma condicional que verifica a prop ''type'' e renderiza os poucos elementos discrepantes de
// acordo com o tipo
export default function ProfileCard({
  type,
  entity,
}: {
  type: "player" | "team";
  entity?: Player;
}) {
  return <div className="profile-card">{entity?.name}</div>;
}
