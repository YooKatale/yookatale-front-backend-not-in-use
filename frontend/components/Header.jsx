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
  CloseButton,
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
  FaUser,
} from "react-icons/fa";
import {
  AiOutlineArrowLeft,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiTwotoneShopping,
} from "react-icons/ai";
import { CgMenuRight, CgMenuRightAlt, CgMenu } from "react-icons/cg";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@slices/authSlice";
import { useLogoutMutation } from "@slices/usersApiSlice";
import { redirect, useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { IsAccountValid } from "@middleware/middleware";
import { HiChevronLeft } from "react-icons/hi";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [isLoading, setLoading] = useState({ operation: "", status: false });
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [scrollDownState, setScrollDownState] = useState(false);

  IsAccountValid();

  const { push } = useRouter();

  const [logoutApiCall] = useLogoutMutation();

  const chakraToast = useToast();

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    // set loading to be true
    setLoading({ ...isLoading, operation: "logout", status: true });

    // close dropdown menu if open
    if (dropdownMenu) setDropdownMenu(false);

    try {
      const res = await logoutApiCall().unwrap();

      // set loading to be false
      setLoading({ ...isLoading, operation: "", status: false });

      dispatch(logout());

      push("/");
    } catch (err) {
      // set loading to be false
      setLoading({ ...isLoading, operation: "", status: false });

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
    setLoading(
      (prevState) => (prevState = { operation: "search", status: true })
    );

    if (mobileNavOpen) {
      setMobileNavOpen(false);
    }

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

    push(`/search?q=${searchParam}`);
  };

  const stickyNavbarActivate = () => {
    let lastScrollIndex = 0;

    if (window)
      window.addEventListener("scroll", (e) => {
        const currentScrollIndex = window.scrollY;

        if (currentScrollIndex <= 0) {
          setScrollDownState(true);
        }

        if (currentScrollIndex > lastScrollIndex) setScrollDownState(true);

        if (currentScrollIndex < lastScrollIndex) setScrollDownState(false);

        lastScrollIndex = currentScrollIndex;
      });
  };

  useEffect(() => {
    stickyNavbarActivate();
  }, []);

  return (
    <>
      <Box padding={{ base: "0", md: "0", xl: "2rem 0 1rem 0" }}>
        <Box
          position={{
            base: scrollDownState ? "fixed" : "relative",
            md: "relative",
            xl: "fixed",
          }}
          top={"0"}
          right={"0"}
          left={"0"}
          padding={"1rem 0"}
          background={"#000"}
          zIndex={"900"}
          visibility={{
            base: "visible",
            md: "visible",
            xl: scrollDownState ? "visible" : "hidden",
          }}
          transform={{
            base: "translate3d(0, 0, 0)",
            md: "translate3d(0, 0, 0)",
            xl: scrollDownState
              ? "translate3d(0, 0, 0)"
              : "translate3d(0, -100%, 0)",
          }}
        >
          <Flex>
            <Box margin={"auto"} width={{ base: "80%", md: "60%", xl: "40%" }}>
              <Box>
                <form onSubmit={handleSearchFormSubmit}>
                  {isLoading.status && isLoading.operation === "search" && (
                    <Spinner />
                  )}
                  <Box position={"relative"}>
                    <AiOutlineSearch
                      size={30}
                      style={{
                        color: ThemeColors.lightColor,
                        margin: "0 0.5rem",
                        position: "absolute",
                        top: "0.5rem",
                        left: "0",
                      }}
                    />
                    <Input
                      type="text"
                      name="search"
                      width={"100%"}
                      placeholder="search product by name"
                      padding={"0.3rem 0.5rem 0.3rem 2.5rem"}
                      borderRadius={"0.3rem"}
                      color={ThemeColors.lightColor}
                      onChange={(e) => setSearchParam(e.target.value)}
                    />
                  </Box>
                </form>
              </Box>
            </Box>
          </Flex>
        </Box>
        <Flex
          justifyContent={"space-evenly"}
          padding={"0 0 1rem 0"}
          borderBottom={"1.7px solid " + ThemeColors.lightColor}
        >
          <Box padding={"0.5rem 1rem"}>
            <Link href={"/"}>
              <Flex justifyContent={"center"}>
                <Box display={{ base: "none", md: "none", xl: "block" }}>
                  <Image
                    src={Images.logo1}
                    style={{ width: "100px", height: "auto" }}
                  />
                </Box>
                <Box display={{ base: "block", md: "block", xl: "none" }}>
                  <Image
                    src={Images.logo1}
                    style={{ width: "60px", height: "auto" }}
                  />
                </Box>
              </Flex>
              <Flex justifyContent={"center"}>
                <Heading
                  as={"h2"}
                  className="secondary-bold-font"
                  size={"sm"}
                  margin={"0.3rem 0"}
                  display={"flex"}
                >
                  Here For you
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
              {/* <Box margin={"0.3rem 0.5rem"}>
                <Link href={"/products"}>
                  <Text
                    color={"#000"}
                    fontSize={"lg"}
                    _hover={{ color: ThemeColors.darkColor }}
                  >
                    Products
                  </Text>
                </Link>
              </Box> */}
              {userInfo && (
                <Box margin={"0.3rem 0.5rem"}>
                  <Link href={"/subscription"}>
                    <Text
                      color={"#000"}
                      fontSize={"lg"}
                      _hover={{ color: ThemeColors.darkColor }}
                    >
                      YooCards
                    </Text>
                  </Link>
                </Box>
              )}
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
              <Box margin={"0.3rem 0.5rem"}>
                <Link href={"/about"}>
                  <Text
                    color={"#000"}
                    fontSize={"lg"}
                    _hover={{ color: ThemeColors.darkColor }}
                  >
                    About
                  </Text>
                </Link>
              </Box>
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
              <Box margin={"0.3rem 0.5rem"}>
                <Link href={"https://newsblog.yookatale.com"}>
                  <Text
                    color={"#000"}
                    fontSize={"lg"}
                    _hover={{ color: ThemeColors.darkColor }}
                  >
                    News Blog
                  </Text>
                </Link>
              </Box>
              <Box margin={"0.3rem 0.5rem"}>
                <Link href={"https://newsblog.yookatale.com/careers"}>
                  <Text
                    color={"#000"}
                    fontSize={"lg"}
                    _hover={{ color: ThemeColors.darkColor }}
                  >
                    Careers
                  </Text>
                </Link>
              </Box>
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
                <Box position={"relative"} zIndex={5}>
                  <Box padding={" 0.3rem 0.5rem"}>
                    <Button
                      background={"none"}
                      border={"1.7px solid " + ThemeColors.darkColor}
                      borderRadius={"0.3rem"}
                      padding={"0.8rem"}
                      _hover={{
                        border: "1.8px solid " + ThemeColors.darkColor,
                      }}
                      fontSize={"lg"}
                      fontWeight={"thin"}
                      onClick={() =>
                        setDropdownMenu((prevState) =>
                          prevState ? false : true
                        )
                      }
                    >
                      <FaUser
                        size={20}
                        style={{
                          margin: "0 0.5rem 0 0.3rem",
                          color: ThemeColors.darkColor,
                        }}
                      />
                      {`${userInfo?.lastname}`}
                    </Button>
                  </Box>
                  {/* // dropdown menu */}
                  <Box
                    position={"fixed"}
                    top={"15%"}
                    padding={"1rem"}
                    background={ThemeColors.lightColor}
                    borderRadius={"0.5rem"}
                    zIndex={3}
                    width={"13rem"}
                    visibility={dropdownMenu ? "visible" : "hidden"}
                    transform={
                      dropdownMenu
                        ? "translate3d(0, 0, 0)"
                        : "translate3d(150%, 0, 0)"
                    }
                  >
                    <CloseButton
                      position={"absolute"}
                      fontSize={"md"}
                      cursor={"pointer"}
                      top={"0.5rem"}
                      right={"1rem"}
                      onClick={() =>
                        setDropdownMenu((prevState) =>
                          prevState ? false : true
                        )
                      }
                    />
                    <Stack paddingTop={"1rem"}>
                      <Box margin={"0.3rem 0"}>
                        <Link href={"/account"}>
                          <Text
                            fontSize={"md"}
                            _hover={{ color: ThemeColors.darkColor }}
                          >
                            Account
                          </Text>
                        </Link>
                      </Box>
                      <Box
                        margin={"0.3rem 0"}
                        display={"flex"}
                        cursor={"pointer"}
                        onClick={logoutHandler}
                      >
                        {isLoading.status &&
                        isLoading.operation === "logout" ? (
                          <Spinner />
                        ) : (
                          <FaSignOutAlt size={20} />
                        )}{" "}
                        <Text
                          fontSize={"md"}
                          margin={"0 0.3rem"}
                          _hover={{ color: ThemeColors.darkColor }}
                        >
                          Logout
                        </Text>
                      </Box>
                    </Stack>
                  </Box>
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
        zIndex={990}
      >
        <HiChevronLeft
          style={{
            margin: "0 0.5rem",
            position: "absolute",
            top: "5%",
            left: "3%",
            zIndex: "991",
          }}
          size={35}
          color={ThemeColors.lightColor}
          onClick={() =>
            setMobileNavOpen((prevState) => (prevState ? false : true))
          }
        />
        {userInfo ? (
          <Box paddingTop={"0.5rem"} position={"relative"} zIndex={5}>
            <Box padding={"0.5rem 0"}>
              <Button
                background={"none"}
                border={"1.7px solid " + ThemeColors.darkColor}
                borderRadius={"0.3rem"}
                padding={"0.8rem"}
                _hover={{
                  border: "1.8px solid " + ThemeColors.darkColor,
                }}
                fontSize={"lg"}
                fontWeight={"thin"}
                onClick={() =>
                  setDropdownMenu((prevState) => (prevState ? false : true))
                }
                color={ThemeColors.lightColor}
              >
                <FaUser
                  size={20}
                  style={{
                    margin: "0 0.5rem 0 0.3rem",
                    color: ThemeColors.darkColor,
                  }}
                />
                {`${userInfo?.lastname ? userInfo?.lastname : "John Doe"}`}
              </Button>
            </Box>

            {/* // -------------  dropdown menu ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            <Box
              position={"absolute"}
              padding={"1rem"}
              background={"#000"}
              borderRadius={"0.5rem"}
              zIndex={3}
              width={"13rem"}
              display={dropdownMenu ? "block" : "none"}
            >
              <CloseButton
                position={"absolute"}
                fontSize={"md"}
                cursor={"pointer"}
                top={"0.5rem"}
                right={"1rem"}
                color={ThemeColors.lightColor}
                onClick={() =>
                  setDropdownMenu((prevState) => (prevState ? false : true))
                }
              />
              <Stack paddingTop={"1rem"}>
                <Box
                  margin={"0.3rem 0"}
                  onClick={() =>
                    setMobileNavOpen((prevState) => (prevState ? false : true))
                  }
                >
                  <Link href={"/account"}>
                    <Text fontSize={"lg"} color={ThemeColors.lightColor}>
                      Account
                    </Text>
                  </Link>
                </Box>
                <Box
                  margin={"0.3rem 0"}
                  display={"flex"}
                  onClick={() =>
                    setMobileNavOpen((prevState) => (prevState ? false : true))
                  }
                >
                  <Box>
                    <Link
                      href={"/cart"}
                      onClick={() =>
                        setMobileNavOpen((prevState) =>
                          prevState ? false : true
                        )
                      }
                    >
                      <Flex
                        position={"relative"}
                        onClick={() =>
                          setMobileNavOpen((prevState) =>
                            prevState ? false : true
                          )
                        }
                      >
                        <FaShoppingBasket
                          size={23}
                          color={ThemeColors.primaryColor}
                        />
                        <Text
                          fontSize={"lg"}
                          margin={"0 0.5rem"}
                          color={ThemeColors.lightColor}
                        >
                          Cart
                        </Text>
                      </Flex>
                    </Link>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>
        ) : (
          ""
        )}

        <Box>
          <Stack padding={"1rem"}>
            {/* <Box margin={"0.5rem 0"}>
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
            </Box> */}
            {userInfo && (
              <Box margin={"0.5rem 0"}>
                <Link
                  href={"/subscription"}
                  onClick={() =>
                    setMobileNavOpen((prevState) => (prevState ? false : true))
                  }
                >
                  <Text
                    color={ThemeColors.lightColor}
                    fontSize={"lg"}
                    _hover={{ color: ThemeColors.darkColor }}
                  >
                    YooCards
                  </Text>
                </Link>
              </Box>
            )}
            <Box margin={"0.5rem 0"}>
              <Link
                href={"/contact"}
                onClick={() =>
                  setMobileNavOpen((prevState) => (prevState ? false : true))
                }
              >
                <Text
                  color={ThemeColors.lightColor}
                  fontSize={"lg"}
                  _hover={{ color: ThemeColors.darkColor }}
                >
                  Contact
                </Text>
              </Link>
            </Box>
            <Box margin={"0.5rem 0"}>
              <Link
                href={"/about"}
                onClick={() =>
                  setMobileNavOpen((prevState) => (prevState ? false : true))
                }
              >
                <Text
                  color={ThemeColors.lightColor}
                  fontSize={"lg"}
                  _hover={{ color: ThemeColors.darkColor }}
                >
                  About
                </Text>
              </Link>
            </Box>
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
            <Box margin={"0.5rem 0"}>
              <Link
                href={"https://newsblog.yookatale.com"}
                onClick={() =>
                  setMobileNavOpen((prevState) => (prevState ? false : true))
                }
              >
                <Text
                  color={ThemeColors.lightColor}
                  fontSize={"lg"}
                  _hover={{ color: ThemeColors.darkColor }}
                >
                  News Blog
                </Text>
              </Link>
            </Box>
            <Box margin={"0.5rem 0"}>
              <Link
                href={"/https://newsblog.yookatale.com/careers"}
                onClick={() =>
                  setMobileNavOpen((prevState) => (prevState ? false : true))
                }
              >
                <Text
                  color={ThemeColors.lightColor}
                  fontSize={"lg"}
                  _hover={{ color: ThemeColors.darkColor }}
                >
                  Careers
                </Text>
              </Link>
            </Box>
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
            <Box margin={"1rem 0"}>
              {userInfo ? (
                <Box padding={"0"}>
                  <Button
                    background={ThemeColors.darkColor}
                    onClick={logoutHandler}
                    fontWeight={"light"}
                  >
                    <Flex>
                      {isLoading.status && isLoading.operation === "logout" ? (
                        <Spinner />
                      ) : (
                        <FaSignOutAlt
                          size={20}
                          style={{ color: ThemeColors.lightColor }}
                        />
                      )}{" "}
                      <Text
                        fontSize={"md"}
                        margin={"0 0.3rem"}
                        color={ThemeColors.lightColor}
                      >
                        Logout
                      </Text>
                    </Flex>
                  </Button>
                </Box>
              ) : (
                <Box padding={"0"}>
                  <Link
                    href={"/signin"}
                    onClick={() =>
                      setMobileNavOpen((prevState) =>
                        prevState ? false : true
                      )
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
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Header;
