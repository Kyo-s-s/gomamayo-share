"use client";

import { Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/next-js";

const Background = () => {
  // FIXME: Mobile
  const positions: [number, string, string, string][] = [
    [260, "-2%", "-2%", "rotate(70deg)"],
    [290, "-12%", "20%", "rotate(310deg)"],
    [260, "1%", "80%", "rotate(220deg)"],
    [330, "-20%", "53%", "rotate(40deg)"],
    [240, "39%", "80%", "rotate(350deg)"],
    [200, "25%", "12%", "rotate(10deg)"],
    [260, "49%", "-5%", "rotate(220deg)"],
    [240, "15%", "37%", "rotate(230deg)"],
    [300, "20%", "60%", "rotate(400deg)"],
    [330, "68%", "13%", "rotate(50deg)"],
    [340, "35%", "20%", "rotate(200deg)"],
    [240, "70%", "45%", "rotate(240deg)"],
    [200, "43%", "45%", "rotate(300deg)"],
    [250, "70%", "65%", "rotate(20deg)"],
    [250, "70%", "87%", "rotate(150deg)"],
  ];
  return (
    <>
      {positions.map(([size, top, left, transform], index) => (
        <Image
          key={index}
          src="/interrobang.svg"
          alt="interrobang"
          width={size}
          height={size}
          position="absolute"
          top={top}
          left={left}
          transform={transform}
        />
      ))}
      <Box
        w="100%"
        h="100%"
        position="absolute"
        backgroundColor="white"
        opacity={0.6}
      />
    </>
  );
};

export default Background;
