// import React from 'react'
"use client";

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import SubscriptionCard from "@components/SubscriptionCard";
import TabOne from "@components/modals/tabs/subscriptionTabs/TabOne";
import TabThree from "@components/modals/tabs/subscriptionTabs/TabThree";
import TabTwo from "@components/modals/tabs/subscriptionTabs/TabTwo";
import { ThemeColors } from "@constants/constants";
import { useSubscriptionCardGetMutation } from "@slices/usersApiSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Subscription = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [subscriptionCards, setSubscriptionCards] = useState("");
  const [tabOneData, setTabOneData] = useState({});
  const [tabTwoData, setTabTwoData] = useState({});
  const [selectedCard, setSelectedCard] = useState("");

  const chakraToast = useToast();

  const [fetchCards] = useSubscriptionCardGetMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { onClose, onOpen, isOpen } = useDisclosure();

  const handleSubscriptionCardFetch = async (req, res) => {
    try {
      const res = await fetchCards().unwrap();

      if (res?.status == "Success") {
        setSubscriptionCards(res?.data);
      }
    } catch (error) {}
  };

  const handleCardSelect = (type) => {
    for (const card of subscriptionCards) {
      if (card?.type == type) setSelectedCard(card);
    }

    onOpen();
  };

  useEffect(() => {
    handleSubscriptionCardFetch();
  }, []);

  // const handleSubmitForm = () => {
  //   if (deliveryAddress?.address1 == "" && deliveryAddress?.address2 == "")
  //     return chakraToast({
  //       title: "Error",
  //       description: "Please enter an address",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: false,
  //     });

  //   onOpen();
  // };

  return (
    <>
      <Box>
        <Box padding={"3rem 0 5rem 0"}>
          <Box>
            <Flex>
              <Box
                margin={"auto"}
                width={{ base: "90%", md: "100%", xl: "70%" }}
              >
                {/* <Grid
                  gridTemplateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(4, 1fr)",
                  }}
                  gridGap={"1rem"}
                >
                  {subscriptionCards.length > 0 &&
                    subscriptionCards.map((card, index) => (
                      <SubscriptionCard
                        card={card}
                        key={index}
                        selectedCard={handleCardSelect}
                      />
                    ))}
                </Grid> */}
                <Flex
                  flexDirection={{
                    base: "column-reverse",
                    md: "column-reverse",
                    xl: "row",
                  }}
                >
                  <Box width={{ base: "100%", md: "80%", xl: "40%" }}>
                    {subscriptionCards.length > 0 &&
                      subscriptionCards.map((card, index) => (
                        <SubscriptionCard
                          card={card}
                          key={index}
                          selectedCard={handleCardSelect}
                        />
                      ))}
                  </Box>

                  <Box width={{ base: "100%", md: "80%", xl: "60%" }}>
                    <Box
                      padding={{
                        base: "1rem 0 2rem 0",
                        md: "1rem 0",
                        xl: "1rem 3rem",
                      }}
                    >
                      <Text
                        textAlign={"center"}
                        fontSize={"2xl"}
                        className="secondary-light-font"
                      >
                        Subscribe to our payment plan
                      </Text>

                      <Text
                        textAlign={"center"}
                        fontSize={{ base: "2xl", md: "3xl", xl: "4xl" }}
                      >
                        Get{" "}
                        <span
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            color: ThemeColors.darkColor,
                            textTransform: "capitalize",
                            fontSize: "2xl",
                          }}
                        >
                          {" "}
                          25% discount
                        </span>{" "}
                        on every order you make
                      </Text>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>

      {/* // modal form */}
      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"} padding={"1rem 0"}>
        {/* <ModalOverlay /> */}
        <ModalContent
          padding={{ base: "2rem 1rem", md: "2rem", xl: "2rem 3rem" }}
        >
          <ModalCloseButton size={"lg"} color={ThemeColors.darkColor} />
          <Box padding={"1rem 0"}>
            {tabIndex === 0 ? (
              <TabOne
                updateTabIndex={setTabIndex}
                setTabOneData={setTabOneData}
              />
            ) : tabIndex === 1 ? (
              <TabTwo
                data={{ ...userInfo, ...tabOneData, selectedCard }}
                updateTabIndex={setTabIndex}
              />
            ) : (
              <TabThree
                data={{ ...userInfo, ...tabOneData, selectedCard }}
                updateTabIndex={setTabIndex}
              />
            )}
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Subscription;
