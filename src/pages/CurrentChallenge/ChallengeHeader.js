import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import SubmitDialog from './SubmitDialog';

export default function ChallengeHeader() {

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
      <SubmitDialog open={open} onClose={onClose} />
      <Typography variant='h6'>This week's challenge</Typography>
      <Typography variant='h4' fontWeight="bold">Food App Challenge</Typography>
      <Typography variant='p'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et, iste iusto quam distinctio nulla ipsa. Vitae aut minus neque non deleniti. Recusandae autem necessitatibus laboriosam tempore quaerat provident dicta voluptas. Reprehenderit dolore fugiat cupiditate!
      </Typography>
      <Box marginY={2} width='100%' >
        <Button variant='contained' onClick={handleClick}>Submit Design</Button>
      </Box>
    </Container>
  );
}
