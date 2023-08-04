"use client";

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  Spinner,
  useDisclosure,
  Input,
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
  FaMoneyCheckAlt,
  FaCreditCard,
  FaUserShield,
  FaUserClock,
  FaRegCreditCard,
  FaHeadset,
} from "react-icons/fa";
import * as HI from "react-icons/hi";
import * as AI from "react-icons/ai";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  useCommentsGetMutation,
  useNewsletterPostMutation,
  useProductsCategoryGetMutation,
} from "@slices/usersApiSlice";
import currency from "currency.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import SpecialProducts from "@components/SpecialProducts";
import ButtonComponent from "@components/Button";
import { CgShield } from "react-icons/cg";
import Script from "next/script";
import Loader from "@components/Loader";

const UGX = (value) =>
  currency(value, { symbol: "UGX", precision: 0, separator: "," });

const Home = () => {
  const [Products, setProducts] = useState([]);
  const [Comments, setComments] = useState([]);
  const [NewsletterEmail, setNewsletterEmail] = useState("");
  const [isLoading, setLoading] = useState(false);

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

  console.log({ Products });

  return (
    <>
      <Hero />

      {/* <Box display={`${Products?.length > 0 && "none"}`} hidden>
        <Loader />
      </Box> */}

      {/* ------------- section 
      ------------------------------- */}
      <Box
        padding={"3rem 0"}
        borderBottom={"1.7px solid " + ThemeColors.lightColor}
      >
        <Flex>
          <Box margin={"auto"} width={{ base: "100%", md: "75%", xl: "70%" }}>
            <Grid
              gridTemplateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(2, 1fr)",
                xl: "repeat(4, 1fr)",
              }}
              gridGap={"1rem"}
            >
              <Box>
                <Flex
                  padding={{ base: "0 0.5rem", md: "0 0.5rem", xl: "0 1rem" }}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <FaCreditCard size={60} color={ThemeColors.darkColor} />
                  <Box padding={"0.5rem 0"}>
                    <Text textAlign={"center"} fontSize={"lg"}>
                      Register for 25% YooCard premium & Gold discount
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box>
                <Flex
                  padding={{ base: "0 0.5rem", md: "0 0.5rem", xl: "0 1rem" }}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <FaHeadset size={60} color={ThemeColors.darkColor} />
                  {/* <Image src={Images.customerServiceIcon} width={60} /> */}
                  <Box padding={"0.5rem 0"}>
                    <Text textAlign={"center"} fontSize={"lg"}>
                      24/7 service support
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box>
                <Flex
                  padding={{ base: "0 0.5rem", md: "0 0.5rem", xl: "0 1rem" }}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <FaTruckLoading size={60} color={ThemeColors.darkColor} />
                  <Box padding={"0.5rem 0"}>
                    <Text textAlign={"center"} fontSize={"lg"}>
                      Delivery offer [21 - 30] <br />
                      (Register for 9 days free delivery)
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box>
                <Flex
                  padding={{ base: "0 0.5rem", md: "0 0.5rem", xl: "0 1rem" }}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {/* <CgShield size={60} color={ThemeColors.darkColor} /> */}
                  <Image src={Images.cardSecureIcon} width={60} />
                  <Box padding={"0.5rem 0"}>
                    <Text textAlign={"center"} fontSize={"lg"}>
                      Safe, instant & secured
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Grid>
          </Box>
        </Flex>
      </Box>

      {/* ------------- section 
      ------------------------------- */}
      {Products.length > 0
        ? Products.map(
            (product, index) =>
              product?.category == "popular" &&
              product?.products?.length > 0 && (
                <Box
                  padding={"3rem 0"}
                  borderBottom={"1.7px solid " + ThemeColors.lightColor}
                  key={index}
                >
                  <Flex>
                    <Box
                      margin={"auto"}
                      width={{ base: "95%", md: "90%", xl: "90%" }}
                    >
                      <Box padding={"1rem 0"}>
                        <Flex justifyContent={"space-between"}>
                          <Box>
                            <Heading
                              as={"h2"}
                              fontSize={{ base: "lg", md: "2xl", xl: "2xl" }}
                              textAlign={"center"}
                            >
                              Popular Products
                            </Heading>
                            <Flex>
                              <Box
                                height={"0.15rem"}
                                width={{
                                  base: "5rem",
                                  md: "8rem",
                                  xl: "10rem",
                                }}
                                margin={"0.5rem 0"}
                                background={ThemeColors.primaryColor}
                              ></Box>
                            </Flex>
                          </Box>
                          <Box>
                            <Link href={"/search?q=popular"}>
                              <Heading
                                as={"h2"}
                                fontSize={{ base: "md", md: "lg", xl: "lg" }}
                                textAlign={"center"}
                                _hover={{ color: ThemeColors.darkColor }}
                                color={{
                                  base: ThemeColors.darkColor,
                                  md: ThemeColors.darkColor,
                                  xl: "#000",
                                }}
                              >
                                View More
                              </Heading>
                            </Link>
                          </Box>
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
      <Box padding={"3rem 0"} background={"#000"}>
        <Flex>
          <Box margin={"auto"} width={{ base: "100%", md: "70%", xl: "50%" }}>
            <Box padding={{ base: "2rem", md: "2rem 1rem", xl: "2rem 0" }}>
              <Text
                textAlign={"center"}
                fontSize={{ base: "2xl", md: "2xl", xl: "3xl" }}
                className="secondary-light-font"
                color={ThemeColors.lightColor}
              >
                {" "}
                While
                <span
                  style={{ color: ThemeColors.darkColor, fontWeight: "bold" }}
                  className="secondary-font"
                >
                  YooKatale
                </span>
                is your mobile food market...
              </Text>

              <Text
                textAlign={"center"}
                fontSize={{ base: "2xl", md: "2xl", xl: "3xl" }}
                className="secondary-light-font"
                color={ThemeColors.lightColor}
              >
                <span
                  style={{ color: ThemeColors.darkColor, fontWeight: "bold" }}
                  className="secondary-font"
                >
                  Subscribe to YooKatale
                </span>
                , rest assured about all our everyday home kitchen needs.
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
            (product, index) =>
              product?.category !== "popular" &&
              product?.products?.length > 0 && (
                <Box
                  padding={"3rem 0"}
                  borderBottom={"1.7px solid " + ThemeColors.lightColor}
                  key={index}
                >
                  <Flex>
                    <Box
                      margin={"auto"}
                      width={{ base: "95%", md: "90%", xl: "90%" }}
                    >
                      <Box padding={"1rem 0"}>
                        <Flex justifyContent={"space-between"}>
                          <Box>
                            <Heading
                              as={"h2"}
                              fontSize={{ base: "lg", md: "2xl", xl: "2xl" }}
                              textAlign={"center"}
                              textTransform={"capitalize"}
                            >
                              {product?.category} Products
                            </Heading>
                            <Flex>
                              <Box
                                height={"0.15rem"}
                                width={{
                                  base: "5rem",
                                  md: "8rem",
                                  xl: "10rem",
                                }}
                                margin={"0.5rem 0"}
                                background={ThemeColors.primaryColor}
                              ></Box>
                            </Flex>
                          </Box>
                          <Box>
                            <Link href={`/search?q=${product?.category}`}>
                              <Heading
                                as={"h2"}
                                fontSize={{ base: "md", md: "lg", xl: "lg" }}
                                textAlign={"center"}
                                _hover={{ color: ThemeColors.darkColor }}
                                color={{
                                  base: ThemeColors.darkColor,
                                  md: ThemeColors.darkColor,
                                  xl: "#000",
                                }}
                              >
                                View More
                              </Heading>
                            </Link>
                          </Box>
                        </Flex>
                      </Box>
                      <SpecialProducts
                        Products={product?.products}
                        category={product?.category}
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
                  width={{ base: "6rem", md: "8rem", xl: "10rem" }}
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
    </>
  );
};

export default Home;
