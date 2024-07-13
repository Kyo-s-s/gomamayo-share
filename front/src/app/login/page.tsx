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

const LoginForm = () => {
  const { user, login } = useAuth();
  const navigateTo = useNavigate();
  if (user != null) {
    navigateTo(`/users/${user.id}`);
  }

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    let res = await postRequest<User>("/login", {
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
      <button onClick={handleSignUp}>Login</button>
    </>
  );
};

const Page = () => {
  return (
    <>
      <h1>Login</h1>
      <LoginForm />
    </>
  );
};

export default Page;
