import { Post, User } from "@/types/types";
import { Link } from "@chakra-ui/next-js";
import { Card, CardBody, Text } from "@chakra-ui/react";

type PostCardProps = {
  post: Post;
  user: User;
};

const PostCard = ({ post, user }: PostCardProps) => {
  return (
    <Card my={2}>
      <CardBody>
        <Link href={`/users/${user.id}`}>{user.name}</Link>
        <Text>{post.content}</Text>
      </CardBody>
    </Card>
  );
};

export default PostCard;
