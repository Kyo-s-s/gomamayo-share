"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Button } from "@/components/custom";
import useRedirect, { useRedirectIfLoggedIn } from "@/utils/useRedirect";
import { signupRequest } from "@/utils/auth";

const SignUpForm = () => {
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

  const isPasswordConfirmInvalid = password !== passwordConfirm;

  return (
    <>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormLabel>Password Confirm</FormLabel>
        <Input
          type="password"
          value={passwordConfirm}
          isInvalid={isPasswordConfirmInvalid}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        {isPasswordConfirmInvalid && (
          <Text color="red">Password is not matched</Text>
        )}
      </FormControl>
      <Button isDisabled={isPasswordConfirmInvalid} onClick={handleSignUp}>
        Sign up
      </Button>
    </>
  );
};

const Page = () => {
  useRedirectIfLoggedIn();
  return (
    <Container maxW="container.md">
      <Heading>sign up</Heading>
      <SignUpForm />
    </Container>
  );
};

export default Page;
