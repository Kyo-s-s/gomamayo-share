import { Image, ImageProps } from "@chakra-ui/next-js";

interface InterrobangProps extends Omit<ImageProps, "src" | "alt"> {
  isWhite?: boolean;
  size: number;
}

const Interrobang = ({ size, isWhite = false, ...props }: InterrobangProps) => {
  return (
    <Image
      src={isWhite ? "/interrobang-white.svg" : "/interrobang.svg"}
      alt="interrobang"
      width={size}
      height={size}
      {...props}
    />
  );
};

export default Interrobang;
