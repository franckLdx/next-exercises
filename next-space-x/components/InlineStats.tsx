import React from "react";
import { SimpleGrid, StatLabel, StatNumber, Stat } from "@chakra-ui/core";

export interface StatProps { id: string, label: string, data: number | string }

export interface InlineStatsProps {
  stats: Array<StatProps>
}

export const InlineStats: React.FC<InlineStatsProps> = ({ stats }) =>
  <SimpleGrid marginTop="3" columns={{ sm: 2, md: 2, lg: 3, xl: 4 }} spacing={2} maxWidth="1500px">
    {stats.map(({ id, label, data }) =>
      <Stat key={id}>
        <StatLabel>{label}</StatLabel>
        <StatNumber >{data}</StatNumber>
      </Stat>
    )}
  </SimpleGrid>
