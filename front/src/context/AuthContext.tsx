"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/types";
import axios from "axios";

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

  const logout = () => {
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/logout`);
    sessionStorage.setItem("user", JSON.stringify(null));
    setUser(null);
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
