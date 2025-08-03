import React from "react";
import { TeamsProvider } from "../context/TeamsContext";

import IndividualTeam from "@/app/components/IndividualProfilePages/Team/IndividualTeam";

export default function TeamProfile() {
  return (
    <TeamsProvider>
      <IndividualTeam></IndividualTeam>
    </TeamsProvider>
  );
}
