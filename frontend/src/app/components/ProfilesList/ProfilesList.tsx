"use client";

import { Edit, Trash } from "lucide-react";
import { Player } from "../../../../types/player";
import { Team, TeamWithPlayerCount } from "../../../../types/team";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";

export default function ProfilesList({
  type,
  data,
  deleteProfile,
}: {
  type: "player" | "team";
  data: TeamWithPlayerCount[] | Player[];
  deleteProfile?: (id: number) => Promise<void>;
}) {
  const router = useRouter();
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
        <Link
          href={
            type === "team"
              ? `/times/${profile.id}`
              : `/jogadores/${profile.id}`
          }
          key={profile.id}
        >
          <div className="profiles-card">
            <div className="profiles-property">
              <img
                src={
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt="Logo"
                className="profile-logo"
              />
            </div>
            <div className="profiles-property">{profile.id}</div>
            <div className="profiles-property">{profile.name}</div>
            <div className="profiles-property">
              {type === "team" ? (
                (profile as TeamWithPlayerCount).numberOfPlayers
              ) : (
                <>
                  <img src={"a"} alt="Logo" className="profile-logo" />
                  <div className="team-name">Nome</div>
                </>
              )}
            </div>
            <div className="profiles-property profiles-actions">
              <Edit
                className="icon"
                size={25}
                color="gray"
                onClick={() => {
                  if (type === "team") {
                    router.push(`/times/${profile.id}/editar`);
                  }
                }}
              />
              <Trash
                className="icon"
                size={25}
                color="gray"
                onClick={async () => {
                  const resultado = await Swal.fire({
                    title: "Tem certeza?",
                    text: "Remover o time é uma ação irreversível",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Sim",
                    cancelButtonText: "Não",

                    scrollbarPadding: false,
                    heightAuto: false,
                  });

                  if (resultado.isConfirmed && deleteProfile) {
                    deleteProfile(profile.id);
                  }
                }}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
