"use client";

import { Post, User } from "@/types/types";
import { getRequest } from "@/utils/request";
import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type PostApiResponse = {
  user: User;
  post: Post;
};

const PostPage = ({ id }: { id: string }) => {
  const [posts, setPosts] = useState<PostApiResponse | null>(null);
  // loading ?

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRequest<PostApiResponse>(`/posts/${id}`);
      if (res.success) {
        setPosts(res.success);
      }
    };
    if (posts == null) fetchData();
  }, [posts]);
  return <p>{JSON.stringify(posts)}</p>;
};
const Page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Heading>posts {params.id}</Heading>
      <PostPage id={params.id} />
    </>
  );
};

export default Page;
