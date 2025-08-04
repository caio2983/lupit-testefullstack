"use client";

import { Camera } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { createTeam } from "@/app/lib/data";

export default function AdicionarTime() {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [inputErro, setInputErro] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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

      const url = URL.createObjectURL(file);
      setImage(url);
      e.target.value = "";
    }
  };

  const abrirSelecionador = () => {
    inputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === "") {
      setInputErro(true);
      Swal.fire({
        icon: "error",
        title: "Digite um nome para o time",
        confirmButtonColor: "#0070f3",
        scrollbarPadding: false,
        heightAuto: false,
      });
      return;
    }

    setInputErro(false);

    try {
      await createTeam({ name });

      await Swal.fire({
        icon: "success",
        title: "Time criado com sucesso!",
        confirmButtonColor: "#0070f3",
        scrollbarPadding: false,
        heightAuto: false,
      });

      setName("");
      setImage(null);

      router.push("/times");
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
        <span className="inserir-jogador">Inserir time</span>

        <div className="adicionar-box">
          <div className="adicionar-image-wrapper">
            <img
              src={
                image ??
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDk_071dbbz-bewOvpfYa3IlyImYtpvQmluw&s"
              }
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
              <input
                type="text"
                id="nome-jogador"
                name="nome"
                placeholder="Digite o nome"
                className="input-adicionar"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

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
