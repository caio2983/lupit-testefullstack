import Link from "next/link";
import React from "react";

export default function AddButton({ type }: { type: string }) {
  return (
    <div className="add-button">
      <Link
        href={
          type === "team"
            ? "/times/novo"
            : type === "player"
            ? "/jogadores/novo"
            : "#"
        }
      >
        + Adicionar{" "}
        {type === "team" ? "time" : type === "player" ? "jogador" : ""}
      </Link>
    </div>
  );
}
