"use client";

import {
  Box,
  Text,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Textarea,
  Spacer,
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import { ThemeColors } from "@constants/constants";
import React, { useState } from "react";

const TabOne = ({ updateTabIndex, setTabOneData }) => {
  const [moreInfo, setMoreInfo] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState({
    address1: "",
    address2: "",
  });

  const [numberOfCards, setNumberOfCards] = useState(1);

  const handleSettingData = () => {
    setTabOneData({ ...deliveryAddress, moreInfo, quantity: numberOfCards });
    updateTabIndex(1);
  };

  return (
    <>
      <Box>
        <Flex>
          <Box margin={"auto"} width={"90%"}>
            <Box padding={"1rem 0"}>
              <Text textAlign={"center"} fontSize={"2xl"}>
                Fill the form to continue
              </Text>
            </Box>
            <Box
              border={"1.7px solid " + ThemeColors.lightColor}
              borderRadius={"md"}
              padding={"1rem"}
            >
              <Grid
                gridTemplateColumns={{
                  base: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
                gridGap={"1rem"}
              >
                <Box padding={"0.5rem 0"}>
                  <FormControl>
                    <FormLabel htmlFor="cardNos">Number of Cards</FormLabel>
                    <Input
                      type="number"
                      id="cardNos"
                      placeholder="Number of cards is required"
                      name="cardNos"
                      value={numberOfCards}
                      onChange={(e) => setNumberOfCards(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <FormControl>
                    <FormLabel htmlFor="address1">Delivery Address 1</FormLabel>
                    <Input
                      type="text"
                      id="address1"
                      placeholder="address1 is required"
                      name="address1"
                      value={deliveryAddress.address1}
                      onChange={(e) =>
                        setDeliveryAddress({
                          ...deliveryAddress,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <FormControl>
                    <FormLabel htmlFor="address2">Delivery Address 2</FormLabel>
                    <Input
                      type="text"
                      id="address2"
                      placeholder="address2 is required"
                      name="address2"
                      value={deliveryAddress.address2}
                      onChange={(e) =>
                        setDeliveryAddress({
                          ...deliveryAddress,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                </Box>
              </Grid>
              <Box padding={"0.5rem 0"}>
                <FormControl>
                  <FormLabel htmlFor="moreInfo">
                    Additional Information
                  </FormLabel>
                  <Textarea
                    placeholder="Any additional information"
                    name="moreInfo"
                    onChange={(e) => setMoreInfo(e.target.value)}
                    value={moreInfo}
                  ></Textarea>
                </FormControl>
              </Box>
            </Box>
            <Box padding={"1rem 0"}>
              <Flex>
                <Box></Box>
                <Spacer />
                <Box onClick={handleSettingData}>
                  <ButtonComponent type={"button"} text={"Continue"} />
                </Box>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default TabOne;
