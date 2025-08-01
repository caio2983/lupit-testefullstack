import { Camera } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AdicionarTime() {
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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDk_071dbbz-bewOvpfYa3IlyImYtpvQmluw&s"
              alt="Imagem do jogador"
              className="adicionar-image"
            />

            <div className="adicionar-button">
              <Camera size={36} color="white" />
            </div>
          </div>
          <div className="adicionar-image-types">
            <p>
              {" "}
              Permitidos: <strong>*.jpeg, *.jpg, *.png, *.gif</strong>
            </p>
            <p>Tamanho máximo de 3.1MB</p>
          </div>
          <div className="adicionar-details"></div>
        </div>
      </div>
    </main>
  );
}
