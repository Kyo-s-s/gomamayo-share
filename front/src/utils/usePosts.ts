import { getPostsAction } from "@/actions/post";
import { useInView } from "framer-motion";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { Post } from "@prisma/client";

export const usePosts = () => {
  const [finish, setFinish] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [posts, setPosts] = useState<(Post & { user: { id: string; name: string }, likesCount: number, isLiked: boolean })[]>([]);

  const loadPosts = async () => {
    const res = await getPostsAction(
      posts.length > 0 ? posts[posts.length - 1].id : undefined
    );
    console.log(res);
    if (res.ok) {
      if (res.data.posts.length === 0) {
        setFinish(true);
      } else {
        setPosts(prevPosts => [...prevPosts, ...res.data.posts]);
      }
    }
  }

  useEffect(() => {
    if (isInView && !finish) {
      loadPosts();
    }
  }, [isInView, finish]);

  const reload = async () => {
    const res = await getPostsAction(undefined);
    if (res.ok) {
      setFinish(false);
      setPosts(res.data.posts);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  return { posts, ref, finish, reload };
}
