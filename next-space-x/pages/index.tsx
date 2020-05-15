import React from 'react';
import { Text } from "@chakra-ui/core/";
import { getLaunchesUrl } from '@lib/url';
import { useRedirect } from '@lib/useRedirect';

const Home: React.FC = () => {
  useRedirect(getLaunchesUrl())
  return (
    <Text>
      Loading, Please wait...
    </Text>
  );
}

export default Home;