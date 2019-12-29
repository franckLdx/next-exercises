import React, { useContext } from 'react'
import 'gestalt/dist/gestalt.css';
import { NextPage } from 'next';
import AppHead from '../components/AppHead'
import { Box } from 'gestalt';
import { ThemeContext } from 'styled-components';

const Index: NextPage = () => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <AppHead />
      <Box {...theme.box}>HELLO</Box>
    </>
  );
};

export default Index;