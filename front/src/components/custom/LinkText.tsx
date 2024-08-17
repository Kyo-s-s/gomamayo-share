import { Link } from "@chakra-ui/next-js";

export const LinkText = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} color="cyan.600">
      {children}
    </Link>
  );
};
