"use client";

import Background from "@/components/Background";
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

  const fetchData = async () => {
    const res = await getRequest<PostsApiResponse>("/posts/ranking", {}, true);
    if (res.success) {
      setPosts(res.success);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <PostCard
          deleteAction={() => fetchData()}
          key={post.post.id}
          {...post}
        />
      ))}
    </>
  );
};

const Page = () => {
  return (
    <>
      <Background isScrollable />
      <Container maxW="container.md">
        <Heading position="relative">Ranking</Heading>
        <PostRanking />
      </Container>
    </>
  );
};

export default Page;
