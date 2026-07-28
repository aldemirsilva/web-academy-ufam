"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

type AuthContextType = {
  email: string | null;
  login: (email: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  email: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setEmail(user);
    }
  }, []);

  const login = (email: string) => {
    setEmail(email);
    localStorage.setItem("user", email);
    router.push("/");
  };

  const logout = () => {
    setEmail(null);
    localStorage.setItem("user", "");
    router.push("/login");
  };

  const values = {
    email,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
