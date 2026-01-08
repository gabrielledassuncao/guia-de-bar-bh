"use client";

import Link from "next/link";
import { Bar } from "@/data/bares";

interface BarCardProps {
  bar: Bar;
}

export default function BarCard({ bar }: BarCardProps) {
  const favoritosIds: number[] =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("favoritos") || "[]")
      : [];

  const isFavorito = favoritosIds.includes(bar.id);

  return (
    <article className="bar-card">
      {/* Imagem do bar */}
      <div
        className="bar-card-image"
        style={{ backgroundImage: `url(${bar.imagem})` }}
      >
        {isFavorito && <span className="favorito-badge">❤️ Favorito</span>}
      </div>

      {/* Conteúdo */}
      <div className="bar-card-content">
        <h3>{bar.nome}</h3>
        <div className="bar-card-rating">
  ⭐ {bar.nota} <span>({bar.avaliacoes})</span>
</div>


        <p className="bar-card-local">
          {bar.bairro} · {bar.regiao}
        </p>

        <div className="bar-card-vibes">
          {bar.vibe.slice(0, 3).map((v) => (
            <span key={v} className="bar-vibe">
              {v}
            </span>
          ))}
        </div>

        <Link href={`/bar/${bar.id}`} className="bar-card-link">
          Ver detalhes →
        </Link>
      </div>
    </article>
  );
}
