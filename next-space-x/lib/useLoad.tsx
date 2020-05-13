import React, { useEffect } from "react";
import { useRouter } from "next/router";

type Handler = () => void;
interface Props { onStart?: Handler, onStop?: Handler, onError?: Handler }

export function useLoad({ onStart, onStop, onError }: Props) {
  const router = useRouter();
  useEffect(
    () => {
      router.events.on('routeChangeStart', onStart);
      router.events.on('routeChangeComplete', onStop);
      router.events.on('routeChangeError', onError);
    },
    [onStart, onStop, onError = onStart]
  );
}