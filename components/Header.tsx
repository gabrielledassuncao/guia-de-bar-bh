"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, login, logout } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="header">
      <div className="header-top">
        <Link href="/" className="logo">
          🍺 Guia de Bar BH
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          ☰
        </button>
      </div>

      <nav className={`nav ${menuAberto ? "aberto" : ""}`}>
        <Link href="/explorar">Explorar</Link>
        <Link href="/top-bares">Top Bares</Link>
        <Link href="/top-bares-regiao">Top por Região</Link>
        <Link href="/bar-da-semana">Bar da Semana</Link>
        <Link href="/para-bares">Para Bares</Link>

        {user ? (
          <>
            <Link href="/meu-perfil">Meu Perfil</Link>
            <button onClick={logout}>Sair</button>
          </>
        ) : (
          <button onClick={login}>Entrar</button>
        )}
      </nav>
    </header>
  );
}
