import React, { useEffect } from 'react';
import { useRouter } from 'next/router'

const Home: React.FC = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/launches')
  });

  return <>
    Loading, Please wait...
  </>;
}

export default Home;