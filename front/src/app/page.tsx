"use client";

import Background from "@/components/Background";
import Interrobang from "@/components/Interrobang";
import { useAuth } from "@/context/AuthContext";
import { Link } from "@chakra-ui/next-js";
import {
  AbsoluteCenter,
  Box,
  Button,
  Container,
  Heading,
  Text,
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
    <Box height="100svh" position="relative" overflow="hidden">
      <Background />
      <AbsoluteCenter>
        <VStack spacing={8} position="relative">
          <Heading fontSize="4em">Gomamayo Share</Heading>
          {user ? (
            <TopButton href="/posts">タイムライン</TopButton>
          ) : (
            <TopButton href="/signup">
              <Text display="inline-block" verticalAlign="middle">
                アカウント登録
              </Text>
              <Interrobang
                mx={1}
                size={8}
                display="inline-block"
                verticalAlign="text-top"
              />
            </TopButton>
          )}
        </VStack>
      </AbsoluteCenter>
    </Box>
  );
};

const Explanation = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <Heading>{title}</Heading>
      <Box pl={4} py={2}>
        {children}
      </Box>
    </>
  );
};

const Home = () => {
  return (
    <>
      <MainBox />
      <Container
        maxW="container.lg"
        position="relative"
        bg="rgba(255, 255, 255, 0.8)"
        py={4}
        my={4}
      >
        <Explanation title="ゴママヨって何？">
          <Text>TODO</Text>
        </Explanation>
        <Explanation title="このサイトは何？">
          <Text>
            気に入ったゴママヨを投稿し、他の人と共有するためのサイトです。
            ゴママヨを投稿したり、他の人が投稿したゴママヨを見ていいねすることができます。
          </Text>
        </Explanation>
        <Explanation title="投稿できないんだけど？">
          <Text>
            MeCabを用いて形態素解析を行い、品詞に分割してから連続する品詞の接頭辞/接尾辞が一致しているかどうかを判定しています。
            このため、MeCabによって固有名詞と認識される単語(例:サイレンススズカ)は投稿できません。
            半角スペースを挟むことでその箇所で品詞の分割が行われるため、投稿できない場合はこちらを試してみてください。
          </Text>
        </Explanation>
        <Explanation title="開発情報">
          GitHubは
          <Link href="https://github.com/Kyo-s-s/gomamayo-share">こちら</Link>
          です。
        </Explanation>
      </Container>
    </>
  );
};

export default Home;
