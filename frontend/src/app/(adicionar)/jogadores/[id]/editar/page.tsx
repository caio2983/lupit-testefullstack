import { PlayersProvider } from "@/app/PlayersContext/PlayersContext";
import EditarJogadorPage from "@/app/components/EditPages/EditarJogador";

import React from "react";

export default function EditarJogador() {
  return (
    <PlayersProvider>
      <EditarJogadorPage></EditarJogadorPage>
    </PlayersProvider>
  );
}
