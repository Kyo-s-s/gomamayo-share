"use client";

import Background from "@/components/Background";
import { BackHeader } from "@/components/Header";
import PostCard from "@/components/PostCard";
import { Post, User } from "@/types/types";
import { Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type PostsApiResponse = {
  user: User;
  post: Post;
  is_liked: boolean;
}[];

const PostRanking = () => {
  const [posts] = useState<PostsApiResponse>([]);

  const fetchData = async () => {
    // const res = await getRequest<PostsApiResponse>("/posts/ranking", {}, true);
    // if (res.success) {
    //   setPosts(res.success);
    // }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {posts.map((post, idx) => (
        <PostCard
          deleteAction={() => fetchData()}
          key={post.post.id}
          ranking={idx + 1}
          {...post}
        />
      ))}
    </>
  );
};

const Page = () => {
  return (
    <>
      <BackHeader title="ランキング" />
      <Background isScrollable />
      <Container maxW="container.md">
        <PostRanking />
      </Container>
    </>
  );
};

export default Page;
