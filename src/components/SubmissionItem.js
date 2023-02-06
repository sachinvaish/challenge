import { Link, Card, CardMedia, Typography, CardHeader, CardActions, Avatar, Box, } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Like from './Like';
import { useNavigate } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useDispatch, useSelector } from 'react-redux';
import { getChallengeByID } from '../redux/features/challengeSlice';
// import {getSubmissionByID} from '../redux/features/submissionSlice';

export default function SubmissionItem(props) {

    const { _id, challenge_id, user_id, photo_url, description } = props.submission;
    const { loading, challenge } = useSelector((state) => ({ ...state.ChallengeReducer }))
    // console.log(_id, challenge_id, user_id, photo_url, description)
    const [feedbackCount, setFeedbackCount] = useState(0);
    const [user, setUser] = useState({});
    const [upvotes, setUpvotes] = useState(5);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getUserByID();
        getFeedbacksBySubmissionID();
        dispatch(getChallengeByID(challenge_id))
}, []);


const getUserByID = async () => {
    try {
        const user = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/id/${user_id}`);
        const res = await user.json();
        // console.log('Got user detail :',res);
        setUser(res);
    } catch (error) {
        console.log(error);
    }
    
}

    const getFeedbacksBySubmissionID = async() => {
        //API CALL to get feedbacks on particular submission id /getfeedbackscount/id
        let count = await fetch(`${process.env.REACT_APP_BACKEND_URL}/feedbacks/getfeedbackscount/${_id}`,{
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
                image={`${process.env.REACT_APP_BACKEND_URL}/uploads/submissions/${photo_url}`}
                alt="submission"
            />
            <Box sx={{ display: 'flex' }} justifyContent='space-between'>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'primary' }} src={user.photo_url && `${process.env.REACT_APP_BACKEND_URL}/uploads/profile/${user.photo_url}`} aria-label="recipe">

                        </Avatar>
                    }
                    title={
                        <Box sx={{ display: 'flex', alignItems:'center' }}>
                        <Link variant="h6" onClick={() => { navigate(`/profile/${user.username}`) }} sx={{ cursor: 'pointer', textDecoration: 'none', color: 'black' }} >
                            {user.name?user.name:user.username}
                        </Link>
                        {challenge && (challenge.first_winner_id === _id ? <EmojiEventsIcon sx={{ color: '#E8AF0E', ml:1 }} /> : ((challenge.second_winner_id === _id) && <EmojiEventsIcon sx={{ color: '#C6CBCD', ml:1  }} />))}
                        </Box>
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
