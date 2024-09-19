import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './ui/Navigation';
import { Box } from '@chakra-ui/react';

export const Root = () => {
  return (
    <Box>
      <Navigation />
      <Outlet />
    </Box>
  );
};
