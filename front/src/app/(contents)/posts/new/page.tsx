"use client";

import { useState } from "react";
import { postRequest } from "@/utils/request";
import { Post } from "@/types/types";
import { AbsoluteCenter, Container } from "@chakra-ui/react";
import useRedirect, { useRedirectIfNotLoggedIn } from "@/utils/useRedirect";
import { Form, TextForm } from "@/components/form";
import useMessage from "@/utils/useMessage";

const Page = () => {
  useRedirectIfNotLoggedIn();

  const redirectTo = useRedirect();
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
      redirectTo("/posts");
    } else {
      errorMessage({
        description: `${res.failure.message}`,
      });
    }
  };

  return (
    <Container maxW="container.sm" height="90vh" position="relative">
      <AbsoluteCenter width="100%" pb="10vh" px={4}>
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
