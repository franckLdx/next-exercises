import React, { useMemo } from "react";
import { SubComponentProps } from "./subComponents";
import { Separator } from "@components/Separator";
import { StatProps, InlineStats } from "@components/InlineStats";

export const Payload: React.FC<SubComponentProps> = ({ rocket, ...props }) => {
  const stats: Array<StatProps> = useMemo(
    () => rocket.payload_weights.map(
      ({ id, name, kg }) => ({ id, label: name, data: `${kg} kg` })
    )
    ,
    [rocket.payload_weights]
  );
  return (
    <>
      <Separator {...props}>Payload</Separator>
      <InlineStats stats={stats} />
    </>
  );
}
