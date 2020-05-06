import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import { getLaunchesUrl } from '../lib/url';
import { Text } from "@chakra-ui/core/";

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