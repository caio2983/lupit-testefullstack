import React from "react";
import { Player } from "../../../../types/player";
import { getTeamById } from "@/app/lib/data";

export default function PlayerCard({ player }: { player?: Player }) {
  return <div className="profile-card">{player?.name}</div>;
}
