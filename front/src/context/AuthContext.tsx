"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/types";
import { deleteRequest } from "@/utils/request";
import useRedirect from "@/utils/useRedirect";
import { logoutRequest, tokenCheck } from "@/utils/auth";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// MEMO: session の user 情報がなくても、tokenが存在すればチェックしてログイン状態を復元はできている
//       token 情報を cookies に保存するようにすることで、ブラウザを閉じてもログイン状態を維持できる
const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const redirectTo = useRedirect();

  const storedUser = () => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser) as User;
    }
    return null;
  };

  const [user, setUser] = useState<User | null>(storedUser());

  const login = (user: User) => {
    setUser(user);
  };

  // TODO: ログアウト確認
  const logout = () => {
    logoutRequest();
    setUser(null);
    redirectTo("/");
  };

  useEffect(() => {
    const restorationUser = async () => {
      const user = await tokenCheck();
      if (user) {
        setUser(user);
      }
    };
    if (user == null) {
      restorationUser();
    }
  }, []);

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
