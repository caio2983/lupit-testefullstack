"use client";

import { Edit, Trash } from "lucide-react";
import { Player } from "../../../../types/player";
import { Team, TeamWithPlayerCount } from "../../../../types/team";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilesList({
  type,
  data,
  deleteProfile,
  fetchTeams,
}: {
  type: "player" | "team";
  data: TeamWithPlayerCount[] | Player[];
  deleteProfile?: (id: number) => Promise<void>;
  fetchTeams?: () => Promise<TeamWithPlayerCount[]>;
}) {
  const router = useRouter();

  const [teams, setTeams] = useState<TeamWithPlayerCount[] | null>(null);

  useEffect(() => {
    if (typeof fetchTeams === "function") {
      console.log("TESTEEEE");
      const loadTeams = async () => {
        try {
          const teamsData = await fetchTeams();

          setTeams(teamsData);
        } catch (error) {
          console.error(error);
        }
      };

      loadTeams();
    }
  }, [fetchTeams]);

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
        <div
          key={profile.id}
          className="profiles-card"
          onClick={() => {
            if (type === "team") {
              router.push(`/times/${profile.id}`);
            }
          }}
        >
          <div className="profiles-property profiles-image">
            <Image
              src={profile.image ? profile.image : "/Knight.png"}
              alt="Logo"
              fill
            />
          </div>
          <div className="profiles-property">{profile.id}</div>
          <div className="profiles-property">{profile.name}</div>
          <div className="profiles-property">
            {type === "team" ? (
              (profile as TeamWithPlayerCount).numberOfPlayers
            ) : (
              <>
                <div className="profiles-little-image">
                  <Image
                    src={
                      teams?.find(
                        (team) => team.id === (profile as Player).team_id
                      )?.image ?? "/Knight.png"
                    }
                    alt="Logo"
                    fill
                  />
                </div>
                <div className="team-name">
                  {teams?.find(
                    (team) => team.id === (profile as Player).team_id
                  )?.name ?? ""}
                </div>
              </>
            )}
          </div>
          <div className="profiles-property profiles-actions">
            <Edit
              className="icon"
              size={25}
              color="gray"
              onClick={(e) => {
                e.stopPropagation();
                if (type === "team") {
                  router.push(`/times/${profile.id}/editar`);
                } else {
                  router.push(`/jogadores/${profile.id}/editar`);
                }
              }}
            />
            <Trash
              className="icon"
              size={25}
              color="gray"
              onClick={async (e) => {
                e.stopPropagation();
                const resultado = await Swal.fire({
                  title: "Tem certeza?",
                  text:
                    type === "player"
                      ? "Remover o jogador é uma ação irreversível"
                      : "Remover o time é uma ação irreversível",
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
      ))}
    </div>
  );
}
