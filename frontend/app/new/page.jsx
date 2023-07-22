"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";
import { useProductCreateMutation } from "@slices/usersApiSlice";
import { useRouter } from "next/navigation";

// import React from 'react'

const New = () => {
  const [createProduct] = useProductCreateMutation();

  const chakraToast = useToast();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;

      const NewFormData = new FormData(form);

      const res = await createProduct(NewFormData).unwrap();

      if (res?.status == "Success") {
        chakraToast({
          title: "Success",
          description: "Product added successfully",
          status: "success",
          duration: 5000,
          isClosable: false,
        });

        router.push("/new");
      }
    } catch (err) {
      chakraToast({
        title: "Error",
        description: err.data?.message
          ? err.data?.message
          : err.data || err.error,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };
  return (
    <>
      <Box padding={"3rem"}>
        <Flex>
          <Box margin={"auto"} width={{ base: "100%", md: "80%", xl: "60%" }}>
            <Box padding={"2rem 0"}>
              <Heading as={"h3"} size={"md"}>
                Add new product
              </Heading>
            </Box>
            <form onSubmit={handleSubmit}>
              <Grid
                gridTemplateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(1, 1fr)",
                  xl: "repeat(2, 1fr)",
                }}
                gridGap={"1rem"}
              >
                <Box padding={"0.5rem 0"}>
                  <FormControl>
                    <FormLabel htmlFor="name">Product Name</FormLabel>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Product name is required"
                      name="name"
                    />
                  </FormControl>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <FormControl>
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <Input
                      type="text"
                      id="category"
                      placeholder="category is required"
                      name="category"
                    />
                  </FormControl>
                </Box>
              </Grid>
              <Grid
                gridTemplateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(1, 1fr)",
                  xl: "repeat(2, 1fr)",
                }}
                gridGap={"1rem"}
              >
                <Box padding={"0.5rem 0"}>
                  <FormControl>
                    <FormLabel htmlFor="subCategory">Sub Category</FormLabel>
                    <Input
                      type="text"
                      placeholder="eg. featured, recommended, popular ..."
                      name="subCategory"
                      id="subCategory"
                    />
                  </FormControl>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <FormControl>
                    <FormLabel htmlFor="price">Price</FormLabel>
                    <Input
                      type="number"
                      placeholder="Price is required"
                      name="price"
                      id="price"
                    />
                  </FormControl>
                </Box>
              </Grid>
              <Box padding={"0.5rem 0"}>
                <FormControl>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea
                    name={"description"}
                    id={"description"}
                    placeholder="Product description"
                  />
                </FormControl>
              </Box>
              <Box padding={"0.5rem 0"}>
                <FormControl>
                  <FormLabel htmlFor="images">Images</FormLabel>
                  <Input type="file" name="images" id="images" multiple />
                </FormControl>
              </Box>
              <Box padding={"0.5rem 0"}>
                <Button
                  type="submit"
                  color={ThemeColors.lightColor}
                  background={ThemeColors.darkColor}
                  border={"1.7px solid " + ThemeColors.darkColor}
                  borderRadius={"0.3rem"}
                  padding={"1rem"}
                  className="secondary-light-font"
                  fontSize={"md"}
                  _hover={{
                    background: "none",
                    color: ThemeColors.darkColor,
                  }}
                >
                  Add product
                </Button>
              </Box>
            </form>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default New;
