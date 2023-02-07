import { Button, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SubmissionItem from '../../components/SubmissionItem';
import Submissions from '../../components/Submissions';
import { getPastChallenges } from '../../redux/features/challengeSlice';
import Challenge from './Challenge';

export default function Explore() {

    const dispatch = useDispatch();
    const { pastChallenges } = useSelector((state) => ({ ...state.ChallengeReducer }));

    useEffect(() => {
        dispatch(getPastChallenges());
    }, [])

    return (
        <Container>
            <Typography my={3} variant='h5' fontWeight={'bold'} textAlign='center'>Explore Past Challenges</Typography>
            <Container sx={{ backgroundColor: 'white', borderRadius: '10px', padding: '10px' }} my={3} >
                <Box >
                    {pastChallenges && pastChallenges.map((challenge) => {
                        return (
                            <Challenge key={challenge._id} challenge={challenge} />
                        )
                    })}

                </Box>
            </Container>
        </Container>
    );
}
