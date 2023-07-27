"use client";

import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import BlogCard from "@components/BlogCard";
import ButtonComponent from "@components/Button";
import { Images, TestBlog, ThemeColors } from "@constants/constants";
import {
  useBlogFetchMutation,
  useNewsletterPostMutation,
} from "@slices/usersApiSlice";
import moment from "moment";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineClose,
} from "react-icons/ai";
import {
  FaClipboard,
  FaFacebook,
  FaShareAlt,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const Blog = () => {
  const [BlogPost, setBlogPost] = useState([]);
  const [similarBlogPost, setSimilarBlogPost] = useState([]);
  const [socialShareModal, setSocialShareModal] = useState(false);
  const [newsletterPrompt, setNewsletterPrompt] = useState(false);
  const [NewsletterEmail, setNewsletterEmail] = useState("");
  const [isLoading, setLoading] = useState(false);

  // use the useSearchParam hooks from next/navigation to get url params
  const searchParam = useSearchParams();
  const pathname = usePathname();

  const param = searchParam.get("id");
  const chakraToast = useToast();

  const [fetchBlog] = useBlogFetchMutation();
  const [createNewsletter] = useNewsletterPostMutation();

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

  // submit email for newsletter
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    setLoading((prevState) => (prevState ? false : true));

    try {
      const res = await createNewsletter({ email: NewsletterEmail }).unwrap();

      if (res.status == "Success") {
        // set loading to be false
        setLoading((prevState) => (prevState ? false : true));

        // clear email value
        setNewsletterEmail("");

        chakraToast({
          title: "Success",
          description: "Successfully subscribed to newsletter",
          status: "success",
          duration: 5000,
          isClosable: false,
        });
      }
    } catch (err) {
      // set loading to be false
      setLoading((prevState) => (prevState ? false : true));

      chakraToast({
        title: "Error has occured",
        description: err.data?.message
          ? err.data?.message
          : err.data || err.error,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };

  const handleCopyClipboard = () => {
    if (navigator) {
      navigator.clipboard.writeText(
        `https://yookatale.com/blog?q${BlogPost?.title}&id=${BlogPost?._id}`
      );

      chakraToast({
        title: "Copied",
        description: "Copied to clipboard",
        status: "success",
        duration: 5000,
        isClosable: false,
      });
    }
  };

  useEffect(() => {
    handleBlogFetch();

    setTimeout(() => {
      setNewsletterPrompt((prev) => (prev ? false : true));
    }, 5000);
  }, []);

  return (
    <>
      {/* // newsletter prompt modal */}
      <Box
        position={"fixed"}
        left={"5%"}
        bottom={"10%"}
        padding={"1rem"}
        background={ThemeColors.lightColor}
        borderRadius={"md"}
        zIndex={10}
        width={{ base: "90%", md: "60%", xl: "40%" }}
        visibility={newsletterPrompt ? "visible" : "hidden"}
        transform={
          newsletterPrompt ? "translate3d(0, 0, 0)" : "translate3d(0, 150%, 0)"
        }
      >
        <Box
          position={"absolute"}
          top={{ base: "1rem", md: "2rem", xl: "2rem" }}
          right={{ base: "1rem", md: "2rem", xl: "2rem" }}
          cursor={"pointer"}
        >
          <AiOutlineClose
            size={25}
            onClick={() => setNewsletterPrompt((prev) => (prev ? false : true))}
          />
        </Box>
        <Box
          padding={{ base: "1rem 0 0 0", md: "1rem 0", xl: "1rem 0" }}
          width={{ base: "100%", md: "100%", xl: "100%" }}
        >
          <Flex>
            <Box
              margin={"auto"}
              width={{ base: "100%", md: "100%", xl: "100%" }}
            >
              <form onSubmit={handleNewsletterSubmit}>
                <Box borderRadius={"0.5rem"} padding={"0.5rem"}>
                  <Box>
                    <Text
                      fontSize={"lg"}
                      fontWeight={"bold"}
                      textAlign={"center"}
                    >
                      Subscribe to our newsletter
                    </Text>
                  </Box>
                  <Box padding={"1rem 0"}>
                    <Input
                      type="text"
                      name={"NewsletterEmail"}
                      placeholder="Enter your email"
                      value={NewsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                    />
                  </Box>
                  <Box padding={"0.3rem 0"}>
                    <Text
                      fontSize={{ base: "sm", md: "md", xl: "md" }}
                      textAlign={{
                        base: "center",
                        md: "center",
                        xl: "left",
                      }}
                    >
                      By clicking "Subscribe" I agree to receive news,
                      promotions, information and offers from YooKatale
                    </Text>
                  </Box>
                  <Box padding={"0.5rem 0"}>
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <ButtonComponent type={"submit"} text={"Subscribe"} />
                    )}
                  </Box>
                </Box>
              </form>
            </Box>
          </Flex>
        </Box>
      </Box>

      <Box padding={"2rem 0"}>
        <Flex borderBottom={"1.7px solid " + ThemeColors.lightColor}>
          <Box margin={"auto"} width={"80%"}>
            <Box padding={"1rem 0"}>
              <Image
                src={BlogPost ? (BlogPost?.image ? BlogPost?.image : "") : ""}
                alt="newsblog image"
                width={{ base: "70%", md: "60%", xl: "50%" }}
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

                <Box
                  padding={"0.3rem 0.5rem"}
                  position={"relative"}
                  overflow={socialShareModal ? "visible" : "hidden"}
                  display={"none"}
                >
                  <FaShareAlt
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setSocialShareModal((prev) => (prev ? false : true))
                    }
                  />

                  {/* // modal pop up */}
                  <Box
                    position={"absolute"}
                    top={"90%"}
                    padding={"0.5rem"}
                    width={"250px"}
                    background={ThemeColors.lightColor}
                    zIndex={5}
                    borderRadius={"0.3rem"}
                    visibility={socialShareModal ? "visible" : "hidden"}
                    transform={
                      socialShareModal
                        ? "translate3d(0, 0, 0)"
                        : "translate3d(0, 150%, 0)"
                    }
                  >
                    <Box
                      position={"absolute"}
                      top={"0.5rem"}
                      right={"0.5rem"}
                      cursor={"pointer"}
                    >
                      <AiOutlineClose
                        size={20}
                        onClick={() =>
                          setSocialShareModal((prev) => (prev ? false : true))
                        }
                      />
                    </Box>

                    <Box padding={"0.3rem 0"}>
                      <Text
                        fontSize={"md"}
                        fontWeight={"bold"}
                        textAlign={"center"}
                      >
                        Share newsblog
                      </Text>
                    </Box>
                    <Flex padding={"0.5rem 0"} justifyContent={"center"}>
                      <Box margin={"0 0.5rem"} display={"none"}>
                        <Link href={`{}`}>
                          <FaWhatsapp size={25} style={{ color: "#178b17" }} />
                        </Link>
                      </Box>
                      <Box
                        margin={"0 0.5rem"}
                        onClick={handleCopyClipboard}
                        cursor={"pointer"}
                      >
                        <Flex>
                          <Text margin={"0 0.3rem"}>Copy link </Text>
                          <FaClipboard size={25} />
                        </Flex>
                      </Box>
                      <Box margin={"0 0.5rem"} display={"none"}>
                        <Link href={`{}`}>
                          <FaFacebook size={25} style={{ color: "#1553a5" }} />
                        </Link>
                      </Box>
                      <Box margin={"0 0.5rem"} display={"none"}>
                        <a
                          href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                          class="twitter-share-button"
                          data-text={`${BlogPost?.title}`}
                          data-url={`${pathname}`}
                          data-via="YooKatale"
                          data-show-count="false"
                        >
                          <FaTwitter size={25} style={{ color: "#1553a5" }} />
                        </a>
                        <script
                          async
                          src="https://platform.twitter.com/widgets.js"
                          charset="utf-8"
                        ></script>
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            </Box>
            <Box padding={"2rem 0"}>
              <Box
                className="__blog-content"
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
