import React from "react";
import { Skeleton } from "@chakra-ui/core";
import { useIsLoading } from "@lib/useIsLoading";

export const SkeletonOnLoading: React.FC = ({ children }) => {
  const isLoading = useIsLoading();
  return (
    <Skeleton isLoaded={!isLoading}>
      {children}
    </Skeleton>
  );
}