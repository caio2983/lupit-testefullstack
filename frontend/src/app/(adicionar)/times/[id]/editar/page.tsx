import { TeamsProvider } from "@/app/(times)/times/context/TeamsContext";
import EditarTimePage from "@/app/components/EditPages/EditarTime";
import React from "react";

export default function EditarTime() {
  return (
    <TeamsProvider>
      <EditarTimePage></EditarTimePage>
    </TeamsProvider>
  );
}
