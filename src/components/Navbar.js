import { AppBar, Typography, Toolbar, Tabs, Tab, Box, Button, Container, Avatar } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/features/userSlice';

export default function Navbar() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const dispatch = useDispatch();

    const { loading, user } = useSelector((state) => ({ ...state.app }));
    console.log(user);
    console.log('loading :', loading);


    useEffect(() => {
        if (location === '/') {
            setValue(0);
        }
        if (location === '/contest') {
            setValue(1);
        }
        if (location === '/explore') {
            setValue(2);
        }
    }, [location]);

    useEffect(() => {
        if (localStorage.getItem('authToken'))
            dispatch(getUser(localStorage.getItem('authToken')));
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <AppBar sx={{ backgroundColor: "white", color: "blue", position: 'sticky' }}>
                <Container>
                    <Toolbar >
                        <Typography variant='h6' flexGrow={1}>Crowwwn</Typography>
                        <Box flexGrow={1}>
                            <Tabs value={value} onChange={handleChange}>
                                <Tab label="Home" onClick={() => { navigate("/") }} />
                                <Tab label="This Week's Challenge" onClick={() => { navigate("/contest") }} />
                                <Tab label="Explore" />
                            </Tabs>
                        </Box>
                        {(localStorage.getItem('authToken') && user) ? (
                            <>
                                <Box sx={{ display: 'flex' }}>
                                    <Avatar sx={{ marginX: '10px' }}>S</Avatar>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant='body1' sx={{ fontWeight: 'bold', cursor: 'pointer', color: 'black' }}>
                                            {(user.name) ? (user.name) : (user.username)}</Typography>
                                        <Typography variant='subtitle2' sx={{ cursor: 'pointer', color: 'black' }} onClick={() => { localStorage.clear(); console.log('user data is:'+ user) }}>
                                            Logout</Typography>
                                    </Box>
                                </Box>
                            </>) :
                            (
                                <>
                                    <Box >
                                        <Button variant="outlined" sx={{ m: 1 }} onClick={() => { navigate("/login") }} >Login</Button>
                                        <Button variant="contained" sx={{ m: 1 }} onClick={() => { navigate("/signup") }}>Sign up</Button>
                                    </Box>
                                </>
                            )

                        }

                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}
