import { PlayersProvider } from "../../PlayersContext/PlayersContext";
import AllPlayers from "@/app/components/ProfilesPage/AllPlayers";

export default async function JogadoresPage() {
  return (
    <PlayersProvider>
      <AllPlayers></AllPlayers>
    </PlayersProvider>
  );
}
