"use client";

import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <Box borderTop={"1.7px solid " + ThemeColors.lightColor}>
        <Flex>
          <Box padding={"2rem"}>
            <Text fontSize="md" display={"flex"}>
              &copy; {new Date().getFullYear()}
              <Text
                color={ThemeColors.primaryColor}
                margin={"0 0.3rem"}
                fontSize="lg"
                textTransform={"uppercase"}
              >
                yookatale
              </Text>{" "}
              All rights reserved
            </Text>
          </Box>
          <Spacer />
          <Box padding="1rem 0">
            <Flex>
              <Link href={"/privacy"}>
                <Box padding={"1rem"}>
                  <Text fontSize={"md"}>Privacy Policy</Text>
                </Box>
              </Link>
              <Link href={"/usage"}>
                <Box padding={"1rem"}>
                  <Text fontSize={"md"}>Usage Policy</Text>
                </Box>
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Footer;
