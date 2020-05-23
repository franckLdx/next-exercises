import React from "react";
import { Separator } from "@components/Separator";
import { List, ListItem } from "@chakra-ui/core";
import { SkeletonOnLoading } from "@components/SkeletonOnLoading";
import { Props } from "./Props";

export const Role: React.FC<Props> = ({ ship }) =>
  <>
    <Separator>Roles</Separator>
    <SkeletonOnLoading>
      <List styleType="disc" marginTop={2} marginBottom={4}>
        {ship.roles.map(role => <ListItem key={role}>{role}</ListItem>)}
      </List>
    </SkeletonOnLoading>
  </>