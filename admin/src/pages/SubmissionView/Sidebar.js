import React, { useEffect, useState } from 'react';
import Like from '../../components/Like';
import { Link, Box, Card, CardHeader, CardActions, Avatar, Typography, Divider, Button, TextField } from '@mui/material';
import Feedback from '../../components/Feedback';
import { useSelector, useDispatch } from 'react-redux';
import { createFeedback, getFeedbacks } from '../../redux/services/feedbackSlice';
import { useNavigate } from 'react-router';
import { getChallengeByID } from '../../redux/services/challengeSlice';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function Sidebar(props) {
    const host = process.env.REACT_APP_BACKEND_URL;
    const submission = props.submission;
    const { description, user_id , _id, challenge_id} = props.submission;
    const { feedbacks } = useSelector((state) => ({ ...state.FeedbackReducer }))
    const { loading, challenge } = useSelector((state) => ({ ...state.ChallengeReducer }))

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [newFeedback, setNewFeedback] = useState('');

    useEffect(() => {
        getUserByID(user_id);
        getAllFeedbacks();
        dispatch(getChallengeByID(challenge_id))
    }, [submission])

    const getUserByID = async (user_id) => {
        try {
            const user = await fetch(`${host}/users/${user_id}`);
            const res = await user.json();
            // console.log('Got user detail :',res);
            setUser(res);
        } catch (error) {
            console.log(error);
        }

    }

    const getAllFeedbacks = () => {
        //API call to fetch feedbacks
        if (submission) {
            // console.log('calling from sidebar', submission._id);
            dispatch(getFeedbacks(submission._id));
        }
    }

    const handleFeedback = (e) => {
        console.log('handle feedback called', submission._id)
        const feedback = {
            "submission_id": submission._id,
            "feedback": newFeedback
        }
        if (localStorage.getItem('authToken')) {
            const authToken = localStorage.getItem('authToken');
            dispatch(createFeedback({ feedback, authToken }));
            setNewFeedback("");
            getAllFeedbacks();
        } else {
            alert('please login');
        }
    }

    const onChange = (e) => {
        if (localStorage.getItem('authToken')) {
            setNewFeedback(e.target.value);
        } else {
            alert('please login');
        }

    }

    return (
        <Card >
            {(user && feedbacks) ? (<>
                <Box id='card' sx={{ maxHeight: '60vh', overflow: 'auto' }}>
                    <Box sx={{ display: 'flex' }} justifyContent='space-between'>
                        <CardHeader
                            avatar={
                                <Avatar sx={{width:'50px', height:'50px' }} src={user.photo_url && `${host}/uploads/profile/${user.photo_url}`}>
                                     {(user.username).charAt(0).toUpperCase()}
                                </Avatar>
                            }
                            title={
                                <>
                                <Link variant="h6" onClick={() => { navigate(`/profile/${user._id}`) }} sx={{ cursor: 'pointer', textDecoration: 'none', color: 'black' }} >
                                    {user.name ? user.name : user.username}
                                </Link>
                                {challenge && (challenge.first_winner_id === _id ? <EmojiEventsIcon sx={{ color: '#E8AF0E' }} /> : ((challenge.second_winner_id === _id) && <EmojiEventsIcon sx={{ color: '#C6CBCD' }} />))}
                                </>
                            }
                            subheader={`@${user.username}`}
                        />
                        <CardActions>
                            <Like submission_id={_id} />
                        </CardActions>
                    </Box>
                    <Box sx={{ marginX: 2, textAlign: 'justify' }}>
                        <Typography variant='body1'>
                            {description}
                        </Typography>
                        <Divider sx={{ marginY: 1 }} />
                        <Box>
                            <Typography variant='h6'>Feedbacks ({feedbacks.length})</Typography>
                            {feedbacks.map((feedback) => {
                                return (
                                    <Feedback key={feedback._id} feedback={feedback} challenge_id={challenge_id} />
                                )
                            })}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ margin: 2, position: 'sticky', index: '-1' }}>
                    <TextField
                        multiline
                        name='feedback'
                        value={newFeedback}
                        onChange={onChange}
                        rows={4}
                        aria-label="maximum height"
                        placeholder="Start typing to leave feedback"
                        style={{ width: '100%', position: 'sticky', marginBottom: '0' }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1 }}>
                        <Button disabled={newFeedback === ''} onClick={handleFeedback} variant='contained'>Post</Button>
                    </Box>
                </Box>
            </>) : 'Please wait'}
        </Card>
    )
}
