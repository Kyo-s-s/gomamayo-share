import { getRequest } from "../_utils/request";

const Users = async () => {
  const res = await getRequest("/users");
  return <p>{JSON.stringify(res)}</p>;
};
const Page = () => {
  return (
    <>
      <h1>users</h1>
      <Users />
    </>
  );
};

export default Page;
