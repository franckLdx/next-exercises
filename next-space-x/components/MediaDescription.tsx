import React from "react";
import { Box, Image } from "@chakra-ui/core";

interface Props {
  imgUrl: string;
  altImg: string;
}

export const MediaDescription: React.FC<Props> = ({ imgUrl, altImg, children }) => (
  <Box p={4} display="flex">
    {imgUrl && <Image
      rounded="lg"
      width={{ md: 40 }}
      src={imgUrl}
      alt={altImg}
      marginRight="15px"
    />}
    <Box position="relative" top="0.5em">
      {children}
    </Box>
  </Box>
)