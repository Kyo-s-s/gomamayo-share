"use client";

import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { AbsoluteCenter, Container, Divider, Text } from "@chakra-ui/react";
import useRedirect, { useRedirectIfLoggedIn } from "@/utils/useRedirect";
import { signupRequest } from "@/utils/auth";
import { EmojiInterrobang } from "@/components/emoji";
import { CheckForm, Form, StringForm } from "@/components/form";
import { validateName, validatePassword } from "@/utils/validate";
import useMessage from "@/utils/useMessage";
import { Link } from "@chakra-ui/next-js";

const Page = () => {
  useRedirectIfLoggedIn();

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
        description: "ログインしました",
      });
      redirectTo(`/users/${res.success.id}`);
    } else {
      errorMessage({
        description: `${res.failure.message}`,
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
    <Container maxW="container.sm" height="90vh" position="relative">
      <AbsoluteCenter width="100%" pb="10vh" px={4}>
        <Form
          title={
            <>
              アカウント登録 <EmojiInterrobang />
            </>
          }
          onSubmit={handleSignUp}
          isInvalid={isInvalid}
        >
          <Text>
            既にアカウントをお持ちの方は{' '}
            <Link color='teal.300' href='/login' fontWeight="bold">
              ログイン
            </Link>
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
      </AbsoluteCenter>
    </Container>
  );
};

export default Page;
