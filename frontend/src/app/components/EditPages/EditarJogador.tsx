"use client";

import React, { useEffect, useRef, useState } from "react";
import { Player } from "../../../../types/player";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePlayers } from "@/app/PlayersContext/PlayersContext";
import Link from "next/link";
import { Camera } from "lucide-react";
import Swal from "sweetalert2";
import { Team } from "../../../../types/team";

export default function EditarJogadorPage() {
  const [image, setImage] = useState<string>("/Knight.png");
  const [name, setName] = useState("");
  const [inputErro, setInputErro] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [age, setAge] = useState<number | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [playerId, setPlayerId] = useState<number>(0);
  const [playerData, setPlayerData] = useState<Player>();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const router = useRouter();

  const params = useParams();
  const id = params.id;

  const { getPlayerById, updatePlayer } = usePlayers();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const tamanhoMB = file.size / (1024 * 1024);
    if (tamanhoMB > 3.1) {
      Swal.fire({
        icon: "error",
        title: "Arquivo muito grande",
        text: "O tamanho máximo permitido é 3.1MB.",
        confirmButtonColor: "#0070f3",
        scrollbarPadding: false,
        heightAuto: false,
      });
      e.target.value = "";
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "dashboard-pic");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dgkxrrj5x/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setImage(data.secure_url);
      } else {
        throw new Error("Erro ao obter URL da imagem");
      }
    } catch (error) {
      console.error("Erro no upload da imagem:", error);
      Swal.fire({
        icon: "error",
        title: "Erro no upload",
        text: "Não foi possível enviar a imagem. Tente novamente.",
        confirmButtonColor: "#0070f3",
        scrollbarPadding: false,
        heightAuto: false,
      });
    }

    e.target.value = "";
  };

  const abrirSelecionador = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    const playerId = Number(id);
    setPlayerId(playerId);

    const fetchTeams = async () => {
      try {
        const res = await fetch("http://localhost:3001/team");
        if (!res.ok) {
          throw new Error("Erro ao buscar times");
        }
        const data = await res.json();
        setTeams(data);
      } catch (error) {
        console.error("Erro ao buscar times:", error);
      }
    };

    const playerData = async (id: number) => {
      const player_data = await getPlayerById(id);
      console.log("PLAYEDATRAAAA", player_data);
      if (player_data) {
        setPlayerData(player_data);

        if (player_data.image) {
          setImage(player_data.image);
        }

        setName(player_data.name);
        setAge(player_data.age);
        setSelectedId(player_data.team_id);
      }
    };

    fetchTeams();
    playerData(playerId);
  }, [id, getPlayerById]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedId === null) {
      setInputErro(true);

      Swal.fire({
        icon: "error",
        title: "Selecione um time",
        confirmButtonColor: "#0070f3",
        scrollbarPadding: false,
        heightAuto: false,
      });
      return;
    }

    if (age === null || age < 0) {
      Swal.fire({
        icon: "error",
        title: "Idade inválida",
        text: "Informe uma idade válida.",
        confirmButtonColor: "#0070f3",
        scrollbarPadding: false,
        heightAuto: false,
      });
      return;
    }

    setInputErro(false);
    if (!playerData) return;
    try {
      await updatePlayer(name, playerId, image, age, selectedId);

      await Swal.fire({
        icon: "success",
        title: "Jogador atualizado com sucesso!",
        confirmButtonColor: "#0070f3",
        scrollbarPadding: false,
        heightAuto: false,
      });

      setName("");
      setImage("/Knight.png");
      setAge(0);

      router.push("/jogadores");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Não conseguimos cadastrar o time, tente novamente mais tarde.",
        confirmButtonColor: "#0070f3",
        scrollbarPadding: false,
        heightAuto: false,
      });
    }
  };

  return (
    <main className="page-container">
      <div className="back-button">
        <Link href="/times">Voltar</Link>
      </div>

      <div className="adicionar-time-content">
        <span className="inserir-jogador">Inserir jogador</span>

        <div className="adicionar-box">
          <div className="adicionar-image-wrapper">
            <img
              src={image}
              alt="Image do jogador"
              className="adicionar-image"
            />

            <div className="adicionar-button" onClick={abrirSelecionador}>
              <Camera size={36} color="white" />
            </div>

            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          <div className="adicionar-image-types">
            <p>
              Permitidos: <strong>*.jpeg, *.jpg, *.png, *.gif</strong>
            </p>
            <p>Tamanho máximo de 3.1MB</p>
          </div>

          <div className="adicionar-details">
            <form className="form-adicionar" onSubmit={handleSubmit}>
              <div className="jogador-nome-idade">
                <input
                  type="text"
                  id="nome-jogador"
                  name="nome"
                  placeholder="Digite o nome"
                  className="input-adicionar input-jogador-nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="number"
                  id="idade-jogador"
                  name="idade"
                  placeholder="Idade"
                  className="input-adicionar input-jogador-idade"
                  value={age !== null ? age : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setAge(null);
                    } else {
                      const parsed = parseInt(value);
                      if (!isNaN(parsed)) {
                        setAge(parsed);
                      }
                    }
                  }}
                  min="0"
                />
              </div>

              <input
                list="teams"
                name="playerId"
                className="input-select-team"
                placeholder="Selecione um time"
                value={teams.find((team) => team.id === selectedId)?.name ?? ""}
                onChange={(e) => {
                  const selectedTeam = teams.find(
                    (team) => team.name === e.target.value
                  );
                  if (selectedTeam) {
                    setSelectedId(selectedTeam.id);
                  } else {
                    setSelectedId(null);
                  }
                }}
              />
              <datalist id="teams">
                {teams.map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </datalist>

              <div className="salvar-container">
                <button type="submit" className="botao-salvar">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
