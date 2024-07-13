"use client";

import { useAuth } from "../_context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header>
      <p>This is Header!</p>
      {user ? (
        <>
          <a href={`/users/${user.id}`}>{user.name}</a>
          <button onClick={logout}>logout</button>
        </>
      ) : (
        <a href={`/signup`}>signup!</a>
      )}
      <hr />
    </header>
  );
};

export default Header;
