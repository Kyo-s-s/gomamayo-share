"use client";

import { Post, User } from "@/types/types";
import { Link } from "@chakra-ui/next-js";
import { Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Button } from "./custom";
import { deleteRequest, postRequest } from "@/utils/request";

type PostCardProps = {
  post: Post;
  user: User;
  is_liked: boolean;
};

// FIXME: ログアウトしてもlikeが保持されてしまう
// APIサーバー側でログアウトしてもセッションが残っている バグ
const PostCard = ({ post, user, is_liked }: PostCardProps) => {
  const [liked, setLiked] = useState(is_liked);
  const likes_count = post.likes_count + (liked ? 1 : 0) - (is_liked ? 1 : 0);

  // TODO: 5secくらいの間弄れないようにする
  const handleLike = async () => {
    liked
      ? deleteRequest(`/likes/${post.id}`)
      : postRequest(`/likes/${post.id}`);
    setLiked(!liked);
  };

  return (
    <Card my={2}>
      <CardBody>
        <Flex gap={4}>
          <Link href={`/users/${user.id}`}>{user.name}</Link>
          <Text>{post.created_at}</Text>
          <Text>{likes_count}</Text>
          <Button
            onClick={handleLike}
            colorScheme="teal"
            variant={liked ? "solid" : "outline"}
          />
        </Flex>
        <Text>{post.content}</Text>
      </CardBody>
    </Card>
  );
};

export default PostCard;
