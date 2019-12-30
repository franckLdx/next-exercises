import React from 'react';
import { Spinner, Box } from 'gestalt';

export default () => {
  return (
    <Box display="flex" direction="column" alignItems="center">
      <Box marginBottom={2}>Please wait while getting data from github</Box>
      <Spinner show={true} accessibilityLabel="Data loading..." />
    </Box>
  );
}