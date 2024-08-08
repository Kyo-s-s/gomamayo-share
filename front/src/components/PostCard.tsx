"use client";

import { Post, User } from "@/types/types";
import { Link } from "@chakra-ui/next-js";
import { Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Button, TwitterShareButton } from "./custom";
import { deleteRequest, postRequest } from "@/utils/request";
import { useAuth } from "@/context/AuthContext";
import { formatDistanceToNow, format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import useMessage from "@/utils/useMessage";

type PostCardProps = {
  post: Post;
  user: User;
  is_liked: boolean;
};

const formatPostTime = (dateStr: string): string => {
  const date = parseISO(dateStr);
  const now = new Date();
  const diffInDay = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
  if (diffInDay < 1) {
    return formatDistanceToNow(date, { addSuffix: true, locale: ja });
  } else {
    return format(date, "yyyy/MM/dd");
  }
};

const PostCard = ({ post, user, is_liked }: PostCardProps) => {
  const { user: login_user } = useAuth();
  const [liked, setLiked] = useState(is_liked);
  const [isLocked, setIsLocked] = useState(false);
  const { errorMessage } = useMessage();

  const postURL = `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post.id}`;

  const likes_count = post.likes_count + (liked ? 1 : 0) - (is_liked ? 1 : 0);

  const handleLike = async () => {
    if (!login_user) {
      errorMessage({
        description: "Please log in",
      });
      return;
    }
    if (isLocked) return;
    liked
      ? deleteRequest(`/likes/${post.id}`, true)
      : postRequest(`/likes/${post.id}`, {}, true);
    setLiked(!liked);
    setIsLocked(true);

    setTimeout(() => {
      setIsLocked(false);
    }, 3000);
  };

  return (
    <Card my={2}>
      <CardBody>
        <Flex gap={4}>
          <Link href={`/users/${user.id}`}>{user.name}</Link>
          <Text>{formatPostTime(post.created_at)}</Text>
        </Flex>
        <Text>{post.content}</Text>
        <Flex gap={2}>
          <Button
            size="sm"
            onClick={handleLike}
            colorScheme="red"
            variant={liked ? "solid" : "outline"}
          >
            ⁉
          </Button>
          <Text>{likes_count}</Text>
          <TwitterShareButton text={post.content} url={postURL} hashtags="GomamayoShare">
            tweet
          </TwitterShareButton>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default PostCard;
