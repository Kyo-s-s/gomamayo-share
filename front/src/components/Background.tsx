"use client";

import { Box } from "@chakra-ui/react";
import { Emoji } from "./emoji";

const Background = () => {
  // FIXME: Mobile
  const positions = [
    ["260px", "-2%", "-2%", "rotate(70deg)"],
    ["290px", "-12%", "20%", "rotate(310deg)"],
    ["260px", "1%", "80%", "rotate(220deg)"],
    ["330px", "-20%", "53%", "rotate(40deg)"],
    ["240px", "39%", "80%", "rotate(350deg)"],
    ["200px", "25%", "12%", "rotate(10deg)"],
    ["260px", "49%", "-5%", "rotate(220deg)"],
    ["240px", "15%", "37%", "rotate(230deg)"],
    ["300px", "20%", "60%", "rotate(400deg)"],
    ["330px", "68%", "13%", "rotate(50deg)"],
    ["340px", "35%", "20%", "rotate(200deg)"],
    ["240px", "70%", "45%", "rotate(240deg)"],
    ["200px", "43%", "45%", "rotate(300deg)"],
    ["250px", "70%", "65%", "rotate(20deg)"],
    ["250px", "70%", "87%", "rotate(150deg)"],
  ];
  return (
    <>
      {positions.map(([size, top, left, transform], index) => (
        <Emoji
          key={index}
          shortcodes=":interrobang:"
          size={size}
          style={{
            position: "absolute",
            top,
            left,
            transform,
          }}
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
