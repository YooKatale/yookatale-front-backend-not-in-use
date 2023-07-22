"use client";

import {
  Box,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import { Images, ThemeColors } from "@constants/constants";
import currency from "currency.js";

const UGX = (value) =>
  currency(value, { symbol: "UGX", precision: 0, separator: "," });

const TabTwo = ({ data, updateTabIndex }) => {
  const chakraToast = useToast();

  const handleProcessPayment = async () => {
    // check is user has confirmed information
    const confirmInfoBtn = document.querySelector("input#confirmInfoBtn");

    if (!confirmInfoBtn.checked)
      return chakraToast({
        title: "Error",
        description: "Please confirm the information displayed",
        status: "error",
        duration: 5000,
        isClosable: false,
      });

    updateTabIndex(2);
  };
  return (
    <>
      <Box>
        <Box
          padding={"1rem 0"}
          borderBottom={"1.7px solid " + ThemeColors.lightColor}
        >
          <Box>
            <Heading as={"h3"} size={"md"}>
              Personal Information
            </Heading>
          </Box>
          <Box padding={"1rem 0"}>
            <Grid
              gridTemplateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                xl: "repeat(5, 1fr)",
              }}
              gridGap={"1rem"}
            >
              <Box>
                <Text fontSize={"md"}>firstname</Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>{data?.firstname}</span>
                </Text>
              </Box>
              <Box>
                <Text fontSize={"md"}>lastname</Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>{data?.lastname}</span>
                </Text>
              </Box>
              <Box>
                <Text fontSize={"md"}>email</Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>{data?.email}</span>
                </Text>
              </Box>
              <Box>
                <Text fontSize={"md"}>gender</Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>{data?.gender}</span>
                </Text>
              </Box>
              <Box>
                <Text fontSize={"md"}>Phone Number</Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>{data?.phone}</span>
                </Text>
              </Box>
            </Grid>
          </Box>
        </Box>
        <Box
          padding={"1rem 0"}
          borderBottom={"1.7px solid " + ThemeColors.lightColor}
        >
          <Grid
            gridTemplateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              xl: "repeat(2, 1fr)",
            }}
            gridGap={"1rem"}
          >
            <Box>
              <Box>
                <Heading as={"h3"} size={"md"}>
                  Delivery Address
                </Heading>
              </Box>
              <Box padding={"1rem 0"}>
                <Grid
                  gridTemplateColumns={{
                    base: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    xl: "repeat(5, 1fr)",
                  }}
                  gridGap={"1rem"}
                >
                  {data?.address1 ? (
                    <Box>
                      <Text fontSize={"md"}>Address 1</Text>
                      <Text>
                        <span style={{ fontWeight: "bold" }}>
                          {data?.address1}
                        </span>
                      </Text>
                    </Box>
                  ) : (
                    ""
                  )}
                  {data?.address2 ? (
                    <Box>
                      <Text fontSize={"md"}>Address 2</Text>
                      <Text>
                        <span style={{ fontWeight: "bold" }}>
                          {data?.address2}
                        </span>
                      </Text>
                    </Box>
                  ) : (
                    ""
                  )}
                </Grid>
              </Box>
            </Box>
            {data?.moreInfo !== "" ? (
              <Box>
                <Box>
                  <Heading as={"h3"} size={"md"}>
                    Additional Information
                  </Heading>
                </Box>
                <Box padding={"1rem 0"}>
                  <Text>
                    <span style={{ fontWeight: "bold" }}>{data?.moreInfo}</span>
                  </Text>
                </Box>
              </Box>
            ) : (
              ""
            )}
          </Grid>
        </Box>
        <Box
          padding={"1rem 0"}
          borderBottom={"1.7px solid " + ThemeColors.lightColor}
        >
          <Box>
            <Heading as={"h3"} size={"md"}>
              Card Details
            </Heading>
          </Box>
          <Box padding={"1rem 0"}>
            <Grid
              gridTemplateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
              }}
              gridGap={"1rem"}
            >
              <Box>
                <Text fontSize={"md"}>Card</Text>
                <Text>
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    YooCard {data?.selectedCard?.type}
                  </span>{" "}
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    {data?.selectedCard?.name}
                  </span>
                </Text>
              </Box>
              <Box>
                <Text fontSize={"md"}>Quantity</Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>
                    {data?.quantity}{" "}
                    {`${parseInt(data?.quantity) !== 1 ? "cards" : "card"}`}
                  </span>
                </Text>
              </Box>
            </Grid>
          </Box>
        </Box>
        <Box
          padding={"1rem 0"}
          borderBottom={"1.7px solid " + ThemeColors.lightColor}
        >
          <Box padding={"1rem 0"}>
            <Box>
              <Text fontSize={"md"}>Order Total</Text>
              <Text fontSize={"lg"}>
                <span style={{ fontWeight: "bold" }}>
                  {data?.selectedCard?.price === "Contact for price"
                    ? data?.selectedCard?.price
                    : UGX(
                        parseInt(data?.selectedCard?.price) *
                          parseInt(data?.quantity)
                      ).format()}
                </span>
              </Text>
            </Box>
          </Box>
        </Box>
        <Box padding={"1rem 0"}>
          <Checkbox name="confirm" id="confirmInfoBtn">
            I confirm that the above information is correct
          </Checkbox>
        </Box>
        <Box padding={"1rem 0"}>
          <Flex>
            <Box onClick={() => updateTabIndex(0)}>
              <ButtonComponent type={"button"} text={"Back"} />
            </Box>
            <Spacer />
            <Box onClick={() => handleProcessPayment()}>
              <ButtonComponent type={"button"} text={"Choose Payment Method"} />
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default TabTwo;
