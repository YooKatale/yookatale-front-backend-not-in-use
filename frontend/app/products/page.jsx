"use client";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Grid,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { Images, ThemeColors } from "@constants/constants";
import * as FA from "react-icons/fa";
import * as HI from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

const Products = () => {
  const CategoriesJson = [
    "sit amet consectetur",
    "adipisicing elit",
    "Mollitia molestias deserunt",
    "amet sint, molestiae sunt",
    "non. Cumque culpa",
  ];

  return (
    <>
      <Box>
        <Box padding={"2rem"}>
          <Flex>
            <Box
              width={"25%"}
              borderRight={"1.7px solid " + ThemeColors.lightColor}
              padding={"0 1rem"}
            >
              <Box padding={"0 1rem 0.5rem 1rem"}>
                <Heading as={"h2"} size={"md"} className="secondary-extra-bold">
                  Apply Filters
                </Heading>
              </Box>
              <Box
                padding={"1rem 0 0.5rem 0"}
                borderBottom={"1.7px solid " + ThemeColors.lightColor}
              >
                <Text fontSize={"md"}>By price:</Text>
                <Box padding={"0.5rem 0 0 0"}>
                  <Flex margin="0.3rem 0">
                    <Box>
                      <Checkbox
                        name="filterByLowPrice"
                        id="filterByLowPrice"
                        width={"100%"}
                      />
                    </Box>
                    <FormLabel
                      margin={"0 0.3rem 0 1rem"}
                      display={"flex"}
                      htmlFor="filterByLowPrice"
                    >
                      <FA.FaArrowDown style={{ margin: "0 0.3rem" }} />{" "}
                      <Text
                        fontSize={"md"}
                        marginBottom={"0.5rem"}
                        className="secondary-light-font"
                      >
                        Lowest
                      </Text>
                    </FormLabel>
                  </Flex>
                  <Flex margin="0.3rem 0">
                    <Box>
                      <Checkbox
                        name="filterByHighPrice"
                        id="filterByHighPrice"
                        width={"100%"}
                      />
                    </Box>
                    <FormLabel
                      margin={"0 0.3rem 0 1rem"}
                      display={"flex"}
                      htmlFor="filterByHighPrice"
                    >
                      <FA.FaArrowDown style={{ margin: "0 0.3rem" }} />{" "}
                      <Text
                        fontSize={"md"}
                        marginBottom={"0.5rem"}
                        className="secondary-light-font"
                      >
                        Highest
                      </Text>
                    </FormLabel>
                  </Flex>
                </Box>
              </Box>
              {/* category */}
              <Box
                padding={"1rem 0 0.5rem 0"}
                borderBottom={"1.7px solid " + ThemeColors.lightColor}
              >
                <Text fontSize={"md"}>By category:</Text>
                <Box padding={"0.5rem 0 0 0"}>
                  {CategoriesJson.map((category, index) => (
                    <Flex margin="0.3rem 0" key={index}>
                      <Box>
                        <Checkbox
                          name="category"
                          id="category"
                          width={"100%"}
                        />
                      </Box>
                      <FormLabel
                        margin={"0 0.3rem 0 1rem"}
                        display={"flex"}
                        htmlFor="category"
                        className="secondary-light-font"
                      >
                        {category}
                      </FormLabel>
                    </Flex>
                  ))}
                </Box>
              </Box>
            </Box>
            <Box width={"75%"} padding={"0 0.5rem 1rem 0.5rem"}>
              <Box padding={"0 1rem 0.5rem 1rem"}>
                <Heading as={"h2"} size={"md"} className="secondary-extra-bold">
                  All Products
                </Heading>
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
                  borderRadius={"md"}
                  _hover={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Box height={"150px"} padding="0.5rem">
                    <Link href="/product">
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
                    </Link>
                  </Box>
                  <Box>
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
                      fontSize={"lg"}
                      color={ThemeColors.darkColor}
                    >
                      UGX 44,300
                    </Heading>
                    <Box padding={"0.5rem 0"}>
                      <Flex justifyContent={"center"}>
                        <Button
                          color={ThemeColors.lightColor}
                          background={ThemeColors.darkColor}
                          border={"1.7px solid " + ThemeColors.darkColor}
                          borderRadius={"0.3rem"}
                          padding={"1rem"}
                          className="secondary-light-font"
                          fontSize={"md"}
                          _hover={{
                            border: "1.7px solid " + ThemeColors.lightColor,
                          }}
                        >
                          <FA.FaCartPlus
                            size={20}
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
                  borderRadius={"md"}
                  _hover={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Box height={"150px"} padding="0.5rem">
                    <Link href="/product">
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
                    </Link>
                  </Box>
                  <Box>
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
                      fontSize={"lg"}
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
                          padding={"1rem"}
                          className="secondary-light-font"
                          fontSize={"md"}
                          _hover={{
                            border: "1.7px solid " + ThemeColors.lightColor,
                          }}
                        >
                          <FA.FaCartPlus
                            size={20}
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
                  borderRadius={"md"}
                  _hover={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Box height={"150px"} padding="0.5rem">
                    <Link href="/product">
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
                            margin: "auto",
                          }}
                        />
                      </Flex>
                    </Link>
                  </Box>
                  <Box>
                    <Text
                      textAlign={"center"}
                      className="secondary-light-font"
                      fontSize={"2xl"}
                    >
                      Fruit Cocktail
                    </Text>
                    <Heading
                      as={"h3"}
                      margin={"0.5rem 0"}
                      textAlign={"center"}
                      className="secondary-extra-bold"
                      fontSize={"lg"}
                      color={ThemeColors.darkColor}
                    >
                      UGX 14,500
                    </Heading>
                    <Box padding={"0.5rem 0"}>
                      <Flex justifyContent={"center"}>
                        <Button
                          color={ThemeColors.lightColor}
                          background={ThemeColors.darkColor}
                          border={"1.7px solid " + ThemeColors.darkColor}
                          borderRadius={"0.3rem"}
                          padding={"1rem"}
                          className="secondary-light-font"
                          fontSize={"md"}
                          _hover={{
                            border: "1.7px solid " + ThemeColors.lightColor,
                          }}
                        >
                          <FA.FaCartPlus
                            size={20}
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
      </Box>
    </>
  );
};

export default Products;
