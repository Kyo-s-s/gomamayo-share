import { Post, User } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { getRequest } from "./request";
import PostCard from "@/components/PostCard";
import { useInView } from "framer-motion";
import { Box, Spinner } from "@chakra-ui/react";

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
        } else {
          setPosts([...posts, ...res.success]);
        }
      }
    };

    if (isInView) {
      fetchData();
    }
  }, [isInView]);

  return finish ? (
    <></>
  ) : (
    <Box ref={ref} textAlign="center">
      <Spinner thickness="5px" color="gray.400" speed="0.75s" size="xl" />
    </Box>
  );
};

const usePosts = (path: string = "/posts") => {
  const [posts, setPosts] = useState<PostsApiResponse>([]);

  const reload = async () => {
    const res = await getRequest<PostsApiResponse>(path, { limit: "10" }, true);
    if (res.success) {
      setPosts(res.success);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const Posts = () => {
    return (
      <>
        {posts.map((post) => (
          <PostCard key={post.post.id} {...post} />
        ))}
        <PostLoader posts={posts} setPosts={setPosts} />
      </>
    );
  };
  return { Posts, reload };
};

export default usePosts;
