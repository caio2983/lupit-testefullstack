import AllTeams from "@/app/components/ProfilesPage/AllTeams";
import { TeamsProvider } from "../../TeamsContext/TeamsContext";

export default function TimesPage() {
  return (
    <TeamsProvider baseUrl={"http://localhost:3001"}>
      <AllTeams></AllTeams>
    </TeamsProvider>
  );
}
