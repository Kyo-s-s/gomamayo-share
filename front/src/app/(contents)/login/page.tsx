"use client";

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { AbsoluteCenter, Container, useToast } from "@chakra-ui/react";
import useRedirect, { useRedirectIfLoggedIn } from "@/utils/useRedirect";
import { loginRequest } from "@/utils/auth";
import { Form, StringForm } from "@/components/form";
import { validateName, validatePassword } from "@/utils/validate";

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

  const nameError = validateName(name);
  const passwordError = validatePassword(password);

  const isInvalid = nameError !== "" || passwordError !== "";

  return (
    <Container maxW="container.sm" height="90vh" position="relative">
      <AbsoluteCenter width="100%" pb="10vh" px={4}>
        <Form title="ログイン" onSubmit={handleLogin} isInvalid={isInvalid}>
          <StringForm
            title="ユーザーネーム"
            value={name}
            setValue={setName}
            errorMessage={nameError}
          />
          <StringForm
            title="パスワード"
            value={password}
            setValue={setPassword}
            isPassword
            errorMessage={passwordError}
          />
        </Form>
      </AbsoluteCenter>
    </Container>
  );
};

export default Page;
