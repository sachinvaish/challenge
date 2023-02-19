import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{backgroundColor:'black'}}>
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          backgroundImage: `url('https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/f02b5b89254045.5def5079903db.png')`,
          opacity: 0.3,
          position:'relative',
          backgroundSize:'cover'
        }}
      />
      <Box sx={{ position:'absolute', top:'40%', left:'auto', width:'100%'}} textAlign='center' alignContent='center'>
      <Outlet />
          <Typography variant="h6" sx={{color:'white'}}> Welcome to DigiFinch</Typography>
          <Typography variant='h4' sx={{color:'white'}}>Participate in Design Challenges & Win Exciting Prizes</Typography>
          <Typography variant='h3' sx={{color:'white'}} fontWeight='bold'>Every Week !</Typography>
          <Button variant='contained' size='large' sx={{mt:5}} onClick={()=>{navigate('/home')}}>See last week's Challenge</Button>
      </Box>
    </Box>
  );
}
