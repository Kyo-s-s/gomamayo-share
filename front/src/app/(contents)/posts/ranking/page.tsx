"use client";

import PostCard from "@/components/PostCard";
import { Post, User } from "@/types/types";
import { getRequest } from "@/utils/request";
import { Container, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type PostsApiResponse = {
  user: User;
  post: Post;
  is_liked: boolean;
}[];

const PostRanking = () => {
  const [posts, setPosts] = useState<PostsApiResponse>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRequest<PostsApiResponse>(
        "/posts/ranking",
        {},
        true
      );
      if (res.success) {
        setPosts(res.success);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.post.id} {...post} />
      ))}
    </>
  );
};

const Page = () => {
  return (
    <Container maxW="container.md" pt="50px">
      <Heading position="relative">Ranking</Heading>
      <PostRanking />
    </Container>
  );
};

export default Page;
