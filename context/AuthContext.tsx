"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  nome: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Carrega usuário salvo
  useEffect(() => {
    const salvo = localStorage.getItem("user");
    if (salvo) {
      setUser(JSON.parse(salvo));
    }
  }, []);

  function login() {
    const usuarioMock: User = {
      nome: "Gabrielle",
      email: "gabrielle@email.com",
    };

    setUser(usuarioMock);
    localStorage.setItem("user", JSON.stringify(usuarioMock));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
