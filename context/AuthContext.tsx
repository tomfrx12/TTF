"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

type User = {
  id: string;
  name?: string;
};

type AuthContexteType = {
  isLog: boolean;
  user: User | null;
  Login: () => Promise<boolean>;
  Logout: () => void;
};

const AuthContexte = createContext<AuthContexteType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLog, setIsLog] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const Login = async (): Promise<boolean> => {
    const demoUser: User = { id: "demo-user", name: "Demo User" };
    setUser(demoUser);
    setIsLog(true);
    return true;
  };

  const Logout = () => {
    setUser(null);
    setIsLog(false);
  };

  return (
    <AuthContexte.Provider value={{ isLog, user, Login, Logout }}>
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