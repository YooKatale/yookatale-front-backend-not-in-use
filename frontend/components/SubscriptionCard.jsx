import { Box, Flex, Grid, Text, Heading, Stack } from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";
import React from "react";
import ButtonComponent from "./Button";
import currency from "currency.js";
import Link from "next/link";

const SubscriptionCard = ({ card, selectedCard }) => {
  const UGX = (value) =>
    currency(value, { symbol: "UGX", precision: 0, separator: "," });

  console.log({ card });

  return (
    <>
      <Box
        width={"auto"}
        borderRadius={"md"}
        background={"white"}
        className={"card__design"}
        shadow={"md"}
        padding={"2rem 0"}
      >
        <Box position={"relative"} height={"100%"}>
          <Box padding={"1rem 1.5rem"}>
            <Box padding={"0.5rem 0 1rem 0"}>
              <Heading
                as={"h2"}
                size={"md"}
                display={"flex"}
                textAlign={"center"}
                justifyContent={"center"}
                className="secondary-light-font"
              >
                YooKatale
                <Heading
                  as={"h2"}
                  textTransform={"capitalize"}
                  size={"md"}
                  textAlign={"center"}
                  margin={"0 0.3rem"}
                  color={ThemeColors.darkColor}
                  className="secondary-light-font"
                >
                  {card.type}
                </Heading>
              </Heading>
              {/* <Text fontSize={"lg"}>{card.name}</Text> */}
            </Box>

            <Box padding={"0.5rem 0"}>
              {card?.price !== 0 ? (
                <Flex justifyContent={"center"}>
                  {/* <Text
                      fontSize={"md"}
                      marginTop={"0.2rem"}
                      fontWeight={"light"}
                      textDecoration={"line-through"}
                    >
                      {UGX(card?.previousPrice).format()} -
                    </Text> */}
                  <Text
                    fontSize={"3xl"}
                    margin={"0 0 0 0.3rem"}
                    textAlign={"center"}
                    fontWeight={"light"}
                    color={ThemeColors.darkColor}
                  >
                    {UGX(card?.price).format()}
                  </Text>
                </Flex>
              ) : (
                <Text fontSize={"lg"} fontWeight={"bold"}>
                  Contact for price
                </Text>
              )}
            </Box>

            <Box padding={"0.5rem 0 0.5rem 1rem"}>
              <Stack>
                {card?.details.map((detail, index) => (
                  <Box key={index}>
                    <Text textAlign={"center"}>{detail}</Text>
                  </Box>
                ))}
              </Stack>
            </Box>
            <Box
              paddingTop={"2rem"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box margin={"auto"} onClick={() => selectedCard(card?.type)}>
                <ButtonComponent type={"button"} text={`Get ${card?.type}`} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SubscriptionCard;
