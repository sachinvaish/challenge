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
                    {pastChallenges.length > 0  ? pastChallenges.map((challenge) => {
                        return (
                            <Challenge key={challenge._id} challenge={challenge} />
                        )
                    }) :
                        <Box sx={{ width: '500px', height: '75vh' }} textAlign='center' py={'15%'} m={'auto'}>
                            <Typography variant='h3' fontWeight='bold'>Sorry!!!</Typography>
                            <Typography variant='h5'>No challenges available</Typography>
                            <Typography variant='h6'>Stay tuned...</Typography>
                        </Box>
                    }

                </Box>
            </Container>
        </Container>
    );
}
