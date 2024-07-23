"use client";

import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { AbsoluteCenter, Container, useToast } from "@chakra-ui/react";
import useRedirect, { useRedirectIfLoggedIn } from "@/utils/useRedirect";
import { signupRequest } from "@/utils/auth";
import { EmojiInterrobang } from "@/components/emoji";
import { Form, StringForm } from "@/components/form";

const Page = () => {
  useRedirectIfLoggedIn();

  const { login } = useAuth();
  const redirectTo = useRedirect();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const toast = useToast();

  const handleSignUp = async () => {
    const res = await signupRequest(name, password);
    if (res.success) {
      login(res.success);
      redirectTo(`/users/${res.success.id}`);
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

  const isPasswordInvalid = password.length < 6;
  const isPasswordConfirmInvalid =
    isPasswordInvalid || password !== passwordConfirm;

  return (
    <Container maxW="container.sm" height="90vh" position="relative">
      <AbsoluteCenter width="100%" pb="10vh" px={4}>
        <Form
          title={
            <>
              アカウント登録 <EmojiInterrobang />
            </>
          }
          onSubmit={handleSignUp}
          isInvalid={isPasswordConfirmInvalid}
        >
          <StringForm title="ユーザーネーム" value={name} setValue={setName} />
          <StringForm
            title="パスワード"
            value={password}
            setValue={setPassword}
            isPassword
            isInvalid={isPasswordInvalid}
          />
          <StringForm
            title="パスワード(確認)"
            value={passwordConfirm}
            setValue={setPasswordConfirm}
            isPassword
            isInvalid={isPasswordConfirmInvalid}
          />
        </Form>
      </AbsoluteCenter>
    </Container>
  );
};

export default Page;
