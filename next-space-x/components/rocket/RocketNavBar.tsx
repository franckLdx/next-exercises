import React, { useCallback } from "react";
import { RocketsList } from "@services/rockets";
import { Flex } from "@chakra-ui/core";
import { NavItem } from "@navigation/NavItem";
import { useRouter } from "next/router";
import { getRocketUrl } from "@lib/url";
import { SkeletonOnLoading } from "@components/SkeletonOnLoading";

interface Props {
  rockets: RocketsList
}

export const NavRockets: React.FC<Props> = ({ rockets }) => {
  const router = useRouter();
  const isActive = useCallback(
    (id: string) => router.query.id === id,
    [router.pathname]
  );
  return (
    <SkeletonOnLoading>
      <Flex flexWrap={"wrap"}>
        {rockets.map(
          ({ id, name }) => {
            const href = getRocketUrl(id);
            return <NavItem key={id} href={href} isActive={isActive(id)} label={name} />
          }
        )}
      </Flex>
    </SkeletonOnLoading>
  );
};