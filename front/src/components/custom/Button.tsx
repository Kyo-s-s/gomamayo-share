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
  const twitterBaseUrl = "https://x.com/intent/tweet";
  
  const shareURL = new URL(twitterBaseUrl);
  const shareText = [
    text,
    url,
    hashtags ? `#${hashtags}` : "",
    via ? `@${via}` : "",
  ].filter(Boolean).join("\n");
  shareURL.searchParams.append("text", shareText);

  return (
    <LinkButton href={shareURL.href} target="_blank" rel="noopener noreferrer" {...props} />
  );
};
