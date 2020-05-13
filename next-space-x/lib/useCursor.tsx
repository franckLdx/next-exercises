import React, { useCallback, useState } from "react";
import { useLoad } from "./useLoad";

export function useCursor(initialCursor: string): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [currentCursor, setCursor] = useState(initialCursor);

  const onStart = useCallback(() => setCursor('wait'), []);
  const onStop = useCallback(() => setCursor(initialCursor), [initialCursor]);

  useLoad({ onStart, onStop, onError: onStart });

  return [currentCursor, setCursor];
}