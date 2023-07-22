"use client";

import { Box, Image, Text } from "@chakra-ui/react";
import { Images, ThemeColors } from "@constants/constants";
import moment from "moment";
import Link from "next/link";
import React from "react";

const BlogCard = ({ blog }) => {
  return (
    <>
      <Link href={`/blog?id=${blog?.id}`}>
        <Box
          borderRadius={"md"}
          border={"1.7px solid " + ThemeColors.lightColor}
        >
          <Box borderRadius={"md"}>
            <Image
              width={"100%"}
              src={Images.testImage.src}
              objectFit={"cover"}
              borderTopRightRadius={"md"}
              borderTopRLeftRadius={"md"}
            />
          </Box>
          <Box padding={"0.5rem"}>
            <Text fontSize={"lg"}>{blog?.title}</Text>
            <Text fontSize={"sm"} fontWeight={"bold"} color={"gray.500"}>
              {moment(blog?.date).fromNow()}
            </Text>
            <Box maxHeight={"45px"} padding={"0.3rem 0"} overflow={"clip"}>
              <Text
                fontSize={"sm"}
                fontWeight={"thin"}
                textOverflow={"ellipsis"}
              >
                {blog?.blog}
              </Text>
            </Box>
          </Box>
        </Box>
      </Link>
    </>
  );
};

export default BlogCard;
