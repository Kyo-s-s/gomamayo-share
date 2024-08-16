"use client";

import { Post, User } from "@/types/types";
import {
  Badge,
  Card,
  CardBody,
  Center,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { Button, TwitterShareButton } from "./custom";
import { deleteRequest, postRequest } from "@/utils/request";
import { useAuth } from "@/context/AuthContext";
import { formatDistanceToNow, format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import useMessage from "@/utils/useMessage";
import Interrobang from "./Interrobang";
import { FaRegTrashCan } from "react-icons/fa6";

type PostCardProps = {
  post: Post;
  user: User;
  is_liked: boolean;
  deleteAction: (post: Post) => void;
  ranking?: number;
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

const DeleteButton = ({
  post,
  deleteAction,
}: {
  post: Post;
  deleteAction: (post: Post) => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { successMessage, errorMessage } = useMessage();
  const handleDelete = async () => {
    const res = await deleteRequest(`/posts/${post.id}`, true);
    if (res.success) {
      deleteAction(post);
      successMessage({
        description: "投稿を削除しました。",
      });
    } else {
      errorMessage({
        description: `${res.failure?.message || "エラーが発生しました。"}`,
      });
      window.location.reload();
    }
  };
  return (
    <>
      <IconButton
        size="sm"
        aria-label="post delete"
        p={0}
        icon={<FaRegTrashCan size={18} />}
        variant="ghost"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={2}>
          <ModalHeader>削除確認</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              削除すると元に戻すことはできません。 本当に削除しますか？
            </Text>
            <Text>投稿内容: {post.content}</Text>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button colorScheme="red" onClick={handleDelete}>
              削除
            </Button>
            <Button onClick={onClose}>キャンセル</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const PostCard = ({
  post,
  user,
  is_liked,
  deleteAction,
  ranking,
}: PostCardProps) => {
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
        {ranking && (
          <Center>
            <Badge fontSize="1em" colorScheme="red">
              {ranking}位
            </Badge>
          </Center>
        )}
        <Flex>
          <Text>{user.name}</Text>
          <Spacer />
          <Text>{formatPostTime(post.created_at)}</Text>
        </Flex>
        <Text py={1}>{post.content}</Text>
        <Flex alignItems="center" gap={4}>
          <Flex alignItems="center" gap={2}>
            <Button size="sm" p={0} variant="ghost" onClick={handleLike}>
              <Interrobang size={5} isWhite={!liked} />
            </Button>
            <Text verticalAlign="baseline">{likesCount}</Text>
          </Flex>
          <Spacer />
          {loginUser?.id === user.id && (
            <DeleteButton post={post} deleteAction={deleteAction} />
          )}
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
