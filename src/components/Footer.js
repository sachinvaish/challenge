import { Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
  return (
    <Box sx={{backgroundColor:'#222222', color:'#ffffff', height:'120px', display:'flex', justifyContent:'space-between', padding:5}}>
        <Typography variant='h6'>Copyright &copy; 2023</Typography>
        <Box>
          <Typography variant='h6'>Developed by Sachin Vaish</Typography>
          <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <Link href='https://in.linkedin.com/in/sachin-vaish' color='#ffffff' target='_blank'><LinkedInIcon /></Link>
                <Link href='https://github.com/sachinvaish' color='#ffffff' target='_blank'><GitHubIcon /></Link>
                <Link href='https://www.behance.net/sachinvaish' color='#ffffff' target='_blank'>Be</Link>
                <Link href='https://www.instagram.com/sachin_vaish/' color='#ffffff' target='_blank'><InstagramIcon /></Link>
              <Link href='https://www.facebook.com/sachin.vaish0/' color='#ffffff' target='_blank'><FacebookRoundedIcon /></Link>
          </Box>
        </Box>
        
    </Box>
  );
}
