"use client";

import { useState } from "react";
import { postRequest } from "@/utils/request";
import { Post } from "@/types/types";
import {
  Container,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Button } from "@/components/custom";
import useRedirect, { useRedirectIfNotLoggedIn } from "@/utils/useRedirect";

const PostForm = () => {
  const redirectTo = useRedirect();
  const [content, setContent] = useState("");
  const toast = useToast();

  const handlePost = async () => {
    const res = await postRequest<Post>("/posts", {
      post: { content: content },
    });
    if (res.success) {
      toast({
        title: `Success!!`,
        position: "top",
        duration: 1000,
        isClosable: true,
        status: "success",
      });
      redirectTo("/posts");
    } else {
      toast({
        title: `Error!!`,
        description: `${res.failure.message}`,
        position: "top",
        duration: 3000,
        isClosable: true,
        status: "error",
      });
    }
  };

  return (
    <>
      <FormControl>
        <FormLabel>content</FormLabel>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="ごまマヨネーズ"
        />
      </FormControl>
      <Button onClick={handlePost}>Post</Button>
    </>
  );
};

const Page = () => {
  useRedirectIfNotLoggedIn();
  return (
    <Container maxW="container.md">
      <PostForm />
    </Container>
  );
};

export default Page;
