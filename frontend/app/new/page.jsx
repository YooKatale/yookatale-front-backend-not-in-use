"use client";

import React, { useState } from 'react'
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

const New = () => {
  const [createProduct] = useProductCreateMutation();

  const chakraToast = useToast();

  const router = useRouter();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState(null);
  const [description, setDescription ] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [priceTiers, setPriceTiers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const NewFormData = new FormData();
  
      NewFormData.append("name", name);
      NewFormData.append("category", category);
      NewFormData.append("subCategory", subCategory);
      NewFormData.append("price", price);
      NewFormData.append("description", description);
      NewFormData.append("priceTiers", JSON.stringify(priceTiers));
  
      for (let i = 0; i < selectedImages.length; i++) {
        NewFormData.append("images", selectedImages[i]);
      }
  
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handlePriceTierChange = (index, field, value) => {
    const updatedPriceTiers = [...priceTiers];
    updatedPriceTiers[index][field] = value;
    setPriceTiers(updatedPriceTiers);
  };

  const addPriceTier = () => {
    setPriceTiers([...priceTiers, { quantity: "", price: "" }]);
  };

  const removePriceTier = (index) => {
    const updatedPriceTiers = [...priceTiers];
    updatedPriceTiers.splice(index, 1);
    setPriceTiers(updatedPriceTiers);
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
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
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
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
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </Grid>
              {priceTiers.map((tier, index) => (
                <Grid
                  key={index}
                  gridTemplateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(2, 1fr)",
                  }}
                  gridGap={"1rem"}
                >
                  <Box padding={"0.5rem 0"}>
                    <FormControl>
                      <FormLabel htmlFor={`quantity-${index}`}>Quantity</FormLabel>
                      <Input
                        type="text"
                        id={`quantity-${index}`}
                        placeholder="Quantities"
                        value={tier.quantity}
                        onChange={(e) => handlePriceTierChange(index, "quantity", e.target.value)}
                      />
                    </FormControl>
                  </Box>
                  <Box padding={"0.5rem 0"}>
                    <FormControl>
                      <FormLabel htmlFor={`priceQuantity-${index}`}>Price Quantity</FormLabel>
                      <Input
                        type="number"
                        id={`priceQuantity-${index}`}
                        placeholder="Price of quantity"
                        value={tier.price}
                        onChange={(e) => handlePriceTierChange(index, "price", e.target.value)}
                      />
                    </FormControl>
                  </Box>
                  <Box padding={"0.5rem 0"}>
                    <Button
                      onClick={() => removePriceTier(index)}
                      colorScheme="red"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </Box>
                </Grid>
              ))}
              <Box padding={"0.5rem 0"}>
                <Button onClick={addPriceTier} size="sm">
                  Add Price Tier
                </Button>
              </Box>
              <Box padding={"0.5rem 0"}>
                <FormControl>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea
                    name={"description"}
                    id={"description"}
                    placeholder="Product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box padding={"0.5rem 0"}>
                <FormControl>
                  <FormLabel htmlFor="images">Images</FormLabel>
                  <Input type="file" name="images" id="images" multiple onChange={handleImageChange} />
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
