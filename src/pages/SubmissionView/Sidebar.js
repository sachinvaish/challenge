import React, { useEffect, useState } from 'react';
import Like from '../../components/Like';
import { Link, Box, Card, CardHeader, CardActions, Avatar, Typography, Divider, Button, TextField } from '@mui/material';
import Feedback from '../../components/Feedback';
import { useSelector, useDispatch } from 'react-redux';
import { addFeedback } from '../../redux/actions';

export default function Sidebar() {

    const feedbacks = useSelector((state) => state.handleFeedbacks);
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const [upvotes, setUpvotes] = useState(5);
    const [newFeedback, setNewFeedback] = useState([]);

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
        //API call to fetch feedbacks
        // setFeedbacks(3);
    }



    const handleFeedback = (e) => {
        const feedbackObject = {
            "submission_id": "63449ecr6057278e2f24b74a",
            "user_id": "637473c9b93c78059660ccdc",
            "feedback": newFeedback,
            "_id": Math.random(),
            "date": "2022-12-10T03:27:31.674Z"
        }
        dispatch(addFeedback(feedbackObject));
        setNewFeedback("");
    }

    const onChange = (e) => {
        setNewFeedback(e.target.value);
    }

    return (
        <Card >
            <Box id='card' sx={{ maxHeight: '60vh', overflow: 'auto' }}>
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
                        subheader={`${upvotes} Upvotes`}
                    />
                    <CardActions>
                        <Typography variant='h6'>{upvotes}</Typography>
                        <Like value={upvotes} method={setUpvotes} />
                    </CardActions>
                </Box>
                <Box sx={{ marginX: 2, textAlign: 'justify' }}>
                    <Typography variant='body1'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore similique magnam asperiores eius nobis illum aliquam quis, porro repellendus in cum adipisci ipsum velit? Autem obcaecati vel velit aliquid, earum porro quidem iste hic repellat rerum exercitationem, rem ab commodi corporis corrupti voluptatum illo laborum!
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
        </Card>
    )
}
