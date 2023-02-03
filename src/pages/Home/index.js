import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Submissions from '../../components/Submissions';
import Header from './Header';
import empty from '../../assets/empty.png';
import { getSubmissions } from '../../redux/features/submissionSlice';

export default function Home() {

    const dispatch = useDispatch();
    const {submissions} = useSelector((state)=>({...state.SubmissionReducer}))
    const challenge_id = '63748a4dfcc73c064df4c744'; 

    useEffect(() => {
        dispatch(getSubmissions(challenge_id));
        // dispatch(getAllChallenges());
      }, []);

    return (
        <Container >
            <Header />
            {(submissions && submissions.length > 0) && (<>
            <Box sx={{ backgroundColor: 'white', borderRadius: '20px', padding: '10px' }}>
                <Grid container>
                    <Submissions sm={12} md={6} lg={4} challenge_id={challenge_id} submissions={submissions} />
                </Grid>
            </Box>
            </>)}
            {(submissions && submissions.length < 1) && <Typography textAlign='center' p={10} variant='h5'>No Submissions to Display</Typography>}
        </Container>
    );
}