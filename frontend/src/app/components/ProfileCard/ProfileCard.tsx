import React from "react";

// Os cards de Jogador e de Time têm layouts semelhantes, então decidi montar um único componente para os dois
// Nesse componente, coloquei uma condicional que verifica a prop ''type'' e renderiza os poucos elementos discrepantes de
// acordo com o tipo
export default function ProfileCard({ type }: { type: "player" | "team" }) {
  return <div className="profile-card">Card</div>;
}
