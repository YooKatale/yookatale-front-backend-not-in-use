"use client";

import { Box, Flex } from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";
import React from "react";

const Loader = () => {
  return (
    <Box
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      bottom={0}
      height={"100vh"}
      overflow={"hidden"}
      background={ThemeColors.lightColor}
      zIndex={"999"}
    >
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Box margin={"auto"} width={"50%"}>
          <div className="__gooey">
            <span className="dot"></span>
            <div className="dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </Box>
      </Flex>
    </Box>
  );
};

export default Loader;
