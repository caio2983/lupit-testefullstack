import PlayerPage from "@/app/components/ProfilesPage/PlayerPage";
import ProfilePage from "../../components/ProfilesPage/ProfilePage";
import { PlayersProvider } from "../../PlayersContext/PlayersContext";

export default async function JogadoresPage() {
  return (
    <PlayersProvider>
      <PlayerPage></PlayerPage>
    </PlayersProvider>
  );
}
