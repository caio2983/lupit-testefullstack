import { TeamsProvider } from "../../TeamsContext/TeamsContext";
import TeamPage from "@/app/components/ProfilesPage/TeamPage";

export default function TimesPage() {
  return (
    <TeamsProvider>
      <TeamPage></TeamPage>
    </TeamsProvider>
  );
}
