"use client";

import { useState } from "react";
import { postRequest } from "../../utils/request";
import { User } from "../../types/types";
import { useAuth } from "../../context/AuthContext";
import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Button } from "@/components/custom";
import useNavigate, { useRedirectIfLoggedIn } from "@/utils/useNavigate";

const LoginForm = () => {
  const { login } = useAuth();
  const navigateTo = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    const res = await postRequest<User>("/login", {
      user: { name: name, password: password },
    });
    if (res.success) {
      login(res.success);
      navigateTo(`/users/${res.success.id}`);
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
    <>
      <Heading>Login</Heading>
      <LoginForm />
    </>
  );
};

export default Page;
