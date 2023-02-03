import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import SubmitDialog from './SubmitDialog';

export default function ChallengeHeader(props) {
  const {challenge}=props;
  const [open, setOpen] = useState(false);  
  const onClose = () => {
    setOpen(false);
  }

  const handleClick = ()=>{
    if(localStorage.getItem('authToken'))
      setOpen(true);
    else
      alert('please login');
  }

  return (
    <Container sx={{ marginY: '30px', textAlign: 'center', alignItems: 'center', width: '70%' }}>
      <SubmitDialog open={open} onClose={onClose} challenge_id={challenge._id} />
      <Typography variant='h6'>This week's challenge</Typography>
      <Typography variant='h4' fontWeight="bold">{challenge.title}</Typography>
      <Typography variant='p'>{challenge.description}</Typography>
      <Box marginY={2} width='100%' >
        <Button variant='contained' onClick={handleClick}>Submit Design</Button>
      </Box>
    </Container>
  );
}
