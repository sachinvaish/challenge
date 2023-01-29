import { Grid, Typography, Container, Box, Card, CardContent, Button } from '@mui/material';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Timer from '../../components/Timer';

export default function Header(props) {
    const { challenge } = props;
    const navigate = useNavigate();

    return (
        <Container sx={{ marginBottom: '30px' }}>
            {challenge && (
                <>
                    <Grid container spacing={2} >
                        <Grid item md={9}>
                            <Typography variant='h6'>Last Week's Challenge</Typography>
                            <Typography variant='h4' fontWeight="bold">{challenge.title}</Typography>
                            <Typography variant='p'>{challenge.description}</Typography>
                            <Grid container spacing={2} mt={2}>
                                <Grid item md={2.5} sm={6} xs={12}>
                                    <Typography variant='body1'>1st Prize</Typography>
                                    <Typography variant='h5' fontWeight='bold'>₹{challenge.first_prize}</Typography>
                                </Grid>
                                <Grid item md={2.5} sm={6} xs={12}>
                                    <Typography variant='body1'>2nd Prize</Typography>
                                    <Typography variant='h5' fontWeight='bold'>₹{challenge.second_prize}</Typography>
                                </Grid>
                                <Grid item md={2.5} sm={6} xs={12}>
                                    <Typography variant='body1'>Best Feedback</Typography>
                                    <Typography variant='h5' fontWeight='bold'>₹{challenge.feedback_prize}</Typography>
                                </Grid>
                                <Grid item md={4.5} sm={6} xs={12}>
                                    <Grid container >
                                        <Grid item md={4} sm={4} xs={12} mr={1} >
                                            <Box component='img' src='https://avatars.githubusercontent.com/u/25712570?v=4' height='80px' borderRadius='12px' />
                                        </Grid>
                                        <Grid item md={7} sm={7} xs={12} >
                                            <Typography variant='body1'>JUDGE</Typography>
                                            <Typography variant='h6' fontWeight='bold'>Sachin Vaish</Typography>
                                            <Typography variant='body2'>MERN Stack Developer</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <Card sx={{ color: 'text.secondary', textAlign: 'center' }}>
                                <CardContent>
                                    <Typography variant='h5' fontWeight='bold'>Deadline</Typography>
                                    <Timer countDownDate={challenge.due_date} size='md' />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </>
            )}
        </Container>
    );
}
