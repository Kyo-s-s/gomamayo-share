"use client";

import { ChakraProvider } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const AuthProvider = dynamic(() => import("../context/AuthContext"), {
  ssr: false,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  );
}
