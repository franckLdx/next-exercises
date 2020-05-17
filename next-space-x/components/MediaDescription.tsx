import React from "react";
import { Box, Image } from "@chakra-ui/core";
import StyledSystem from "styled-system";

type Props = StyledSystem.MarginProps & {
  imgUrl: string;
  altImg: string;
}

export const MediaDescription: React.FC<Props> = ({ imgUrl, altImg, children, ...props }) => (
  <Box {...props} p={4} display="flex">
    {imgUrl && <Image
      rounded="lg"
      width={{ base: 20, md: 40 }}
      src={imgUrl}
      alt={altImg}
      marginRight="15px"
      objectFit="cover"
    />}
    <Box position="relative" top="0.5em">
      {children}
    </Box>
  </Box>
)