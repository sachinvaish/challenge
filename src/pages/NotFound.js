import { Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

export default function NotFound() {
    const navigate=useNavigate();
  return (
    <Box sx={{display:'flex', justifyContent:'center', backgroundColor:'white'}}>
        <Box fullWidth
            component = 'img'
            onClick={()=>{navigate('/home')}}
            src = 'https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-page-templates.jpg'
            sx={{cursor:'pointer'}}
        /> 
    </Box>
  );
}
