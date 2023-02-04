import { Box, Card, CardHeader, CardActions, Avatar, Link, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import GetTimeFormat from './GetTimeFormat';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Like from './Like';
import { useDispatch, useSelector } from 'react-redux';
import { getChallengeByID } from '../redux/features/challengeSlice';

export default function Feedback(props) {

    const { feedback, _id, date, user_id, submission_id } = props.feedback;
    const { challenge_id } = props;
    // console.log('inside feedback component',feedback);
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const { loading, challenge } = useSelector((state) => ({ ...state.ChallengeReducer }))
    // console.log('challenge', challenge);

    useEffect(() => {
        getUser();
        dispatch(getChallengeByID(challenge_id))
    }, []);

    const getUser = async () => {
        try {
            const user = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user_id}`);
            const res = await user.json();
            // console.log('Got user detail :',res);
            setUser(res);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Box sx={{ marginY: 3 }}>
            <Box sx={{ display: 'flex', spacing: '2' }} >
            <Avatar sx={{ width: '30px', height: '30px' }} src={user.photo_url && `${process.env.REACT_APP_BACKEND_URL}/uploads/profile/${user.photo_url}`}>
                    {user.name && (user.username).charAt(0).toUpperCase()}
                </Avatar>
                <Link marginX={1} variant="h6" onClick={() => { alert('taking you to user profile'); }} sx={{ fontSize: '16px', cursor: 'pointer', textDecoration: 'none', color: 'black' }} >
                    {user.name?user.name:user.username}
                </Link>
                {challenge && (challenge.feedback_winner_id === _id && <EmojiEventsIcon sx={{ color: '#E8AF0E' }} />)}
            </Box>
            <Box sx={{ marginY: 1, textAlign: 'left' }}>
                <Typography variant='p' sx={{whiteSpace:'pre-wrap'}}>
                    {feedback}
                </Typography>
            </Box>
            <Typography variant='p' sx={{ fontSize: 12, color: 'grey' }}><GetTimeFormat countDownDate={date} /></Typography>
        </Box>
    );
}
