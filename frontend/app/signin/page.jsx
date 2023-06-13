"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const SignIn = () => {
  return (
    <>
      <Box>
        <Box paddingBottom={"1rem"}>
          <Box padding={"1rem 0"}>
            <Heading as={"h2"} fontSize={"lg"} textAlign={"center"}>
              Access your account
            </Heading>
            <Text fontSize={"3xl"} textAlign={"center"}>
              Sign In to continue
            </Text>
            <Flex>
              <Box
                height={"0.2rem"}
                width={"8rem"}
                margin={"0.5rem auto"}
                background={ThemeColors.primaryColor}
              ></Box>
            </Flex>
          </Box>
          <Flex>
            <Box margin={"auto"} width={"50%"} padding={"1rem"}>
              <form>
                <FormControl>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    type="text"
                    id="username"
                    placeholder="username is required"
                    name="username"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="password is required"
                    name="password"
                    id="password"
                  />
                </FormControl>
                <Box padding="1rem 0">
                  <Text display="flex">
                    Create new account{" "}
                    <Link
                      href={"/signup"}
                      style={{
                        color: ThemeColors.darkColor,
                        margin: "0 0.5rem",
                      }}
                    >
                      Sign Up
                    </Link>
                  </Text>
                </Box>
                <Box padding={"0"}>
                  <Button
                    type="submit"
                    color={ThemeColors.lightColor}
                    background={ThemeColors.darkColor}
                    border={"1.7px solid " + ThemeColors.darkColor}
                    borderRadius={"0.3rem"}
                    padding={"1rem"}
                    className="secondary-light-font"
                    fontSize={"md"}
                    _hover={{
                      background: "none",
                      color: ThemeColors.darkColor,
                    }}
                  >
                    Sign In
                  </Button>
                </Box>
              </form>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default SignIn;
