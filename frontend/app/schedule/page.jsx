"use client";
import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Spacer,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import TabOne from "@components/modals/tabs/scheduleTabs/TabOne";
import { ThemeColors } from "@constants/constants";
import { useProductsGetMutation } from "@slices/usersApiSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import React from "react";

const ScheduleDelivery = () => {
  const [Order, setOrder] = useState({
    deliveryProducts: [],
    deliveryDays: [],
    deliveryTime: "",
    repeatSchedule: false,
  });
  const [deliveryProducts, setDeliveryProducts] = useState([]);
  const [deliveryDays, setDeliveryDays] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState("");
  const [repeatSchedule, setRepeatSchedule] = useState(false);
  const [Products, setProducts] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [tabOneData, setTabOneData] = useState({});

  const [fetchProducts] = useProductsGetMutation();

  // chakra functions for controlling modal display
  const { onOpen, onClose, isOpen } = useDisclosure();

  const { userInfo } = useSelector((state) => state.auth);

  const chakraToast = useToast();

  const handleDataFetch = async () => {
    const res = await fetchProducts().unwrap();

    if (res?.status && res?.status == "Success") {
      setProducts(res?.data);
    }
  };

  // function to handle populating selected products for delivery data
  const handleSelectedProducts = (e) => {
    setDeliveryProducts(
      handleAddingRemovingItems(
        deliveryProducts,
        {
          name: e.target.name,
          id: e.target.parentElement.getAttribute("data-target"),
        },
        e.target.checked ? "add" : "remove"
      )
    );
  };

  // function to handle populating days of delivery data
  const handleDeliveryDays = (e) => {
    setDeliveryDays(
      handleAddingRemovingItems(
        deliveryDays,
        e.target.value,
        e.target.checked ? "add" : "remove"
      )
    );
  };

  // function to handle removing or adding items from the deliveryProducts state
  const handleAddingRemovingItems = (arr, item, action) => {
    let output = arr;

    // logic to add an item
    if (action == "add") {
      if (
        output.findIndex((value) =>
          item?.id ? value.id == item.id : value == item
        ) == -1
      ) {
        output.push(item);
      }
    }

    // logic to remove an item
    if (action == "remove") {
      output = output.filter((value) =>
        item?.id ? value.id !== item.id : value !== item
      );
    }

    return output;
  };

  // function to handle populating repeat delivery data
  const handleDeliveryRepeat = (e) => {
    setRepeatSchedule(e.target.checked ? e.target.checked : false);
  };

  // function to handle populating order
  const handleScheduleDeliveryOrder = () => {
    // check if delivery days array is empty and throw an error
    if (deliveryDays.length <= 0) {
      return chakraToast({
        title: "Error",
        description: "Please select days for delivery",
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }

    // check if delivery products array is empty and throw an error
    if (deliveryProducts.length <= 0) {
      return chakraToast({
        title: "Error",
        description: "Please select products for delivery",
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }

    // call function to display the modal form
    onOpen();
  };

  // fetch product categories
  useEffect(() => {
    handleDataFetch();
  }, []);

  return (
    <>
      <Box>
        <Flex>
          <Box padding={"2rem"} margin={"auto"} width={"70%"}>
            <Box padding={"1rem 0"}>
              <Heading as={"h2"} fontSize={"3xl"}>
                Schedule Delivery
              </Heading>
            </Box>
            <Box padding={"1rem 0"} maxHeight={"300px"}>
              <Box>
                <Heading as={"h3"} size={"md"}>
                  Select Products
                </Heading>
              </Box>
              {Products.length > 0 ? (
                <Grid
                  gridTemplateColumns={{
                    base: "repeat(3, 1fr)",
                    md: "repeat(3, 1fr)",
                    xl: "repeat(6, 1fr)",
                  }}
                  gridGap={"1rem"}
                >
                  {Products.map((product, key) => (
                    <Box padding={"0.5rem 0"} key={key}>
                      <Checkbox
                        name={product.name}
                        value={product.name}
                        className="product-checkbox"
                        data-target={product._id}
                        onChange={handleSelectedProducts}
                      >
                        {product.name}
                      </Checkbox>
                    </Box>
                  ))}
                </Grid>
              ) : (
                ""
              )}
            </Box>
            <Box padding={"1rem 0"}>
              <Box>
                <Heading as={"h3"} size={"md"}>
                  Select Delivery Days
                </Heading>
              </Box>
              <Box>
                <Grid
                  gridTemplateColumns={{
                    base: "repeat(3, 1fr)",
                    md: "repeat(3, 1fr)",
                    xl: "repeat(7, 1fr)",
                  }}
                  gridGap={"1rem"}
                >
                  <Box padding={"0.5rem 0"}>
                    <Checkbox
                      name="monday"
                      value="monday"
                      onChange={handleDeliveryDays}
                    >
                      Monday
                    </Checkbox>
                  </Box>
                  <Box padding={"0.5rem 0"}>
                    <Checkbox
                      name="tuesday"
                      value="tuesday"
                      onChange={handleDeliveryDays}
                    >
                      Tuesday
                    </Checkbox>
                  </Box>
                  <Box padding={"0.5rem 0"}>
                    <Checkbox
                      name="wednesday"
                      value="wednesday"
                      onChange={handleDeliveryDays}
                    >
                      Wednesday
                    </Checkbox>
                  </Box>
                  <Box padding={"0.5rem 0"}>
                    <Checkbox
                      name="thursday"
                      value="thursday"
                      onChange={handleDeliveryDays}
                    >
                      Thursday
                    </Checkbox>
                  </Box>
                  <Box padding={"0.5rem 0"}>
                    <Checkbox
                      name="friday"
                      value="friday"
                      onChange={handleDeliveryDays}
                    >
                      Friday
                    </Checkbox>
                  </Box>
                  <Box padding={"0.5rem 0"}>
                    <Checkbox
                      name="saturday"
                      value="saturday"
                      onChange={handleDeliveryDays}
                    >
                      Saturday
                    </Checkbox>
                  </Box>
                  <Box padding={"0.5rem 0"}>
                    <Checkbox
                      name="sunday"
                      value="sunday"
                      onChange={handleDeliveryDays}
                    >
                      Sunday
                    </Checkbox>
                  </Box>
                </Grid>
              </Box>
            </Box>
            <Box padding={"1rem 0"}>
              <Box>
                <Heading as={"h3"} size={"md"}>
                  Delivery Time
                </Heading>
              </Box>
              <Box padding={"0.5rem 0"} width={"25%"}>
                <Select
                  placeholder="Choose time"
                  name="deliveryTime"
                  id="deliveryTime"
                  onChange={(e) => setDeliveryTime(e.target.value)}
                >
                  <option value="7 AM - 8 AM">7 AM - 8 AM</option>
                  <option value="8 AM - 9 AM">8 AM - 9 AM</option>
                  <option value="10 AM - 11 AM">10 AM - 11 AM</option>
                  <option value="12 PM - 1 PM">12 PM - 1 PM</option>
                  <option value="2 PM - 3 PM">2 PM - 3 PM</option>
                  <option value="4 PM - 5 PM">4 PM - 5 PM</option>
                  <option value="6 PM - 7 PM">6 PM - 7 PM</option>
                </Select>
              </Box>
            </Box>
            {userInfo ? (
              <Box padding={"1rem 0"}>
                <Box>
                  <Heading as={"h3"} size={"md"}>
                    Repeat Schedule
                  </Heading>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <Box padding={"0.5rem 0"}>
                    <Checkbox
                      name="repeatSchedule"
                      onChange={handleDeliveryRepeat}
                    >
                      Every week
                    </Checkbox>
                  </Box>
                </Box>
              </Box>
            ) : (
              ""
            )}
            <Box padding={"1rem 0"}>
              {/* {userInfo ? (
                <ButtonComponent type={"submit"} text={"Make Order"} />
              ) : ( */}
              <Box
                onClick={() => {
                  handleScheduleDeliveryOrder();
                }}
                width={"5rem"}
              >
                <ButtonComponent type={"button"} text={"Make Order"} />
              </Box>
              {/* )} */}
            </Box>
          </Box>
        </Flex>
        <Box>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={"4xl"}
            padding={"1rem 0"}
          >
            <ModalOverlay />
            <ModalContent padding={"3rem"}>
              <ModalCloseButton size={"lg"} color={ThemeColors.darkColor} />
              <Box>
                {tabIndex == 0 ? (
                  <TabOne
                    updateTabIndex={setTabIndex}
                    fetchData={setTabOneData}
                  />
                ) : (
                  ""
                )}
              </Box>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </>
  );
};

export default ScheduleDelivery;
