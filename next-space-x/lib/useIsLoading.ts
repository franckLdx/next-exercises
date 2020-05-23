import React, { useCallback, useState } from "react";
import { useLoad } from "./useLoad";

export function useIsLoading(): boolean {
  const [isLoading, setIsLoading] = useState(false);

  const onStart = useCallback(() => setIsLoading(true), []);
  const onStop = useCallback(() => setIsLoading(false), []);

  useLoad({ onStart, onStop, onError: onStart });

  return isLoading;
}