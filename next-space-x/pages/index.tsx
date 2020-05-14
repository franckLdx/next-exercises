import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import { Text } from "@chakra-ui/core/";
import { getLaunchesUrl } from '@lib/url';

const Home: React.FC = () => {
  const router = useRouter()
  useEffect(() => {
    router.push(getLaunchesUrl())
  });

  return <Text>
    Loading, Please wait...
  </Text>;
}

export default Home;