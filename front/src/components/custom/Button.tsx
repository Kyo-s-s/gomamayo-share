import { Link } from "@chakra-ui/next-js";
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

export const Button = (props: ButtonProps) => {
  return <ChakraButton {...props}>{props.children}</ChakraButton>;
};

interface LinkButtonProps extends ButtonProps {
  href: string;
}

export const LinkButton = ({ href, ...props }: LinkButtonProps) => {
  return (
    <Link href={href}>
      <Button {...props} />
    </Link>
  );
};
