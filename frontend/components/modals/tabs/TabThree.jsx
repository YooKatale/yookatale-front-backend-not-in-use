"use client";

import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Spacer,
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import PaymentCard from "@components/PaymentCard";
import { ThemeColors } from "@constants/constants";
import { useNewOrderMutation } from "@slices/usersApiSlice";
import { useFlutterwave } from "flutterwave-react-v3";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TabThree = ({ updateTabIndex, data }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [yooCardNumber, setYooCardNumber] = useState("");
  const [isLoading, setLoading] = useState(false);
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

  // const handleFlutterPayment = useFlutterwave(flwConfig);

  const handleTabThree = async () => {
    // set loading to be true
    setLoading((prevState) => (prevState ? false : true));

    if (paymentMethod == "")
      return chakraToast({
        title: "Error",
        description: "Please choose a payment option",
        status: "error",
        duration: 5000,
        isClosable: false,
      });

    // if user chooses pay with mobile money or credit/debit card
    if (paymentMethod === "card" || paymentMethod === "mobileMoney") {
      // // set loading to be false
      // setLoading((prevState) => (prevState ? false : true));

      handleFlutterPayment({
        callback: async (response) => {
          if (response?.status == "successful") {
            data.payment = {
              paymentMethod,
              transactionID: response?.transaction_id,
            };

            data.yooCardNumber = yooCardNumber;

            const res = await placeOrder({ ...data }).unwrap();

            // set loading to be false
            setLoading((prevState) => (prevState ? false : true));

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
            // set loading to be false
            setLoading((prevState) => (prevState ? false : true));

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
      data.payment = {
        paymentMethod,
      };

      data.yooCardNumber = yooCardNumber;

      const res = await placeOrder({ ...data }).unwrap();

      // set loading to be false
      setLoading((prevState) => (prevState ? false : true));

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
    } catch (err) {
      // set loading to be false
      setLoading((prevState) => (prevState ? false : true));

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
            Choose payment method {paymentMethod}
          </Heading>
        </Box>
        <Box padding={"1rem 0"}>
          <Flex>
            <Box width={"100%"} margin={"auto"}>
              <Grid
                gridTemplateColumns={{
                  base: "repeat(2, 1fr)",
                  md: "repeat(2, 1fr)",
                  xl: "repeat(4, 1fr)",
                }}
                gridGap={"1rem"}
              >
                <Box>
                  <PaymentCard
                    text={"Pay on delivery"}
                    setPaymentMethod={setPaymentMethod}
                    paymentMethod={paymentMethod}
                    type={"cash"}
                  />
                </Box>
                <Box>
                  <PaymentCard
                    text={"Mobile Money"}
                    setPaymentMethod={setPaymentMethod}
                    paymentMethod={paymentMethod}
                    type={"mobileMoney"}
                  />
                </Box>
                <Box>
                  <PaymentCard
                    text={"Card"}
                    setPaymentMethod={setPaymentMethod}
                    paymentMethod={paymentMethod}
                    type={"card"}
                  />
                </Box>
                <Box>
                  <PaymentCard
                    text={"Yoo Card"}
                    setPaymentMethod={setPaymentMethod}
                    paymentMethod={paymentMethod}
                    type={"yoocard"}
                  />
                </Box>
              </Grid>
            </Box>
          </Flex>
        </Box>
        <Box padding={"1rem 0"}>
          {paymentMethod == "yoocard" && (
            <Flex>
              <Box margin={"auto"} width={"60%"}>
                <Box
                  border={"1.7px solid " + ThemeColors.lightColor}
                  padding={"1rem"}
                  borderRadius={"md"}
                >
                  <Box padding={"0.5rem 0"}>
                    <Text textAlign={"center"} fontSize={"lg"}>
                      Enter your YooCard Number
                    </Text>
                  </Box>
                  <Input
                    type="text"
                    placeholder="Enter your YooCard number"
                    name="yooCardNumber"
                    onChange={(e) => setYooCardNumber(e.target.value)}
                    value={yooCardNumber}
                  />
                </Box>
              </Box>
            </Flex>
          )}
        </Box>
        <Box padding={"1rem 0 0.5rem 0"}>
          <Flex>
            <Box onClick={() => updateTabIndex(1)}>
              <ButtonComponent type={"button"} text={"Back"} />
            </Box>
            <Spacer />
            <Box onClick={() => handleTabThree()}>
              {isLoading ? (
                <Spinner />
              ) : (
                <ButtonComponent type={"button"} text={"Complete Checkout"} />
              )}
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default TabThree;
