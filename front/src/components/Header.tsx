"use client";

import { useAuth } from "../context/AuthContext";
import { Button, LinkButton } from "./custom";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header>
      {user ? (
        <>
          <LinkButton href={`/users/${user.id}`}>{user.name}</LinkButton>
          <Button onClick={logout}>logout</Button>
        </>
      ) : (
        <LinkButton href={`/signup`}>signup!</LinkButton>
      )}
      <hr />
    </header>
  );
};

export default Header;
