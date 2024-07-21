import data from "@emoji-mart/data";
import { init } from "emoji-mart";
init({ data });

type EmojiProps = {
  shortcodes: string;
  size?: string;
  style?: React.CSSProperties;
};

export const Emoji = ({ shortcodes, size = "1em", style }: EmojiProps) => {
  return <em-emoji shortcodes={shortcodes} size={size} style={style} />; // ?
};

export const EmojiInterrobang = ({
  ...props
}: Omit<EmojiProps, "shortcodes">) => {
  return <Emoji shortcodes=":interrobang:" {...props} />;
};
