import { Grid, Typography, Container, Box, Card, CardContent, Button } from '@mui/material';
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Timer from '../../components/Timer';

export default function Header() {

    const navigate = useNavigate();

    return (
        <Container sx={{ marginY: '30px' }}>
            <Link to="login" >
                login
            </Link>
            <Outlet />
            <Grid container spacing={2} >
                <Grid item md={9}>
                    <Typography variant='h6'>Last week's challenge</Typography>
                    <Typography variant='h4' fontWeight="bold">AR Firework Challenge</Typography>
                    <Typography variant='p'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et, iste iusto quam distinctio nulla ipsa. Vitae aut minus neque non deleniti. Recusandae autem necessitatibus laboriosam tempore quaerat provident dicta voluptas. Reprehenderit dolore fugiat cupiditate!
                    </Typography>
                    <Grid container spacing={2} mt={2}>
                        <Grid item md={2.5} xs={12}>
                            <Typography variant='h6'>Winner</Typography>
                            <Typography variant='h4'>$1000</Typography>
                        </Grid>
                        <Grid item md={2.5} xs={12}>
                            <Typography variant='h6'>Runner Up</Typography>
                            <Typography variant='h4'>$1000</Typography>
                        </Grid>
                        <Grid item md={2.5} xs={12}>
                            <Typography variant='h6'>Best Feedback</Typography>
                            <Typography variant='h4'>$1000</Typography>
                        </Grid>
                        <Grid item md={4.5} xs={12}>
                            <Grid container >
                                <Grid item md={4} >
                                    <Box component='img' src='https://crowwwn-prod.s3.amazonaws.com/uploads/judge/photo/2/Me_Crowwwn.png' height='80px' borderRadius='12px' />
                                </Grid>
                                <Grid item md={8} >
                                    <Typography fontSize={15}>JUDGE</Typography>
                                    <Typography fontSize={22} fontWeight='bold'>Alex barker</Typography>
                                    <Typography fontSize={15}>Co-Founder Crowwwn</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card sx={{ color: 'text.secondary', textAlign: 'center' }}>
                        <CardContent>
                            <h4>Winner Announced in</h4>
                            <Timer countDownDate='2022-12-30 19:43:00' />
                            <h4>Want to participate ?</h4>
                            <Button variant="contained" onClick={() => { navigate("/contest") }}>View this week's challenge</Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
