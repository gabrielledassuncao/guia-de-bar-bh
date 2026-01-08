"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [busca, setBusca] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!busca.trim()) return;

    router.push(`/explorar?busca=${encodeURIComponent(busca)}`);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Busque por nome, bairro ou região do bar"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
