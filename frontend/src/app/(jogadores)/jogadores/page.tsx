import PlayerPage from "@/app/components/ProfilesPage/PlayerPage";
import ProfilePage from "../../components/ProfilesPage/ProfilePage";
import { PlayersProvider } from "./context/PlayersProvider";

export default async function JogadoresPage() {
  return (
    <PlayersProvider>
      <PlayerPage></PlayerPage>
    </PlayersProvider>
  );
}
