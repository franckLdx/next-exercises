import React, { useMemo } from "react";
import { Separator } from "@components/Separator";
import { InlineStats, StatProps } from "@components/InlineStats";
import { RocketDetail_FirstStage } from "@services/rockets";
import { Box } from "@chakra-ui/core";
import { SkeletonOnLoading } from "@components/SkeletonOnLoading";
import StyledSystem from "styled-system";

type Props = StyledSystem.MarginTopProps & {
  firstStage: RocketDetail_FirstStage
}

export const FirstStage: React.FC<Props> = ({ firstStage, ...props }) => {
  const reusableStats = useMemo(
    (): Array<StatProps> => [{ id: "reusable", label: "Reusable", data: firstStage.reusable ? "Yes" : "No" }],
    [firstStage]
  );
  const enginesItems = useMemo(
    (): Array<StatProps> => [
      { id: "Engines", label: "Engines", data: firstStage.engines },
      { id: "Burn", label: "Burn time", data: firstStage.burn_time_sec },
      { id: "Fue", label: "Fuel amount", data: `${firstStage.fuel_amount_tons} tons` }
    ],
    [firstStage]
  );
  const thrustItems = useMemo(
    (): Array<StatProps> => [
      { id: "Sea", label: "Thrust at sea level", data: `${firstStage.thrust_sea_level.kN} kn` },
      { id: "Vacuum", label: "Vacuum thrust", data: `${firstStage.thrust_vacuum.kN} kn` }
    ],
    [firstStage])
  return (
    <Box {...props}>
      <SkeletonOnLoading>
        <Separator {...props}>First stage</Separator>
        <InlineStats stats={reusableStats} />
        <InlineStats stats={enginesItems} />
        <InlineStats stats={thrustItems} />
      </SkeletonOnLoading>
    </Box>
  );
}
