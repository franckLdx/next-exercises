import React from 'react';
import Head from 'next/head'


interface Props {
  title: string;
}

export const MyHead: React.FC<Props> = ({ title: name }) => <Head><title>Space X - {name}</title></Head>