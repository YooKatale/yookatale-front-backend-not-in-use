"use client";

import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import React from "react";
import { useSelector } from "react-redux";

const GeneralTab = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <Box>
        <Box padding={"1rem 0"}>
          <Flex justifyContent={"end"}>
            <ButtonComponent type={"button"} text={"Update Details"} />
          </Flex>
        </Box>
        <Box padding={"0.5rem 1rem"}>
          <Grid
            gridTemplateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gridGap={"1rem"}
          >
            <Box>
              <Text fontSize={"lg"}>First Name</Text>
              <Text
                fontSize={"md"}
                fontWeight={"bold"}
              >{`${userInfo?.firstname}`}</Text>
            </Box>
            <Box>
              <Text fontSize={"lg"}>Last Name</Text>
              <Text
                fontSize={"md"}
                fontWeight={"bold"}
              >{`${userInfo?.lastname}`}</Text>
            </Box>
            <Box>
              <Text fontSize={"lg"}>Email</Text>
              <Text
                fontSize={"md"}
                fontWeight={"bold"}
              >{`${userInfo?.email}`}</Text>
            </Box>
            <Box>
              <Text fontSize={"lg"}>Phone Number</Text>
              <Text
                fontSize={"md"}
                fontWeight={"bold"}
              >{`${userInfo?.phone}`}</Text>
            </Box>
            <Box>
              <Text fontSize={"lg"}>Gender</Text>
              <Text
                fontSize={"md"}
                fontWeight={"bold"}
              >{`${userInfo?.gender}`}</Text>
            </Box>
            <Box>
              <Text fontSize={"lg"}>Vegan</Text>
              <Text fontSize={"md"} fontWeight={"bold"}>{`${
                userInfo?.vegan ? "Vegan" : "Not Vegan"
              }`}</Text>
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default GeneralTab;
