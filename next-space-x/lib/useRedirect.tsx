import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export function useRedirect(href: string) {
  const router = useRouter()
  useEffect(() => {
    router.push(href)
  });
}