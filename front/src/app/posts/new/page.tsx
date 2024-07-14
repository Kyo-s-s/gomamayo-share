"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { postRequest } from "@/utils/request";
import { Post } from "@/types/types";
import {
  FormControl,
  FormLabel,
  Heading,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Button } from "@/components/custom";

// FIXME: move utils
const useNavigate = () => {
  const router = useRouter();

  const navigateTo = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router]
  );

  return navigateTo;
};

const PostForm = () => {
  const { user, login } = useAuth();
  const navigateTo = useNavigate();
  if (user == null) {
    navigateTo(`/signup`);
  }

  const [content, setContent] = useState("");
  const toast = useToast();

  const handlePost = async () => {
    let res = await postRequest<Post>("/posts", {
      post: { content: content },
    });
    if (res.success) {
      navigateTo("/posts");
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
  return (
    <>
      <Heading>new post</Heading>
      <PostForm />
    </>
  );
};

export default Page;
