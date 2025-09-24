import { auth } from "@/auth";
import { TopPage } from "@/components/TopPage";

const Home = async () => {
  const session = await auth();
  const isLoggedIn = session !== null;
  return <TopPage isLoggedIn={isLoggedIn} />
};

export default Home;
