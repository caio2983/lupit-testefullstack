// app/teams/page.tsx
import ProfilePage from "@/app/components/ProfilesPage/ProfilePage";
import { TeamsProvider } from "./context/TeamsContext";

export default function TimesPage() {
  return (
    <TeamsProvider>
      <ProfilePage type="team" />
    </TeamsProvider>
  );
}
