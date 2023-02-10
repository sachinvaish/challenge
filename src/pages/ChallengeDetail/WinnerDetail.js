import { Avatar, Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function WinnerDetail(props) {
    const { first_winner, second_winner, feedback_winner } = props;
    // console.log('1st :'+first_winner +'  2nd  :'+second_winner+'  feedback  :'+feedback_winner)
    const [submission, setSubmission] = useState(null);
    const [user, setUser] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (first_winner) {
            getSubmissionByID(first_winner);
        }
        if (second_winner) {
            getSubmissionByID(second_winner);
        }
        if (feedback_winner) {
            getFeedbackByID(feedback_winner)
        }
    }, [])

    useEffect(() => {
        if (submission) {
            getUserByID(submission.user_id);
        }
    }, [submission])

    useEffect(() => {
        if (feedback) {
            getUserByID(feedback.user_id);
        }
    }, [feedback])

    const getUserByID = async (user_id) => {
        try {
            const user = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/id/${user_id}`);
            const res = await user.json();
            // console.log('Got user detail :',res);
            setUser(res);
        } catch (error) {
            console.log(error);
        }
    }

    const getFeedbackByID = async (id) => {
        try {
            const feedback = await fetch(`${process.env.REACT_APP_BACKEND_URL}/feedbacks/id/${id}`);
            const res = await feedback.json();
            setFeedback(res);
        } catch (error) {
            console.log(error);
        }
    }

    const getSubmissionByID = async (id) => {
        try {
            // console.log('inside getSubmission by ID');
            const submission = await fetch(`${process.env.REACT_APP_BACKEND_URL}/submissions/${id}`);
            const res = await submission.json();
            setSubmission(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {(first_winner && user) && (<>
                <Avatar sx={{ width: 50, height: 50 }} src={user.photo_url && `${process.env.REACT_APP_BACKEND_URL}/uploads/profile/${user.photo_url}`}>{(user.username).charAt(0).toUpperCase()}</Avatar>
                <Box textAlign='left'>
                    <Typography fontWeight='bold' vairant='h6' color='primary'>{user && user.name}</Typography>
                    <Typography variant='body2' sx={{fontWeight:'bold', cursor:'pointer'}} onClick={() => navigate(`/submission/${submission._id}`)}>View Submission</Typography>
                </Box>
            </>)}

            {(second_winner && user) && (<>
                <Avatar sx={{ width: 50, height: 50 }} src={user.photo_url && `${process.env.REACT_APP_BACKEND_URL}/uploads/profile/${user.photo_url}`}>{(user.username).charAt(0).toUpperCase()}</Avatar>
                <Box textAlign='left'>
                    <Typography fontWeight='bold' vairant='h6' color='primary'>{user && user.name}</Typography>
                    <Typography variant='body2' sx={{fontWeight:'bold', cursor:'pointer'}} onClick={() => navigate(`/submission/${submission._id}`)}>View Submission</Typography>
                </Box>
            </>)}

            {(feedback_winner && user) && (<>
                <Avatar sx={{ width: 50, height: 50 }} src={user.photo_url && `${process.env.REACT_APP_BACKEND_URL}/uploads/profile/${user.photo_url}`}>{(user.username).charAt(0).toUpperCase()}</Avatar>
                <Box textAlign='left'>
                    <Typography fontWeight='bold' vairant='h6' color='primary'>{user && user.name}</Typography>
                    <Typography variant='body2' sx={{fontWeight:'bold', cursor:'pointer'}} onClick={() => navigate(`/submission/${feedback.submission_id}`)}>View Feedback</Typography>
                </Box>
            </>)}
        </>
    );
}
