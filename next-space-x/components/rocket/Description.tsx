import React, { useMemo } from "react";
import { SubComponentProps } from "@components/rocket/subComponents";
import { getRocketsImage } from "@lib/url";
import { MediaDescription } from "@components/MediaDescription";
import { Text, Link } from "@chakra-ui/core";

export const Description: React.FC<SubComponentProps> = ({ rocket, ...props }) => {
  const imageUrl = useMemo(() => getRocketsImage(rocket.id), []);
  return (
    <MediaDescription {...props} imgUrl={imageUrl} altImg="A rocket image">
      <Text marginBottom='4'>
        {rocket.description}
      </Text>
      <Text marginBottom='4'>
        A launch costs {rocket.cost_per_launch}${rocket.success_rate_pct > 0 ? <> and the success rate is around {rocket.success_rate_pct}%</> : ""}
      </Text>
      <Text marginBottom='4'>
        It has a height of {rocket.height.meters}m and a diameter of {rocket.diameter.meters}m
      for a mass of {rocket.mass.kg}kg.
    </Text>
      <Link href={rocket.wikipedia}>Related wikipedia article</Link>
    </MediaDescription>
  );
}