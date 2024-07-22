"use client";

import { useState } from "react";
import { postRequest } from "@/utils/request";
import { Post } from "@/types/types";
import {
  AbsoluteCenter,
  Container,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Button } from "@/components/custom";
import useRedirect, { useRedirectIfNotLoggedIn } from "@/utils/useRedirect";
import { Form, TextForm } from "@/components/form";

const PostForm = () => {
  const redirectTo = useRedirect();
  const [content, setContent] = useState("");
  const toast = useToast();

  const handlePost = async () => {
    const res = await postRequest<Post>(
      "/posts",
      {
        post: { content: content },
      },
      true
    );
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

  const redirectTo = useRedirect();
  const [content, setContent] = useState("");
  const toast = useToast();

  const handlePost = async () => {
    const res = await postRequest<Post>(
      "/posts",
      {
        post: { content: content },
      },
      true
    );
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
    <Container maxW="container.sm" height="90vh" position="relative">
      <AbsoluteCenter width="100%" pb="10vh">
        <Form title="ゴママヨ投稿" onSubmit={handlePost} submitButton="投稿">
          <TextForm
            value={content}
            setValue={setContent}
            placeholder="ごまマヨネーズ"
          />
        </Form>
      </AbsoluteCenter>
    </Container>
  );
};

export default Page;
