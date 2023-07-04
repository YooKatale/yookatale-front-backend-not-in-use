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
  Spacer,
  Stack,
  Spinner,
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
import {
  AiOutlineArrowLeft,
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiTwotoneShopping,
} from "react-icons/ai";
import { CgMenuRight, CgMenuRightAlt, CgMenu } from "react-icons/cg";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@slices/authSlice";
import { useLogoutMutation } from "@slices/usersApiSlice";
import { redirect, useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [isLoading, setLoading] = useState({ operation: "", status: false });

  const { push } = useRouter();

  const [logoutApiCall] = useLogoutMutation();

  const chakraToast = useToast();

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    // set loading to be true
    setLoading({ ...isLoading, operation: "logout", status: true });

    try {
      const res = await logoutApiCall().unwrap();

      console.log({ res });

      console.log("here");

      // set loading to be false
      setLoading({ ...isLoading, operation: "", status: false });

      dispatch(logout());

      console.log("and here");
      push("/");
    } catch (err) {
      console.log({ err });
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

    // set loading to be true
    setLoading({ ...isLoading, operation: "search", status: true });

    setMobileNavOpen((prevState) => (prevState ? false : true));

    if (searchParam == "")
      return chakraToast({
        title: "Error",
        description: "Search cannot be empty",
        status: "error",
        duration: 5000,
        isClosable: false,
      });

    // set loading to be false
    setLoading({ ...isLoading, operation: "", status: false });

    push(`/search?name=${searchParam}`);
  };

  return (
    <>
      <Box padding={"2rem 0 1rem 0"}>
        <Flex
          padding={""}
          justifyContent={"center"}
          display={{ base: "flex", md: "flex", xl: "none" }}
        >
          <Box padding={"0 0.5rem"}>
            <Text display={"flex"} textAlign={"center"}>
              For support call us on{" "}
            </Text>
            <Text className="primary-bold-font" textAlign={"center"}>
              {" "}
              +256 754615840
            </Text>
          </Box>
          <Box margin={"0.3rem 0.5rem"}>
            <Link href={"https://wa.me/256754615840"} target="_blank">
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
        <Flex
          justifyContent={"space-evenly"}
          padding={"0 0 1rem 0"}
          borderBottom={"1.7px solid " + ThemeColors.lightColor}
        >
          <Box padding={"0.5rem 1rem"}>
            <Link href={"/"}>
              <Flex>
                <Image
                  src={Images.logo1}
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
          <Spacer display={{ base: "block", md: "block", xl: "none" }} />
          <Box
            padding={"0 1rem"}
            display={{ base: "none", md: "none", xl: "block" }}
          >
            <Flex>
              <Box padding={"0.3rem 0.5rem"}>
                <Text display={"flex"}>
                  For support call us on{" "}
                  <Text className="primary-bold-font"> +256 754615840</Text>
                </Text>
              </Box>
              <Box padding={"0 0.5rem"}>
                <form onSubmit={handleSearchFormSubmit}>
                  {isLoading.status && isLoading.operation === "search" && (
                    <Spinner />
                  )}
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
                    color={"#000"}
                    fontSize={"lg"}
                    _hover={{ color: ThemeColors.darkColor }}
                  >
                    Products
                  </Text>
                </Link>
              </Box>
              <Box margin={"0.3rem 0.5rem"}>
                <Link href={"/contact"}>
                  <Text
                    color={"#000"}
                    fontSize={"lg"}
                    _hover={{ color: ThemeColors.darkColor }}
                  >
                    Contact
                  </Text>
                </Link>
              </Box>
              {/* <Box margin={"0.3rem 0.5rem"}>
                <Link href={"/about"}>
                  <Text
                  color={"#000"}
fontSize={"lg"}}}
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
                      fontSize={"lg"}
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
                  color={ThemeColors.lightColor}
fontSize={"lg"}}}
                    _hover={{ color: ThemeColors.darkColor }}
                  >
                    Schedule Delivery
                  </Text>
                </Link>
              </Box> */}
              <Box margin={"0 0.5rem"}>
                <Link href={"https://wa.me/256754615840"} target="_blank">
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
          <Box
            padding={"0 1rem"}
            display={{ base: "none", md: "none", xl: "block" }}
          >
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
                    {isLoading.status && isLoading.operation === "logout" ? (
                      <Spinner />
                    ) : (
                      <FaSignOutAlt
                        size={20}
                        color={ThemeColors.lightColor}
                        style={{ margin: "0 0.3rem" }}
                      />
                    )}{" "}
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
          <Box display={{ base: "block", md: "block", xl: "none" }}>
            <Box
              padding={"2rem 2rem 0 0"}
              onClick={() =>
                setMobileNavOpen((prevState) => (prevState ? false : true))
              }
            >
              <CgMenu size={30} />
              {/* <AiOutlineMenu size={30} /> */}
            </Box>
          </Box>
        </Flex>
      </Box>

      {/* // mobile nav bar */}
      <Box
        padding={"5rem 2rem 2rem 2rem"}
        position={"fixed"}
        top={"0"}
        bottom={"0"}
        right={"0"}
        width={"80%"}
        background={
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.847), rgba(0, 0, 0, 0.947))"
        }
        backdropFilter={"blur(6px)"}
        visibility={mobileNavOpen ? "visible" : "hidden"}
        transform={
          mobileNavOpen ? "translate3d(0, 0, 0)" : "translate3d(150%, 0, 0)"
        }
        zIndex={10}
      >
        <AiOutlineArrowLeft
          style={{
            margin: "0 0.5rem",
            position: "absolute",
            top: "5%",
            left: "3%",
          }}
          size={35}
          color={ThemeColors.lightColor}
          onClick={() =>
            setMobileNavOpen((prevState) => (prevState ? false : true))
          }
        />
        <Box padding={"1rem 0"}>
          <form onSubmit={handleSearchFormSubmit}>
            <Box>
              {isLoading ? <Spinner /> : ""}
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
        <Box>
          <Stack padding={"1rem"}>
            <Box margin={"0.5rem 0"}>
              <Link
                href={"/products"}
                onClick={() =>
                  setMobileNavOpen((prevState) => (prevState ? false : true))
                }
              >
                <Text
                  color={ThemeColors.lightColor}
                  fontSize={"lg"}
                  _hover={{ color: ThemeColors.darkColor }}
                >
                  Products
                </Text>
              </Link>
            </Box>
            <Box margin={"0.5rem 0"}>
              <Link href={"/contact"}>
                <Text
                  color={ThemeColors.lightColor}
                  fontSize={"lg"}
                  _hover={{ color: ThemeColors.darkColor }}
                >
                  Contact
                </Text>
              </Link>
            </Box>
            {/* <Box margin={"0.5rem 0"}>
                <Link href={"/about"} onClick={() =>
            setMobileNavOpen((prevState) => (prevState ? false : true))
          }>
                  <Text
                  color={ThemeColors.lightColor}
fontSize={"lg"}}}
                    _hover={{ color: ThemeColors.darkColor }}
                  >
                    About
                  </Text>
                </Link>
              </Box> */}
            {userInfo ? (
              <Box margin={"0.5rem 0"}>
                <Link
                  href={"/orders"}
                  onClick={() =>
                    setMobileNavOpen((prevState) => (prevState ? false : true))
                  }
                >
                  <Text
                    color={ThemeColors.lightColor}
                    fontSize={"lg"}
                    _hover={{ color: ThemeColors.darkColor }}
                  >
                    Track Order
                  </Text>
                </Link>
              </Box>
            ) : (
              ""
            )}
            {/* <Box margin={"0.5rem 0"}>
                <Link href={"/schedule"} onClick={() =>
            setMobileNavOpen((prevState) => (prevState ? false : true))
          }>
                  <Text
                  color={ThemeColors.lightColor}
fontSize={"lg"}}}
                    _hover={{ color: ThemeColors.darkColor }}
                  >
                    Schedule Delivery
                  </Text>
                </Link>
              </Box> */}
            <Box margin={"1rem 0"}>
              <Link
                href={"https://wa.me/256754615840"}
                onClick={() =>
                  setMobileNavOpen((prevState) => (prevState ? false : true))
                }
              >
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
          </Stack>
        </Box>
        <Box>
          <Stack padding={"2rem 0"}>
            <Box padding={"0.5rem 0"}>
              <Link
                href={"/cart"}
                onClick={() =>
                  setMobileNavOpen((prevState) => (prevState ? false : true))
                }
              >
                <Flex position={"relative"}>
                  <FaShoppingBasket
                    size={35}
                    color={ThemeColors.primaryColor}
                  />
                  <Text
                    style={{ fontSize: "1.3rem" }}
                    margin={"0.3rem 0.5rem"}
                    color={ThemeColors.lightColor}
                  >
                    Cart
                  </Text>
                </Flex>
              </Link>
            </Box>
            {userInfo ? (
              <Box padding={"0.5rem 0"}>
                <Button
                  color={ThemeColors.lightColor}
                  background={ThemeColors.darkColor}
                  border={"1.7px solid " + ThemeColors.darkColor}
                  borderRadius={"0.3rem"}
                  padding={"0.5rem 1rem"}
                  _hover={{
                    border: "none",
                  }}
                  onClick={() => logoutHandler()}
                >
                  {isLoading.status && isLoading.operation === "logout" ? (
                    <Spinner />
                  ) : (
                    <FaSignOutAlt
                      size={20}
                      color={ThemeColors.lightColor}
                      style={{ margin: "0 0.3rem" }}
                    />
                  )}{" "}
                  Logout
                </Button>
              </Box>
            ) : (
              <Box padding={"0.5rem 0"}>
                <Link
                  href={"/signin"}
                  onClick={() =>
                    setMobileNavOpen((prevState) => (prevState ? false : true))
                  }
                >
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
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Header;
