"use client";

import { useEffect, useState } from "react";
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
import useNavigate from "@/utils/useNavigate";

const PostForm = () => {
  const { user } = useAuth();
  const navigateTo = useNavigate();
  const [content, setContent] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (user == null) {
      navigateTo(`/login`);
    }
  }, [user]);

  const handlePost = async () => {
    const res = await postRequest<Post>("/posts", {
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
