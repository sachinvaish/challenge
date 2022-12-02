import { Box, Card, CardHeader, CardActions, Avatar, Link, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Like from './Like';

export default function Feedback() {

    const [user, setUser] = useState({});

    useEffect(() => {
        return () => {
            getUser();
        };
    }, []);

    const getUser = async () => {
        //API CALL to get user detail by id "user_id"
        const user = {
            "_id": "638571ffeb46180810f71b8c",
            "name": "Sachin Tichkule",
            "email": "ayushiS@gmail.com",
            "photo_url": "https://cdn.dribbble.com/users/2991839/avatars/normal/75401ee4f1064e57338608b2b4dcca74.jpeg?1546345177",
            "portfolio_url": "https://behance.net/sachinvaish",
            "instagram_url": "sachin_vaish",
            "date": "2022-11-29T02:44:15.465Z",
            "__v": 0
        }
        console.log('parsing data');
        // const parsedData = await JSON.parse(user);
        // console.log('parsed data');
        // console.log(parsedData);
        setUser(user);
    }

    return (
        <Box sx={{ marginY: 2 }}>
            <Box sx={{ display: 'flex', spacing: '2' }} >
                <Avatar sx={{ bgcolor: 'primary', height: '30px', width: '30px' }} src={user.photo_url} aria-label="recipe"></Avatar>
                <Link marginX={1} variant="h6" onClick={() => { alert('taking you to user profile'); }} sx={{ fontSize: '16px', cursor: 'pointer', textDecoration: 'none', color: 'black' }} >
                    {user.name}
                </Link>
            </Box>
            <Box sx={{ marginY: 1, textAlign: 'left' }}>
                <Typography variant='p'>
                    nice Design
                </Typography>
            </Box>
            <Typography variant='p' sx={{ fontSize: 12, color: 'grey' }}>Posted 10 mins ago</Typography>
        </Box>
    );
}
