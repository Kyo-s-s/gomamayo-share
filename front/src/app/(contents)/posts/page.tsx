"use client";

import { useEffect, useRef, useState } from "react";
import { getRequest } from "../../../utils/request";
import { Post, User } from "../../../types/types";
import { Box, Container, Flex, IconButton, Link } from "@chakra-ui/react";
import PostCard from "@/components/PostCard";
import { useInView } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { AddIcon } from "@chakra-ui/icons";

type PostsApiResponse = {
  user: User;
  post: Post;
  is_liked: boolean;
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
      const params: Record<string, string> = { limit: "10" };
      if (posts.length > 0) {
        params["timestamp"] = posts[posts.length - 1].post.created_at;
      }
      const res = await getRequest<PostsApiResponse>(`/posts`, params, true);
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
  const { user } = useAuth();
  return (
    <Container maxW="container.md" height="100%">
      <Posts />
      {user && (
        <Flex justify={'flex-end'}>
          <Box position='fixed' bottom='20px'>
            <Link href="/posts/new">
              <IconButton
                position="sticky"
                isRound={true}
                variant="solid"
                aria-label="Post"
                icon={<AddIcon />}
              >
                New Post
              </IconButton>
            </Link>
          </Box>
        </Flex>
      )}
    </Container>
  );
};

export default Page;
