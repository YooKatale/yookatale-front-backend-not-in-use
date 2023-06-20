"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import { Images, ThemeColors } from "@constants/constants";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import currency from "currency.js";

const UGX = (value) =>
  currency(value, { symbol: "UGX", precision: 0, separator: "," });

const Cart = () => {
  const [CartSample, setCartSample] = useState([
    {
      productId: "8273361823",
      productName: "Strawberries",
      productImage: Images.img4,
      productPrice: 34500,
      productTotal: 34500,
      productQuantity: 1,
    },
    {
      productId: "63587436263",
      productName: "Green Apples",
      productImage: Images.img2,
      productPrice: 14500,
      productTotal: 14500,
      productQuantity: 1,
    },
  ]);

  const [CartTotal, setCartTotal] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fn();
  }, [count]);

  // calculate product total
  const calcEachProductTotal = () => {
    setCartSample((prevState) =>
      prevState.map((cart) => {
        return (cart = {
          ...cart,
          productTotal:
            parseInt(cart.productPrice) * parseInt(cart.productQuantity),
        });
      })
    );
  };

  // function to calculate the cart total
  const calcCartTotal = () => {
    const newCartTotal = CartSample.reduce((a, b) => {
      return a + parseInt(b?.productTotal ? b?.productTotal : 0);
    }, 0);

    setCartTotal((prevState) => {
      return newCartTotal;
    });
  };

  // function to handle increasing and reducing product quantity
  const IncreaseProductQuantity = (id) => {
    // find the index of the product in the cart array
    const currentProductIndex = CartSample.findIndex(
      (cart) => cart.productId === id
    );

    // Increase product quantity
    let updatedProduct = {
      ...CartSample[currentProductIndex],
      productQuantity: CartSample[currentProductIndex].productQuantity + 1,
    };

    // update the CartProduct array
    setCartSample([
      ...CartSample.slice(0, currentProductIndex),
      updatedProduct,
      ...CartSample.slice(currentProductIndex + 1),
    ]);

    // recalculate total
    fn();

    setCount(count + 1);
  };

  const ReduceProductQuantity = (id) => {
    // check if the current product quantity is 1. If true don't reduce else reduce
    // find the index of the product in the cart array
    const currentProductIndex = CartSample.findIndex(
      (cart) => cart.productId === id
    );

    // Reduce product quantity
    let updatedProduct = {
      ...CartSample[currentProductIndex],
      productQuantity:
        CartSample[currentProductIndex].productQuantity === 1
          ? CartSample[currentProductIndex].productQuantity
          : CartSample[currentProductIndex].productQuantity - 1,
    };

    // update the CartProduct array
    setCartSample([
      ...CartSample.slice(0, currentProductIndex),
      updatedProduct,
      ...CartSample.slice(currentProductIndex + 1),
    ]);

    // recalculate total
    fn();

    setCount(count + 1);
  };

  function fn() {
    calcEachProductTotal();
    calcCartTotal();
  }

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
                <Box width={"20%"} padding={"0.5rem 1rem"}>
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
              {CartSample.map((cart) => (
                <Flex key={cart.productId}>
                  <Box width={"15%"} padding={"0 2rem"}>
                    <Flex
                      alignContent={"center"}
                      justifyContent={"center"}
                      height={"100%"}
                    >
                      <Image
                        src={cart.productImage}
                        style={{
                          height: "auto",
                          width: "100%",
                          margin: "auto",
                        }}
                      />
                    </Flex>
                  </Box>
                  <Box width={"25%"} padding={"1rem"}>
                    <Text fontSize={"2xl"}>{cart.productName}</Text>
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
                        onClick={() => IncreaseProductQuantity(cart.productId)}
                      >
                        <AiOutlinePlus size={21} />
                      </Button>
                      <Box
                        padding={"0.2rem"}
                        borderRadius={"0.3rem"}
                        border={"1.7px solid " + ThemeColors.darkColor}
                        width={"3rem"}
                      >
                        <Text fontSize={"md"}>{cart.productQuantity}</Text>
                      </Box>
                      <Button
                        background={"none"}
                        padding={"0.2rem"}
                        margin={"0 0.2rem"}
                        onClick={() =>
                          ReduceProductQuantity(
                            cart.productId,
                            cart.productQuantity
                          )
                        }
                      >
                        <AiOutlineMinus size={21} />
                      </Button>
                    </Flex>
                  </Box>
                  <Box width={"15%"} padding={"1rem"}>
                    <Text fontSize={"2xl"}>
                      {UGX(cart.productPrice).format()}
                    </Text>
                  </Box>
                  <Box width={"20%"} padding={"1rem"}>
                    <Text fontSize={"2xl"}>
                      {cart?.productTotal
                        ? UGX(cart.productTotal).format()
                        : "__"}
                    </Text>
                  </Box>
                  <Box width={"10%"} padding={"1rem"}>
                    <FaTrashAlt size={30} />
                  </Box>
                </Flex>
              ))}
            </Box>
          </Box>
          <Box padding={"1rem 3rem"}>
            <Flex>
              <Box
                border={"1.7px solid " + ThemeColors.lightColor}
                padding={"1rem"}
                borderRadius={"0.3rem"}
              >
                <Box padding={"0.5rem"}>
                  <Heading as={"h2"} size={"md"}>
                    Discount Coupon
                  </Heading>
                </Box>
                <Box padding={"0.5rem"}>
                  <form>
                    <FormControl>
                      <FormLabel htmlFor="coupon">Coupon</FormLabel>
                      <Input name="coupon" type="text" id="coupon" />
                      <Box padding={"0.5rem 0"}>
                        <ButtonComponent
                          text={"Apply Coupon"}
                          type={"submit"}
                        />
                      </Box>
                    </FormControl>
                  </form>
                </Box>
              </Box>
              <Spacer />
              <Box
                border={"1.7px solid " + ThemeColors.lightColor}
                padding={"1rem"}
                borderRadius={"0.3rem"}
              >
                <Stack>
                  <Box
                    padding={"0.5rem 0"}
                    borderBottom={"1.7px solid " + ThemeColors.lightColor}
                  >
                    <Flex>
                      <Heading as={"h2"} size={"md"}>
                        Cart Items:
                      </Heading>
                      <Text fontSize={"lg"} margin={"0 0.3rem"}>
                        {CartSample ? CartSample.length : 0}
                      </Text>
                    </Flex>
                  </Box>
                  <Box
                    padding={"0.5rem 0"}
                    borderBottom={"1.7px solid " + ThemeColors.lightColor}
                  >
                    <Flex>
                      <Heading as={"h2"} size={"md"}>
                        Cart SubTotal:
                      </Heading>
                      <Text fontSize={"lg"} margin={"0 0.3rem"}>
                        {UGX(CartTotal).format()}
                      </Text>
                    </Flex>
                  </Box>
                </Stack>
                <Box padding={"0.5rem 0"}>
                  <ButtonComponent text={"Checkout"} type={"submit"} />
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Cart;
