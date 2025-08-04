import { TeamsProvider } from "@/app/TeamsContext/TeamsContext";
import EditarTimePage from "@/app/components/EditPages/EditarTime";
import React from "react";

export default function EditarTime() {
  return (
    <TeamsProvider baseUrl={"http://localhost:3001"}>
      <EditarTimePage></EditarTimePage>
    </TeamsProvider>
  );
}
