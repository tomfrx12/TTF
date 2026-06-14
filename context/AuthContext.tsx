"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type AuthUser = {
  id: string;
  firstname?: string;
  name?: string;
  email?: string;
  role?: {
    id: number;
    name: string;
  } | null;
};

type AuthContexteType = {
  isLog: boolean;
  isAdmin: boolean;
  user: AuthUser | null;
  Login: (email: string, password: string) => Promise<AuthUser | null>;
  Logout: () => Promise<void>;
};

const AuthContexte = createContext<AuthContexteType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLog, setIsLog] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.ok ? r.json() : null)
      .then((data: AuthUser | null) => {
        if (data?.id) {
          setUser(data);
          setIsLog(true);
        }
      })
      .catch(() => {});
  }, []);

  const Login = async (email: string, password: string): Promise<AuthUser | null> => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return null;
    }

    const loggedUser = (await response.json()) as AuthUser;
    setUser(loggedUser);
    setIsLog(true);
    return loggedUser;
  };

  const Logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setIsLog(false);
  };

  const isAdmin = (user?.role?.name ?? "").toLowerCase().includes("admin");

  return (
    <AuthContexte.Provider value={{ isLog, isAdmin, user, Login, Logout }}>
      {children}
    </AuthContexte.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContexte);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
}
