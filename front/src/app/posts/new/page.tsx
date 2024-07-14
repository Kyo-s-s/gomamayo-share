"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_context/AuthContext";
import { postRequest } from "@/app/_utils/request";
import { Post } from "@/app/_types/types";

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

const PostForm = () => {
  const { user, login } = useAuth();
  const navigateTo = useNavigate();
  if (user == null) {
    navigateTo(`/signup`);
  }

  const [content, setContent] = useState("");
  const handlePost = async () => {
    let res = await postRequest<Post>("/posts", {
      post: { content: content },
    });
    if (res.success) {
      navigateTo("/posts");
    } else {
      alert("ERROR: " + res.failure.message);
    }
  };

  return (
    <>
      <form>
        <label>
          content:{" "}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </label>
      </form>
      <button onClick={handlePost}>Post</button>
    </>
  );
};

const Page = () => {
  return (
    <>
      <h1>new post</h1>
      <PostForm />
    </>
  );
};

export default Page;
