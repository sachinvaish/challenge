import { Box, Typography } from '@mui/material';
import { React, useState, useRef, useEffect } from 'react';

export default function Timer(props) {
    const [timerDays, setTimerDays] = useState('00');
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');

    let interval = useRef();

    const startTimer = () => {
        interval = setInterval(() => {
            const countDownDate = new Date(props.countDownDate).getTime();
            const now = new Date().getTime();
            const distance = countDownDate - now;

            const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
            const hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            const seconds = String(Math.floor((distance % (1000 * 60) / 1000))).padStart(2, '0');

            if (distance < 0) {
                //stop timer
                clearInterval(interval.current);
            } else {
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 1000);
    }

    useEffect(() => {
        return () => {
            startTimer();
            clearInterval(interval.current);
        };
    });

    return (
        <>
            {(new Date(props.countDownDate).getTime() >= new Date().getTime()) ?
                (
                    <Box display='flex' justifyContent='space-between' textAlign='center' my={1} >
                        <Box sx={{ width: '45px' }}>
                            <Typography variant='body1'>{timerDays}</Typography>
                            <Typography fontSize={12}>Days</Typography>
                        </Box>
                        <Typography variant='body1'>:</Typography>
                        <Box sx={{ width: '45px' }}>
                            <Typography variant='body1'>{timerHours}</Typography>
                            <Typography fontSize={12}>Hours</Typography>
                        </Box>
                        <Typography variant='body1'>:</Typography>
                        <Box sx={{ width: '45px' }}>
                            <Typography variant='body1'>{timerMinutes}</Typography>
                            <Typography fontSize={12}>Minutes</Typography>
                        </Box>
                        <Typography variant='body1'>:</Typography>
                        <Box sx={{ width: '45px' }}>
                            <Typography variant='body1'>{timerSeconds}</Typography>
                            <Typography fontSize={12}>Seconds</Typography>
                        </Box>
                    </Box>
                ) :
                <Typography my={2} variant='body1'>Challenge Ended</Typography>
                }


        </>
    );
}
