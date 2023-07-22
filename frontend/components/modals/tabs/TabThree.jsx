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
  useToast,
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import { ThemeColors } from "@constants/constants";
import { useNewOrderMutation } from "@slices/usersApiSlice";
import { useFlutterwave } from "flutterwave-react-v3";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TabThree = ({ updateTabIndex, data }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [CartTotal, setCartTotal] = useState(0);
  const router = useRouter();

  // function to calculate the cart total
  const calcCartTotal = () => {
    let newCartTotal = data?.Carts.reduce((a, b) => {
      return a + parseInt(b?.total ? b?.total : 0);
    }, 0);

    newCartTotal += 1000;

    setCartTotal((prevState) => newCartTotal);
  };

  useEffect(() => {
    calcCartTotal();
  }, []);

  const chakraToast = useToast();

  const [placeOrder] = useNewOrderMutation();

  const flwConfig = {
    public_key: "FLWPUBK_TEST-07d1b505448d1358e34d597736dd6b8a-X",
    tx_ref: Date.now(),
    amount: parseInt(CartTotal),
    currency: "UGX",
    payment_options: paymentMethod == "card" ? "card" : "mobilemoneyuganda",
    customer: {
      email: `${data?.personalInfo?.email}`,
      phone_number: `${data?.personalInfo?.phone}`,
      name: `${data?.personalInfo?.firstname} ${data?.personalInfo?.lastname}`,
    },
    customizations: {
      title: "YooCard Purchase",
      description: `You are purchasing a ${data?.selectedSubscriptionCard?.type} ${data?.selectedSubscriptionCard?.name} YooCard`,
      logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
    },
  };

  const handleFlutterPayment = useFlutterwave(flwConfig);

  const handleTabThree = async () => {
    if (paymentMethod == "")
      return chakraToast({
        title: "Error",
        description: "Please choose a payment option",
        status: "error",
        duration: 5000,
        isClosable: false,
      });

    // if user chooses pay with mobile money or credit/debit card
    if (paymentMethod !== "cash") {
      // // set loading to be false
      // setLoading((prevState) => (prevState ? false : true));

      handleFlutterPayment({
        callback: async (response) => {
          if (response?.status == "successful") {
            data.payment = {
              paymentMethod,
              transactionID: response?.transaction_id,
            };

            const res = await placeOrder({ ...data }).unwrap();

            if (res?.status == "Success") {
              chakraToast({
                title: "Success",
                description: `Successfully placed order`,
                status: "success",
                duration: 5000,
                isClosable: false,
              });
              router.push("/");
            }
          } else {
            chakraToast({
              title: "Error",
              description: "Unexpected error",
              status: "error",
              duration: 5000,
              isClosable: false,
            });
          }
          closePaymentModal();
        },
        onClose: () => {},
      });

      return;
    }

    try {
      // if payment method is cash on delivery
      if (paymentMethod == "cash") {
        data.payment = {
          paymentMethod,
        };

        const res = await placeOrder({ ...data }).unwrap();

        if (res?.status == "Success") {
          chakraToast({
            title: "Success",
            description: `Successfully placed order`,
            status: "success",
            duration: 5000,
            isClosable: false,
          });
          router.push("/");
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

  return (
    <>
      <Box>
        <Box padding={"1rem 0"}>
          <Heading as={"h3"} size={"md"} textAlign={"center"}>
            Choose payment method
          </Heading>
        </Box>
        <Box padding={"1rem 0"}>
          <Flex>
            <Box width={"100%"} margin={"auto"}>
              <Grid
                gridTemplateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(1, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
                gridGap={"1rem"}
              >
                <Box
                  padding={"3rem 1rem"}
                  cursor={"pointer"}
                  background={
                    paymentMethod === "cash"
                      ? ThemeColors.darkColor
                      : ThemeColors.lightColor
                  }
                  borderRadius={"0.5rem"}
                  border={
                    "1.7px solid " + paymentMethod === "cash"
                      ? ThemeColors.lightColor
                      : ThemeColors.darkColor
                  }
                  onClick={() => setPaymentMethod("cash")}
                >
                  <Text
                    fontSize={"2xl"}
                    textAlign={"center"}
                    color={
                      paymentMethod === "cash"
                        ? ThemeColors.lightColor
                        : ThemeColors.darkColor
                    }
                  >
                    Pay on delivery
                  </Text>
                </Box>
                <Box
                  padding={"3rem 1rem"}
                  cursor={"pointer"}
                  background={
                    paymentMethod === "mobileMoney"
                      ? ThemeColors.darkColor
                      : ThemeColors.lightColor
                  }
                  borderRadius={"0.5rem"}
                  border={
                    "1.7px solid " + paymentMethod === "mobileMoney"
                      ? ThemeColors.lightColor
                      : ThemeColors.darkColor
                  }
                  onClick={() => setPaymentMethod("mobileMoney")}
                  hidden
                >
                  <Text
                    fontSize={"2xl"}
                    textAlign={"center"}
                    color={
                      paymentMethod === "mobileMoney"
                        ? ThemeColors.lightColor
                        : ThemeColors.darkColor
                    }
                  >
                    Mobile Money
                  </Text>
                </Box>
                <Box
                  padding={"3rem 1rem"}
                  cursor={"pointer"}
                  background={
                    paymentMethod === "card"
                      ? ThemeColors.darkColor
                      : ThemeColors.lightColor
                  }
                  borderRadius={"0.5rem"}
                  border={
                    "1.7px solid " + paymentMethod === "card"
                      ? ThemeColors.lightColor
                      : ThemeColors.darkColor
                  }
                  onClick={() => setPaymentMethod("card")}
                  hidden
                >
                  <Text
                    fontSize={"2xl"}
                    textAlign={"center"}
                    color={
                      paymentMethod === "card"
                        ? ThemeColors.lightColor
                        : ThemeColors.darkColor
                    }
                  >
                    Card
                  </Text>
                </Box>
              </Grid>
            </Box>
          </Flex>
        </Box>
        <Box padding={"1rem 0 0.5rem 0"}>
          <Flex>
            <Box onClick={() => updateTabIndex(1)}>
              <ButtonComponent type={"button"} text={"Back"} />
            </Box>
            <Spacer />
            <Box onClick={() => handleTabThree()}>
              <ButtonComponent type={"button"} text={"Complete Checkout"} />
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default TabThree;
