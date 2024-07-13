"use client";

import { useCallback, useEffect, useState } from "react";
import { postRequest } from "../_utils/request";
import { useRouter } from "next/navigation";
import { User } from "../_types/types";
import { useAuth } from "../_context/AuthContext";

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
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (user != null) {
      navigateTo(`/users/${user.id}`);
    }
  }, [user, navigateTo]);

  const handleSignUp = async () => {
    let res = await postRequest<User>("/users", {
      user: { name: name, password: password },
    });
    if (res.success) {
      login(res.success);
      navigateTo(`/users/${res.success.id}`);
    } else {
      alert("ERROR: " + res.failure.message);
    }
  };
  return (
    <>
      <div>
        <label>
          name:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleSignUp}>Sign up</button>
    </>
  );
};

const Page = () => {
  return (
    <>
      <h1>sign up</h1>
      <SignUpForm />
    </>
  );
};

export default Page;
