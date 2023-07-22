"use client";

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import { ThemeColors } from "@constants/constants";
import { useMessagePostMutation } from "@slices/usersApiSlice";
import { useState } from "react";

// import React from 'react'

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [sendMessage] = useMessagePostMutation();

  const chakraToast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await sendMessage({ name, email, message }).unwrap();

      if (res.status == "Success") {
        setName("");
        setEmail("");
        setMessage("");

        chakraToast({
          title: "Success",
          description: res?.data?.message,
          status: "success",
          duration: 4000,
          isClosable: false,
        });
      }
    } catch (err) {
      chakraToast({
        title: "Error",
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
        <Box padding={{ base: "3rem 2rem", md: "3rem", xl: "3rem" }}>
          <Box>
            <Heading as={"h3"} size="md" textAlign={"center"}>
              Contact
            </Heading>
            <Text
              className="secondary-light-font"
              fontSize={"4xl"}
              textAlign={"center"}
            >
              Reach out to us
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
          <Box padding={"2rem 0"}>
            <Flex>
              <Box
                margin={"auto"}
                width={{ base: "100%", md: "100%", xl: "60%" }}
              >
                <Box padding={"1rem 0"}>
                  <Text
                    className="secondary-light-font"
                    fontSize={"lg"}
                    textAlign={"center"}
                  >
                    Leave a message and our dedicated team will get back to you
                    shortly
                  </Text>
                </Box>
                <Box
                  padding={"1rem"}
                  border={"1.7px solid " + ThemeColors.lightColor}
                  borderRadius={"md"}
                >
                  <form onSubmit={handleSubmit}>
                    <Grid
                      gridTemplateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        xl: "repeat(2, 1fr)",
                      }}
                      gridGap={"1rem"}
                    >
                      <Box padding={"0.5rem 0"}>
                        <FormControl>
                          <FormLabel htmlFor="name">Name</FormLabel>
                          <Input
                            type="text"
                            id="name"
                            placeholder="name is required"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </FormControl>
                      </Box>
                      <Box padding={"0.5rem 0"}>
                        <FormControl>
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <Input
                            type="text"
                            id="email"
                            placeholder="email is required"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Box padding={"0.5rem 0"}>
                      <FormControl>
                        <FormLabel htmlFor="message">Message</FormLabel>
                        <Textarea
                          name="message"
                          value={message}
                          placeholder="Type you message"
                          onChange={(e) => setMessage(e.target.value)}
                        ></Textarea>
                      </FormControl>
                    </Box>
                    <Box padding={"1rem 0"}>
                      <ButtonComponent
                        type={"submit"}
                        text={"Send message"}
                        pd={false}
                      />
                    </Box>
                  </form>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Contact;
