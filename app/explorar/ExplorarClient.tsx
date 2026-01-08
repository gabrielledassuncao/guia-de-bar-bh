"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { bares, Bar, vibesDisponiveis } from "@/data/bares";
import BarCard from "@/components/BarCard";
import VibeFilter from "@/components/VibeFilter";

export default function Explorar() {
  /* ===== URL ===== */
  const searchParams = useSearchParams();
  const router = useRouter();

  const termoBusca = searchParams.get("busca")?.toLowerCase() || "";

  /* ===== ESTADOS ===== */
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const [vibesSelecionadas, setVibesSelecionadas] = useState<string[]>([]);
  const [precoSelecionado, setPrecoSelecionado] = useState<
    "$" | "$$" | "$$$" | ""
  >("");
  const [ordem, setOrdem] = useState(
    searchParams.get("ordem") || "favoritos"
  );

  /* ===== FAVORITOS ===== */
  const favoritosIds: number[] =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("favoritos") || "[]")
      : [];

  /* ===== SINCRONIZA URL → ESTADO ===== */
  useEffect(() => {
    const vibesUrl = searchParams.get("vibes");
    const precoUrl = searchParams.get("preco");

    setVibesSelecionadas(vibesUrl ? vibesUrl.split(",") : []);
    setPrecoSelecionado(
      precoUrl === "$" || precoUrl === "$$" || precoUrl === "$$$"
        ? precoUrl
        : ""
    );
  }, [searchParams]);

  /* ===== FUNÇÕES ===== */
  function atualizarVibes(novasVibes: string[]) {
    setVibesSelecionadas(novasVibes);

    const params = new URLSearchParams(searchParams.toString());
    novasVibes.length > 0
      ? params.set("vibes", novasVibes.join(","))
      : params.delete("vibes");

    router.push(`/explorar?${params.toString()}`);
  }

  function atualizarPreco(preco: "$" | "$$" | "$$$" | "") {
    setPrecoSelecionado(preco);

    const params = new URLSearchParams(searchParams.toString());
    preco ? params.set("preco", preco) : params.delete("preco");

    router.push(`/explorar?${params.toString()}`);
  }

  function limparFiltros() {
    setVibesSelecionadas([]);
    setPrecoSelecionado("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("vibes");
    params.delete("preco");

    router.push(`/explorar?${params.toString()}`);
  }

  function atualizarOrdem(novaOrdem: string) {
    setOrdem(novaOrdem);

    const params = new URLSearchParams(searchParams.toString());
    params.set("ordem", novaOrdem);

    router.push(`/explorar?${params.toString()}`);
  }

  /* ===== FILTRO + ORDENAÇÃO ===== */
  const baresFiltrados = bares
    .filter((bar) => {
      const matchBusca =
        bar.nome.toLowerCase().includes(termoBusca) ||
        bar.bairro.toLowerCase().includes(termoBusca) ||
        bar.regiao.toLowerCase().includes(termoBusca) ||
        bar.vibe.some((v) => v.toLowerCase().includes(termoBusca));

      const matchVibe =
        vibesSelecionadas.length === 0 ||
        bar.vibe.some((v) => vibesSelecionadas.includes(v));

      const matchPreco =
        !precoSelecionado || bar.preco === precoSelecionado;

      return matchBusca && matchVibe && matchPreco;
    })
    .sort((a, b) => {
      if (ordem === "favoritos") {
        const aFav = favoritosIds.includes(a.id);
        const bFav = favoritosIds.includes(b.id);
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
        return b.nota - a.nota;
      }

      if (ordem === "avaliacao") return b.nota - a.nota;
      if (ordem === "az") return a.nome.localeCompare(b.nome);
      if (ordem === "regiao") return a.regiao.localeCompare(b.regiao);

      return 0;
    });

  /* ===== JSX ===== */
  return (
    <main className="explorar-layout">

<button
  className="btn-filtros-mobile"
  onClick={() => setFiltrosAbertos(!filtrosAbertos)}
>
  🎯 Filtros
</button>


      {/* SIDEBAR */}
      <aside
  className={`explorar-sidebar ${
    filtrosAbertos ? "aberta" : ""
  }`}
>

        <h2>Filtros</h2>

        <VibeFilter
          vibes={vibesDisponiveis}
          selecionadas={vibesSelecionadas}
          onChange={atualizarVibes}
        />

        <div className="filtro-preco">
          <p>Preço:</p>
          {["$", "$$", "$$$"].map((p) => (
            <button
              key={p}
              onClick={() =>
                atualizarPreco(precoSelecionado === p ? "" : (p as any))
              }
              style={{
                marginRight: "8px",
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                background:
                  precoSelecionado === p ? "#111" : "#fff",
                color:
                  precoSelecionado === p ? "#fff" : "#111",
                cursor: "pointer",
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {(vibesSelecionadas.length > 0 || precoSelecionado) && (
          <button
            className="clear-filters"
            onClick={limparFiltros}
            type="button"
          >
            Limpar filtros
          </button>
        )}
      </aside>

      {/* CONTEÚDO */}
      <section className="explorar-content">
        <div className="explorar-topo">
          <h1>Explorar Bares</h1>

          <select
            className="ordenacao-select"
            value={ordem}
            onChange={(e) => atualizarOrdem(e.target.value)}
          >
            <option value="favoritos">Favoritos</option>
            <option value="avaliacao">⭐ Avaliação</option>
            <option value="az">A–Z</option>
            <option value="regiao">Região</option>
          </select>
        </div>

        <div className="bars-grid">
          {baresFiltrados.map((bar) => (
            <BarCard key={bar.id} bar={bar} />
          ))}
        </div>
      </section>
    </main>
  );
}
