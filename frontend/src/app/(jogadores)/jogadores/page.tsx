import { PlayersProvider } from "../../PlayersContext/PlayersContext";
import AllPlayers from "@/app/components/ProfilesPage/AllPlayers";

export default async function JogadoresPage() {
  return (
    <PlayersProvider baseUrl={"http://localhost:3001"}>
      <AllPlayers></AllPlayers>
    </PlayersProvider>
  );
}
