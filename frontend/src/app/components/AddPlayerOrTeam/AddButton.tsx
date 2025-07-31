import React from "react";

export default function AddButton({ type }: { type: string }) {
  return <div className="add-button">+ Adicionar {type}</div>;
}
