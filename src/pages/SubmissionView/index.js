import { Link, Box, Container, Grid, Card, CardHeader, CardActions, Avatar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Like from '../../components/Like';

export default function SubmissionView() {

    const [user, setUser] = useState({});
    const [upvotes, setUpvotes] = useState(5);

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
        <Box sx={{ marginTop: 3, padding: 3 }}>
            <Grid container spacing={2}>
                <Grid item md={8.5}>
                    <Box
                        component='img'
                        src='https://img.freepik.com/free-vector/travel-app-screens-interface-design_23-2148602411.jpg?w=2000'
                        maxWidth='100%'
                        padding={0}
                    >
                    </Box>
                </Grid>
                <Grid item md={3.5}>
                    <Card sx={{ height: '100%', color: 'black' }}>
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
                        <Box sx={{ margin: 2}}>
                            <Typography variant='p' align='justify'>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore similique magnam asperiores eius nobis illum aliquam quis, porro repellendus in cum adipisci ipsum velit? Autem obcaecati vel velit aliquid, earum porro quidem iste hic repellat rerum exercitationem, rem ab commodi corporis corrupti voluptatum illo laborum!
                            </Typography>
                        </Box>
                    </Card>

                </Grid>
            </Grid>
        </Box>
    );
}
