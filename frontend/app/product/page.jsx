"use client";

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  Image,
  useToast,
} from "@chakra-ui/react";
import { DisplayImages, Images, ThemeColors } from "@constants/constants";
import React, { useEffect, useState } from "react";
// import Image from "next/image";
import { FaCartPlus, FaMinus, FaPlus } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  useCartCreateMutation,
  useProductGetMutation,
} from "@slices/usersApiSlice";
import { redirect, useSearchParams, useRouter } from "next/navigation";
import currency from "currency.js";
import { useSelector } from "react-redux";

const UGX = (value) =>
  currency(value, { symbol: "UGX", precision: 0, separator: "," });

const Product = () => {
  // get user information stored in the localstorage
  const { userInfo } = useSelector((state) => state.auth);

  const chakraToast = useToast();

  const { push } = useRouter();

  // use the useSearchParam hooks from next/navigation to get url params
  const searchParam = useSearchParams();

  const param = searchParam.get("id");

  // create state to hold fetched Product information
  const [Product, setProduct] = useState({});

  // initialize mutation function to fetch product data from database
  const [fetchProduct] = useProductGetMutation();

  const [addCartApi] = useCartCreateMutation();

  // function handle fetching data
  const handleDataFetch = async () => {
    const res = await fetchProduct(param);

    if (res.data?.status && res.data?.status == "Success") {
      setProduct({ ...res.data?.data });
    }
  };

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
      <Box>
        <Box padding={"0 2rem"}>
          <Box paddingBottom={"1rem"}>
            <Heading as={"h2"} size={"sm"} display={"flex"}>
              Home/product/
              <Heading as={"h2"} size={"sm"} color={ThemeColors.darkColor}>
                {Product?.category ? Product?.category : "category"}
              </Heading>
            </Heading>
          </Box>
          <Box padding={{ base: "1rem 0", md: "1rem 0", xl: "1rem 2rem" }}>
            <Flex
              borderTop={"1.7px solid " + ThemeColors.lightColor}
              direction={{ base: "column", md: "column", xl: "row" }}
            >
              <Box width={{ base: "100%", md: "90%", xl: "45%" }}>
                <Box id="main-product-image" position={"relative"}>
                  <Flex
                    alignContent={"center"}
                    justifyContent={"center"}
                    height={"100%"}
                  >
                    <Image
                      src={Product?.images ? `${Product?.images[0]}` : ""}
                      style={{
                        width: "auto",
                        height: "100%",
                        margin: "auto",
                      }}
                    />
                  </Flex>
                  <Box padding={"1rem 0"}>
                    <Grid
                      gridTemplateColumns={`repeat(${
                        parseInt(DisplayImages.length)
                          ? parseInt(DisplayImages.length) > 5
                            ? 5
                            : parseInt(DisplayImages.length)
                          : 5
                      }, 1fr)`}
                      gridGap={"1rem"}
                    >
                      {Product?.images
                        ? Product?.images.map((image, index) => (
                            <Flex
                              alignContent={"center"}
                              justifyContent={"center"}
                              height={"100%"}
                              key={index}
                              borderRadius={"0.3rem"}
                              border={"1.7px solid " + ThemeColors.lightColor}
                            >
                              <Image
                                src={image}
                                style={{
                                  height: "auto",
                                  width: "100%",
                                  margin: "auto",
                                }}
                              />
                            </Flex>
                          ))
                        : ""}
                    </Grid>
                  </Box>
                </Box>
              </Box>
              <Box
                width={{ base: "100%", md: "90%", xl: "55%" }}
                padding={{ base: "2rem 0", md: "2rem 0", xl: "2rem" }}
              >
                <Box padding={"1rem 0"}>
                  <Heading as={"h2"} size={"2xl"}>
                    {Product?.name ? Product?.name : "__"}
                  </Heading>
                  <Text
                    margin={"1rem 0 0.5rem 0"}
                    color={ThemeColors.secondaryColor}
                    fontSize={"2xl"}
                  >
                    {UGX(Product?.price ? Product?.price : 0).format()}
                  </Text>
                  <Text
                    margin={"0.5rem 0"}
                    className="secondary-bold-font"
                    color={ThemeColors.darkColor}
                    fontSize={"lg"}
                  >
                    {Product?.category ? Product?.category : "__"}
                  </Text>
                </Box>
                <Box padding={"1rem 0"}>
                  <Text>
                    {Product?.description ? Product?.description : "__"}
                  </Text>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <Flex>
                    {/* <Box paddingRight="1rem">
                      <Flex
                        borderRadius={"0.3rem"}
                        border={"1.7px solid " + ThemeColors.darkColor}
                        padding={"0.3rem"}
                      >
                        <Button
                          background={"none"}
                          padding={"0.3rem"}
                          margin={"0 0.3rem"}
                        >
                          <AiOutlinePlus size={25} />
                        </Button>
                        <Box
                          padding={"0.3rem"}
                          borderRadius={"0.3rem"}
                          border={"1.7px solid " + ThemeColors.darkColor}
                          width={"3rem"}
                        >
                          <Text fontSize={"md"}>1</Text>
                        </Box>
                        <Button
                          background={"none"}
                          padding={"0.3rem"}
                          margin={"0 0.3rem"}
                        >
                          <AiOutlineMinus size={25} />
                        </Button>
                      </Flex>
                    </Box> */}
                    <Box padding={"0.3rem 1rem"}>
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
                        onClick={() =>
                          handleAddCart(Product?._id ? Product?._id : "")
                        }
                      >
                        <FaCartPlus
                          size={20}
                          style={{ margin: "0 0.5rem 0 0" }}
                          color={ThemeColors.lightColor}
                        />
                        Add To cart
                      </Button>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Flex>
            <Box padding={"1rem 0"} hidden>
              <Box>
                <Heading as={"h2"} size={"md"}>
                  Product Description
                </Heading>
              </Box>
              <Box padding={"0.5rem"}>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                  quod voluptate earum at voluptas quo corporis quas eum minima
                  temporibus ab harum aut fugiat accusantium iusto, placeat
                  obcaecati sequi? Eum labore libero ex cum? Suscipit velit,
                  amet est commodi qui ea omnis provident voluptatem fuga rem
                  vero nobis eum nihil consectetur cum obcaecati perspiciatis
                  culpa fugiat id ut necessitatibus. Fugit beatae distinctio
                  iusto reiciendis earum doloremque magnam accusantium, qui illo
                  illum nostrum hic, quos a, laudantium repellendus est
                  repellat. Delectus.
                </Text>
              </Box>
            </Box>
            <Box padding={"1rem 0"} hidden>
              <Box>
                <Heading as={"h2"} size={"md"}>
                  Shipping Details
                </Heading>
              </Box>
              <Box padding={"0.5rem"}>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                  quod voluptate earum at voluptas quo corporis quas eum minima
                  temporibus ab harum aut fugiat accusantium iusto, placeat
                  obcaecati sequi? Eum labore libero ex cum? Suscipit velit,
                  amet est commodi qui ea omnis provident voluptatem fuga rem
                  vero nobis eum nihil consectetur cum obcaecati perspiciatis
                  culpa fugiat id ut necessitatibus. Fugit beatae distinctio
                  iusto reiciendis earum doloremque magnam accusantium, qui illo
                  illum nostrum hic, quos a, laudantium repellendus est
                  repellat. Delectus.
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Product;
