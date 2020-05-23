import React from "react";
import { Separator } from "@components/Separator";
import { List, ListItem } from "@chakra-ui/core";
import { MyNextLink } from "@components/MyNextLink";
import { getLaunchUrl } from "@lib/url";
import { SkeletonOnLoading } from "@components/SkeletonOnLoading";
import { Props } from "@ship/Props";

export const Launch: React.FC<Props> = ({ ship }) => <>
  <Separator>Launches</Separator>
  <SkeletonOnLoading>
    <List styleType="disc" marginTop={2}>
      {ship.missions.map(mission =>
        <ListItem key={mission.flight}>
          <MyNextLink href={getLaunchUrl(mission.flight)}>{mission.name}</MyNextLink>
        </ListItem>
      )}
    </List>
  </SkeletonOnLoading>
</>