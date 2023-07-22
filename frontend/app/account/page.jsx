"use client";
import { Box, Button, Flex, Grid, Spacer, Stack, Text } from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import GeneralTab from "@components/modals/tabs/settingsTabs/GeneralTab";
import OrdersTab from "@components/modals/tabs/settingsTabs/OrdersTab";
import SettingsTab from "@components/modals/tabs/settingsTabs/SettingsTab";
import SubscriptionsTab from "@components/modals/tabs/settingsTabs/SubscriptionsTab";
import { ThemeColors } from "@constants/constants";
import { IsLoggedIn } from "@middleware/middleware";
import { useState } from "react";
import {
  FaCreditCard,
  FaRegUser,
  FaShieldAlt,
  FaTruckLoading,
  FaTruckMoving,
  FaUser,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const Account = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("general");

  IsLoggedIn();

  return (
    <>
      <Box padding={"0 5rem"}>
        <Box
          padding={"0.5rem 0"}
          borderBottom={"1.7px solid " + ThemeColors.lightColor}
        >
          <Flex>
            <Flex>
              <Box width={"30%"}>
                <Box
                  height={"80px"}
                  width={"80px"}
                  borderRadius={"50%"}
                  border={"1.7px solid " + ThemeColors.lightColor}
                  padding={"0.5rem"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <FaUser style={{ color: ThemeColors.darkColor }} size={40} />
                </Box>
              </Box>
              <Box width={"70%"} padding={"0.5rem"}>
                <Text
                  fontSize={"lg"}
                >{`${userInfo?.firstname} ${userInfo?.lastname}`}</Text>
                <Text
                  fontSize={"sm"}
                  fontWeight={"bold"}
                >{`${userInfo?.email}`}</Text>
              </Box>
            </Flex>
            <Spacer />
            <Box></Box>
          </Flex>
        </Box>
        <Flex padding={"1rem 0"}>
          <Box
            width="20%"
            borderRight={"1.7px solid " + ThemeColors.lightColor}
            padding={"1rem"}
          >
            <Stack>
              <Box
                padding={"0.5rem"}
                cursor={"pointer"}
                background={
                  activeTab === "general" ? ThemeColors.darkColor : "none"
                }
                borderRadius={"0.5rem"}
                onClick={() => setActiveTab("general")}
              >
                <Flex>
                  <FaRegUser
                    style={{
                      color:
                        activeTab === "general"
                          ? ThemeColors.lightColor
                          : ThemeColors.darkColor,
                    }}
                    size={20}
                  />
                  <Text
                    fontSize={"md"}
                    margin={"0 0.3rem"}
                    color={
                      activeTab === "general" ? ThemeColors.lightColor : "#000"
                    }
                  >
                    General
                  </Text>
                </Flex>
              </Box>
              <Box
                padding={"0.5rem"}
                cursor={"pointer"}
                background={
                  activeTab === "orders" ? ThemeColors.darkColor : "none"
                }
                borderRadius={"0.5rem"}
                onClick={() => setActiveTab("orders")}
              >
                <Flex>
                  <FaTruckLoading
                    style={{
                      color:
                        activeTab === "orders"
                          ? ThemeColors.lightColor
                          : ThemeColors.darkColor,
                    }}
                    size={20}
                  />
                  <Text
                    fontSize={"md"}
                    margin={"0 0.3rem"}
                    color={
                      activeTab === "orders" ? ThemeColors.lightColor : "#000"
                    }
                  >
                    Orders
                  </Text>
                </Flex>
              </Box>
              <Box
                padding={"0.5rem"}
                cursor={"pointer"}
                background={
                  activeTab === "subscriptions" ? ThemeColors.darkColor : "none"
                }
                borderRadius={"0.5rem"}
                onClick={() => setActiveTab("subscriptions")}
              >
                <Flex>
                  <FaCreditCard
                    style={{
                      color:
                        activeTab === "subscriptions"
                          ? ThemeColors.lightColor
                          : ThemeColors.darkColor,
                    }}
                    size={20}
                  />
                  <Text
                    fontSize={"md"}
                    margin={"0 0.3rem"}
                    color={
                      activeTab === "subscriptions"
                        ? ThemeColors.lightColor
                        : "#000"
                    }
                  >
                    Subscriptions
                  </Text>
                </Flex>
              </Box>
              <Box
                padding={"0.5rem"}
                cursor={"pointer"}
                background={
                  activeTab === "settings" ? ThemeColors.darkColor : "none"
                }
                borderRadius={"0.5rem"}
                onClick={() => setActiveTab("settings")}
              >
                <Flex>
                  <FaShieldAlt
                    style={{
                      color:
                        activeTab === "settings"
                          ? ThemeColors.lightColor
                          : ThemeColors.darkColor,
                    }}
                    size={20}
                  />
                  <Text
                    fontSize={"md"}
                    margin={"0 0.3rem"}
                    color={
                      activeTab === "settings" ? ThemeColors.lightColor : "#000"
                    }
                  >
                    Settings
                  </Text>
                </Flex>
              </Box>
            </Stack>
          </Box>
          <Box width="80%">
            {activeTab === "general" ? (
              <GeneralTab />
            ) : activeTab === "orders" ? (
              <OrdersTab />
            ) : activeTab === "subscriptions" ? (
              <SubscriptionsTab />
            ) : activeTab === "settings" ? (
              <SettingsTab />
            ) : (
              <GeneralTab />
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Account;
