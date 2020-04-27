import React, { useEffect, useState, useCallback } from 'react';
import { Progress } from '@chakra-ui/core';
import Router from 'next/router'

interface Props {
  marginBottom: number;
}
export const Loading: React.FC<Props> = React.memo(
  ({ marginBottom }) => {
    const [refresh, setRefresh] = useState<number | undefined>(undefined);
    const [value, setValue] = useState(0);
    const [visibility, setVisibility] = useState<"visible" | "hidden">("hidden");

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
        Router.events.on('routeChangeStart', startLoad);
        // Router.events.on('routeChangeComplete', stopLoad);
        // Router.events.on('routeChangeError', stopLoad);
      },
      [startLoad, stopLoad]
    );

    return (
      <Progress
        marginBottom={marginBottom}
        visibility={visibility}
        value={value}
        color="white"
        height="6px"
        hasStripe
        isAnimated
      />
    )
  }
);