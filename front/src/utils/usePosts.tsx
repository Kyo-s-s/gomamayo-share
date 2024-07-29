import { Post, User } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { getRequest } from "./request";
import PostCard from "@/components/PostCard";
import { useInView } from "framer-motion";
import { Box } from "@chakra-ui/react";

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

const usePosts = (path: string = "/posts") => {
  const [posts, setPosts] = useState<PostsApiResponse>([]);

  const reload = async () => {
    const params = { limit: "10" };
    const res = await getRequest<PostsApiResponse>(path, params, true);
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
