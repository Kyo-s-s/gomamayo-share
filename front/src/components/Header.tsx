"use client";

import { Link } from "@chakra-ui/next-js";
import { useAuth } from "../context/AuthContext";
import { Button, LinkButton } from "./custom";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header>
      {user ? (
        <>
          <Link href={`/users/${user.id}`}>{user.name}</Link>
          <LinkButton href="/posts">all posts</LinkButton>
          <LinkButton href={`/posts/new`}>new post</LinkButton>
          <Button onClick={logout}>logout</Button>
        </>
      ) : (
        <>
          <LinkButton href={`/signup`}>signup!</LinkButton>
          <LinkButton href={`/login`}>Login!</LinkButton>
        </>
      )}
      <hr />
    </header>
  );
};

export default Header;
