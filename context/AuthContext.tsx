"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

type AuthContexteType = {
  isLog: boolean;
  Login: () => Promise<boolean>;
  Logout: () => void;
};

const AuthContexte = createContext<AuthContexteType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLog, setIsLog] = useState<boolean>(false);

    const Login = async (): Promise<boolean> => {
      setIsLog(true);
      return true;
    };

  const Logout = () => {
    setIsLog(false);
  };

  return (
    <AuthContexte.Provider value={{ isLog, Login, Logout }}>
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