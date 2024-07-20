"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Button } from "@/components/custom";
import useRedirect, { useRedirectIfLoggedIn } from "@/utils/useRedirect";
import { loginRequest } from "@/utils/auth";

const LoginForm = () => {
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
      </FormControl>
      <Button onClick={handleLogin}>Login</Button>
    </>
  );
};

const Page = () => {
  useRedirectIfLoggedIn();
  return (
    <Container maxW="container.md">
      <Heading>Login</Heading>
      <LoginForm />
    </Container>
  );
};

export default Page;
