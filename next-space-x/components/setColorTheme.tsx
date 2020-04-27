import React, { useEffect } from "react";
import { useColorMode } from "@chakra-ui/core";

interface Props {
  color: "light" | "dark"
}

export const SetColorTheme: React.FC<Props> = React.memo(
  ({ color }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    useEffect(
      () => { if (colorMode !== color) { toggleColorMode(); } },
      []
    );
    return <></>;
  }
);