import { Avatar, Container, Typography } from '@mui/material';
import { Stack} from '@mui/system';
import React from 'react';
import SubmissionItem from './SubmissionItem';

export default function Submissions() {
  return (
    <Container sx={{marginTop : '50px'}}>
      <Stack direction='row' sx={{display:'flex', flexWrap:'wrap'}}>
        <SubmissionItem/>
        <SubmissionItem/>
        <SubmissionItem/>
        <SubmissionItem/>
        <SubmissionItem/>
        <SubmissionItem/>
      </Stack>
    </Container>
  );
}
