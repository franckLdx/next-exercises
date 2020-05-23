import React from "react";
import { FlexProps, Flex, Image } from "@chakra-ui/core";
import { LaunchDetail_Ship } from "@services/launches";
import { MyNextLink } from "@components/MyNextLink";
import { getShipUrl } from "@lib/url";

type Props =
  Omit<FlexProps, 'display' | 'flexWrap' | 'direction' | 'alignItems' | 'justifyContent'> &
  {
    ship: LaunchDetail_Ship;
    size: string | string[];
  }

export const Ship: React.FC<Props> = ({ ship: { id, image, name }, size, ...flexProps }) =>
  <MyNextLink href={getShipUrl(id)}>
    <Flex {...flexProps} direction="row">
      {image &&
        <Image
          src={image}
          alt="Ship's photo"
          size={size}
          marginRight={2}
          objectFit="fill"
        />}
      {name}
    </Flex>
  </MyNextLink>