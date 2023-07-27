"use client";

import {
  Box,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const CookiePolicy = () => {
  const [cookiePolicyViewed, setCookiePolicyViewed] = useState(true);
  const [cookiePolicyModal, setCookiePolicyModal] = useState(false);

  const { onClose, onOpen, isOpen } = useDisclosure();

  useEffect(() => {
    typeof window !== "undefined"
      ? localStorage?.getItem("yookatale-cookie-policy")
        ? setCookiePolicyViewed(
            JSON.parse(localStorage?.getItem("yookatale-cookie-policy"))
          )
        : setCookiePolicyViewed(false)
      : setCookiePolicyViewed(false);
  }, []);

  const handleViewingCookiePolicy = () => {
    typeof window !== "undefined"
      ? localStorage?.setItem("yookatale-cookie-policy", JSON.stringify(true))
      : (localStorage = null);

    setCookiePolicyViewed((prev) => (prev ? false : true));
  };

  return (
    <>
      <Box
        padding={"1rem"}
        borderRadius={"0.5rem"}
        background={ThemeColors.lightColor}
        position={"fixed"}
        bottom={"5%"}
        left={"5%"}
        zIndex={"990"}
        width={{ base: "80%", md: "50%", xl: "35%" }}
        visibility={!cookiePolicyViewed ? "visible" : "hidden"}
        transform={
          !cookiePolicyViewed
            ? "translate3d(0, 0, 0)"
            : "translate3d(0, 150%, 0)"
        }
      >
        <Box
          position={"absolute"}
          top={"0.5rem"}
          right={"1rem"}
          cursor={"pointer"}
        >
          <AiOutlineClose
            size={20}
            onClick={() => handleViewingCookiePolicy()}
          />
        </Box>
        <Box margin={"0 1.5rem 0 0"}>
          <Text>
            This website uses cookies to give you a better experience{" "}
            <span
              style={{
                margin: "0 0.3rem",
                fontWeight: "bold",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={onOpen}
            >
              more information
            </span>
          </Text>
        </Box>
      </Box>

      {/* // cookie policy modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          handleViewingCookiePolicy();
        }}
        size={"4xl"}
        padding={"1rem 0"}
      >
        {/* <ModalOverlay /> */}
        <ModalContent
          padding={{ base: "2rem 1rem", md: "2rem", xl: "2rem 3rem" }}
        >
          <ModalCloseButton size={"lg"} color={ThemeColors.darkColor} />
          <Box padding={"1rem 0"}>
            <Box>
              <Heading as={"h3"} size={"md"}>
                Cookies Policy
              </Heading>
              <Heading as={"h3"} size={"md"} margin={"0.5rem 0"}>
                YooKatale
              </Heading>
            </Box>
            <Box padding={"0.5rem 0"}>
              <Text>
                We use various methods to track general usage data for our
                website. In particular, we may collect information about your
                computer, including where available, your IP address, operating
                system and browser type, for system administration and to
                analyse aggregate information. This is statistical data about
                our users’ browsing actions and patterns, and does not identify
                any individual.
              </Text>
            </Box>
            <Box padding={"0.5rem 0"}>
              <Text>
                A cookie is a piece of data that a website can send to your
                browser, which may then store it on your computer's hard drive.
              </Text>
            </Box>
            <Box padding={"0.5rem 0"}>
              <Text>
                We may obtain information about your access and use of our
                platform by using a Cookie file stored on the hard drive of your
                computer. Cookies contain information that is transferred to
                your hard drive. They help us to improve our website and assist
                us to improve our services. They enable us to:
              </Text>
              <Box padding={"0.5rem"}>
                <Text margin={"0.3rem 0"}>
                  Estimate our audience size and usage pattern
                </Text>
                <Text margin={"0.3rem 0"}>
                  Store information about your preferences, and so allow us to
                  customise our web platform according to user needs
                </Text>
                <Text margin={"0.3rem 0"}>Speed up your searches</Text>
                <Text margin={"0.3rem 0"}>
                  Recognise you when you return to our website
                </Text>
              </Box>
            </Box>
            <Box padding={"0.5rem 0"}>
              <Text>
                You may refuse to accept Cookies by activating the setting on
                your browser which allows you to refuse the setting of Cookies.
                Unless you have adjusted your browser setting, our system will
                issue Cookies when you visit our website or parts of it. If your
                browser settings are set or changed to refuse Cookies or you
                remove any Cookie file this may restrict your use or continued
                use of the website.
              </Text>
            </Box>
            <Box padding={"0.5rem 0"}>
              <Text>
                We have also integrated various features into our platform , the
                pixel automatically tracks the following events:
              </Text>
              <Box padding={"0.5rem "}>
                <Box>
                  <Heading as={"h3"} size={"sm"}>
                    View Content
                  </Heading>
                  <Text>
                    When a visitor views a page, such as a product page.
                  </Text>
                </Box>
                <Box>
                  <Heading as={"h3"} size={"sm"}>
                    Search
                  </Heading>
                  <Text>When a visitor makes a search.</Text>
                </Box>
                <Box>
                  <Heading as={"h3"} size={"sm"}>
                    Add To Cart
                  </Heading>
                  <Text>
                    When a visitor adds a product to the shopping cart.
                  </Text>
                </Box>
                <Box>
                  <Heading as={"h3"} size={"sm"}>
                    Initiate Checkout
                  </Heading>
                  <Text>When a visitor clicks the checkout button.</Text>
                </Box>
                <Box>
                  <Heading as={"h3"} size={"sm"}>
                    Add Payment Information
                  </Heading>
                  <Text>
                    When a visitor enters payment information in the checkout.
                  </Text>
                </Box>
                <Box>
                  <Heading as={"h3"} size={"sm"}>
                    Purchase
                  </Heading>
                  <Text>
                    When a visitor completes a purchase and views the thank you
                    page in the checkout.
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box padding={"0.5rem 0"}>
              <Text>
                More information on how to modify your browser settings or how
                to block, manage or filter cookies can be found in your
                browser's help file or through support@yookatale.com
              </Text>
            </Box>
            <Box padding={"0.5rem 0"}>
              <Text>
                All information you provide to us is stored on our secure
                servers. See our Terms and Conditions on maintaining
                confidentiality of any password and any user name or other
                secure login information.
              </Text>
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CookiePolicy;
