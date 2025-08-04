import React from "react";
import { TeamsProvider } from "../../../TeamsContext/TeamsContext";

import IndividualTeam from "@/app/components/IndividualProfilePages/Team/IndividualTeam";

export default function TeamProfile() {
  return (
    <TeamsProvider baseUrl={"http://localhost:3001"}>
      <IndividualTeam></IndividualTeam>
    </TeamsProvider>
  );
}
