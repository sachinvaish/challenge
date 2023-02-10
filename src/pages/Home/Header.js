import { Grid, Typography, Container, Box, Card, CardContent, Button, Divider } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Timer from '../../components/Timer';
import WinnerDetail from '../ChallengeDetail/WinnerDetail';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CommentIcon from '@mui/icons-material/Comment';
import Sponsor from '../../components/Sponsor';

export default function Header(props) {
    const { challenge } = props;
    const { due_date } = props.challenge;
    const navigate = useNavigate();

    return (
        <Container sx={{ marginY: '30px' }}>
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
                            {(challenge.first_winner_id || challenge.second_winner_id || challenge.feedback_winner_id) ?
                                <>
                                    <Typography fontWeight='bold' variant='h6' mb={1}>Winners</Typography>
                                    <Box gap={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }} gap={1.2}>
                                            <EmojiEventsIcon sx={{ color: '#E8AF0E', ml: 1 }} />
                                            <WinnerDetail first_winner={challenge.first_winner_id} />
                                        </Box>
                                        <Divider />
                                        <Box sx={{ display: 'flex', alignItems: 'center' }} gap={1.2}>
                                            <EmojiEventsIcon sx={{ color: '#C6CBCD', ml: 1 }} />
                                            <WinnerDetail second_winner={challenge.second_winner_id} />
                                        </Box>
                                        <Divider />
                                        <Box sx={{ display: 'flex', alignItems: 'center' }} gap={1.2}>
                                            <CommentIcon sx={{ color: '#ae34eb', ml: 1 }} />
                                            <WinnerDetail feedback_winner={challenge.feedback_winner_id} />
                                        </Box>
                                    </Box>
                                </>
                                :
                                <>
                                    <h4>Winner Announced in</h4>
                                    <Timer countDownDate={new Date(due_date).setDate(new Date(due_date).getDate() + 7)} />
                                    <h4>Want to participate ?</h4>
                                    <Button variant="contained" onClick={() => { navigate("/contest") }}>View this week's challenge</Button>
                                </>
                            }
                            <Sponsor/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
