"use client";

import { Camera } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";

export default function AdicionarTime() {
  const [imagem, setImagem] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

      setImagem(url);

      e.target.value = "";
    }
  };

  const abrirSelecionador = () => {
    inputRef.current?.click();
  };

  return (
    <main className="adicionar-container">
      <div className="back-button">
        <Link href="/times">Voltar</Link>
      </div>

      <div className="adicionar-time-content">
        <span className="inserir-jogador">Inserir jogador</span>

        <div className="adicionar-box">
          <div className="adicionar-image-wrapper">
            <img
              src={
                imagem ??
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDk_071dbbz-bewOvpfYa3IlyImYtpvQmluw&s"
              }
              alt="Imagem do jogador"
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
            <form className="form-adicionar">
              <input
                type="text"
                id="nome-jogador"
                name="nome"
                placeholder="Digite o nome"
                className="input-adicionar"
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
