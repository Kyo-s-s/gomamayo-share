import { Image, ImageProps } from "@chakra-ui/next-js";

interface InterrobangProps extends Omit<ImageProps, "src" | "alt"> {
  size: number;
}

const Interrobang = ({ size, ...props }: InterrobangProps) => {
  return (
    <Image
      src="/interrobang.svg"
      alt="interrobang"
      width={size}
      height={size}
      {...props}
    />
  );
};

export default Interrobang;
