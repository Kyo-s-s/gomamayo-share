import { Link } from "@chakra-ui/next-js";
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";
import { env } from "process";

export const Button = (props: ButtonProps) => {
  return <ChakraButton {...props}>{props.children}</ChakraButton>;
};

interface LinkButtonProps extends ButtonProps {
  href: string;
  target?: string;
  rel?: string;
}

export const LinkButton = ({ href, target, rel, ...props }: LinkButtonProps) => {
  return (
    <Link href={href} target={target} rel={rel}>
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
  const twitterBaseUrl = process.env.NEXT_PUBLIC_X_BASE_URL;

  if(!twitterBaseUrl) {
    throw new Error("NEXT_PUBLIC_X_BASE_URL is not defined");
  }

  const shareURL = new URL(twitterBaseUrl);
  const shareText = [
    text,
    url,
    hashtags ? `#${hashtags}` : "",
    via ? `@${via}` : "",
  ].filter(Boolean).join("\n");
  shareURL.searchParams.append("text", shareText);

  return (
    <LinkButton href={shareURL.href} target="_blenk" rel="noopener noreferrer" {...props} />
  );
};
