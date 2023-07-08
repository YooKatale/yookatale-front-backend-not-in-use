"use client";

import { Button } from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";

const ButtonComponent = ({ text, type, pd }) => {
  return (
    <>
      <Button
        type={type}
        color={ThemeColors.lightColor}
        background={ThemeColors.darkColor}
        border={"1.7px solid " + ThemeColors.darkColor}
        borderRadius={"0.3rem"}
        padding={pd ? pd : "1rem"}
        className="secondary-light-font"
        fontSize={"md"}
        _hover={{
          background: "none",
          color: ThemeColors.darkColor,
        }}
      >
        {text}
      </Button>
    </>
  );
};

export default ButtonComponent;
