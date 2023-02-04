import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Submissions from '../../components/Submissions';
import Header from './Header';
import empty from '../../assets/empty.png';
import { getSubmissions } from '../../redux/features/submissionSlice';
import { getLastChallenge } from '../../redux/features/challengeSlice';

export default function Home() {

    const dispatch = useDispatch();
    const {submissions} = useSelector((state)=>({...state.SubmissionReducer}));
    const {lastChallenge}= useSelector((state)=>({...state.ChallengeReducer}))

    useEffect(() => {
        dispatch(getLastChallenge());
      }, []);

      useEffect(()=>{
        if(lastChallenge){
            dispatch(getSubmissions(lastChallenge._id));
        }
      },[lastChallenge])

    return (
        <Container >
            {lastChallenge && <Header challenge={lastChallenge}/>}
            {(submissions && submissions.length > 0) && (<>
            <Box sx={{ backgroundColor: 'white', borderRadius: '20px', padding: '10px' }}>
                <Grid container>
                    <Submissions sm={12} md={6} lg={4} challenge_id={lastChallenge._id} submissions={submissions} />
                </Grid>
            </Box>
            </>)}
            {(submissions && submissions.length < 1) && <Typography textAlign='center' p={10} variant='h5'>No Submissions to Display</Typography>}
        </Container>
    );
}