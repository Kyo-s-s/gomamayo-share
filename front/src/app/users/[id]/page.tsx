import { getRequest } from "@/app/_utils/request";

const UserPage = async ({ id }: { id: string }) => {
  const res = await getRequest(`/users/${id}`);
  return <p>{JSON.stringify(res)}</p>;
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
