"use client";

import { Link } from "@chakra-ui/next-js";
import { useAuth } from "../context/AuthContext";
import { Button } from "@chakra-ui/react";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header>
      {user ? (
        <>
          <Link href={`/users/${user.id}`}>
            <Button>{user.name}</Button>
          </Link>
          <Button onClick={logout}>logout</Button>
        </>
      ) : (
        <Link href={`/signup`}>
          <Button>signup!</Button>
        </Link>
      )}
      <hr />
    </header>
  );
};

export default Header;
