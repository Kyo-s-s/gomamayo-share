"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Zen_Maru_Gothic } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: "500",
});

const zenMaruGothicBold = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: "700",
});

const theme = extendTheme({
  fonts: {
    body: zenMaruGothic.style.fontFamily,
    heading: zenMaruGothicBold.style.fontFamily,
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider>{children}</SessionProvider>
    </ChakraProvider>
  );
}
