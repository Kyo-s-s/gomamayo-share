import data from "@emoji-mart/data";
import { init } from "emoji-mart";
init({ data });

export const Emoji = ({
  shortcodes,
  size = "1em",
}: {
  shortcodes: string;
  size?: string;
}) => {
  return <em-emoji shortcodes={shortcodes} size={size} />; // ?
};
