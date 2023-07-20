"use client";

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  Image,
  Spinner,
  useDisclosure,
  Modal,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";
import Hero from "@components/Hero";
import { Images, ThemeColors } from "@constants/constants";
// import Image from "next/image";
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
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  useCartCreateMutation,
  useCommentsGetMutation,
  useProductsCategoryGetMutation,
} from "@slices/usersApiSlice";
import currency from "currency.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ProductCard from "@components/ProductCard";
import SpecialProducts from "@components/SpecialProducts";
import ButtonComponent from "@components/Button";
import SubscriptionCard from "@components/SubscriptionCard";

const UGX = (value) =>
  currency(value, { symbol: "UGX", precision: 0, separator: "," });

const Home = () => {
  const [Products, setProducts] = useState({ recommended: [], popular: [] });
  const [Comments, setComments] = useState([]);

  const { onOpen, onClose, isOpen } = useDisclosure();

  const { userInfo } = useSelector((state) => state.auth);

  const [fetchProducts] = useProductsCategoryGetMutation();

  const [fetchComments] = useCommentsGetMutation();

  const { push } = useRouter();

  const chakraToast = useToast();

  const handleFetchCommentsData = async () => {
    const res = await fetchComments().unwrap();

    if (res?.status && res?.status == "Success") {
      setComments(res?.data);
    }
  };

  const handleFetchProductsData = async () => {
    const res = await fetchProducts(
      JSON.stringify(["recommended", "popular"])
    ).unwrap();

    if (res?.status && res?.status == "Success") {
      setProducts(res.data);
    }
  };

  // comment section slider navigation
  const [currSliderIndex, setCurrSliderIndex] = useState(0);

  const increaseSliderIndex = () => {
    if (currSliderIndex === Comments.length - 1) {
      setCurrSliderIndex((prev) => 0);
    } else {
      setCurrSliderIndex((prev) => prev + 1);
    }
  };

  const decreaseSliderIndex = () => {
    if (currSliderIndex > 0) {
      setCurrSliderIndex((prev) => prev - 1);
    } else {
      setCurrSliderIndex((prev) => Comments.length - 1);
    }
  };

  // fetch product categories
  useEffect(() => {
    handleFetchCommentsData();
    handleFetchProductsData();
  }, []);

  console.log(Products);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/public/assets/icons/logo1.png" />
      </Head>
      <Hero />

      {/* ------------- section 
      ------------------------------- */}
      <Box padding={"3rem 0"} hidden>
        <Flex>
          <Box margin={"auto"} width={{ base: "100%", md: "90%", xl: "70%" }}>
            <Flex direction={{ base: "column", md: "column", xl: "row" }}>
              <Box width={{ base: "100%", md: "100%", xl: "50%" }}>
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
                      Fast, timely and affordable delivery any where in the city
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box width={{ base: "100%", md: "100%", xl: "50%" }}>
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

      {/* ------------- section 
      ------------------------------- */}
      {Products.length > 0
        ? Products.map(
            (product) =>
              product?.category == "popular" &&
              product?.products?.length > 0 && (
                <Box
                  padding={"3rem 0"}
                  borderBottom={"1.7px solid " + ThemeColors.lightColor}
                >
                  <Flex>
                    <Box
                      margin={"auto"}
                      width={{ base: "95%", md: "90%", xl: "90%" }}
                    >
                      <Box padding={"2rem 0"}>
                        <Heading
                          as={"h2"}
                          fontSize={"3xl"}
                          textAlign={"center"}
                        >
                          Popular Products
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
                      <SpecialProducts
                        Products={product?.products}
                        UGX={UGX}
                        userInfo={userInfo}
                      />
                    </Box>
                  </Flex>
                </Box>
              )
          )
        : ""}

      {/* ------------- section 
      ------------------------------- */}
      <Box padding={"3rem 0"}>
        <Flex>
          <Box margin={"auto"} width={{ base: "100%", md: "90%", xl: "60%" }}>
            <Box padding={{ base: "2rem", md: "2rem 1rem", xl: "2rem 0" }}>
              <Text
                textAlign={"center"}
                fontSize={{ base: "4xl", md: "4xl", xl: "4xl" }}
                className="secondary-light-font"
              >
                Enjoy Monthly Unlimited access to all Foods with your friends
                and family{" "}
                <span
                  style={{ color: ThemeColors.darkColor, fontWeight: "bold" }}
                  className="secondary-font"
                >
                  YooCard
                </span>
              </Text>
              <Flex justifyContent={"center"} padding={"1rem 0"}>
                <Link href={"/subscription"}>
                  <ButtonComponent
                    type={"button"}
                    text={"Register"}
                    pd={"1.3rem 2rem"}
                  />
                </Link>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>

      {/* ------------- section 
      ------------------------------- */}
      {Products.length > 0
        ? Products.map(
            (product) =>
              product?.category !== "popular" &&
              product?.products?.length > 0 && (
                <Box
                  padding={"3rem 0"}
                  borderBottom={"1.7px solid " + ThemeColors.lightColor}
                >
                  <Flex>
                    <Box
                      margin={"auto"}
                      width={{ base: "95%", md: "90%", xl: "90%" }}
                    >
                      <Box padding={"2rem 0"}>
                        <Heading
                          as={"h2"}
                          fontSize={"3xl"}
                          textAlign={"center"}
                          textTransform={"capitalize"}
                        >
                          {product?.category} Products
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
                      <SpecialProducts
                        Products={product?.products}
                        UGX={UGX}
                        userInfo={userInfo}
                      />
                    </Box>
                  </Flex>
                </Box>
              )
          )
        : ""}

      {/* ------------- section 
      ------------------------------- */}
      <Box>
        {Comments.length > 0 ? (
          <Box
            padding={"2rem 0 3rem 0"}
            borderBottom={"1.7px solid " + ThemeColors.lightColor}
            position={"relative"}
          >
            <Box padding={"2rem 0"}>
              <Heading as={"h2"} fontSize={"3xl"} textAlign={"center"}>
                What our customers say
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
            <Box>
              <Box
                cursor={"pointer"}
                position={"absolute"}
                top={"50%"}
                left={{ base: "5%", md: "10%", xl: "15%" }}
              >
                <AI.AiOutlineArrowLeft
                  size={35}
                  onClick={decreaseSliderIndex}
                />
              </Box>
              <Box
                cursor={"pointer"}
                position={"absolute"}
                top={"50%"}
                right={{ base: "5%", md: "10%", xl: "15%" }}
              >
                <AI.AiOutlineArrowRight
                  size={35}
                  onClick={increaseSliderIndex}
                />
              </Box>
            </Box>
            <Flex>
              <Box
                margin={"auto"}
                width={{ base: "80%", md: "60%", xl: "40%" }}
              >
                <Flex justifyContent={"center"}>
                  {Comments.map((comment, index) =>
                    index === currSliderIndex ? (
                      <Box key={index}>
                        <Heading as={"h3"} size={"md"} textAlign={"center"}>
                          {comment.name}
                        </Heading>
                        <Box padding={"0.3rem 0"}>
                          <Text
                            fontSize={"2xl"}
                            textAlign={"center"}
                            className="secondary-light-font"
                          >
                            {comment.message}
                          </Text>
                        </Box>
                      </Box>
                    ) : (
                      ""
                    )
                  )}
                </Flex>
              </Box>
            </Flex>
          </Box>
        ) : (
          ""
        )}
      </Box>

      {/* ------------- section 
      ----------------------------------- */}
      <Box>
        <Box padding={"3rem 0"}>
          <Flex>
            <Box margin={"auto"} width={{ base: "100%", md: "90%", xl: "70%" }}>
              <Flex
                direction={{ base: "column", md: "column", xl: "row" }}
                justifyContent={{
                  base: "center",
                  md: "center",
                  xl: "space-between",
                }}
              >
                <Box width={{ base: "100%", md: "90%", xl: "50%" }}>
                  <Flex
                    padding={"0 1rem"}
                    justifyContent={{
                      base: "center",
                      md: "center",
                      xl: "none",
                    }}
                  >
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
                          <Text>+256 754615840</Text>
                        </Box>
                        {/* <Box>
                          <Text>+256 7736 9384722</Text>
                        </Box> */}
                      </Stack>
                    </Box>
                  </Flex>
                </Box>
                <Box width={{ base: "100%", md: "90%", xl: "50%" }}>
                  <Flex
                    padding={"0 1rem"}
                    justifyContent={{
                      base: "center",
                      md: "center",
                      xl: "none",
                    }}
                  >
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
                        info@yookatale.com
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* // modal form container -------------------------- */}
      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"} padding={"1rem 0"}>
        {/* <ModalOverlay /> */}
        <ModalContent padding={"2rem 3rem"}>
          <ModalCloseButton size={"lg"} color={ThemeColors.darkColor} />
          <Box padding={"1rem 0"}>Modal</Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;
