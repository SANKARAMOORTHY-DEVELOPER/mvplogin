import Head from 'next/head';
import { Flex } from '@chakra-ui/react';

import { HeroBody } from '@components/Hero/HeroBody';

export default function Home() {
  return (
    <Flex>
      <Head>
        <title>CeloPunk Auction</title>
      </Head>
      <HeroBody />
    </Flex>
  );
}
