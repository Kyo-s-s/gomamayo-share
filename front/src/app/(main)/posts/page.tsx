"use client";

import {
  Box,
  Container,
  Flex,
  IconButton,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@/components/custom";
import Background from "@/components/Background";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useMessage from "@/utils/useMessage";
import { TextForm } from "@/components/form";
import { createPostAction } from "@/actions/post";
import PostCard from "@/components/PostCard";
import { usePosts } from "@/utils/usePosts";

const PostButton = ({ onClick }: { onClick: () => void }) => (
  <Flex justify="flex-end" px="20px">
    <Box position="fixed" bottom="20px">
      <IconButton
        colorScheme="red"
        onClick={onClick}
        size="lg"
        isRound={true}
        aria-label="New Post"
        icon={<AddIcon />}
      />
    </Box>
  </Flex>
);

const NewPostModal = ({
  isOpen,
  onClose,
  reload,
}: {
  isOpen: boolean;
  onClose: () => void;
  reload: () => void;
}) => {
  const [content, setContent] = useState("");
  const { successMessage, errorMessage } = useMessage();

  const handlePost = async () => {
    const res = await createPostAction(content);
    if (res.ok) {
      successMessage({});
      onClose();
      setContent("");
      reload();
    } else {
      errorMessage({
        description: `${res.error}`,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx={2}>
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
  const { data: session } = useSession();
  const user = session?.user;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { posts, ref, finish, reload } = usePosts();

  return (
    <>
      <Background isScrollable />
      <Container maxW="container.md">
        <>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {!finish && <Box py={4} ref={ref} textAlign="center">
            Loading...
          </Box>}
        </>
        {user && (
          <PostButton onClick={onOpen} />
        )}
      </Container>
      <NewPostModal isOpen={isOpen} onClose={onClose} reload={reload} />
    </>
  );
};

export default Page;
