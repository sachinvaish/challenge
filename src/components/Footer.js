import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export default function Footer() {
  return (
    <Box sx={{backgroundColor:'#222222', color:'#ffffff', height:'50px', display:'flex', justifyContent:'space-between', padding:3}}>
        <Typography variant='h6'>Copyright &copy; 2022</Typography>
        <Typography variant='h6'>Developed by Sachin Vaish</Typography>
        
    </Box>
  );
}
