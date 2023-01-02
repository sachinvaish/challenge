import React, { useEffect, useState } from 'react';
import Like from '../../components/Like';
import { Link, Box, Card, CardHeader, CardActions, Avatar, Typography, Divider, Button, TextField } from '@mui/material';
import Feedback from '../../components/Feedback';
import { useSelector, useDispatch } from 'react-redux';
import { createFeedback, FeedbackReducer, getFeedbacks } from '../../redux/features/feedbackSlice';

export default function Sidebar(props) {

    const submission = props;
    console.log('sidebar submission prop', submission);
    const {description,user_id} = props.submission;

    const {feedbacks} = useSelector((state)=>({...state.FeedbackReducer}));

    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [upvotes, setUpvotes] = useState(5);
    const [newFeedback, setNewFeedback] = useState('');

    useEffect(() => {
            getUser();
    },[]);

    useEffect(()=>{
        getAllFeedbacks();
    },[feedbacks])

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

    const getAllFeedbacks = () => {
        //API call to fetch feedbacks
        if(submission){
            console.log('calling from sidebar',submission.submission._id);
            dispatch(getFeedbacks(submission.submission._id));
        }
    }



    const handleFeedback = (e) => {
        console.log('handle feedback called')
        const feedback = {
            "submission_id": submission._id,
            "feedback": newFeedback
        }
        if(localStorage.getItem('authToken')){
            const authToken = localStorage.getItem('authToken');
            dispatch(createFeedback({feedback,authToken }));
            setNewFeedback("");
        }else {
            alert('please login');
        }
    }

    const onChange = (e) => {
        if(localStorage.getItem('authToken')){
            setNewFeedback(e.target.value);
        }else {
            alert('please login');
        }
        
    }

    return (
        <Card >
            {(user) ? (<>
            <Box id='card' sx={{ maxHeight: '60vh', overflow: 'auto' }}>
                <Box sx={{ display: 'flex' }} justifyContent='space-between'>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: 'primary' }} 
                            src={user.photo_url} 
                            aria-label="recipe">
                            </Avatar>
                        }
                        title={
                            <Link variant="h6" onClick={() => { alert('taking you to user profile'); }} sx={{ cursor: 'pointer', textDecoration: 'none', color: 'black' }} >
                                {user.name?user.name:user.username}
                            </Link>
                        }
                        subheader={`${upvotes} Upvotes`}
                    />
                    <CardActions>
                        <Typography variant='h6'>{upvotes}</Typography>
                        <Like value={upvotes} method={setUpvotes} />
                    </CardActions>
                </Box>
                <Box sx={{ marginX: 2, textAlign: 'justify' }}>
                    <Typography variant='body1'>
                        {description}
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <Box>
                        <Typography variant='h6'>Feedbacks ({feedbacks.length})</Typography>
                        {feedbacks.map((x) => {
                            return (
                                <Feedback key={x._id} feedback={x.feedback} date={x.date} />
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
                    <Button disabled={ newFeedback === ''} onClick={handleFeedback} variant='contained'>Post</Button>
                </Box>
            </Box>
            </>):'Please wait'}
        </Card>
    )
}
