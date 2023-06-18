"use client";

import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Images, ThemeColors } from "@constants/constants";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  return (
    <>
      <Box>
        <Box padding={"1rem 2rem"}>
          <Box>
            <Heading as={"h2"} size={"lg"}>
              Your Cart
            </Heading>
          </Box>
          <Box padding={"1rem 3rem"}>
            <Box padding={"0.5rem 0"}>
              <Flex>
                <Box width={"15%"} padding={"0.5rem 1rem"}>
                  <Heading as={"h2"} size={"md"}>
                    Image
                  </Heading>
                </Box>
                <Box width={"25%"} padding={"0.5rem 1rem"}>
                  <Heading as={"h2"} size={"md"}>
                    Name
                  </Heading>
                </Box>
                <Box width={"15%"} padding={"0.5rem 1rem"}>
                  <Heading as={"h2"} size={"md"}>
                    Quantity
                  </Heading>
                </Box>
                <Box width={"15%"} padding={"0.5rem 1rem"}>
                  <Heading as={"h2"} size={"md"}>
                    Unit Price
                  </Heading>
                </Box>
                <Box width={"15%"} padding={"0.5rem 1rem"}>
                  <Heading as={"h2"} size={"md"}>
                    Total
                  </Heading>
                </Box>
                <Box width={"10%"}></Box>
              </Flex>
            </Box>
            <Box
              padding={"0.5rem 0"}
              borderBottom={"1.7px solid " + ThemeColors.lightColor}
            >
              <Flex>
                <Box width={"15%"} padding={"0 2rem"}>
                  <Flex
                    alignContent={"center"}
                    justifyContent={"center"}
                    height={"100%"}
                  >
                    <Image
                      src={Images.img1}
                      style={{
                        height: "auto",
                        width: "100%",
                        margin: "auto",
                      }}
                    />
                  </Flex>
                </Box>
                <Box width={"25%"} padding={"1rem"}>
                  <Text fontSize={"2xl"}>Strawberries</Text>
                </Box>
                <Box width={"15%"} padding={"1rem"}>
                  <Flex
                    borderRadius={"0.3rem"}
                    border={"1.7px solid " + ThemeColors.darkColor}
                    padding={"0.2rem"}
                  >
                    <Button
                      background={"none"}
                      padding={"0.2rem"}
                      margin={"0 0.2rem"}
                    >
                      <AiOutlinePlus size={21} />
                    </Button>
                    <Box
                      padding={"0.2rem"}
                      borderRadius={"0.3rem"}
                      border={"1.7px solid " + ThemeColors.darkColor}
                      width={"3rem"}
                    >
                      <Text fontSize={"md"}>1</Text>
                    </Box>
                    <Button
                      background={"none"}
                      padding={"0.2rem"}
                      margin={"0 0.2rem"}
                    >
                      <AiOutlineMinus size={21} />
                    </Button>
                  </Flex>
                </Box>
                <Box width={"15%"} padding={"1rem"}>
                  <Text fontSize={"2xl"}>UGX 45,000</Text>
                </Box>
                <Box width={"15%"} padding={"1rem"}>
                  <Text fontSize={"2xl"}>UGX 785,000</Text>
                </Box>
                <Box width={"10%"} padding={"1rem"}>
                  <FaTrashAlt size={30} />
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Cart;
