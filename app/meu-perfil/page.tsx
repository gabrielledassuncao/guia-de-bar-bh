"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { bares } from "@/data/bares";
import BarCard from "@/components/BarCard";

export default function MeuPerfil() {
  const { user, logout } = useAuth();

  // 🔒 Se não estiver logado
  if (!user) {
    return (
      <main>
        <h1>Meu Perfil</h1>
        <p>Você precisa estar logado para acessar esta página.</p>
        <p>Clique em “Entrar” no topo da página.</p>
      </main>
    );
  }

  // ❤️ Favoritos
  const favoritosIds: number[] = JSON.parse(
    localStorage.getItem("favoritos") || "[]"
  );

  const baresFavoritos = bares.filter((bar) =>
    favoritosIds.includes(bar.id)
  );

  // ⭐ Avaliações feitas pelo usuário
  const avaliacoesUsuario = bares
    .map((bar) => {
      const nota = localStorage.getItem(`avaliacao-bar-${bar.id}`);
      return nota
        ? { bar, nota: Number(nota) }
        : null;
    })
    .filter(Boolean) as { bar: any; nota: number }[];

  return (
    <main>
      <h1>👤 Meu Perfil</h1>

      <p>
        Olá, <strong>{user.nome}</strong>
      </p>

      <button
        onClick={logout}
        style={{
          marginBottom: "24px",
          background: "none",
          border: "1px solid #ccc",
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        Sair
      </button>

      {/* FAVORITOS */}
      <section style={{ marginBottom: "40px" }}>
        <h2>❤️ Meus Favoritos</h2>

        {baresFavoritos.length === 0 ? (
          <p>Você ainda não favoritou nenhum bar.</p>
        ) : (
          <div className="bars-grid">
            {baresFavoritos.map((bar) => (
              <BarCard key={bar.id} bar={bar} />
            ))}
          </div>
        )}
      </section>

      {/* AVALIAÇÕES */}
      <section>
        <h2>⭐ Minhas Avaliações</h2>

        {avaliacoesUsuario.length === 0 ? (
          <p>Você ainda não avaliou nenhum bar.</p>
        ) : (
          <ul>
            {avaliacoesUsuario.map(({ bar, nota }) => (
              <li key={bar.id}>
                <Link href={`/bar/${bar.id}`}>
                  {bar.nome}
                </Link>{" "}
                — ⭐ {nota}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
