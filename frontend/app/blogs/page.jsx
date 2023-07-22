"use client";

import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import BlogCard from "@components/BlogCard";
import { TestBlog, ThemeColors } from "@constants/constants";
import { useBlogsFetchMutation } from "@slices/usersApiSlice";
import React, { useState } from "react";
import { useEffect } from "react";

const Blogs = () => {
  const [BlogPosts, setBlogPosts] = useState([]);

  const [fetchBlogs] = useBlogsFetchMutation();

  const handleBlogFetch = async () => {
    try {
      const res = await fetchBlogs().unwrap();

      if (res?.status == "Success") {
        setBlogPosts(res?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleBlogFetch();
  }, []);
  return (
    <>
      <Box>
        <Box padding={"2rem 0"}>
          <Heading as={"h3"} size="md" textAlign={"center"}>
            blogs
          </Heading>
          <Text
            className="secondary-light-font"
            fontSize={"4xl"}
            textAlign={"center"}
          >
            News Blogposts
          </Text>
          <Flex>
            <Box
              height={"0.2rem"}
              width={"8rem"}
              margin={"0.5rem auto"}
              background={ThemeColors.primaryColor}
            ></Box>
          </Flex>
        </Box>
        <Box>
          <Box padding={"2rem 1rem 5rem 1rem"}>
            <Flex>
              <Box
                margin={"auto"}
                width={{ base: "95%", md: "95%", xl: "90%" }}
              >
                {BlogPosts.length > 0 ? (
                  <Grid
                    gridTemplateColumns={{
                      base: "repeat(1, 1fr)",
                      md: "repeat(3, 1fr)",
                      xl: "repeat(4, 1fr)",
                    }}
                    gridGap={"1rem"}
                  >
                    {BlogPosts.map((blog, index) => (
                      <BlogCard key={index} blog={blog} />
                    ))}
                  </Grid>
                ) : (
                  <Box padding={"2rem 3rem"} height={"150px"}>
                    <Text fontSize={"2xl"} textAlign={"center"}>
                      No blog posts currently
                    </Text>
                  </Box>
                )}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Blogs;
