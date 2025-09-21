"use client";

import { Post } from "@prisma/client";
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
import { useSession } from "next-auth/react";
import { formatDistanceToNow, format } from "date-fns";
import { ja } from "date-fns/locale";
import useMessage from "@/utils/useMessage";
import Interrobang from "./Interrobang";
import { FaRegTrashCan } from "react-icons/fa6";
import { deletePostAction } from "@/actions/post";
import { createLikeAction, deleteLikeAction } from "@/actions/like";

const formatPostTime = (date: Date): string => {
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
}: {
  post: Post;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { successMessage, errorMessage } = useMessage();
  const handleDelete = async () => {
    const res = await deletePostAction(post.id);
    if (res.ok) {
      successMessage({
        description: "投稿を削除しました。",
      });
    } else {
      errorMessage({
        description: `${"エラーが発生しました。"}`,
      });
    }
    window.location.reload();
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
  ranking,
}: {
  post: Post & { user: { id: string; name: string }, likesCount: number, isLiked: boolean };
  ranking?: number;
}) => {
  const { data: session } = useSession();
  const loginUser = session?.user;
  const [liked, setLiked] = useState(post.isLiked);
  const [isLocked, setIsLocked] = useState(false);
  const { errorMessage } = useMessage();

  const postURL = `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post.id}`;

  const likesCount = post.likesCount + (liked ? 1 : 0) - (post.isLiked ? 1 : 0);

  const handleLike = async () => {
    if (!loginUser) {
      errorMessage({
        description: "ログインしてください。",
      });
      return;
    }
    if (isLocked) return;
    if (liked) {
      await deleteLikeAction(post.id);
    } else {
      await createLikeAction(post.id);
    }
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
          <Text>{post.user.name}</Text>
          <Spacer />
          <Text>{formatPostTime(post.createdAt)}</Text>
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
          {loginUser?.id === post.user.id && (
            <DeleteButton post={post} />
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
