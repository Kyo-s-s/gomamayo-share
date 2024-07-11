const Users = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL! + "/users";
  const responce = await fetch(apiUrl, { cache: "no-store" });
  const data = await responce.json();
  return <p>{JSON.stringify(data)}</p>;
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
