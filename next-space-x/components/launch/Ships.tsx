import React from "react";
import StyledSystem from "styled-system";
import { LaunchDetail } from "@services/launches";
import { Box } from "@chakra-ui/core";
import { Ship } from "@launch/Ship";
import { useIsLoading } from "@lib/useIsLoading";

type Props = StyledSystem.MarginProps & {
  launchResult: LaunchDetail;
  size: string | string[];
}

export const Ships: React.FC<Props> = ({ launchResult, size, ...props }) => {
  const isLoading = useIsLoading();
  if (launchResult.ships.length === 0) {
    return <Box />;
  }
  return (
    <Box {...props}>
      {isLoading ? <></> : <>Ships involed by this mission:</>}
      {launchResult.ships.map(ship =>
        <Ship
          key={ship.id}
          ship={ship}
          marginBottom={2}
          size={size}
        />)}
    </Box>
  );
}

