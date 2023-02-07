import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import SubmissionItem from '../../components/SubmissionItem';
import Submissions from '../../components/Submissions';
import { getSubmissions } from '../../redux/features/submissionSlice';

export default function Challenge(props) {
    const { challenge } = props;
    const [submissions,setSubmissions]=useState(null);
    const navigate =useNavigate();

    useEffect(() => {
        if (challenge) {
            getSubmissionsByChallengeId(challenge._id)
        }
    }, [challenge])

    const getSubmissionsByChallengeId=(challenge_id)=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/submissions/contest/${challenge_id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            }
        }).then((res) => res.json()
        ).then((res) => setSubmissions(res)
        ).catch((error) => error)
    }

    return (
        <>
            <Box sx={{ display: 'flex', marginY: 3 }}>
                <Typography mr={2} variant="h6">{challenge.title}</Typography>
                <Button size='small' variant='outlined' onClick={()=>navigate(`/challenge/${challenge._id}`)}>View All Submissions</Button>
            </Box>
            <Box my={1}>
                {(submissions && submissions.length > 0) && (<>
                    <Box sx={{ backgroundColor: 'white', borderRadius: '20px', padding: '10px' }}>
                        <Grid container>
                            <Submissions limit={3} sm={12} md={6} lg={4} challenge_id={challenge._id} submissions={submissions} />
                        </Grid>
                    </Box>
                </>)}
                {(submissions && submissions.length < 1) && <Typography textAlign='center' p={10} variant='h5'>No Submissions to Display</Typography>}
            </Box>
        </>
    );
}
