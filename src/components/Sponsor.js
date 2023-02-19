import { Box, Typography } from '@mui/material';
import React from 'react';

export default function Sponsor() {
  return (
    <>
      <Typography variant='body1' fontWeight='bold' mt={2}>Sponsored by</Typography>
      <Box component='img' width='60%' height='auto' sx={{objectFit:'contain'}} src='https://miro.medium.com/max/682/1*jMpAIoN91yjDYc7vwUsUCQ.png'/>
    </>
  );
}
