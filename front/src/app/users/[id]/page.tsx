const Page = ({ params }: { params: { id: string } }) => {
  return <h1>users {params.id}</h1>;
};

export default Page;
