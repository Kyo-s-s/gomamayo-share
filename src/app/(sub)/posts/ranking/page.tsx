import { getRankingPostsAction } from "@/actions/post";
import Background from "@/components/Background";
import { BackHeader } from "@/components/Header";
import PostCard from "@/components/PostCard";
import { Container } from "@chakra-ui/react";

const PostRanking = async () => {
  const res = await getRankingPostsAction();
  const posts = res.data.posts;

  return (
    <>
      {posts.map((post, idx) => (
        <PostCard
          key={post.id}
          ranking={idx + 1}
          post={post}
        />
      ))}
    </>
  );
};

const Page = () => {
  return (
    <>
      <BackHeader title="ランキング" />
      <Background isScrollable />
      <Container maxW="container.md">
        <PostRanking />
      </Container>
    </>
  );
};

export default Page;
