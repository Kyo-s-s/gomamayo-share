"use client";

import { Box } from "@chakra-ui/react";
import Interrobang from "./Interrobang";

const Background = () => {
  const positions: [number, number, number, number][] = [
    [320, 0, -10, 320],
    [350, 200, 200, 240],
    [380, 500, -50, 20],
    [390, -100, 400, 310],
    [360, 0, 800, 220],
    [330, -100, 1200, 60],
    [380, 850, 640, 60],
    [330, 550, 80, 140],
    [300, 900, -20, 110],
    [320, 400, 680, 50],
    [310, 300, 1100, 240],
    [360, 1000, 250, 20],
    [400, 1250, -90, 120],
    [380, 650, 1000, 300],
    [340, 1320, 450, 60],
    [380, 1000, 1200, 150],
    [330, 1700, -100, 330],
    [320, 1230, 910, 320],
    [340, 530, 1400, 130],
    [340, 100, 1510, 140],
    [370, 900, 1640, 310],
    [350, 1600, 290, 210],
    [320, 1550, 740, 120],
    [320, 1450, 1200, 40],
    [310, -100, 1860, 290],
    [370, 370, 1880, 230],
    [310, 780, 1990, 160],
    [370, 1200, 2000, 100],
    [310, 1350, 1650, 250],
    [320, 1700, 1400, 320],
    [340, 1800, 1000, 140],
    [300, 1850, 600, 240],
    [320, 1700, 1900, 50],
  ];
  return (
    <>
      {positions.map(([size, top, left, transform], index) => (
        <Interrobang
          key={index}
          size={size}
          position="absolute"
          top={top}
          left={left}
          transform={`rotate(${transform}deg)`}
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
