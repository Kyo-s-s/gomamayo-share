import { Link } from "@chakra-ui/next-js";

export const LinkText = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} color="teal.300">
      {children}
    </Link>
  );
};
