"use client";

import { Box, Text } from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";

const Footer = () => {
  return (
    <>
      <Box borderTop={"1.7px solid " + ThemeColors.lightColor}>
        <Box padding={"2rem"}>
          <Text fontSize="md" display={"flex"}>
            &copy; {new Date().getFullYear()}
            <Text
              color={ThemeColors.primaryColor}
              margin={"0 0.3rem"}
              fontSize="lg"
              textTransform={"uppercase"}
            >
              tatli
            </Text>{" "}
            All rights reserved
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
