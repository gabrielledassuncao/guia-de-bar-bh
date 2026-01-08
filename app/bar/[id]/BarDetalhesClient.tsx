"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bar } from "@/data/bares";

type Comentario = {
  nome: string;
  texto: string;
  data: string;
};

interface Props {
  bar: Bar;
}

export default function BarDetalhesClient({ bar }: Props) {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [avaliacaoUsuario, setAvaliacaoUsuario] = useState<number | null>(null);
  const [favoritado, setFavoritado] = useState(false);

  useEffect(() => {
    // Comentários
    const salvos = localStorage.getItem(`comentarios-bar-${bar.id}`);
    if (salvos) setComentarios(JSON.parse(salvos));

    // Avaliação do usuário
    const avaliacaoSalva = localStorage.getItem(`avaliacao-bar-${bar.id}`);
    if (avaliacaoSalva) setAvaliacaoUsuario(Number(avaliacaoSalva));

    // Favoritos
    const favoritosSalvos = JSON.parse(
      localStorage.getItem("favoritos") || "[]"
    );
    setFavoritado(favoritosSalvos.includes(bar.id));
  }, [bar.id]);

  function adicionarComentario() {
    if (!novoComentario.trim()) return;

    const comentario: Comentario = {
      nome: "Visitante",
      texto: novoComentario,
      data: new Date().toLocaleDateString("pt-BR"),
    };

    const listaAtualizada = [comentario, ...comentarios];
    setComentarios(listaAtualizada);
    localStorage.setItem(
      `comentarios-bar-${bar.id}`,
      JSON.stringify(listaAtualizada)
    );

    setNovoComentario("");
  }

  function avaliar(nota: number) {
    setAvaliacaoUsuario(nota);
    localStorage.setItem(`avaliacao-bar-${bar.id}`, String(nota));
  }

  function toggleFavorito() {
    const favoritosSalvos: number[] = JSON.parse(
      localStorage.getItem("favoritos") || "[]"
    );

    let novaLista: number[];

    if (favoritosSalvos.includes(bar.id)) {
      novaLista = favoritosSalvos.filter((id) => id !== bar.id);
      setFavoritado(false);
    } else {
      novaLista = [...favoritosSalvos, bar.id];
      setFavoritado(true);
    }

    localStorage.setItem("favoritos", JSON.stringify(novaLista));
  }

  function renderEstrelasMedia(nota: number) {
    const estrelasCheias = Math.floor(nota);
    const temMeia = nota % 1 >= 0.5;

    return (
      <>
        {[...Array(5)].map((_, i) => {
          if (i < estrelasCheias)
            return <span key={i} style={{ color: "#facc15" }}>★</span>;
          if (i === estrelasCheias && temMeia)
            return <span key={i} style={{ color: "#facc15" }}>☆</span>;
          return <span key={i} style={{ color: "#d1d5db" }}>★</span>;
        })}
      </>
    );
  }

  return (
    <main className="bar-detalhes">
      <div
        className="bar-detalhes-hero"
        style={{ backgroundImage: `url(${bar.imagem})` }}
      />

      <div className="bar-detalhes-content">
        <h1>{bar.nome}</h1>

        <button onClick={toggleFavorito} className="btn-favorito">
          {favoritado ? "❤️ Remover dos favoritos" : "🤍 Favoritar"}
        </button>

        <div className="bar-detalhes-rating">
          {renderEstrelasMedia(bar.nota)}
          <span>
            {bar.nota} · {bar.avaliacoes} avaliações
          </span>
        </div>

        <div className="avaliacao-usuario">
          <p>Sua avaliação:</p>
          {[1, 2, 3, 4, 5].map((nota) => (
            <span
              key={nota}
              onClick={() => avaliar(nota)}
              style={{
                cursor: "pointer",
                fontSize: "22px",
                color:
                  avaliacaoUsuario && nota <= avaliacaoUsuario
                    ? "#facc15"
                    : "#d1d5db",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <p>{bar.bairro} · {bar.regiao}</p>

        <div className="bar-detalhes-vibes">
          {bar.vibe.map((v) => (
            <span key={v} className="bar-vibe">{v}</span>
          ))}
        </div>

        <section className="comentarios">
          <h2>💬 O que o pessoal anda falando</h2>

          <textarea
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            placeholder="Conta pra gente o que achou do bar..."
          />

          <button onClick={adicionarComentario}>
            Enviar comentário
          </button>
        </section>

        <Link href="/explorar">← Voltar para explorar</Link>
      </div>
    </main>
  );
}
