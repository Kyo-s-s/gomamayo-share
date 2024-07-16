"use client";

import { Post, User } from "@/types/types";
import { Link } from "@chakra-ui/next-js";
import { Card, CardBody, Flex, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Button } from "./custom";
import { deleteRequest, postRequest } from "@/utils/request";
import { useAuth } from "@/context/AuthContext";

type PostCardProps = {
  post: Post;
  user: User;
  is_liked: boolean;
};

const PostCard = ({ post, user, is_liked }: PostCardProps) => {
  const { user: login_user } = useAuth();
  const [liked, setLiked] = useState(is_liked);
  const [isLocked, setIsLocked] = useState(false);
  const likes_count = post.likes_count + (liked ? 1 : 0) - (is_liked ? 1 : 0);
  const toast = useToast();

  const handleLike = async () => {
    if (!login_user) {
      toast({
        title: "Error!!",
        description: "Please log in",
        position: "top",
        duration: 3000,
        isClosable: true,
        status: "error",
      });
      return;
    }
    if (isLocked) return;
    liked
      ? deleteRequest(`/likes/${post.id}`)
      : postRequest(`/likes/${post.id}`);
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
