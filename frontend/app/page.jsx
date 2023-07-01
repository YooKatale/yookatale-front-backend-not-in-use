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
  useProductsCategoryGetMutation,
} from "@slices/usersApiSlice";
import currency from "currency.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const UGX = (value) =>
  currency(value, { symbol: "UGX", precision: 0, separator: "," });

const Home = () => {
  const [Products, setProducts] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);

  const [fetchProducts] = useProductsCategoryGetMutation();
  const [addCartApi, { isLoading }] = useCartCreateMutation();

  const { push } = useRouter();
  const chakraToast = useToast();

  const handleDataFetch = async () => {
    const res = await fetchProducts("featured");

    if (res.data?.status && res.data?.status == "Success") {
      setProducts(res.data?.data);
    }
  };

  // comment section slider navigation
  const [currSliderIndex, setCurrSliderIndex] = useState(0);

  // const CommentsArr = [
  //   {
  //     name: "John Doe",
  //     message:
  //       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure amet ad animi quidem beatae in dicta eius, et eos repellendus!",
  //   },
  //   {
  //     name: "Peter Doe",
  //     message:
  //       "Iure amet ad animi quidem beatae in dicta eius, et eos repellendus!",
  //   },
  //   {
  //     name: "Carry Underwood",
  //     message:
  //       "Iure amet ad animi quidem beatae in dicta eius, et eos repellendus! Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  //   },
  //   {
  //     name: "Mary Doe",
  //     message:
  //       "Mollitia nisi ducimus soluta obcaecati cumque. Tempore incidunt, qui magni eius facilis illo quas officiis officia enim vel adipisci? Iure amet ad animi quidem beatae in dicta eius.",
  //   },
  // ];

  const CommentsArr = [];

  const increaseSliderIndex = () => {
    if (currSliderIndex > CommentsArr.length) {
      console.log("Out of bound");
      setCurrSliderIndex((prev) => 0);
    } else {
      console.log("In Bound");
      setCurrSliderIndex((prev) => prev + 1);
    }
  };

  const decreaseSliderIndex = () => {
    if (currSliderIndex > 0) {
      setCurrSliderIndex((prev) => prev - 1);
    } else {
      setCurrSliderIndex((prev) => CommentsArr.length - 1);
    }
  };

  console.log({ currSliderIndex });

  // fetch product categories
  useEffect(() => {
    handleDataFetch();
  }, []);

  // function to handle adding product to cart
  const handleAddCart = async (ID) => {
    // check if user has not logged in
    if (!userInfo) {
      chakraToast({
        title: "Sign In is required",
        description: `You need to sign in to add to cart`,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
      push("/signin");
      return;
    }

    try {
      const res = await addCartApi({ productId: ID, userId: userInfo?._id });

      if (res.data?.message) {
        chakraToast({
          title: "Success",
          description: res.data?.message,
          status: "success",
          duration: 5000,
          isClosable: false,
        });
      }

      if (res.error) {
        chakraToast({
          title: "Error",
          description: res.error.data?.message,
          status: "error",
          duration: 5000,
          isClosable: false,
        });
      }
    } catch (err) {
      chakraToast({
        title: "Error",
        description: err.message.error || err.error,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/public/assets/icons/logo1.png" />
      </Head>
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
      {Products.length > 0 ? (
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
                {Products.map((product, index) => (
                  <Box
                    padding={"1rem"}
                    background={"#fff"}
                    borderRadius={"md"}
                    _hover={{
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                    key={index}
                  >
                    <Box height={"200px"} padding="0.5rem">
                      <Link href={`/product?id=${product._id}`}>
                        <Flex
                          alignContent={"center"}
                          justifyContent={"center"}
                          height={"100%"}
                        >
                          <Image
                            src={`${product.images}`}
                            width={"auto"}
                            style={{
                              width: "auto",
                              height: "100%",
                              margin: "auto",
                            }}
                          />
                        </Flex>
                      </Link>
                    </Box>
                    <Box padding={"0.5rem 0"}>
                      <Text
                        textAlign={"center"}
                        className="secondary-light-font"
                        fontSize={"2xl"}
                      >
                        {product.name}
                      </Text>
                      <Heading
                        as={"h3"}
                        margin={"0.5rem 0"}
                        textAlign={"center"}
                        className="secondary-extra-bold"
                        fontSize={"2xl"}
                        color={ThemeColors.darkColor}
                      >
                        {UGX(product.price).format()}
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
                            onClick={() => handleAddCart(product._id)}
                          >
                            {isLoading ? (
                              <Spinner />
                            ) : (
                              <FaCartPlus
                                size={26}
                                style={{ margin: "0 0.5rem 0 0" }}
                                color={ThemeColors.lightColor}
                              />
                            )}
                            Add To cart
                          </Button>
                        </Flex>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Grid>
            </Box>
          </Flex>
        </Box>
      ) : (
        ""
      )}
      {/* Section three */}
      <Box>
        {CommentsArr.length > 0 ? (
          <Box
            padding={"2rem 0 3rem 0"}
            borderBottom={"1.7px solid " + ThemeColors.lightColor}
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
            <Box position={"relative"}>
              <Box
                cursor={"pointer"}
                position={"absolute"}
                top={"45%"}
                left={"15%"}
              >
                <AI.AiOutlineArrowLeft
                  size={35}
                  onClick={decreaseSliderIndex}
                />
              </Box>
              <Box
                cursor={"pointer"}
                position={"absolute"}
                top={"45%"}
                right={"15%"}
              >
                <AI.AiOutlineArrowRight
                  size={35}
                  onClick={increaseSliderIndex}
                />
              </Box>
            </Box>
            <Flex>
              <Box margin={"auto"} width={"40%"}>
                <Flex justifyContent={"center"}>
                  {CommentsArr.map((comment, index) =>
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
      {/* Section four */}
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
                          <Text>+256 754615840</Text>
                        </Box>
                        {/* <Box>
                          <Text>+256 7736 9384722</Text>
                        </Box> */}
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
