import React, { useEffect, useState } from 'react';
import Like from '../../components/Like';
import { Link, Box, Card, CardHeader, CardActions, Avatar, Typography, Divider, Button, TextField } from '@mui/material';
import Feedback from '../../components/Feedback';
import { useSelector, useDispatch } from 'react-redux';
import { addFeedback } from '../../redux/actions';

export default function Sidebar(props) {

    const submission = props;
    const {description,user_id} = props.submission;

    const feedbacks = [
        {
            "submission_id": "63749eca6057278e2f24b74a",
            "user_id": "637473c9b93c78059660ccdc",
            "feedback": "This is nice DESIGN",
            "_id": "642f38b90378df8748e1",
            "date": "2022-12-10T02:27:31.674Z"
        }
    ];
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [upvotes, setUpvotes] = useState(5);
    const [newFeedback, setNewFeedback] = useState([]);

    useEffect(() => {
            getUser();
    }, []);

    const getUser = async () => {
        try {
            const user = await fetch(`http://localhost:5000/users/${user_id}`);
            const res = await user.json();
            console.log('Got user detail :',res);
            setUser(res);
        } catch (error) {
            console.log(error);
        }
        
    }

    const getFeedbacks = () => {
        //API call to fetch feedbacks
        // setFeedbacks(3);
    }



    const handleFeedback = (e) => {
        console.log('handle feedback called')
        // const feedbackObject = {
        //     "submission_id": "63449ecr6057278e2f24b74a",
        //     "user_id": "637473c9b93c78059660ccdc",
        //     "feedback": newFeedback,
        //     "_id": Math.random(),
        //     "date": "2022-12-10T03:27:31.674Z"
        // }
        // dispatch(addFeedback(feedbackObject));
        // setNewFeedback("");
    }

    const onChange = (e) => {
        setNewFeedback(e.target.value);
    }

    return (
        <Card >
            {(user) ? (<>
            <Box id='card' sx={{ maxHeight: '60vh', overflow: 'auto' }}>
                <Box sx={{ display: 'flex' }} justifyContent='space-between'>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: 'primary' }} 
                            // src={user.photo_url} 
                            aria-label="recipe">
                            </Avatar>
                        }
                        title={
                            <Link variant="h6" onClick={() => { alert('taking you to user profile'); }} sx={{ cursor: 'pointer', textDecoration: 'none', color: 'black' }} >
                                {user.name}
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
                    <Button onClick={handleFeedback} variant='contained'>Post</Button>
                </Box>
            </Box>
            </>):'Please wait'}
        </Card>
    )
}
