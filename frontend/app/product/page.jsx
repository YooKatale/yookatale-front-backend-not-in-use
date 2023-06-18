"use client";

import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { DisplayImages, Images, ThemeColors } from "@constants/constants";
import React from "react";
import Image from "next/image";
import { FaCartPlus, FaMinus, FaPlus } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const page = () => {
  return (
    <>
      <Box>
        <Box padding={"0 2rem"}>
          <Box paddingBottom={"1rem"}>
            <Heading as={"h2"} size={"sm"} display={"flex"}>
              Home/product/
              <Heading as={"h2"} size={"sm"} color={ThemeColors.darkColor}>
                product plant
              </Heading>
            </Heading>
          </Box>
          <Box padding={"1rem 2rem"}>
            <Flex borderTop={"1.7px solid " + ThemeColors.lightColor}>
              <Box width={"45%"}>
                <Box id="main-product-image" position={"relative"}>
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
                  <Box padding={"1rem 0"}>
                    <Grid
                      gridTemplateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                        xl: `repeat(${
                          parseInt(DisplayImages.length)
                            ? parseInt(DisplayImages.length) > 5
                              ? 5
                              : parseInt(DisplayImages.length)
                            : 5
                        }, 1fr)`,
                      }}
                      gridGap={"1rem"}
                    >
                      {DisplayImages.map((image, index) => (
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
                      ))}
                    </Grid>
                  </Box>
                </Box>
              </Box>
              <Box width={"55%"} padding={"2rem"}>
                <Box padding={"1rem 0"}>
                  <Heading as={"h2"} size={"2xl"}>
                    Green Apples
                  </Heading>
                  <Text
                    margin={"1rem 0 0.5rem 0"}
                    color={ThemeColors.secondaryColor}
                    fontSize={"2xl"}
                  >
                    UGX 13,500
                  </Text>
                  <Text
                    margin={"0.5rem 0"}
                    className="secondary-bold-font"
                    color={ThemeColors.darkColor}
                    fontSize={"lg"}
                  >
                    Fresh produce
                  </Text>
                </Box>
                <Box padding={"1rem 0"}>
                  <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquid quisquam iusto accusamus voluptates ipsum fuga, quam
                    error. Minima dicta ipsum pariatur sed maiores adipisci
                    magni impedit, in veritatis quos velit eveniet perferendis
                    architecto provident fuga. A possimus, accusantium totam
                    harum quam, odio ab voluptatibus optio laborum nobis
                    laudantium deleniti fugiat.
                  </Text>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <Flex>
                    <Box paddingRight="1rem">
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
                    </Box>
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
            <Box padding={"1rem 0"}>
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
            <Box padding={"1rem 0"}>
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

export default page;
