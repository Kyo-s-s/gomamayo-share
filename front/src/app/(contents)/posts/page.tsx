"use client";

import { useEffect, useRef, useState } from "react";
import { getRequest, postRequest } from "../../../utils/request";
import { Post, User } from "../../../types/types";
import {
  Box,
  Container,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import PostCard from "@/components/PostCard";
import { useInView } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { AddIcon } from "@chakra-ui/icons";
import { TextForm } from "@/components/form";
import useMessage from "@/utils/useMessage";
import { Button } from "@/components/custom";

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

const PostButton = ({ onClick }: { onClick: () => void }) => {
  const { user } = useAuth();
  if (!user) {
    return <></>;
  }
  return (
    <Flex justify={"flex-end"} px="20px">
      <Box position="fixed" bottom="20px">
        <IconButton
          onClick={onClick}
          size="lg"
          isRound={true}
          aria-label="New Post"
          icon={<AddIcon />}
        />
      </Box>
    </Flex>
  );
};

const NewPostModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [content, setContent] = useState("");
  const { successMessage, errorMessage } = useMessage();

  const handlePost = async () => {
    const res = await postRequest<Post>(
      "/posts",
      { post: { content: content } },
      true
    );
    if (res.success) {
      successMessage({}); // FIXME: 一番上に出てこない
      onClose();
    } else {
      errorMessage({
        description: `${res.failure.message}`,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ゴママヨ投稿</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TextForm
            value={content}
            setValue={setContent}
            placeholder="ごまマヨネーズ"
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handlePost}>投稿</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Page = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Container maxW="container.md" pt="50px">
        <Posts />
        <PostButton onClick={onOpen} />
      </Container>
      <NewPostModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Page;
