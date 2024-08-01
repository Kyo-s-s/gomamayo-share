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

interface TwitterShareButtonProps extends ButtonProps {
  text: string;
  url: string;
  hashtags?: string;
  via?: string;
}

export const TwitterShareButton = ({ text, url, hashtags, via, ...props }: TwitterShareButtonProps) => {
  const twitterBaseUrl = "https://twitter.com/intent/tweet";

  const href = new URL(twitterBaseUrl);
  href.searchParams.append("text", text + "\n");
  href.searchParams.append("url", url + "\n");
  if (hashtags) href.searchParams.append("hashtags", hashtags + "\n");
  if (via) href.searchParams.append("via", via + "\n");

  return (
    <Link href={href}>
      <Button {...props}/>
    </Link>
  );
};