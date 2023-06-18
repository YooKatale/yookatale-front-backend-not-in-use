"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";
import React, { useState, useEffect } from "react";
import Link from "next/link";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@slices/usersApiSlice";
import { setCredentials } from "@slices/authSlice";
import { toast } from "react-toastify";
import { useToast } from "@chakra-ui/react";
import { redirect } from "next/navigation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const chakraToast = useToast();

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) return redirect("/");
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log({ e });

    try {
      const res = await login({ email, password }).unwrap();
      console.log({ res });
      dispatch(setCredentials({ ...res }));
      chakraToast({
        title: "Logged In",
        description: `Successfully logged in as ${
          res?.firstname + " " + res?.lastname
        }`,
        status: "success",
        duration: 5000,
        isClosable: false,
      });
      redirect("/");
    } catch (err) {
      chakraToast({
        title: "Error has occured",
        description: err.data?.message
          ? err.data?.message
          : err.data || err.error,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };

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
              <form onSubmit={submitHandler}>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    type="text"
                    id="email"
                    placeholder="Email is required"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="password is required"
                    name="password"
                    value={password}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                {isLoading && <Spinner size={"lg"} />}
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
