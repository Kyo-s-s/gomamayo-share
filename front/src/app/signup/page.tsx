"use client";

import { useCallback, useEffect, useState } from "react";
import { postRequest } from "../../utils/request";
import { useRouter } from "next/navigation";
import { User } from "../../types/types";
import { useAuth } from "../../context/AuthContext";
import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  position,
  useToast,
} from "@chakra-ui/react";
import { Button } from "@/components/custom";

// FIXME: move utils
const useNavigate = () => {
  const router = useRouter();

  const navigateTo = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router]
  );

  return navigateTo;
};

const SignUpForm = () => {
  const { user, login } = useAuth();
  const navigateTo = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (user != null) {
      navigateTo(`/users/${user.id}`);
    }
  }, [user]);

  const handleSignUp = async () => {
    let res = await postRequest<User>("/users", {
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
        {/* TODO: password confirm */}
      </FormControl>
      <Button onClick={handleSignUp}>Sign up</Button>
    </>
  );
};

const Page = () => {
  return (
    <>
      <Heading>sign up</Heading>
      <SignUpForm />
    </>
  );
};

export default Page;
