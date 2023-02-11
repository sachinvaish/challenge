import { Box, Paper, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Submissions from '../Submissions';
import Users from '../Users';

export default function Dashboard() {
    const host = process.env.REACT_APP_BACKEND_URL;
    const [challengeCount, setChallengeCount] = useState(0);
    const [submissionCount, setSubmissionCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [feedbackCount, setFeedbackCount] = useState(0);

    const getChallengesCount=async()=>{
        let challenges = await fetch(`${host}/challenges/`);
        let res = await challenges.json();
        setChallengeCount(res.length);
    }

    const getSubmissionsCount=async()=>{
        let submissions = await fetch(`${host}/submissions/`);
        let res = await submissions.json();
        setSubmissionCount(res.length);
    }

    const getFeedbackCount=async()=>{
        let feedbacks = await fetch(`${host}/feedbacks/`);
        let res = await feedbacks.json();
        setFeedbackCount(res.length);
    }

    const getUserCount=async()=>{
        let users = await fetch(`${host}/users/getAllUsers`,{method:'POST'});
        let res = await users.json();
        setUserCount(res.length);
    }

    useEffect(()=>{
        getChallengesCount();
        getSubmissionsCount();
        getUserCount();
        getFeedbackCount();
    },[])

    return (
        <Box>
            <Box marginY={2} width='100%' sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h4'>Dashboard</Typography>
            </Box>
            <Box sx={{display:'flex'}} gap={1}>
                <Paper sx={{width:'25%', height:'100px', padding:2, display:'flex', flexDirection:'column',alignItems:'center'}} elevation={3}>
                    <Typography variant='h3'>{challengeCount && challengeCount}</Typography>
                    <Typography variant='h5'>Challenges</Typography>
                </Paper>
                <Paper sx={{width:'25%', height:'100px', padding:2, display:'flex', flexDirection:'column',alignItems:'center'}} elevation={3}>
                    <Typography variant='h3'>{submissionCount && submissionCount}</Typography>
                    <Typography variant='h5'>Submissions</Typography>
                </Paper>
                <Paper sx={{width:'25%', height:'100px', padding:2, display:'flex', flexDirection:'column',alignItems:'center'}} elevation={3}>
                    <Typography variant='h3'>{feedbackCount && feedbackCount}</Typography>
                    <Typography variant='h5'>Feedbacks</Typography>
                </Paper>
                <Paper sx={{width:'25%', height:'100px', padding:2, display:'flex', flexDirection:'column',alignItems:'center'}} elevation={3}>
                    <Typography variant='h3'>{userCount && userCount}</Typography>
                    <Typography variant='h5'>Users</Typography>
                </Paper>
            </Box>
            <Box sx={{height:'auto'}}>
                <Users/>
            </Box>
            <Box sx={{height:'auto'}}>
                <Submissions/>
            </Box>
        </Box>
    );
}
