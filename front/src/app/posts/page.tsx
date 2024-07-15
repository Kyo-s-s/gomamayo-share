"use client";

import { useEffect, useRef, useState } from "react";
import { getRequest } from "../../utils/request";
import { Post, User } from "../../types/types";
import { Box, Heading } from "@chakra-ui/react";
import PostCard from "@/components/PostCard";
import { useInView } from "framer-motion";

type PostsApiResponse = {
  user: User;
  post: Post;
}[];

const PostLoader = ({
  posts,
  setPosts,
}: {
  posts: PostsApiResponse;
  setPosts: (post: PostsApiResponse) => void;
}) => {
  const [finish, setFinish] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref);
  useEffect(() => {
    const fetchData = async () => {
      const timestamp =
        posts.length > 0
          ? `timestamp=${posts[posts.length - 1].post.created_at}`
          : "";
      const res = await getRequest<PostsApiResponse>(
        `/posts?limit=20&${timestamp}`
      );
      if (res.success) {
        if (res.success.length === 0) {
          setFinish(true);
        }
        setPosts([...posts, ...res.success]);
      }
    };

    if (isInView) {
      fetchData();
    }
  }, [isInView]);

  return finish ? <></> : <Box ref={ref}>Loading...</Box>;
};

const Posts = () => {
  const [posts, setPosts] = useState<PostsApiResponse>([]);

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.post.id} {...post} />
      ))}
      <PostLoader posts={posts} setPosts={setPosts} />
    </>
  );
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
