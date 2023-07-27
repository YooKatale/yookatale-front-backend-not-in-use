"use client";

import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";

// import React from 'react'

const About = () => {
  return (
    <>
      <Box>
        <Box padding={{ base: "3rem 2rem", md: "3rem", xl: "3rem" }}>
          <Box>
            <Heading as={"h3"} size="md" textAlign={"center"}>
              About
            </Heading>
            <Text
              className="secondary-light-font"
              fontSize={"4xl"}
              textAlign={"center"}
            >
              Little About Us
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
                width={{ base: "100%", md: "100%", xl: "80%" }}
              >
                <Flex direction={{ base: "column", md: "column", xl: "row" }}>
                  <Box width={{ base: "100%", md: "100%", xl: "60%" }}>
                    <Text fontSize={"lg"} textAlign={"center"}>
                      YooKatale is a mobile retail and wholesale market for
                      natural and organic foods in Uganda, Africa. We are a
                      customer-centric business that aims to set an industry
                      standard
                    </Text>
                  </Box>
                  <Box
                    width={{ base: "100%", md: "100%", xl: "40%" }}
                    padding={{ base: "1rem 0", md: "0", xl: "0 1rem" }}
                  >
                    <Box
                      border={"1.7px solid " + ThemeColors.lightColor}
                      borderRadius={"md"}
                      padding={"1rem"}
                    >
                      <Heading as={"h3"} size="md">
                        Mission
                      </Heading>
                      <Text
                        className="secondary-light-font"
                        size={"2xl"}
                        margin={"0.3rem 0"}
                      >
                        To permeate vitality among people and communities
                      </Text>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </Flex>
            <Box padding={"1rem 0"}>
              <Flex>
                <Box
                  margin={"auto"}
                  width={{ base: "100%", md: "100%", xl: "80%" }}
                >
                  <Box padding={"0.5rem 0"}>
                    <Heading as={"h3"} size={"md"}>
                      Core Principles
                    </Heading>
                  </Box>
                  <Grid
                    gridTemplateColumns={{
                      base: "repeat(2, 1fr)",
                      md: "repeat(2, 1fr)",
                      xl: "repeat(3, 1fr)",
                    }}
                    gridGap={"1rem"}
                  >
                    <Box padding={"0.3rem 0"}>
                      <Heading as={"h3"} size={"sm"}>
                        Eternal Craft
                      </Heading>
                      <Text fontSize={"md"}>
                        Never stop improving your craft we care about craft &
                        people we do it with
                      </Text>
                    </Box>
                    <Box padding={"0.3rem 0"}>
                      <Heading as={"h3"} size={"sm"}>
                        Relentless Curiosity
                      </Heading>
                      <Text fontSize={"md"}>
                        Always ask why? But also ask yourself what if ?
                      </Text>
                    </Box>
                    <Box padding={"0.3rem 0"}>
                      <Heading as={"h3"} size={"sm"}>
                        Creativity
                      </Heading>
                      <Text fontSize={"md"}>
                        Anyone can have a good idea, it's not about departments
                        or ranks
                      </Text>
                    </Box>
                    <Box padding={"0.3rem 0"}>
                      <Heading as={"h3"} size={"sm"}>
                        Divine discontent
                      </Heading>
                      <Text fontSize={"md"}>
                        We can do more that's remarkable, we don't settle for
                        routine
                      </Text>
                    </Box>
                    <Box padding={"0.3rem 0"}>
                      <Heading as={"h3"} size={"sm"}>
                        Collective & connected team work
                      </Heading>
                      <Text fontSize={"md"}>
                        We respect different backgrounds for team fluidity
                      </Text>
                    </Box>
                    <Box padding={"0.3rem 0"}>
                      <Heading as={"h3"} size={"sm"}>
                        Adaptability with persistence
                      </Heading>
                      <Text fontSize={"md"}>
                        Change the approach not the goal
                      </Text>
                    </Box>
                  </Grid>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default About;
