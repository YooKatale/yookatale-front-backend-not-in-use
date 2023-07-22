"use client";

import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";

// import React from 'react'

const FAQS = () => {
  return (
    <>
      <Box>
        <Box padding={{ base: "3rem 2rem", md: "3rem", xl: "3rem" }}>
          <Box>
            <Heading as={"h3"} size="md" textAlign={"center"}>
              FAQs
            </Heading>
            <Text
              className="secondary-light-font"
              fontSize={"4xl"}
              textAlign={"center"}
            >
              Frequently Asked Questions
            </Text>
            <Flex>
              <Box
                height={"0.2rem"}
                width={"8rem"}
                margin={"0.3rem auto"}
                background={ThemeColors.primaryColor}
              ></Box>
            </Flex>
          </Box>
          <Box padding={"1rem 0"}>
            <Flex>
              <Box
                margin={"auto"}
                width={{ base: "100%", md: "80%", xl: "60%" }}
              >
                <Box
                  margin={"1rem 0"}
                  padding={"1rem"}
                  border={"1.7px solid " + ThemeColors.lightColor}
                  borderRadius={"md"}
                >
                  <Heading as={"h3"} size="md">
                    What is YooKatale ?
                  </Heading>
                  <Text
                    className="secondary-light-font"
                    margin={"0.3rem 0"}
                    fontSize={{ base: "md", md: "lg", xl: "lg" }}
                  >
                    YooKatale is a digital mobile food market for natural and
                    organic foods products
                  </Text>
                </Box>
                <Box
                  margin={"1rem 0"}
                  padding={"1rem"}
                  border={"1.7px solid " + ThemeColors.lightColor}
                  borderRadius={"md"}
                >
                  <Heading as={"h3"} size="md">
                    What is YooCard ?
                  </Heading>
                  <Text
                    className="secondary-light-font"
                    margin={"0.3rem 0"}
                    fontSize={{ base: "md", md: "lg", xl: "lg" }}
                  >
                    YooCard is a product of YooKatale that allows its customers
                    get access to all food items with or without cash, offers
                    them free delivery and other loyalties
                  </Text>
                </Box>
                <Box
                  margin={"1rem 0"}
                  padding={"1rem"}
                  border={"1.7px solid " + ThemeColors.lightColor}
                  borderRadius={"md"}
                >
                  <Heading as={"h3"} size="md">
                    How does YooCard work ?
                  </Heading>
                  <Text
                    className="secondary-light-font"
                    margin={"0.3rem 0"}
                    fontSize={{ base: "md", md: "lg", xl: "lg" }}
                  >
                    Once a client buys YooCard, he/she is required to Sign Up
                    and input the 14 digit code on the card, then wait for a
                    confirmation message to start ordering
                  </Text>
                </Box>
                <Box
                  margin={"1rem 0"}
                  padding={"1rem"}
                  border={"1.7px solid " + ThemeColors.lightColor}
                  borderRadius={"md"}
                >
                  <Heading as={"h3"} size="md">
                    How do I order with YooKatale ?
                  </Heading>
                  <Text
                    className="secondary-light-font"
                    margin={"0.3rem 0"}
                    fontSize={{ base: "md", md: "lg", xl: "lg" }}
                  >
                    Google search YooKatale.com, log in or register if you don't
                    have an account, scroll through the items on the homepage
                    and select whichever item of want and add to chart or search
                    for any items you don't see or use the WhatsApp button to
                    place an order
                  </Text>
                </Box>
                <Box
                  margin={"1rem 0"}
                  padding={"1rem"}
                  border={"1.7px solid " + ThemeColors.lightColor}
                  borderRadius={"md"}
                >
                  <Heading as={"h3"} size="md">
                    How much does YooCard cost ?
                  </Heading>
                  <Text
                    className="secondary-light-font"
                    margin={"0.3rem 0"}
                    fontSize={{ base: "md", md: "lg", xl: "lg" }}
                  >
                    30,000 ugx or $8.2 and 25,000 on promotion
                  </Text>
                </Box>
                <Box
                  margin={"1rem 0"}
                  padding={"1rem"}
                  border={"1.7px solid " + ThemeColors.lightColor}
                  borderRadius={"md"}
                >
                  <Heading as={"h3"} size="md">
                    Why should I buy YooCard ?
                  </Heading>
                  <Text
                    className="secondary-light-font"
                    margin={"0.3rem 0"}
                    fontSize={{ base: "md", md: "lg", xl: "lg" }}
                  >
                    YooCard is nicknamed a home food bank, cause it comes with a
                    month or two of free delivery so you never have to go to the
                    market, gas refill discounts and it unlocks a credit option
                    for daily users and more depending on the card purchased.
                  </Text>
                </Box>
                <Box
                  margin={"1rem 0"}
                  padding={"1rem"}
                  border={"1.7px solid " + ThemeColors.lightColor}
                  borderRadius={"md"}
                >
                  <Heading as={"h3"} size="md">
                    Where is YooKatale located ?
                  </Heading>
                  <Text
                    className="secondary-light-font"
                    margin={"0.3rem 0"}
                    fontSize={{ base: "md", md: "lg", xl: "lg" }}
                  >
                    YooKatale is located in Uganda, with it's head office in
                    Naguru plot27, P.O Box 74940 clock tower
                  </Text>
                </Box>
                <Box
                  margin={"1rem 0"}
                  padding={"1rem"}
                  border={"1.7px solid " + ThemeColors.lightColor}
                  borderRadius={"md"}
                >
                  <Heading as={"h3"} size="md">
                    Where does YooKatale operate ?
                  </Heading>
                  <Text
                    className="secondary-light-font"
                    margin={"0.3rem 0"}
                    fontSize={{ base: "md", md: "lg", xl: "lg" }}
                  >
                    The digital mobile market delivers allover Kampala and it's
                    outskirts these include Kololo, Ntinda, Kiwatule, najjera,
                    Kyanja, Makindye, Ggaba, Munyonyo, Luzira, Kitintale,
                    Gayaza, Kiteezi, Rubaga, Mengo, Lubowa and more.
                  </Text>
                </Box>
                <Box
                  margin={"1rem 0"}
                  padding={"1rem"}
                  border={"1.7px solid " + ThemeColors.lightColor}
                  borderRadius={"md"}
                >
                  <Heading as={"h3"} size="md">
                    How do I get YooCard ? Or how do I subscribe to YooKatale ?
                  </Heading>
                  <Text
                    className="secondary-light-font"
                    margin={"0.3rem 0"}
                    fontSize={{ base: "md", md: "lg", xl: "lg" }}
                  >
                    A card can be requested info@yookatale.com or{" "}
                    <span style={{ color: ThemeColors.darkColor }}>
                      <a href="/subscribe">Get Card</a>
                    </span>{" "}
                    to order & it's delivered direct to your doorstep. You can
                    pay online or pay on delivery.
                  </Text>
                </Box>
                <Box
                  margin={"1rem 0"}
                  padding={"1rem"}
                  border={"1.7px solid " + ThemeColors.lightColor}
                  borderRadius={"md"}
                >
                  <Heading as={"h3"} size="md">
                    Can I use YooKatale without a card ?
                  </Heading>
                  <Text
                    className="secondary-light-font"
                    margin={"0.3rem 0"}
                    fontSize={{ base: "md", md: "lg", xl: "lg" }}
                  >
                    Yes, everyone can use the mobile platform without have a
                    card b signing up, however an additional fee charge is added
                    for delivery and other services where necessary.
                  </Text>
                </Box>
                <Box
                  margin={"1rem 0"}
                  padding={"1rem"}
                  border={"1.7px solid " + ThemeColors.lightColor}
                  borderRadius={"md"}
                >
                  <Heading as={"h3"} size="md">
                    How do I pay for products with YooKatale ?
                  </Heading>
                  <Text
                    className="secondary-light-font"
                    margin={"0.3rem 0"}
                    fontSize={{ base: "md", md: "lg", xl: "lg" }}
                  >
                    Yookatale accepts cash on delivery, mobile money, visa or
                    debit cards and YooCard as payment methods for items and
                    services
                  </Text>
                </Box>
                <Box
                  margin={"1rem 0"}
                  padding={"1rem"}
                  border={"1.7px solid " + ThemeColors.lightColor}
                  borderRadius={"md"}
                >
                  <Heading as={"h3"} size="md">
                    How long does YooKatale take to deliver ?
                  </Heading>
                  <Text
                    className="secondary-light-font"
                    margin={"0.3rem 0"}
                    fontSize={{ base: "md", md: "lg", xl: "lg" }}
                  >
                    Usually, it takes between 5 - 35 minutes depending on the
                    client's location
                  </Text>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FAQS;
