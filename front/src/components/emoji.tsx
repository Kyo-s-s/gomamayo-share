import data from "@emoji-mart/data";
import { init } from "emoji-mart";
init({ data });

export const Emoji = ({
  shortcodes,
  size = "1em",
  style,
}: {
  shortcodes: string;
  size?: string;
  style?: React.CSSProperties;
}) => {
  return <em-emoji shortcodes={shortcodes} size={size} style={style} />; // ?
};
