"use client";

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import Hero from "@components/Hero";
import { Images, ThemeColors } from "@constants/constants";
import Image from "next/image";
import {
  FaCartPlus,
  FaMoneyBill,
  FaMoneyBillAlt,
  FaMoneyCheck,
  FaTruckLoading,
  FaEnvelope,
  FaPhone,
  FaPhoneAlt,
} from "react-icons/fa";
import * as HI from "react-icons/hi";
import * as AI from "react-icons/ai";

const Home = () => {
  return (
    <>
      <Hero />
      {/* section one */}
      <Box padding={"3rem 0"}>
        <Flex>
          <Box margin={"auto"} width={"70%"}>
            <Flex>
              <Box width={"50%"}>
                <Flex padding={"0 1rem"}>
                  <Box padding={"1rem "}>
                    <FaTruckLoading size={80} color={ThemeColors.darkColor} />
                  </Box>
                  <Box>
                    <Heading
                      as={"h3"}
                      className="secondary-font"
                      size={"lg"}
                      color={ThemeColors.darkColor}
                      margin={"0.5rem 0"}
                    >
                      Delivery
                    </Heading>
                    <Text
                      className="secondary-light-font"
                      style={{ fontSize: "1.1rem" }}
                    >
                      All purchases over UGX 200,000 are eligible for free
                      shipping via UPS first class mail
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box width={"50%"}>
                <Flex padding={"0 1rem"}>
                  <Box padding={"1rem "}>
                    <FaMoneyCheck size={80} color={ThemeColors.darkColor} />
                  </Box>
                  <Box>
                    <Heading
                      as={"h3"}
                      className="secondary-font"
                      size={"lg"}
                      color={ThemeColors.darkColor}
                      margin={"0.5rem 0"}
                    >
                      Easy Payments
                    </Heading>
                    <Text
                      className="secondary-light-font"
                      style={{ fontSize: "1.1rem" }}
                    >
                      All payments are processed instantly over a secure payment
                      protocol
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
      {/* section two */}
      <Box
        padding={"3rem 0"}
        borderBottom={"1.7px solid " + ThemeColors.lightColor}
      >
        <Flex>
          <Box margin={"auto"} width={"90%"}>
            <Box padding={"2rem 0"}>
              <Heading as={"h2"} fontSize={"3xl"} textAlign={"center"}>
                Featured Products
              </Heading>
              <Flex>
                <Box
                  height={"0.2rem"}
                  width={"10rem"}
                  margin={"1rem auto"}
                  background={ThemeColors.primaryColor}
                ></Box>
              </Flex>
            </Box>
            <Grid
              gridTemplateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                xl: "repeat(4, 1fr)",
              }}
              gridGap={"1rem"}
            >
              <Box
                padding={"1rem"}
                background={"#fff"}
                borderRadius={"md"}
                _hover={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
              >
                <Box height={"200px"} padding="0.5rem">
                  <Flex
                    alignContent={"center"}
                    justifyContent={"center"}
                    height={"100%"}
                  >
                    <Image
                      src={Images.img2}
                      style={{
                        width: "auto",
                        height: "100%",
                        margin: "auto",
                      }}
                    />
                  </Flex>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <Text
                    textAlign={"center"}
                    className="secondary-light-font"
                    fontSize={"2xl"}
                  >
                    Green Apples
                  </Text>
                  <Heading
                    as={"h3"}
                    margin={"0.5rem 0"}
                    textAlign={"center"}
                    className="secondary-extra-bold"
                    fontSize={"2xl"}
                    color={ThemeColors.darkColor}
                  >
                    UGX 34,000
                  </Heading>
                  <Box padding={"1rem 0"}>
                    <Flex justifyContent={"center"}>
                      <Button
                        color={ThemeColors.lightColor}
                        background={ThemeColors.darkColor}
                        border={"1.7px solid " + ThemeColors.darkColor}
                        borderRadius={"0.3rem"}
                        padding={"1.5rem"}
                        className="secondary-light-font"
                        fontSize={"lg"}
                        _hover={{
                          border: "1.7px solid " + ThemeColors.lightColor,
                        }}
                      >
                        <FaCartPlus
                          size={26}
                          style={{ margin: "0 0.5rem 0 0" }}
                          color={ThemeColors.lightColor}
                        />
                        Add To cart
                      </Button>
                    </Flex>
                  </Box>
                </Box>
              </Box>
              <Box
                padding={"1rem"}
                background={"#fff"}
                borderRadius={"md"}
                _hover={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
              >
                <Box height={"200px"} padding="0.5rem">
                  <Flex
                    alignContent={"center"}
                    justifyContent={"center"}
                    height={"100%"}
                  >
                    <Image
                      src={Images.img3}
                      style={{
                        width: "auto",
                        height: "100%",
                        alignSelf: "center",
                        margin: "auto",
                      }}
                    />
                  </Flex>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <Text
                    textAlign={"center"}
                    className="secondary-light-font"
                    fontSize={"2xl"}
                  >
                    Cocktail Juice
                  </Text>
                  <Heading
                    as={"h3"}
                    margin={"0.5rem 0"}
                    textAlign={"center"}
                    className="secondary-extra-bold"
                    fontSize={"2xl"}
                    color={ThemeColors.darkColor}
                  >
                    UGX 34,000
                  </Heading>
                  <Box padding={"0.5rem 0"}>
                    <Flex justifyContent={"center"}>
                      <Button
                        color={ThemeColors.lightColor}
                        background={ThemeColors.darkColor}
                        border={"1.7px solid " + ThemeColors.darkColor}
                        borderRadius={"0.3rem"}
                        padding={"1.5rem"}
                        className="secondary-light-font"
                        fontSize={"lg"}
                        _hover={{
                          border: "1.7px solid " + ThemeColors.lightColor,
                        }}
                      >
                        <FaCartPlus
                          size={26}
                          style={{ margin: "0 0.5rem 0 0" }}
                          color={ThemeColors.lightColor}
                        />
                        Add To cart
                      </Button>
                    </Flex>
                  </Box>
                </Box>
              </Box>
              <Box
                padding={"1rem"}
                background={"#fff"}
                borderRadius={"md"}
                _hover={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
              >
                <Box height={"200px"} padding="0.5rem">
                  <Flex
                    alignContent={"center"}
                    justifyContent={"center"}
                    height={"100%"}
                  >
                    <Image
                      src={Images.img4}
                      style={{
                        width: "auto",
                        height: "100%",
                        margin: "auto",
                      }}
                    />
                  </Flex>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <Text
                    textAlign={"center"}
                    className="secondary-light-font"
                    fontSize={"2xl"}
                  >
                    Strawberries
                  </Text>
                  <Heading
                    as={"h3"}
                    margin={"0.5rem 0"}
                    textAlign={"center"}
                    className="secondary-extra-bold"
                    fontSize={"2xl"}
                    color={ThemeColors.darkColor}
                  >
                    UGX 34,000
                  </Heading>
                  <Box padding={"1rem 0"}>
                    <Flex justifyContent={"center"}>
                      <Button
                        color={ThemeColors.lightColor}
                        background={ThemeColors.darkColor}
                        border={"1.7px solid " + ThemeColors.darkColor}
                        borderRadius={"0.3rem"}
                        padding={"1.5rem"}
                        className="secondary-light-font"
                        fontSize={"lg"}
                        _hover={{
                          border: "1.7px solid " + ThemeColors.lightColor,
                        }}
                      >
                        <FaCartPlus
                          size={26}
                          style={{ margin: "0 0.5rem 0 0" }}
                          color={ThemeColors.lightColor}
                        />
                        Add To cart
                      </Button>
                    </Flex>
                  </Box>
                </Box>
              </Box>
              <Box
                padding={"1rem"}
                background={"#fff"}
                borderRadius={"md"}
                _hover={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
              >
                <Box height={"200px"} padding="0.5rem">
                  <Flex
                    alignContent={"center"}
                    justifyContent={"center"}
                    height={"100%"}
                  >
                    <Image
                      src={Images.img1}
                      style={{
                        width: "auto",
                        height: "100%",
                        margin: "auto",
                      }}
                    />
                  </Flex>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <Text
                    textAlign={"center"}
                    className="secondary-light-font"
                    fontSize={"2xl"}
                  >
                    Fruit basket
                  </Text>
                  <Heading
                    as={"h3"}
                    margin={"0.5rem 0"}
                    textAlign={"center"}
                    className="secondary-extra-bold"
                    fontSize={"2xl"}
                    color={ThemeColors.darkColor}
                  >
                    UGX 124,000
                  </Heading>
                  <Box padding={"1rem 0"}>
                    <Flex justifyContent={"center"}>
                      <Button
                        color={ThemeColors.lightColor}
                        background={ThemeColors.darkColor}
                        border={"1.7px solid " + ThemeColors.darkColor}
                        borderRadius={"0.3rem"}
                        padding={"1.5rem"}
                        className="secondary-light-font"
                        fontSize={"lg"}
                        _hover={{
                          border: "1.7px solid " + ThemeColors.lightColor,
                        }}
                      >
                        <FaCartPlus
                          size={26}
                          style={{ margin: "0 0.5rem 0 0" }}
                          color={ThemeColors.lightColor}
                        />
                        Add To cart
                      </Button>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Flex>
      </Box>
      {/* Section three */}
      <Box>
        <Box padding={"3rem 0"}>
          <Flex>
            <Box margin={"auto"} width={"70%"}>
              <Flex>
                <Box width={"50%"}>
                  <Flex padding={"0 1rem"}>
                    <Box padding={"1rem "}>
                      {/* <FaPhone size={40} color={ThemeColors.darkColor} /> */}
                      <HI.HiOutlinePhoneOutgoing
                        size={45}
                        color={ThemeColors.darkColor}
                      />
                    </Box>
                    <Box>
                      <Heading
                        as={"h2"}
                        className="secondary-font"
                        size={"md"}
                        color={ThemeColors.darkColor}
                      >
                        Have a question ?
                      </Heading>
                      <Stack padding={"1rem 0"}>
                        <Box>
                          <Text>+256 7388 7372888</Text>
                        </Box>
                        <Box>
                          <Text>+256 7736 9384722</Text>
                        </Box>
                      </Stack>
                    </Box>
                  </Flex>
                </Box>
                <Box width={"50%"}>
                  <Flex padding={"0 1rem"}>
                    <Box padding={"1rem "}>
                      {/* <FaEnvelope size={40} color={ThemeColors.darkColor} /> */}
                      <HI.HiOutlineMail
                        size={45}
                        color={ThemeColors.darkColor}
                      />
                    </Box>
                    <Box>
                      <Heading
                        as={"h3"}
                        className="secondary-font"
                        size={"md"}
                        color={ThemeColors.darkColor}
                        margin={"0.5rem 0"}
                      >
                        For Support
                      </Heading>
                      <Text
                        className="secondary-light-font"
                        style={{ fontSize: "1.1rem" }}
                      >
                        contact@tatli.com
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Home;
