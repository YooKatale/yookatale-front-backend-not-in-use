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
  FaWhatsapp,
} from "react-icons/fa";
import { AiOutlineShoppingCart, AiTwotoneShopping } from "react-icons/ai";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@slices/authSlice";
import { useLogoutMutation } from "@slices/usersApiSlice";
import { redirect, useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [searchParam, setSearchParam] = useState("");

  const { push } = useRouter();

  const [logoutApiCall, { isLoading }] = useLogoutMutation();

  const chakraToast = useToast();

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      push("/");
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

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();

    if (searchParam == "")
      return chakraToast({
        title: "Error",
        description: "Search cannot be empty",
        status: "error",
        duration: 5000,
        isClosable: false,
      });

    push(`/search?name=${searchParam}`);
  };

  return (
    <>
      <Box padding={"2rem 0 1rem 0"}>
        <Flex
          justifyContent={"space-evenly"}
          padding={"0 0 1rem 0"}
          borderBottom={"1.7px solid " + ThemeColors.lightColor}
        >
          <Box padding={"0.5rem 1rem"}>
            <Link href={"/"}>
              <Flex>
                <Image
                  src={Images.logo}
                  style={{ width: "100px", height: "auto" }}
                />
                <Heading
                  as={"h2"}
                  className="secondary-bold-font"
                  style={{ fontSize: "1.5rem" }}
                  margin={"2rem 0.5rem 0 0.5rem"}
                  display={"none"}
                  color={ThemeColors.secondaryColor}
                >
                  Yoo
                  <Heading
                    as={"h2"}
                    className="secondary-bold-font"
                    style={{ fontSize: "1.5rem" }}
                    color={"#000"}
                  >
                    Katale
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
                  <Text className="primary-bold-font"> +256 754615840</Text>
                </Text>
              </Box>
              <Box padding={"0 0.5rem"}>
                <form onSubmit={handleSearchFormSubmit}>
                  <Box>
                    <Input
                      type="text"
                      name="search"
                      placeholder="search product by name"
                      padding={"0.3rem 0.5rem"}
                      borderRadius={"0.3rem"}
                      onChange={(e) => setSearchParam(e.target.value)}
                    />
                  </Box>
                </form>
              </Box>
            </Flex>
            <Flex justifyContent={"center"} padding={"1rem 0"}>
              <Box margin={"0.3rem 0.5rem"}>
                <Link href={"/products"}>
                  <Text
                    style={{ fontSize: "1.1rem" }}
                    _hover={{ color: ThemeColors.darkColor }}
                  >
                    Products
                  </Text>
                </Link>
              </Box>
              <Box margin={"0.3rem 0.5rem"}>
                <Link href={"/contact"}>
                  <Text
                    style={{ fontSize: "1.1rem" }}
                    _hover={{ color: ThemeColors.darkColor }}
                  >
                    Contact
                  </Text>
                </Link>
              </Box>
              {/* <Box margin={"0.3rem 0.5rem"}>
                <Link href={"/about"}>
                  <Text
                    style={{ fontSize: "1.1rem" }}
                    _hover={{ color: ThemeColors.darkColor }}
                  >
                    About
                  </Text>
                </Link>
              </Box> */}
              {userInfo ? (
                <Box margin={"0.3rem 0.5rem"}>
                  <Link href={"/orders"}>
                    <Text
                      style={{ fontSize: "1.1rem" }}
                      _hover={{ color: ThemeColors.darkColor }}
                    >
                      Track Order
                    </Text>
                  </Link>
                </Box>
              ) : (
                ""
              )}
              {/* <Box margin={"0.3rem 0.5rem"}>
                <Link href={"/schedule"}>
                  <Text
                    style={{ fontSize: "1.1rem" }}
                    _hover={{ color: ThemeColors.darkColor }}
                  >
                    Schedule Delivery
                  </Text>
                </Link>
              </Box> */}
              <Box margin={"0 0.5rem"}>
                <Link href={"https://wa.me/256754615840"}>
                  <Button
                    color={ThemeColors.lightColor}
                    background={"whatsapp.600"}
                    border={"1.7px solid " + "whatsapp.600"}
                    borderRadius={"0.3rem"}
                    padding={"0.3rem 0.5rem"}
                    _hover={{
                      border: "none",
                    }}
                  >
                    <FaWhatsapp
                      size={20}
                      color={ThemeColors.lightColor}
                      style={{ margin: "0 0.3rem" }}
                    />{" "}
                    Quick Order
                  </Button>
                </Link>
              </Box>
            </Flex>
          </Box>
          <Box padding={"0 1rem"}>
            <Flex>
              <Box padding={"0.3rem 0.5rem"}>
                <Link href={"/cart"}>
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
              {userInfo ? (
                <Box padding={" 0.3rem 0.5rem"}>
                  <Button
                    color={ThemeColors.lightColor}
                    background={ThemeColors.darkColor}
                    border={"1.7px solid " + ThemeColors.darkColor}
                    borderRadius={"0.3rem"}
                    padding={"0.5rem 1rem"}
                    _hover={{
                      border: "none",
                    }}
                    onClick={logoutHandler}
                  >
                    <FaSignOutAlt
                      size={20}
                      color={ThemeColors.lightColor}
                      style={{ margin: "0 0.3rem" }}
                    />{" "}
                    Logout
                  </Button>
                </Box>
              ) : (
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
              )}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
