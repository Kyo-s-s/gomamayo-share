"use client";

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { AbsoluteCenter, Container, useToast } from "@chakra-ui/react";
import useRedirect, { useRedirectIfLoggedIn } from "@/utils/useRedirect";
import { loginRequest } from "@/utils/auth";
import { Form, StringForm } from "@/components/form";

const Page = () => {
  useRedirectIfLoggedIn();

  const { login } = useAuth();
  const redirectTo = useRedirect();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    const res = await loginRequest(name, password);
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

  return (
    <Container maxW="container.md" height="90vh" position="relative">
      <AbsoluteCenter width="container.sm" pb="10vh">
        <Form title="ログイン" onSubmit={handleLogin}>
          <StringForm title="ユーザーネーム" value={name} setValue={setName} />
          <StringForm
            title="パスワード"
            value={password}
            setValue={setPassword}
            isPassword
          />
        </Form>
      </AbsoluteCenter>
    </Container>
  );
};

export default Page;