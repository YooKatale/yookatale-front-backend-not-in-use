"use client";

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";
import { useSearchMutation } from "@slices/usersApiSlice";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import currency from "currency.js";
import ProductCard from "@components/ProductCard";
import { useSelector } from "react-redux";

const UGX = (value) =>
  currency(value, { symbol: "UGX", precision: 0, separator: "," });

const Search = () => {
  // use the useSearchParam hooks from next/navigation to get url params
  const searchParam = useSearchParams();

  const { userInfo } = useSelector((state) => state.auth);

  const param = searchParam.get("q");

  const [Products, setProducts] = useState([]);

  const [fetchProducts, { isLoading }] = useSearchMutation();

  // function handle fetching data
  const handleDataFetch = async () => {
    try {
      const res = await fetchProducts(param).unwrap();

      console.log({ res });

      if (res?.status && res?.status == "Success") {
        setProducts(res?.Products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch product categories
  useEffect(() => {
    handleDataFetch();
  }, [param]);

  return (
    <>
      <Box>
        <Box padding={{ base: "2rem", md: "2rem 3rem", xl: "2rem 5rem" }}>
          <Heading as={"h3"} size={"md"} display={"flex"}>
            Showing results for:
            <Heading
              as={"h3"}
              size={"md"}
              color={ThemeColors.darkColor}
              margin={"0 0.5rem"}
            >
              {param}
            </Heading>
          </Heading>
        </Box>
        <Flex>
          <Box margin={"auto"} width={{ base: "100%", md: "100%", xl: "85%" }}>
            {Products.length > 0 ? (
              <Grid
                gridTemplateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(3, 1fr)",
                  xl: "repeat(4, 1fr)",
                }}
                gridGap={"1rem"}
              >
                {Products.map((product, index) => (
                  <ProductCard
                    key={index}
                    UGX={UGX}
                    userInfo={userInfo}
                    width={false}
                    product={product}
                  />
                ))}
              </Grid>
            ) : (
              <Box>
                <Box padding={{ base: "2rem", md: "2rem", xl: "3rem 0" }}>
                  <Text fontSize={"3xl"}>No products currently</Text>
                </Box>
              </Box>
            )}
          </Box>
        </Flex>
        <Box padding={"3rem 0"}></Box>
      </Box>
    </>
  );
};

export default Search;
