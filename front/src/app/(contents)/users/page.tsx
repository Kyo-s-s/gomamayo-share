"use client";

import { useEffect, useState } from "react";
import { getRequest } from "../../../utils/request";
import { User } from "../../../types/types";
import { Heading } from "@chakra-ui/react";

const Users = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  // loading ?

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRequest<User[]>("/users");
      if (res.success) {
        setUsers(res.success);
      }
    };
    if (users == null) fetchData();
  }, [users]);
  return <p>{JSON.stringify(users)}</p>;
};
const Page = () => {
  return (
    <>
      <Heading>users</Heading>
      <Users />
    </>
  );
};

export default Page;
