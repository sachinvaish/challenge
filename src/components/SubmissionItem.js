import { Link, Card, CardMedia, Typography, CardHeader, CardActions, Avatar, Box, } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Like from './Like';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import {getSubmissionByID} from '../redux/features/submissionSlice';

export default function SubmissionItem(props) {

    const { _id, challenge_id, user_id, photo_url, description } = props.submission;
    // console.log(_id, challenge_id, user_id, photo_url, description)
    const [feedbackCount, setFeedbackCount] = useState(5);
    const [user, setUser] = useState({});
    const [upvotes, setUpvotes] = useState(5);
    const navigate = useNavigate();
    // const dispatch = useDispatch();

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
        // const parsedData = await JSON.parse(user);
        // console.log('parsed data');
        // console.log(parsedData);
        setUser(user);
    }

    const getFeedbacks = () => {
        //API CALL to get feedbacks on particular submission id
        setFeedbackCount(4);
    }


    return (
        <Card sx={{minWidth:'340px', width: 'auto', height: 'auto', color: 'black', margin: 1.5 }} >
            <CardMedia
                onClick={() => { 
                    // dispatch(getSubmissionByID(_id));
                    navigate(`/submission/${_id}`); 
                }}
                sx={{cursor:'pointer', objectFit:'cover', aspectRatio: '4/3'}}
                component="img"
                height="auto"
                width='auto'
                image={`http://localhost:5000/uploads/submissions/${photo_url}`}
                alt="submission"
            />
            <Box sx={{ display: 'flex' }} justifyContent='space-between'>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'primary' }} src={user.photo_url} aria-label="recipe">

                        </Avatar>
                    }
                    title={
                        <Link variant="h6" onClick={() => { alert('taking you to user profile'); }} sx={{ cursor: 'pointer', textDecoration: 'none', color: 'black' }} >
                            {user.name}
                        </Link>
                    }
                    subheader={`${feedbackCount} Feedbacks`}
                    
                />
                <CardActions>
                    <Typography variant='h6'>{upvotes}</Typography>
                    <Like value={upvotes} method={setUpvotes} />
                </CardActions>
            </Box>
        </Card>
    );
}
