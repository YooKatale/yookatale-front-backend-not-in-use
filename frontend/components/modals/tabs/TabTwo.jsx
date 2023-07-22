"use client";

import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Spacer,
  Text,
  Textarea,
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import { ThemeColors } from "@constants/constants";
import { useEffect, useState } from "react";
import currency from "currency.js";

const UGX = (value) =>
  currency(value, { symbol: "UGX", precision: 0, separator: "," });

const TabTwo = ({ Cart, updateTabIndex, tabOneData }) => {
  const [CartTotal, setCartTotal] = useState(0);

  // function to calculate the cart total
  const calcCartTotal = () => {
    const newCartTotal = Cart.reduce((a, b) => {
      return a + parseInt(b?.total ? b?.total : 0);
    }, 0);

    setCartTotal((prevState) => newCartTotal);
  };

  useEffect(() => {
    calcCartTotal();
  }, []);

  return (
    <>
      <Box>
        <Box padding={"1rem 0"}>
          <Heading as={"h3"} size={"md"} textAlign={"center"}>
            Checkout summary
          </Heading>
        </Box>
        <Box padding={"1rem 0"} maxHeight={"300px"} overflowY={"auto"}>
          <Heading as={"h3"} size={"sm"}>
            Products
          </Heading>
          {Cart.length > 0
            ? Cart.map((cart, index) => (
                <Box
                  key={index}
                  index={"index"}
                  padding={"0.5rem 0"}
                  marginBottom={"0.3rem"}
                  borderBottom={"1.7px solid " + ThemeColors.lightColor}
                >
                  <Box>
                    <Text fontSize={"lg"}>
                      Product: {cart?.name ? cart.name : "__"}
                    </Text>
                  </Box>
                  <Box padding={"0.5rem 0"}>
                    <Grid
                      gridTemplateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        xl: "repeat(4, 1fr)",
                      }}
                      gridGap={"1rem"}
                    >
                      <Box>
                        <Text fontSize={"md"}>
                          Quantity: {cart?.quantity ? cart.quantity : "__"}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize={"md"}>
                          Total:{" "}
                          {cart?.price
                            ? UGX(
                                parseInt(cart.price) * parseInt(cart.quantity)
                              ).format()
                            : "__"}
                        </Text>
                      </Box>
                    </Grid>
                  </Box>
                </Box>
              ))
            : ""}
        </Box>
        <Grid
          gridTemplateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(2, 1fr)",
          }}
          gridGap={"1rem"}
        >
          <Box
            padding={"1rem 0"}
            borderBottom={"1.7px solid " + ThemeColors.lightColor}
          >
            <Box>
              <Heading as={"h3"} size={"sm"}>
                Delivery Addresses
              </Heading>
            </Box>
            <Box>
              <Box padding={"0.5rem 0"}>
                <Text fontSize={"md"}>
                  Address 1:{" "}
                  {tabOneData?.deliveryAddress?.address1
                    ? tabOneData?.deliveryAddress?.address1
                    : "__"}
                </Text>
              </Box>
              <Box padding={"0.5rem 0"}>
                <Text fontSize={"md"}>
                  Address 2:{" "}
                  {tabOneData?.deliveryAddress?.address2
                    ? tabOneData?.deliveryAddress?.address2
                    : "__"}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box
            padding={"1rem 0"}
            borderBottom={"1.7px solid " + ThemeColors.lightColor}
          >
            <Box>
              <Heading as={"h3"} size={"sm"}>
                Special Requests
              </Heading>
            </Box>
            <Box padding={""}>
              <Box padding={"0.5rem 0"}>
                <Text fontSize={"md"}>
                  Peel Food:{" "}
                  {tabOneData?.specialRequests?.peeledFood ? "Yes" : "No"}
                </Text>
              </Box>
              {tabOneData?.specialRequests?.moreInfo ? (
                tabOneData?.specialRequests?.moreInfo !== "" ? (
                  <Box padding={"0.5rem 0"}>
                    <Text fontSize={"md"}>
                      More Information: {tabOneData?.specialRequests?.moreInfo}
                    </Text>
                  </Box>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </Box>
          </Box>
        </Grid>
        <Box
          padding={"1rem 0"}
          borderBottom={"1.7px solid " + ThemeColors.lightColor}
        >
          <Heading as={"h3"} size={"sm"} display={"flex"}>
            Delivery Cost:{" "}
            <Text
              fontSize={"lg"}
              className="secondary-light-font"
              margin={"0 0.3rem"}
            >
              UGX 1000
            </Text>
          </Heading>
        </Box>
        <Box
          padding={"1rem 0"}
          borderBottom={"1.7px solid " + ThemeColors.lightColor}
        >
          <Text margin={"1rem 0"} fontSize={"lg"}>
            Cart SubTotal: {UGX(CartTotal).format()}
          </Text>
          <Heading as={"h3"} size={"md"}>
            Cart Total: {UGX(CartTotal + 1000).format()}
          </Heading>
        </Box>
        <Box padding={"1rem 0"}>
          <Flex>
            <Box onClick={() => updateTabIndex(0)}>
              <ButtonComponent type={"button"} text={"Back"} />
            </Box>
            <Spacer />
            <Box onClick={() => updateTabIndex(2)}>
              <ButtonComponent type={"button"} text={"Choose Payment Method"} />
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default TabTwo;
