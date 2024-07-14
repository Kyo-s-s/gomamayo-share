"use client";

import { useEffect, useState } from "react";
import { getRequest } from "../../utils/request";
import { Post, User } from "../../types/types";
import { Heading } from "@chakra-ui/react";

type PostsApiResponse = {
  user: User;
  post: Post;
}[];

const Posts = () => {
  const [posts, setPosts] = useState<PostsApiResponse | null>(null);
  // loading ?

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRequest<PostsApiResponse>("/posts");
      if (res.success) {
        setPosts(res.success);
      }
    };
    if (posts == null) fetchData();
  }, [posts]);
  return <p>{JSON.stringify(posts)}</p>;
};
const Page = () => {
  return (
    <>
      <Heading>posts</Heading>
      <Posts />
    </>
  );
};

export default Page;
