import { Box, Typography } from '@mui/material';
import { React, useState, useRef, useEffect } from 'react';

export default function GetTimeFormat(props) {

    const { countDownDate } = props;
    const [timerDays, setTimerDays] = useState('00');
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');

    let interval = useRef();

    const startTimer = () => {
        interval = setInterval(() => {
            const countDownDate = new Date(props.countDownDate).getTime();
            const now = new Date().getTime();
            const distance = now - countDownDate;

            const days = String(Math.floor(distance / (1000 * 60 * 60 * 24)));
            const hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            const seconds = String(Math.floor((distance % (1000 * 60) / 1000)));

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
        <div>
            {
                (timerDays > 0) ? <Typography>{timerDays} days ago</Typography> :
                    ((timerHours > 0) ? <Typography>{timerHours} hours ago</Typography> :
                        ((timerMinutes > 0) ? <Typography>{timerMinutes} minutes ago</Typography> :
                    ((timerSeconds>0) && <Typography>Just now</Typography>)))
            }
        </div>
    );
}
