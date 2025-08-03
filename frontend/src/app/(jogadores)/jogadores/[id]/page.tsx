import IndividualPlayer from "@/app/components/IndividualProfilePages/Player/IndividualPlayer";
import { TeamsProvider } from "@/app/TeamsContext/TeamsContext";
import React from "react";

export default function PlayerProfile() {
  return (
    <TeamsProvider>
      <IndividualPlayer></IndividualPlayer>
    </TeamsProvider>
  );
}
