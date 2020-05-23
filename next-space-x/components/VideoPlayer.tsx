import React from "react";
import { BoxProps, Box } from "@chakra-ui/core";
import ReactPlayer from "react-player";

type Props = BoxProps & { href: string }

export const VideoPlayer: React.FC<Props> = ({ href, ...boxProps }) =>
  <Box {...boxProps}>
    <ReactPlayer
      url={href}
      controls={true}
      width="100%"
      height="100%"
    />
  </Box >