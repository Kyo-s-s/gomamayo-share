"use client";

import { useState } from "react";
import { postRequest } from "../../../utils/request";
import { Post } from "../../../types/types";
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
import { AddIcon } from "@chakra-ui/icons";
import { TextForm } from "@/components/form";
import useMessage from "@/utils/useMessage";
import { Button } from "@/components/custom";
import usePosts from "@/utils/usePosts";
import Background from "@/components/Background";
import { useSession } from "next-auth/react";

const PostButton = ({ onClick }: { onClick: () => void }) => {
  const { data: session, status } = useSession();
  const user = session?.user;
  if (!user) {
    return <></>;
  }
  return (
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
};

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
    const res = await postRequest<Post>(
      "/posts",
      { post: { content: content } },
      true
    );
    if (res.success) {
      successMessage({});
      onClose();
      setContent("");
      reload();
    } else {
      errorMessage({
        description: `${res.failure.message}`,
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { Posts, reload } = usePosts();

  return (
    <>
      <Background isScrollable />
      <Container maxW="container.md">
        <Posts />
        <PostButton onClick={onOpen} />
      </Container>
      <NewPostModal isOpen={isOpen} onClose={onClose} reload={reload} />
    </>
  );
};

export default Page;
