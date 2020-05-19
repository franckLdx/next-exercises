import React, { useMemo } from "react";
import { Separator } from "@components/Separator";
import { RocketDetail_SecondStage } from "@services/rockets";
import { StatProps, InlineStats } from "@components/InlineStats";
import StyledSystem from "styled-system";
import { Box } from "@chakra-ui/core";

type Props = StyledSystem.MarginProps & {
  secondStage: RocketDetail_SecondStage;
}

export const SecondStage: React.FC<Props> = ({ secondStage, ...props }) => {
  const enginesItems = useMemo(
    (): Array<StatProps> => [
      { id: "Engines", label: "Engines", data: secondStage.engines },
      { id: "Burn", label: "Burn time", data: secondStage.burn_time_sec },
      { id: "Fueal", label: "Fuel amount", data: `${secondStage.fuel_amount_tons} tons` }
    ],
    [secondStage]
  );
  const thrustItems = useMemo(
    (): Array<StatProps> => [
      { id: "Thrust", label: "Thrust", data: `${secondStage.thrust.kN} kn` }
    ],
    [secondStage]
  );
  return (
    <Box {...props}>
      <Separator>Second stage</Separator>
      <InlineStats stats={enginesItems} />
      <InlineStats stats={thrustItems} />
    </Box>);
}