"use client";

import Background from "@/components/Background";
import PostCard from "@/components/PostCard";
import { Post, User } from "@/types/types";
import { getRequest } from "@/utils/request";
import { Heading } from "@chakra-ui/react";
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
  return <>{post ? <PostCard {...post} /> : <p>Loading...</p>}</>;
};
const Page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Background />
      <Heading>posts {params.id}</Heading>
      <PostPage id={params.id} />
    </>
  );
};

export default Page;
