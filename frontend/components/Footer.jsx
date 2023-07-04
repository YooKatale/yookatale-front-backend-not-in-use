"use client";

import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <Box borderTop={"1.7px solid " + ThemeColors.lightColor}>
        <Flex
          direction={{ base: "column", md: "column", xl: "row" }}
          justifyContent={{ base: "center", md: "center", xl: "none" }}
        >
          <Box padding={{ base: "0.5rem 0", md: "0.5rem 0", xl: "2rem" }}>
            <Text
              fontSize="md"
              display={"flex"}
              justifyContent={{ base: "center", md: "center", xl: "none" }}
            >
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
          <Spacer display={{ base: "none", md: "none", xl: "block" }} />
          <Box padding={{ base: "0", md: "0", xl: "1rem 0" }}>
            <Flex justifyContent={{ base: "center", md: "center", xl: "none" }}>
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
