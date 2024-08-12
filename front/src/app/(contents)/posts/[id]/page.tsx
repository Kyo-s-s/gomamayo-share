"use client";

import Background from "@/components/Background";
import { LinkText } from "@/components/custom";
import PostCard from "@/components/PostCard";
import { Post, User } from "@/types/types";
import { getRequest } from "@/utils/request";
import {
  AbsoluteCenter,
  Box,
  Container,
  Flex,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type PostApiResponse = {
  user: User;
  post: Post;
  is_liked: boolean;
};

const PostPage = ({ id }: { id: string }) => {
  const [post, setPost] = useState<PostApiResponse | null>(null);
  // loading ?

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRequest<PostApiResponse>(`/posts/${id}`, {}, true);
      if (res.success) {
        setPost(res.success);
      }
    };
    if (post == null) fetchData();
  }, [post]);
  return (
    <>
      {post ? (
        <PostCard {...post} />
      ) : (
        // FIXME: Spinner.tsx に切り出す
        <Box textAlign="center">
          <Spinner thickness="5px" color="gray.400" speed="0.75s" size="xl" />
        </Box>
      )}
    </>
  );
};
const Page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Background />
      <Container maxW="container.md" height="90svh" position="relative">
        <AbsoluteCenter width="100%" px={4}>
          <PostPage id={params.id} />
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
