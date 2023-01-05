import { Link, Card, CardMedia, Typography, CardHeader, CardActions, Avatar, Box, } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Like from './Like';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import {getSubmissionByID} from '../redux/features/submissionSlice';

export default function SubmissionItem(props) {

    const { _id, challenge_id, user_id, photo_url, description } = props.submission;
    // console.log(_id, challenge_id, user_id, photo_url, description)
    const [feedbackCount, setFeedbackCount] = useState(0);
    const [user, setUser] = useState({});
    const [upvotes, setUpvotes] = useState(5);
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    useEffect(() => {
        getUser();
        getFeedbacks();
}, []);

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

    const getFeedbacks = async() => {
        //API CALL to get feedbacks on particular submission id /getfeedbackscount/id
        let count = await fetch(`http://localhost:5000/feedbacks/getfeedbackscount/${_id}`,{
            method:'GET',
            headers : {
                'Content-type':'application/json'
            }
        });
        count = await count.json();
        setFeedbackCount(count.count);
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
                            {user.name?user.name:user.username}
                        </Link>
                    }
                    subheader={`${feedbackCount} Feedbacks`}
                    
                />
                <CardActions>
                    <Like submission_id={_id} />
                </CardActions>
            </Box>
        </Card>
    );
}
