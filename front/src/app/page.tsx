"use client";

import Background from "@/components/Background";
import { Emoji } from "@/components/emoji";
import { useAuth } from "@/context/AuthContext";
import { Link } from "@chakra-ui/next-js";
import {
  AbsoluteCenter,
  Box,
  Button,
  Container,
  Heading,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const TopButton = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href}>
      <Button
        border="1px"
        fontSize="25px"
        borderRadius="30px"
        p="30px"
        bg="white"
      >
        {children}
      </Button>
    </Link>
  );
};

const MainBox = () => {
  const { user } = useAuth();

  return (
    <Box height="100vh" position="relative" overflow="hidden">
      <Background />
      <AbsoluteCenter>
        <VStack spacing={8} position="relative">
          <Heading fontSize="4em">Gomamayo Share</Heading>
          {user ? (
            <TopButton href="/posts">タイムライン</TopButton>
          ) : (
            <TopButton href="/signup">
              アカウント登録
              <Emoji shortcodes=":interrobang:" />
            </TopButton>
          )}
        </VStack>
      </AbsoluteCenter>
    </Box>
  );
};

const Home = () => {
  return (
    <>
      <MainBox />
      <Container maxW="container.lg"></Container>
    </>
  );
};

export default Home;
