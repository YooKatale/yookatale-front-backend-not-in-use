"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  Text,
  InputLeftElement,
} from "@chakra-ui/react";
import { Images, ThemeColors } from "@constants/constants";
import Image from "next/image";
import Link from "next/link";
import {
  FaShoppingCart,
  FaShoppingBasket,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaSearch,
} from "react-icons/fa";
import { AiOutlineShoppingCart, AiTwotoneShopping } from "react-icons/ai";

import React from "react";

const Header = () => {
  return (
    <>
      <Box padding={"2rem 0"}>
        <Flex
          justifyContent={"space-evenly"}
          padding={"0 0 2rem 0"}
          borderBottom={"1.7px solid " + ThemeColors.lightColor}
        >
          <Box padding={"0 1rem"}>
            <Link href={"/"}>
              <Flex>
                <Image
                  src={Images.logo}
                  style={{ width: "90px", height: "auto" }}
                />
                <Heading
                  as={"h2"}
                  className="secondary-bold-font"
                  style={{ fontSize: "2rem" }}
                  margin={"0 0.5rem"}
                  display={"flex"}
                  color={ThemeColors.secondaryColor}
                >
                  Ta
                  <Heading
                    as={"h2"}
                    className="secondary-bold-font"
                    style={{ fontSize: "2rem" }}
                    color={"#000"}
                  >
                    tli
                  </Heading>
                </Heading>
              </Flex>
            </Link>
          </Box>
          <Box padding={"0 1rem"}>
            <Flex>
              <Box padding={"0.3rem 0.5rem"}>
                <Text display={"flex"}>
                  For support call us on{" "}
                  <Text className="primary-bold-font"> +256 739849938</Text>
                </Text>
              </Box>
              <Box padding={"0 0.5rem"}>
                <form>
                  <Box>
                    <Input
                      type="text"
                      name="search"
                      placeholder="search product"
                      padding={"0.3rem 0.5rem"}
                      borderRadius={"0.3rem"}
                    />
                  </Box>
                </form>
              </Box>
            </Flex>
            <Flex justifyContent={"center"} padding={"0.5rem 0"}>
              <Box margin={"0 0.5rem"}>
                <Link href={"/products"}>
                  <Text
                    style={{ fontSize: "1.2rem" }}
                    _hover={{ color: ThemeColors.darkColor }}
                  >
                    Products
                  </Text>
                </Link>
              </Box>
              <Box margin={"0 0.5rem"}>
                <Link href={"/contact"}>
                  <Text
                    style={{ fontSize: "1.2rem" }}
                    _hover={{ color: ThemeColors.darkColor }}
                  >
                    Contact
                  </Text>
                </Link>
              </Box>
              <Box margin={"0 0.5rem"}>
                <Link href={"/about"}>
                  <Text
                    style={{ fontSize: "1.2rem" }}
                    _hover={{ color: ThemeColors.darkColor }}
                  >
                    About
                  </Text>
                </Link>
              </Box>
            </Flex>
          </Box>
          <Box padding={"0 1rem"}>
            <Flex>
              <Box padding={"0.3rem 0.5rem"}>
                <Link href={"/profile"}>
                  <Flex position={"relative"}>
                    <FaShoppingBasket
                      size={35}
                      color={ThemeColors.primaryColor}
                    />
                    <Text
                      style={{ fontSize: "1.3rem" }}
                      margin={"0.3rem 0.5rem"}
                      className=""
                    >
                      Cart
                    </Text>
                  </Flex>
                </Link>
              </Box>
              <Box padding={" 0.3rem 0.5rem"}>
                <Link href={"/signin"}>
                  <Button
                    color={ThemeColors.lightColor}
                    background={ThemeColors.darkColor}
                    border={"1.7px solid " + ThemeColors.darkColor}
                    borderRadius={"0.3rem"}
                    padding={"0.5rem 1rem"}
                    _hover={{
                      border: "none",
                    }}
                  >
                    <FaSignInAlt
                      size={20}
                      color={ThemeColors.lightColor}
                      style={{ margin: "0 0.3rem" }}
                    />{" "}
                    Sign In
                  </Button>
                </Link>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
