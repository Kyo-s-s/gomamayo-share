import Background from "@/components/Background";
import Header from "@/components/Header";
import { Box } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Background />
      {children}
    </>
  );
}
