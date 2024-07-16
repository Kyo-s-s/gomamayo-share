"use client";

import React, { createContext, useContext, useState } from "react";
import { User } from "../types/types";
import { deleteRequest } from "@/utils/request";
import useNavigate from "@/utils/useNavigate";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const navigateTo = useNavigate();

  const storedUser = () => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser) as User;
    }
    return null;
  };

  const [user, setUser] = useState<User | null>(storedUser());

  const login = (user: User) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  // TODO: ログアウト確認
  const logout = () => {
    deleteRequest("/logout");
    sessionStorage.setItem("user", JSON.stringify(null));
    setUser(null);
    navigateTo("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
