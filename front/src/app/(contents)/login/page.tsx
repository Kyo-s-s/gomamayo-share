"use client";

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { AbsoluteCenter, Container, Divider, Text } from "@chakra-ui/react";
import useRedirect, { useRedirectIfLoggedIn } from "@/utils/useRedirect";
import { loginRequest } from "@/utils/auth";
import { CheckForm, Form, StringForm } from "@/components/form";
import { validateName, validatePassword } from "@/utils/validate";
import useMessage from "@/utils/useMessage";
import { LinkText } from "@/components/custom";

const Page = () => {
  useRedirectIfLoggedIn();

  const { login } = useAuth();
  const redirectTo = useRedirect();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isCookieAllowed, setIsCookieAllowed] = useState(false);
  const { successMessage, errorMessage } = useMessage();

  const handleLogin = async () => {
    const res = await loginRequest(name, password, isCookieAllowed);
    if (res.success) {
      login(res.success);
      successMessage({
        description: "ログインしました。",
      });
      redirectTo(`/users/${res.success.id}`);
    } else {
      errorMessage({
        description: "ユーザー名またはパスワードが正しくありません。",
      });
    }
  };

  const nameError = validateName(name);
  const passwordError = validatePassword(password);

  const isInvalid = nameError !== "" || passwordError !== "";

  return (
    <Container maxW="container.sm" height="100svh" position="relative">
      <AbsoluteCenter width="100%" px={4}>
        <Form title="ログイン" onSubmit={handleLogin} isInvalid={isInvalid}>
          <Text pb={4}>
            アカウントをお持ちでない方は{' '}
            <LinkText href='/signup'>
              アカウント登録
            </LinkText>
          </Text>
          <Divider />
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
          <CheckForm
            title={"ログイン状態を保持する(Cookieを使用します)"}
            isChecked={isCookieAllowed}
            setIsChecked={setIsCookieAllowed}
          />
        </Form>
      </AbsoluteCenter>
    </Container>
  );
};

export default Page;
