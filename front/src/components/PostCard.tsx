"use client";

import { Post, User } from "@/types/types";
import { Card, CardBody, Flex, Spacer, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Button, TwitterShareButton } from "./custom";
import { deleteRequest, postRequest } from "@/utils/request";
import { useAuth } from "@/context/AuthContext";
import { formatDistanceToNow, format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import useMessage from "@/utils/useMessage";
import Interrobang from "./Interrobang";

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
  const { user: loginUser } = useAuth();
  const [liked, setLiked] = useState(is_liked);
  const [isLocked, setIsLocked] = useState(false);
  const { errorMessage } = useMessage();

  const postURL = `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post.id}`;

  const likesCount = post.likes_count + (liked ? 1 : 0) - (is_liked ? 1 : 0);

  const handleLike = async () => {
    if (!loginUser) {
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
      <CardBody p={4}>
        <Flex gap={4}>
          <Text>{user.name}</Text>
          <Spacer />
          <Text>{formatPostTime(post.created_at)}</Text>
        </Flex>
        <Text py={1}>{post.content}</Text>
        <Flex alignItems="center" gap={2}>
          <Button size="sm" p={0} variant="ghost" onClick={handleLike}>
            <Interrobang size={5} isWhite={!liked} />
          </Button>
          <Text verticalAlign="baseline">{likesCount}</Text>
          <Spacer />
          <TwitterShareButton
            text={post.content}
            url={postURL}
            hashtags="GomamayoShare"
          />
        </Flex>
      </CardBody>
    </Card>
  );
};

export default PostCard;
