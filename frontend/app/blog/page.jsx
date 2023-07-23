"use client";

import { Box, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import BlogCard from "@components/BlogCard";
import { Images, TestBlog, ThemeColors } from "@constants/constants";
import { useBlogFetchMutation } from "@slices/usersApiSlice";
import moment from "moment";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Blog = () => {
  const [BlogPost, setBlogPost] = useState([]);
  const [similarBlogPost, setSimilarBlogPost] = useState([]);

  // use the useSearchParam hooks from next/navigation to get url params
  const searchParam = useSearchParams();

  const param = searchParam.get("id");

  const [fetchBlog] = useBlogFetchMutation();

  const handleBlogFetch = async () => {
    try {
      const res = await fetchBlog(param).unwrap();

      if (res?.status == "Success") {
        setBlogPost(res?.data);
        // setSimilarBlogPost(res?.data?.SimilarBlogPosts);
      }
    } catch (error) {}
  };

  // handle scrolling to right
  const handleRightScroll = () => {
    const SliderDiv = document.getElementById("container__hide__scrollbar");

    if (SliderDiv.scrollBy) {
      SliderDiv.scrollBy(300, 0);
    }
  };

  // handle scrolling to right
  const handleLeftScroll = () => {
    const SliderDiv = document.getElementById("container__hide__scrollbar");

    if (SliderDiv.scrollBy) {
      SliderDiv.scrollBy(-300, 0);
    }
  };

  useEffect(() => {
    handleBlogFetch();
  }, []);

  return (
    <>
      <Box padding={"2rem 0"}>
        <Flex borderBottom={"1.7px solid " + ThemeColors.lightColor}>
          <Box margin={"auto"} width={"80%"}>
            <Box padding={"1rem 0"}>
              <Image
                src={
                  BlogPost ? (BlogPost?.image ? BlogPost?.image.src : "") : ""
                }
                alt="newsblog image"
              />
            </Box>
            <Box padding={"0.5rem 0"}>
              <Heading as={"h2"} size={"lg"}>
                {BlogPost ? (BlogPost?.title ? BlogPost?.title : "") : ""}
              </Heading>
            </Box>
            <Box>
              <Flex>
                <Box>
                  <Text>
                    {BlogPost
                      ? BlogPost?.createdAt
                        ? moment(BlogPost?.createdAt).fromNow()
                        : ""
                      : ""}
                  </Text>
                </Box>
                <Box margin={"0 0.5rem"}>
                  <Text color={"gray.500"}>
                    -{" "}
                    {BlogPost ? (BlogPost?.author ? BlogPost?.author : "") : ""}
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box padding={"2rem 0"}>
              <Box
                dangerouslySetInnerHTML={{
                  __html: BlogPost
                    ? BlogPost?.blog
                      ? BlogPost?.blog
                      : ""
                    : "",
                }}
              ></Box>
            </Box>
          </Box>
        </Flex>

        <Box padding={"1rem 0"} hidden>
          <Flex display={{ base: "none", md: "none", xl: "flex" }}>
            <Box margin={"auto"} width={"90%"}>
              <Box padding={"1rem 0"}>
                <Text fontSize={"2xl"}>More by John Doe</Text>
              </Box>
              <Grid
                gridTemplateColumns={{
                  base: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  xl: "repeat(4, 1fr)",
                }}
                gridGap={"1rem"}
              ></Grid>
            </Box>
          </Flex>
          <Box
            position={"relative"}
            id="container__hide__scrollbar"
            padding={"1rem 1rem 3rem 1rem"}
            display={{ base: "block", md: "block", xl: "none" }}
          >
            {similarBlogPost && similarBlogPost.length > 0 && (
              <>
                <Box padding={"1rem 0"}>
                  <Text fontSize={"lg"}>More by John Doe</Text>
                </Box>
                <Flex flexShrink={0} overflowX={"auto"}>
                  {similarBlogPost.map((blog, index) => (
                    <Box width={"220px"} key={index}>
                      <BlogCard blog={blog} />
                    </Box>
                  ))}
                </Flex>
              </>
            )}
            {similarBlogPost && similarBlogPost.length > 4 && (
              <Box display={{ base: "none", md: "none", xl: "block" }}>
                <Box
                  onClick={handleLeftScroll}
                  position="absolute"
                  top="50%"
                  left="-3%"
                  cursor="pointer"
                >
                  <AiOutlineArrowLeft size={30} />
                </Box>
                <Box
                  onClick={handleRightScroll}
                  position="absolute"
                  top="50%"
                  right="-3%"
                  cursor="pointer"
                >
                  <AiOutlineArrowRight size={30} />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Blog;
