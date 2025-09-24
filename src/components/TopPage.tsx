"use client";

import { signIn } from "next-auth/react"
import Background from "@/components/Background";
import { LinkText } from "@/components/custom";
import Interrobang from "@/components/Interrobang";
import {
  AbsoluteCenter,
  Box,
  Center,
  Container,
  Button,
  Heading,
  IconButton,
  ListItem,
  Text,
  UnorderedList,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
import { Link } from "@chakra-ui/next-js";

const KadomaruButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Button
    border="1px"
    fontSize="1.5em"
    borderRadius="30px"
    p="30px"
    bg="white"
    onClick={onClick}
  >
    {children}
  </Button>
)


const TopButtonAndExplanation = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  if (isLoggedIn) {
    return <Link href="/posts"><KadomaruButton>タイムラインへ</KadomaruButton></Link>
  }

  return <>
    <KadomaruButton onClick={() => signIn()}>
      <VStack spacing={0}>
        <HStack spacing={1}>
          <Text display="inline-block">アカウント登録</Text>
          <Interrobang mx={1} size={7} display="inline-block" />
        </HStack>
        <Text display="inline-block" fontSize="0.66em" color="gray.600">or ログイン</Text>
      </VStack>
    </KadomaruButton>
    <Text>
      アカウント登録せず{" "}
      <LinkText href="/posts">タイムラインへ</LinkText>
    </Text>
  </>
};

const MainBox = ({ aboutMoreAction, isLoggedIn }: { aboutMoreAction: () => void, isLoggedIn: boolean }) => {
  return (
    <Box height="100svh" position="relative" overflow="hidden">
      <AbsoluteCenter>
        <VStack
          spacing={8}
          position="relative"
          p={4}
          bg="rgba(255, 255, 255, 0.8)"
          borderRadius={8}
        >
          <Flex direction={{ base: "column", md: "row" }} gap={{ base: 0, md: 2 }} alignItems="center">
            <Heading fontSize="3.5em">Gomamayo</Heading>
            <Heading fontSize="3.5em">Share</Heading>
          </Flex>
          <TopButtonAndExplanation isLoggedIn={isLoggedIn} />
        </VStack>
      </AbsoluteCenter>
      <Center w="100%" position="absolute" bottom={4}>
        <IconButton
          aria-label="about more"
          variant="unstyled"
          onClick={aboutMoreAction}
          icon={<MdOutlineExpandMore size={60} />}
        />
      </Center>
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
    <Box py={4}>
      <Heading>{title}</Heading>
      <Box px={4} py={2}>
        {children}
      </Box>
    </Box>
  );
};

export const TopPage = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const aboutMoreRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Background isScrollable />
      <MainBox
        isLoggedIn={isLoggedIn}
        aboutMoreAction={() => {
          aboutMoreRef!.current!.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <Box p={2} ref={aboutMoreRef}>
        <Container
          maxW="container.md"
          position="relative"
          bg="rgba(255, 255, 255, 0.8)"
          borderRadius={8}
        >
          <Explanation title="ゴママヨとは？">
            <Text>
              ゴママヨとは、言葉遊びのひとつで、ある複合語の結合部で連続する同じ音が続いているものを指します。
              たとえば &quot;アカウント登録&quot; は、結合部で &quot;と&quot;
              が連続しているためゴママヨです。
            </Text>
          </Explanation>
          <Explanation title="このサイトは何？">
            <Text>
              気に入ったゴママヨを投稿し、他の人と共有するためのサイトです。
              ゴママヨを投稿したり、他の人が投稿したゴママヨを見ていいねすることができます。
            </Text>
          </Explanation>
          <Explanation title="投稿できないんだけど？">
            <Text>
              <LinkText href="https://developer.yahoo.co.jp/webapi/jlp/ma/v2/parse.html">Yahoo! JAPAN 日本語形態素解析 API</LinkText> を用いて形態素解析を行い、
              品詞に分割してから連続する品詞の接頭辞/接尾辞が一致しているかでゴママヨ判定をしています。
              このため、固有名詞と認識される単語(例: &quot;サイレンススズカ&quot;)などは投稿できません。
              半角スペースを挟むことでその箇所で品詞の分割が行われるため、投稿できない場合はこちらを試してみてください。
            </Text>
          </Explanation>
          <Explanation title="問い合わせ・リンク">
            このサイトに関する問い合わせは、以下のリンクからお願いします。
            <UnorderedList pl={2}>
              <ListItem>
                一般的な問い合わせ:{" "}
                <LinkText href="https://x.com/Kyo_s_s">X</LinkText>
                のDMでご連絡ください。
              </ListItem>
              <ListItem>
                バグ・不具合報告:{" "}
                <LinkText href="https://github.com/Kyo-s-s/gomamayo-share">
                  GitHub
                </LinkText>
                のIssueで報告をお願いします。
              </ListItem>
            </UnorderedList>
          </Explanation>
          <Explanation title="クレジット">
            {/* Begin Yahoo! JAPAN Web Services Attribution Snippet */}
            <LinkText href="https://developer.yahoo.co.jp/sitemap/">Web Services by Yahoo! JAPAN</LinkText>
            {/* End Yahoo! JAPAN Web Services Attribution Snippet */}
          </Explanation>
        </Container>
      </Box>
    </>
  );
};
