"use client";

import { User } from "@/app/_types/types";
import { getRequest } from "@/app/_utils/request";
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
      <h1>users {params.id}</h1>
      <UserPage id={params.id} />
    </>
  );
};

export default Page;
