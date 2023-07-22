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
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import { ThemeColors } from "@constants/constants";
import { useEffect, useState } from "react";
import currency from "currency.js";

const UGX = (value) =>
  currency(value, { symbol: "UGX", precision: 0, separator: "," });

const TabTwo = ({Orders, Products, updateTabIndex, fetchData }) => {
  return (
    <>
      <Box></Box>
    </>
  );
};

export default TabTwo;
