import { Grid, Typography, Container, Box, Card, CardContent, Button } from '@mui/material';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Timer from '../../components/Timer';

export default function Header() {

    const navigate = useNavigate();

    return (
        <Container sx={{ marginY: '30px' }}>
            <Outlet />
            <Grid container spacing={2} >
                <Grid item md={9}>
                    <Typography variant='h6'>Last week's challenge</Typography>
                    <Typography variant='h4' fontWeight="bold">Social Media Post Challenge</Typography>
                    <Typography variant='p'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et, iste iusto quam distinctio nulla ipsa. Vitae aut minus neque non deleniti. Recusandae autem necessitatibus laboriosam tempore quaerat provident dicta voluptas. Reprehenderit dolore fugiat cupiditate!
                    </Typography>
                    <Grid container spacing={2} mt={2}>
                        <Grid item md={2.5} sm={6} xs={12}>
                            <Typography variant='h6'>Winner</Typography>
                            <Typography variant='h4'>$1000</Typography>
                        </Grid>
                        <Grid item md={2.5} sm={6} xs={12}>
                            <Typography variant='h6'>Runner Up</Typography>
                            <Typography variant='h4'>$1000</Typography>
                        </Grid>
                        <Grid item md={2.5} sm={6} xs={12}>
                            <Typography variant='h6'>Best Feedback</Typography>
                            <Typography variant='h4'>$1000</Typography>
                        </Grid>
                        <Grid item md={4.5} sm={6} xs={12}>
                            <Grid container >
                                <Grid item md={4} sm={4} xs={12} mr={1} >
                                    <Box component='img' src='https://avatars.githubusercontent.com/u/25712570?v=4' height='80px' borderRadius='12px' />
                                </Grid>
                                <Grid item md={7} sm={7} xs={12} >
                                    <Typography fontSize={15}>JUDGE</Typography>
                                    <Typography fontSize={22} fontWeight='bold'>Sachin Vaish</Typography>
                                    <Typography fontSize={15}>MERN Stack Developer</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card sx={{ color: 'text.secondary', textAlign: 'center' }}>
                        <CardContent>
                            <h4>Winner Announced in</h4>
                            <Timer countDownDate='2023-01-10' />
                            <h4>Want to participate ?</h4>
                            <Button variant="contained" onClick={() => { navigate("/contest") }}>View this week's challenge</Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
