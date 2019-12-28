import React from 'react'
import 'gestalt/dist/gestalt.css';
import { NextPage } from 'next';
import AppHead from '../components/AppHead'
import { Box } from 'gestalt';

const Index: NextPage = () => (
  <>
    <AppHead />
    <Box shape="rounded" color="purple">HELLO</Box>
  </>
);

export default Index;