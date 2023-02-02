import { Box, Card, CardHeader, CardActions, Avatar, Link, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Like from './Like';

export default function Feedback(props) {

    const { feedback, date, user_id } = props.feedback;
    // console.log('inside feedback component',feedback);
    const [user, setUser] = useState({});

    useEffect(() => {
        getUser();
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
                <Avatar sx={{ bgcolor: 'primary', height: '30px', width: '30px' }} src={user.photo_url} aria-label="recipe"></Avatar>
                <Link marginX={1} variant="h6" onClick={() => { alert('taking you to user profile'); }} sx={{ fontSize: '16px', cursor: 'pointer', textDecoration: 'none', color: 'black' }} >
                    {user.name?user.name:user.username}
                </Link>
            </Box>
            <Box sx={{ marginY: 1, textAlign: 'left' }}>
                <Typography variant='p'>
                    {feedback}
                </Typography>
            </Box>
            <Typography variant='p' sx={{ fontSize: 12, color: 'grey' }}>{date}</Typography>
        </Box>
    );
}
