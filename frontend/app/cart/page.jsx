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
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Textarea,
  Grid,
  Checkbox,
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import { Images, ThemeColors } from "@constants/constants";
// import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import currency from "currency.js";
import {
  useCartDeleteMutation,
  useCartMutation,
  useNewOrderMutation,
} from "@slices/usersApiSlice";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { redirect, useRouter } from "next/navigation";
import TabOne from "@components/modals/tabs/TabOne";
import TabTwo from "@components/modals/tabs/TabTwo";
import TabThree from "@components/modals/tabs/TabThree";

const UGX = (value) =>
  currency(value, { symbol: "UGX", precision: 0, separator: "," });

const Cart = () => {
  const [Cart, setCart] = useState([]);
  const [CartTotal, setCartTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [tabOneData, setTabOneData] = useState({});

  const { onOpen, onClose, isOpen } = useDisclosure();

  // get user information stored in the localstorage
  const { userInfo } = useSelector((state) => state.auth);

  const [fetchCart] = useCartMutation();
  const [deleteCartItem] = useCartDeleteMutation();
  const [placeOrder] = useNewOrderMutation();

  const chakraToast = useToast();
  const { push, refresh } = useRouter();

  // function handle fetching data
  const handleDataFetch = async () => {
    const res = await fetchCart(userInfo?._id).unwrap();

    if (res.status && res.status == "Success") {
      // combine the data of each cart item with its products information into one single object
      // variables to hold data for cart items and product items
      let CartItems = res?.data.CartItems ? res?.data.CartItems : [];
      let CartProductsItems = res?.data.CartProductsItems
        ? res?.data.CartProductsItems
        : [];

      // loop through the arrays and combine the data
      if (CartItems?.length > 0 && CartProductsItems?.length > 0) {
        for (let i = 0; i < CartItems.length; i++) {
          for (let x = 0; x < CartProductsItems.length; x++) {
            if (CartItems[i].productId == CartProductsItems[x]._id) {
              CartProductsItems[x] = {
                ...CartProductsItems[x],
                cartId: CartItems[i]._id,
                user: CartItems[i].user,
                quantity: 1,
                total: CartProductsItems[x]?.price,
              };
            }
          }
        }
      } else {
        CartProductsItems = [];
      }

      setCart(CartProductsItems);
    }
  };

  useEffect(() => {
    handleDataFetch();
    fn();
  }, []);

  useEffect(() => {
    // handleDataFetch();
    fn();
  }, [count]);

  // function to delete cart item
  const handleDeleteCartItem = async (id) => {
    try {
      const res = await deleteCartItem(id).unwrap();

      if (res?.status && res?.status == "Success") {
        chakraToast({
          title: "Success",
          description: `Successfully deleted item`,
          status: "success",
          duration: 4000,
          isClosable: false,
        });

        refresh();
        handleDataFetch();
        fn();
      }
    } catch (err) {
      chakraToast({
        title: "Error",
        description: err.data?.message
          ? err.data?.message
          : err.data || err.error,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };

  // calculate product total
  const calcEachProductTotal = () => {
    setCart((prevState) =>
      prevState.map((cart) => {
        return (cart = {
          ...cart,
          total: parseInt(cart?.price) * parseInt(cart?.quantity),
        });
      })
    );
  };

  // function to calculate the cart total
  const calcCartTotal = () => {
    const newCartTotal = Cart.reduce((a, b) => {
      return a + parseInt(b?.total ? b?.total : 0);
    }, 0);

    setCartTotal((prevState) => newCartTotal);
  };

  // function to handle increasing and reducing product quantity
  const IncreaseProductQuantity = (id) => {
    // find the index of the product in the cart array
    const currentProductIndex = Cart.findIndex((cart) => cart.cartId === id);

    // Increase product quantity
    let updatedProduct = {
      ...Cart[currentProductIndex],
      quantity: Cart[currentProductIndex].quantity + 1,
    };

    // update the CartProduct array
    setCart([
      ...Cart.slice(0, currentProductIndex),
      updatedProduct,
      ...Cart.slice(currentProductIndex + 1),
    ]);

    // recalculate total
    fn();

    setCount(count + 1);
  };

  const ReduceProductQuantity = (id) => {
    // check if the current product quantity is 1. If true don't reduce else reduce
    // find the index of the product in the cart array
    const currentProductIndex = Cart.findIndex((cart) => cart.cartId === id);

    // Reduce product quantity
    let updatedProduct = {
      ...Cart[currentProductIndex],
      quantity:
        Cart[currentProductIndex].quantity === 1
          ? Cart[currentProductIndex].quantity
          : Cart[currentProductIndex].quantity - 1,
    };

    // update the CartProduct array
    setCart([
      ...Cart.slice(0, currentProductIndex),
      updatedProduct,
      ...Cart.slice(currentProductIndex + 1),
    ]);

    // recalculate total
    fn();

    setCount(count + 1);
  };

  // function to checkout user. Function will combine all data and call the payment function and store checkout information in data base
  const handleCheckout = async (paymentMethod) => {
    try {
      // if payment method is cash on delivery
      if (paymentMethod == "cash") {
        const res = await placeOrder({
          Carts: Cart,
          Orders: { ...tabOneData, paymentMethod },
          userId: userInfo._id,
        }).unwrap();

        if (res?.status == "Success") {
          chakraToast({
            title: "Success",
            description: `Successfully placed order`,
            status: "success",
            duration: 5000,
            isClosable: false,
          });
          push("/");
        }
      }
    } catch (err) {
      chakraToast({
        title: "Error",
        description: err.data?.message
          ? err.data?.message
          : err.data || err.error,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };

  function fn() {
    calcEachProductTotal();
    calcCartTotal();
  }

  return (
    <>
      <Box>
        <Box
          padding={{
            base: "1rem 2rem 5rem 2rem",
            md: "1rem 2rem 5rem 2rem",
            xl: "1rem 2rem",
          }}
        >
          <Box>
            <Heading as={"h2"} size={"lg"}>
              Your Cart
            </Heading>
          </Box>
          <Box
            padding={{
              base: "1rem 0 3rem 0",
              md: "1rem 0 3rem 0",
              xl: "1rem 3rem",
            }}
            overflowX={"auto"}
          >
            <Box width={{ base: "300%", md: "250%", xl: "100%" }}>
              <Box padding={"0.5rem 0"}>
                <Flex flexShrink={0} width={"100%"}>
                  <Box width={"15%"} padding={"0.5rem 1rem"}>
                    <Heading as={"h2"} size={"md"}>
                      Image
                    </Heading>
                  </Box>
                  <Box
                    width={{ base: "20%", md: "20%", xl: "25%" }}
                    padding={"0.5rem 1rem"}
                  >
                    <Heading as={"h2"} size={"md"}>
                      Name
                    </Heading>
                  </Box>
                  <Box
                    width={{ base: "20%", md: "20%", xl: "15%" }}
                    padding={"0.5rem 1rem"}
                  >
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
                {Cart.length > 0 ? (
                  Cart.map((cart, index) => (
                    <Flex
                      key={cart?.cartId ? cart?.cartId : index}
                      flexShrink={1}
                    >
                      <Box width={"15%"} padding={"0 2rem"}>
                        <Flex
                          alignContent={"center"}
                          justifyContent={"center"}
                          height={"100%"}
                        >
                          <Image
                            alt=""
                            src={`${cart?.images ? cart.images : ""}`}
                            style={{
                              height: "auto",
                              width: "100%",
                              margin: "auto",
                            }}
                          />
                        </Flex>
                      </Box>
                      <Box
                        width={{ base: "20%", md: "20%", xl: "25%" }}
                        padding={"1rem"}
                      >
                        <Text fontSize={{ base: "lg", md: "lg", xl: "2xl" }}>
                          {cart?.name ? cart?.name : ""}
                        </Text>
                      </Box>
                      <Box
                        width={{ base: "20%", md: "20%", xl: "15%" }}
                        padding={"1rem"}
                      >
                        <Flex
                          borderRadius={"0.3rem"}
                          border={"1.7px solid " + ThemeColors.darkColor}
                          padding={"0.2rem"}
                        >
                          <Button
                            background={"none"}
                            padding={"0.2rem"}
                            margin={"0 0.2rem"}
                            onClick={() =>
                              IncreaseProductQuantity(
                                cart?.cartId ? cart?.cartId : index
                              )
                            }
                          >
                            <AiOutlinePlus size={21} />
                          </Button>
                          <Box
                            padding={"0.2rem"}
                            borderRadius={"0.3rem"}
                            border={"1.7px solid " + ThemeColors.darkColor}
                            width={"3rem"}
                          >
                            <Text fontSize={"md"}>
                              {cart?.quantity ? cart?.quantity : 1}
                            </Text>
                          </Box>
                          <Button
                            background={"none"}
                            padding={"0.2rem"}
                            margin={"0 0.2rem"}
                            onClick={() =>
                              ReduceProductQuantity(
                                cart?.cartId ? cart?.cartId : index
                              )
                            }
                          >
                            <AiOutlineMinus size={21} />
                          </Button>
                        </Flex>
                      </Box>
                      <Box width={"15%"} padding={"1rem"}>
                        <Text fontSize={{ base: "lg", md: "lg", xl: "2xl" }}>
                          {UGX(cart?.price ? cart?.price : 0).format()}
                        </Text>
                      </Box>
                      <Box width={"20%"} padding={"1rem"}>
                        <Text fontSize={{ base: "lg", md: "lg", xl: "2xl" }}>
                          {cart?.total
                            ? UGX(cart?.total ? cart?.total : 0).format()
                            : 0}
                        </Text>
                      </Box>
                      <Box width={"10%"} padding={"1rem"}>
                        <FaTrashAlt
                          size={30}
                          onClick={() => handleDeleteCartItem(cart?.cartId)}
                          style={{ cursor: "pointer" }}
                        />
                      </Box>
                    </Flex>
                  ))
                ) : (
                  <Box padding={"3rem 0"}>
                    <Text fontSize={"3xl"}>Your cart is empty</Text>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          {Cart.length > 0 ? (
            <Box padding={"1rem 3rem"}>
              <Flex>
                <Box hidden>
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
                          {Cart ? Cart?.length : 0}
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
                    <Box onClick={onOpen} width={"5rem"}>
                      <ButtonComponent text={"Checkout"} type={"submit"} />
                    </Box>
                  </Box>
                </Box>
              </Flex>
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>

      {/* // modal form */}
      <Box>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={"4xl"}
          padding={"1rem 0"}
        >
          {/* <ModalOverlay /> */}
          <ModalContent padding={"2rem 3rem"}>
            <ModalCloseButton size={"lg"} color={ThemeColors.darkColor} />
            <Box padding={"1rem 0"}>
              {tabIndex === 0 ? (
                <TabOne
                  updateTabIndex={setTabIndex}
                  fetchData={setTabOneData}
                />
              ) : tabIndex === 1 ? (
                <TabTwo
                  Cart={Cart}
                  updateTabIndex={setTabIndex}
                  tabOneData={tabOneData}
                />
              ) : (
                <TabThree
                  updateTabIndex={setTabIndex}
                  completeOrder={handleCheckout}
                />
              )}
            </Box>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default Cart;
