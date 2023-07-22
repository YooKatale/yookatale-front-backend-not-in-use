"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";
import React from "react";
import currency from "currency.js";
import moment from "moment";

const UGX = (value) =>
  currency(value, { symbol: "UGX", precision: 0, separator: "," });

const OrderCard = ({ order }) => {
  return (
    <>
      <Box
        padding={"0.5rem"}
        borderRadius={"0.5rem"}
        border={"1.8px solid " + ThemeColors.lightColor}
      >
        <Box padding={"0.5rem 0"}>
          {/* <Box>
                            <Heading as={"h3"} size={"md"}>
                              Product Information
                            </Heading>
                          </Box> */}
          <Box padding={"0.5rem 0"}>
            <Box>
              <Text fontSize={"md"}>Order ID: {order._id}</Text>
            </Box>
            <Box>
              <Text fontSize={"md"}>
                Products: {order?.productItems ? order?.productItems : "__"}
              </Text>
            </Box>
            <Box>
              <Text fontSize={"md"}>
                Payment Method:{" "}
                {order?.paymentMethod
                  ? order?.paymentMethod
                  : order?.payment
                  ? order?.payment.paymentMethod
                  : "__"}
              </Text>
            </Box>
            <Box>
              <Text fontSize={"md"}>
                Order Total: {order?.total ? UGX(order?.total).format() : "__"}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box padding={"0.5rem 0"}>
          {order?.deliveryAddress?.address1 !== "" ? (
            <Box>
              <Text fontSize={"md"}>
                Delivery Address 1:{" "}
                {order?.deliveryAddress?.address1
                  ? order?.deliveryAddress?.address1
                  : "__"}
              </Text>
            </Box>
          ) : (
            ""
          )}
          {order?.deliveryAddress?.address2 !== "" ? (
            <Box>
              <Text fontSize={"md"}>
                Delivery Address 2:{" "}
                {order?.deliveryAddress?.address2
                  ? order?.deliveryAddress?.address2
                  : "__"}
              </Text>
            </Box>
          ) : (
            ""
          )}
        </Box>
        <Box padding={"0.5rem 0"}>
          {order?.specialRequest?.peeledFood ? (
            <Box>
              <Text fontSize={"md"}>
                Peel Food:{" "}
                {order?.specialRequest?.peeledFood
                  ? order?.specialRequest?.peeledFood
                  : "__"}
              </Text>
            </Box>
          ) : (
            ""
          )}
          {order?.specialRequest?.moreInfo ? (
            <Box>
              <Text fontSize={"md"}>
                Other Requests:{" "}
                {order?.specialRequest?.moreInfo
                  ? order?.specialRequest?.moreInfo
                  : "__"}
              </Text>
            </Box>
          ) : (
            ""
          )}
        </Box>
        <Box padding={"0.5rem 0"}>
          <Box>
            <Heading as={"h4"} fontSize={"md"} display={"flex"}>
              Status:{" "}
              <Heading
                margin={"0 0.3rem"}
                as={"h4"}
                fontSize={"md"}
                color={ThemeColors.secondaryColor}
              >
                {order?.status ? order?.status : "__"}
              </Heading>
            </Heading>
          </Box>
        </Box>
        <Box>
          <Text fontSize={"md"}>
            Date: {order?.createdAt ? moment(order?.createdAt).fromNow() : "__"}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default OrderCard;
