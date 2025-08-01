"use client";

import { Edit, Trash } from "lucide-react";
import { Player } from "../../../../types/player";
import { Team } from "../../../../types/team";
import { deletePlayerById, deleteTeamById } from "@/app/lib/data";

export default function ProfilesList({
  type,
  data,
}: {
  type: "player" | "team";
  data: Team[] | Player[];
}) {
  async function deleteProfile(id: number, type: "player" | "team") {
    return type == "player"
      ? await deletePlayerById(id)
      : await deleteTeamById(id);
  }

  return (
    <div className="profiles-list">
      <div className="profiles-list-header">
        <div className="profiles-property with-separator">
          Logo
          <span className="separator">|</span>
        </div>
        <div className="profiles-property with-separator">
          ID
          <span className="separator">|</span>
        </div>
        <div className="profiles-property with-separator">
          Nome
          <span className="separator">|</span>
        </div>
        <div className="profiles-property with-separator">
          {type === "team" ? "Quantidade de jogadores" : "Time"}
          <span className="separator">|</span>
        </div>
        <div className="profiles-property">Ações</div>
      </div>

      {data.map((profile) => (
        <div className="profiles-card" key={profile.id}>
          <div className="profiles-property">
            <img src={"a"} alt="Logo" className="profile-logo" />
          </div>
          <div className="profiles-property">{profile.id}</div>
          <div className="profiles-property">{profile.name}</div>
          <div className="profiles-property">
            {type === "team" ? (
              data.length
            ) : (
              <>
                <img src={"a"} alt="Logo" className="profile-logo" />
                <div className="team-name">Nome</div>
              </>
            )}
          </div>
          <div className="profiles-property profiles-actions">
            <Edit className="icon" size={25} color="gray" />
            <Trash
              className="icon"
              size={25}
              color="gray"
              onClick={() => deleteProfile(profile.id, type)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
