import { Box, Text,  } from "@chakra-ui/react";
import Link from "next/link";
import { ThemeColors } from "@constants/constants";

const MenuLink = ({title, href, color, fontSize, onClick }) => {
    return (
        <Box margin={"0.3rem 0"} onClick={onClick}>
            <Link href={href}>
            <Text
                fontSize={fontSize}
                color={color}
                _hover={{ color: ThemeColors.darkColor }}
            >
                {title}
            </Text>
            </Link>
        </Box>
    )
}

export default MenuLink;
