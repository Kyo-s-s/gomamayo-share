"use client";

import { useSession, signIn, signOut } from "next-auth/react"
import Background from "@/components/Background";
import { LinkButton, LinkText } from "@/components/custom";
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
  useBreakpointValue,
  VStack,
  HStack,
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


const TopButtonAndExplanation = () => {
  const { data: session, status } = useSession();
  if (status == "loading") {
    // FIXME: ローディング中の表示
    return <Text>Loading...</Text>
  }

  if (session) {
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

const MainBox = ({ aboutMoreAction }: { aboutMoreAction: () => void }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { data: session, status } = useSession();
  const user = session?.user;
  console.log(user);

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
          {isDesktop ? (
            <Heading fontSize="3.5em">Gomamayo Share</Heading>
          ) : (
            <VStack spacing={0}>
              <Heading fontSize="3.5em">Gomamayo</Heading>
              <Heading fontSize="3.5em">Share</Heading>
            </VStack>
          )}
          <TopButtonAndExplanation />
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

const Home = () => {
  const aboutMoreRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Background isScrollable />
      <MainBox
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
              MeCabを用いて形態素解析を行い、品詞に分割してから連続する品詞の接頭辞/接尾辞が一致しているかでゴママヨ判定をしています。
              このため、MeCabによって固有名詞と認識される単語(例:
              &quot;サイレンススズカ&quot; )などは投稿できません。
              半角スペースを挟むことでその箇所で品詞の分割が行われるため、投稿できない場合はこちらを試してみてください。
            </Text>
          </Explanation>
          <Explanation title="サイトの動作についての注意">
            <Text>
              このサイトのバックエンドはコスト削減のため一部無料サービスを利用しています。その仕様上、しばらくアクセスがない場合に
              バックエンドが一時的に停止することがあります。
              再度アクセスがあると起動処理が行われ、最大で1分程度お待ちいただくことがあります。あらかじめご了承ください。
            </Text>
          </Explanation>
          <Explanation title="問い合わせ・リンク">
            このサイトに関する問い合わせは、以下のリンクからお願いします。
            <UnorderedList pl={2}>
              <ListItem>
                一般的な問い合わせ:{" "}
                <LinkText href="https://x.com/Kyo_s_s">Twitter(X)</LinkText>
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
        </Container>
      </Box>
    </>
  );
};

export default Home;
