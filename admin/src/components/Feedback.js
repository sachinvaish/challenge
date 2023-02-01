import { Box, Card, CardHeader, CardActions, Avatar, Link, Typography, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
// import LoadingButton from '@mui/lab/LoadingButton';
import Like from './Like';
import { setFeedbackWinner } from '../redux/services/challengeSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Feedback(props) {

    const { feedback, _id, date, user_id, submission_id } = props.feedback;
    const { challenge_id } = props;
    // console.log('inside feedback component',feedback);
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const {loading}=useSelector((state)=>({...state.ChallengeReducer}))

    useEffect(() => {
        getUser();
    }, []);

    const setWinner = (id) => {
        localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmM0ODk1MzRlODgyYzNkYWVkYWUxNSIsImlhdCI6MTY3NDk4ODc1NH0.mkRVETiwv732v15w2ablF3APWZCXQxRPihzTnltr1jg')
        const authToken = localStorage.getItem('authToken');
        const newChallenge = {
            "id": challenge_id,
            "feedback_winner_id": id
        }
        console.log('feedback winner called');
        dispatch(setFeedbackWinner({ newChallenge, authToken }));
    }

    const getUser = async () => {
        try {
            const user = await fetch(`http://localhost:5000/users/${user_id}`);
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
                <Avatar sx={{ bgcolor: 'primary', height: '30px', width: '30px' }} src={user.photo_url} aria-label="recipe"></Avatar>
                <Link marginX={1} variant="h6" onClick={() => { alert('taking you to user profile'); }} sx={{ fontSize: '16px', cursor: 'pointer', textDecoration: 'none', color: 'black' }} >
                    {user.name ? user.name : user.username}
                </Link>
            </Box>
            <Box sx={{ marginY: 1, textAlign: 'left' }}>
                <Typography variant='p'>
                    {feedback}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='p' sx={{ fontSize: 12, color: 'grey' }}>{date}</Typography>
                <Button size='small' onClick={()=>setWinner(_id)}>Set Winner</Button>
                {/* <LoadingButton
                    size="small"
                    onClick={()=>setWinner(_id)}
                    loading={loading}
                    loadingIndicator="Setting..."
                    variant="outlined"
                >
                    <span>Set Winner</span>
                </LoadingButton> */}
            </Box>
        </Box>
    );
}
