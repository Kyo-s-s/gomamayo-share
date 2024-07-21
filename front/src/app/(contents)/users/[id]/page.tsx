"use client";

import { User } from "@/types/types";
import { getRequest } from "@/utils/request";
import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const UserPage = ({ id }: { id: string }) => {
  const [user, setUser] = useState<User | null>(null);
  // loading ?

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRequest<User>(`/users/${id}`);
      if (res.success) {
        setUser(res.success);
      }
    };
    fetchData();
  }, []);
  return <p>{JSON.stringify(user)}</p>;
};

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Heading>users {params.id}</Heading>
      <UserPage id={params.id} />
    </>
  );
};

export default Page;