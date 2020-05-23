import React, { useCallback } from "react";
import { RocketsList } from "@services/rockets";
import { Flex } from "@chakra-ui/core";
import { NavLink } from "@navigation/NavLink";
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
            return <NavLink key={id} href={href} isActive={isActive(id)} label={name} />
          }
        )}
      </Flex>
    </SkeletonOnLoading>
  );
};