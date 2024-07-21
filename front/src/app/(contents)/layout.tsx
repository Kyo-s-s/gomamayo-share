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
      <Box h="100%" w="100%" overflow="hidden" position="fixed">
        <Background />
      </Box>
      <Header />
      {children}
    </>
  );
}
