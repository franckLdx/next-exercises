import React, { useEffect, useState, useCallback } from 'react';
import { Progress } from '@chakra-ui/core';
import { useRouter } from 'next/router';

export const Loading: React.FC = React.memo(
  () => {
    const [refresh, setRefresh] = useState<number | undefined>(undefined);
    const [value, setValue] = useState(0);
    const [visibility, setVisibility] = useState<"visible" | "hidden">("hidden");
    const router = useRouter();

    const startLoad = useCallback(() => {
      setVisibility("visible");
      const interval = window.setInterval(
        () => setValue(value => value <= 100 ? value + 3 : -10),
        150
      );
      setRefresh(interval);
    }, []);

    const stopLoad = useCallback(
      () => {
        setVisibility("hidden");
        clearInterval(refresh);
        setRefresh(undefined);
      }, []
    )

    useEffect(
      () => {
        router.events.on('routeChangeStart', startLoad);
        router.events.on('routeChangeComplete', stopLoad);
        router.events.on('routeChangeError', stopLoad);
      },
      [startLoad, stopLoad]
    );

    return (
      <Progress
        visibility={visibility}
        value={value}
        height="4px"
        hasStripe
        isAnimated
      />
    )
  }
);