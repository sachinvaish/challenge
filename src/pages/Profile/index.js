import { Box, Grid } from '@mui/material';
import React from 'react';
import UserInfo from './UserInfo';
import Submissions from '../../components/Submissions';

export default function Profile() {
  return (
    <>
      <Box m={4}>
        <Grid container>
          <Grid item md={3}>
              <UserInfo/>
          </Grid>
          <Grid item md={9}>
            <Box sx={{ marginX:'10px', display: 'flex',  justifyContent: 'space-between' }}>
              <Submissions sm='12' md='12' lg='6'/>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
