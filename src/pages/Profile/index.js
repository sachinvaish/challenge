import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import UserInfo from './UserInfo';
import Submissions from '../../components/Submissions';
import { useDispatch, useSelector } from 'react-redux';
import { getSubmissions } from '../../redux/features/submissionSlice';

export default function Profile() {

  const dispatch = useDispatch();
  const {isLoggedIn, error, user } = useSelector((state) => ({ ...state.UserReducer }));   
  const {submissions} = useSelector((state)=>({...state.SubmissionReducer}));
  const challenge_id = '63748a4dfcc73c064df4c744'; 

  useEffect(() => {
    dispatch(getSubmissions(challenge_id));
  }, []);

  return (
    <>
      <Box m={4}>
        <Grid container>
          <Grid item md={3}>
              {user && <UserInfo user={user}/>}
          </Grid>
          <Grid item md={9}>
          {(submissions && submissions.length > 0) && (<>
            <Box sx={{ marginX:'10px', display: 'flex',  justifyContent: 'space-between' }}>
                <Grid container>
                    <Submissions sm={12} md={12} lg={6} challenge_id={challenge_id} submissions={submissions} />
                </Grid>
            </Box>
            </>)}
            {(submissions && submissions.length < 1) && <Typography textAlign='center' py={30} variant='h5'>No Submissions to Display</Typography>}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
