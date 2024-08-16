"use client";

import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { AbsoluteCenter, Container, Divider, Text } from "@chakra-ui/react";
import useRedirect, { useRedirectIfLoggedIn } from "@/utils/useRedirect";
import { signupRequest } from "@/utils/auth";
import { CheckForm, Form, StringForm } from "@/components/form";
import { validateName, validatePassword } from "@/utils/validate";
import useMessage from "@/utils/useMessage";
import Interrobang from "@/components/Interrobang";
import { LinkText } from "@/components/custom";
import Background from "@/components/Background";

const SignUpForm = () => {
  const { login } = useAuth();
  const redirectTo = useRedirect();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isCookieAllowed, setIsCookieAllowed] = useState(false);

  const { successMessage, errorMessage } = useMessage();

  const handleSignUp = async () => {
    const res = await signupRequest(name, password, isCookieAllowed);
    if (res.success) {
      login(res.success);
      successMessage({
        description: "ログインしました。",
      });
      redirectTo(`/users/${res.success.id}`);
    } else {
      errorMessage({
        description: "このユーザー名は既に使用されています。",
      });
    }
  };

  const nameError = validateName(name);
  const passwordError = validatePassword(password);
  const passwordConfirmError =
    passwordError ||
    (password !== passwordConfirm ? "パスワードが一致しません" : "");

  const isInvalid =
    nameError !== "" || passwordError !== "" || passwordConfirmError !== "";

  return (
    <Form
      title={
        <>
          <Text display="inline-block" verticalAlign="middle">
            アカウント登録
          </Text>
          <Interrobang
            mx={1}
            size={9}
            display="inline-block"
            verticalAlign="middle"
          />
        </>
      }
      onSubmit={handleSignUp}
      isInvalid={isInvalid}
    >
      <Text pb={4}>
        既にアカウントをお持ちの方は <LinkText href="/login">ログイン</LinkText>
      </Text>
      <Divider />
      <StringForm
        title="ユーザー名"
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
      <StringForm
        title="パスワード(確認)"
        value={passwordConfirm}
        setValue={setPasswordConfirm}
        isPassword
        errorMessage={passwordConfirmError}
      />
      <CheckForm
        title={"ログイン状態を保持する(Cookieを使用します)"}
        isChecked={isCookieAllowed}
        setIsChecked={setIsCookieAllowed}
      />
    </Form>
  );
};

const Page = () => {
  useRedirectIfLoggedIn();

  return (
    <>
      <Background />
      <Container maxW="container.sm" height="90svh" position="relative">
        <AbsoluteCenter width="100%" px={4}>
          <SignUpForm />
        </AbsoluteCenter>
      </Container>
    </>
  );
};

export default Page;
