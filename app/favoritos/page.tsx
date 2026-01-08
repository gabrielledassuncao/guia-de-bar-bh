"use client";

import { useEffect, useState } from "react";
import { bares, Bar } from "@/data/bares";
import BarCard from "@/components/BarCard";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState<Bar[]>([]);

  useEffect(() => {
    const favoritosIds: number[] = JSON.parse(
      localStorage.getItem("favoritos") || "[]"
    );

    const baresFavoritos = bares.filter((bar) =>
      favoritosIds.includes(bar.id)
    );

    setFavoritos(baresFavoritos);
  }, []);

  return (
    <main>
      <h1>Meus Favoritos ❤️</h1>

      {favoritos.length === 0 ? (
        <p style={{ marginTop: "20px" }}>
          Você ainda não favoritou nenhum bar.
        </p>
      ) : (
        <div className="bars-grid">
          {favoritos.map((bar) => (
            <BarCard key={bar.id} bar={bar} />
          ))}
        </div>
      )}
    </main>
  );
}
