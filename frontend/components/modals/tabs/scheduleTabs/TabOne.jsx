"use client";

import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Select,
  Spacer,
  Textarea,
  Input,
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import { useState } from "react";
import { useSelector } from "react-redux";

const TabOne = ({ updateTabIndex, fetchData }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [deliveryAddress, setDeliveryAddress] = useState({
    address1: "",
    address2: "",
  });
  const [specialRequests, setSpecialRequests] = useState({
    peeledFood: false,
    moreInfo: "",
  });
  const [personalInfo, setPersonalInfo] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    gender: "",
  });

  // function to handle populating delivery adddress data
  const handleDeliveryDataChange = (e) => {
    setDeliveryAddress({ ...deliveryAddress, [e.target.name]: e.target.value });
  };

  // function to handle populating personal information data
  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  // function to handle populating special requests data
  const handleSpecialRequestDataChange = (e) => {
    e.target.name == "peeledFood"
      ? setSpecialRequests({
          ...specialRequests,
          [e.target.name]: e.target.checked,
        })
      : setSpecialRequests({
          ...specialRequests,
          [e.target.name]: e.target.value,
        });
  };

  const handleTabOneData = () => {
    fetchData({
      deliveryAddress,
      specialRequests,
      personalInfo: !userInfo
        ? setPersonalInfo({ ...personalInfo, ...userInfo })
        : userInfo,
    });

    // fetchData({ deliveryAddress, specialRequests });
    // updateTabIndex(1);
  };

  return (
    <>
      <Box>
        {userInfo ? (
          <></>
        ) : (
          <>
            <Box padding={"0.5rem 0"}>
              <Heading size={"md"} as={"h2"}>
                Enter your information
              </Heading>
            </Box>
            <Box padding={"1rem 0"}>
              <Grid
                gridTemplateColumns={{
                  base: "repeat(2, 1fr)",
                  md: "repeat(2, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
                gridGap={"1rem"}
              >
                <Box padding={"0.5rem 0"}>
                  <FormControl>
                    <FormLabel htmlFor="firstname">Firstname</FormLabel>
                    <Input
                      type="text"
                      id="firstname"
                      placeholder="firstname is required"
                      name="firstname"
                      value={personalInfo.firstname}
                      onChange={handlePersonalInfoChange}
                    />
                  </FormControl>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <FormControl>
                    <FormLabel htmlFor="lastname">Lastname</FormLabel>
                    <Input
                      type="text"
                      id="lastname"
                      placeholder="lastname is required"
                      name="lastname"
                      value={personalInfo.lastname}
                      onChange={handlePersonalInfoChange}
                    />
                  </FormControl>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <FormControl>
                    <FormLabel htmlFor="phone">Phone Number</FormLabel>
                    <Input
                      type="text"
                      placeholder="Include country code [+256.....]"
                      name="phone"
                      id="phone"
                      value={personalInfo.phone}
                      onChange={handlePersonalInfoChange}
                    />
                  </FormControl>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <FormControl>
                    <FormLabel htmlFor="gender">Gender</FormLabel>
                    <Select
                      placeholder="Select gender"
                      name="gender"
                      id="gender"
                      value={personalInfo.gender}
                      onChange={handlePersonalInfoChange}
                    >
                      <option value="">Rather not say</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Select>
                  </FormControl>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      type="text"
                      id="email"
                      placeholder="email is required"
                      name="email"
                      value={personalInfo.email}
                      onChange={handlePersonalInfoChange}
                    />
                  </FormControl>
                </Box>
              </Grid>
            </Box>
          </>
        )}
        <Box>
          <Box>
            <Heading as={"h3"} size={"md"}>
              Delivery Details
            </Heading>
          </Box>
          <Box padding={"1rem 0"}>
            <Grid
              gridTemplateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(1, 1fr)",
                xl: "repeat(2, 1fr)",
              }}
              gridGap={"1rem"}
            >
              <FormControl>
                <FormLabel htmlFor="address1">Address 1</FormLabel>
                <Textarea
                  name="address1"
                  id="address1"
                  placeholder="Delivery address"
                  value={deliveryAddress.address1}
                  onChange={handleDeliveryDataChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="address2">Address 2</FormLabel>
                <Textarea
                  name="address2"
                  id="address2"
                  placeholder="Delivery address"
                  value={deliveryAddress.address2}
                  onChange={handleDeliveryDataChange}
                />
              </FormControl>
            </Grid>
          </Box>
          <Box padding={"0.5rem 0"}>
            <Box>
              <Heading as={"h3"} size={"md"}>
                Choose where applicable
              </Heading>
            </Box>
            <Box padding={"1rem 0"}>
              <Grid
                gridTemplateColumns={{
                  base: "repeat(3, 1fr)",
                  md: "repeat(3, 1fr)",
                  xl: "repeat(5, 1fr)",
                }}
                gridGap={"1rem"}
              >
                <Box padding={"0.5rem 0"}>
                  <Checkbox
                    name="peeledFood"
                    value={specialRequests.peeledFood}
                    onChange={handleSpecialRequestDataChange}
                  >
                    Peel Food
                  </Checkbox>
                </Box>
              </Grid>
              <Box padding={"0.5rem 0"}>
                <FormControl>
                  <FormLabel htmlFor="moreInfo">
                    Any other information
                  </FormLabel>
                  <Textarea
                    name="moreInfo"
                    id="moreInfo"
                    placeholder=""
                    value={specialRequests.moreInfo}
                    onChange={handleSpecialRequestDataChange}
                  />
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Box padding={"0.5rem 0"}>
            <Flex>
              <Box></Box>
              <Spacer />
              <Box
                onClick={() => {
                  handleTabOneData();
                }}
              >
                <ButtonComponent type={"button"} text={"Continue"} />
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TabOne;
