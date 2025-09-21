import { redirect } from 'next/navigation';
import Background from "@/components/Background";
import {
  Container,
  AbsoluteCenter,
  Flex,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { LinkText } from "@/components/custom";
import { getPostAction } from "@/actions/post";
import PostCard from "@/components/PostCard";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await getPostAction(id);
  if (!res.ok) {
    redirect("/posts");
  }
  return (
    <>
      <Background />
      <Container maxW="container.md" height="90svh" position="relative">
        <AbsoluteCenter width="100%" px={4}>
          <PostCard post={res.data.post} />
          <Flex>
            <Spacer />
            <Box bg="rgba(255, 255, 255, 0.8)" px={2} borderRadius={4}>
              <LinkText href="/posts">タイムラインへ</LinkText>
            </Box>
          </Flex>
        </AbsoluteCenter>
      </Container>
    </>
  );
};

export default Page;
