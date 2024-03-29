import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Submissions from '../../components/Submissions';
import Header from './Header';
import empty from '../../assets/empty.png';
import { getSubmissions } from '../../redux/services/submissionSlice';
import { useParams } from 'react-router';
import { getChallengeByID } from '../../redux/services/challengeSlice';

export default function ChallengeDetail() {
    const { challengeID } = useParams();
    const dispatch = useDispatch();
    const { challenge } = useSelector((state) => ({ ...state.ChallengeReducer }));
    const { submissions } = useSelector((state) => ({ ...state.SubmissionReducer }));

    useEffect(() => {
        if (challengeID) {
            dispatch(getChallengeByID(challengeID));
            dispatch(getSubmissions(challengeID));
        }
    }, [challengeID]);

    return (
        <>
            {challenge && <Header challenge={challenge} submissionCount={submissions && submissions.length} />}
            {(submissions && submissions.length > 0) && (<>
                <Box sx={{ backgroundColor: 'white', borderRadius: '20px', padding: '10px' }}>
                    <Grid container>
                        <Submissions sm={12} md={6} lg={4} challengeID={challengeID} submissions={submissions} />
                    </Grid>
                </Box>
            </>)}
            {(submissions && submissions.length < 1) && <Typography textAlign='center' p={10} variant='h5'>No Submissions to Display</Typography>}
        </>
    );
}