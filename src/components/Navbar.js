import { AppBar, Typography, Toolbar, Tabs, Tab, Box, Button, Container, Avatar } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, getUser } from '../redux/features/userSlice';

export default function Navbar() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const dispatch = useDispatch();

    const { loading, user, isLoggedIn } = useSelector((state) => ({ ...state.app }));


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
        if (localStorage.getItem('authToken')){
            console.log('calling from Navbar UseEffect, authToke : ',localStorage.getItem('authToken') );
            dispatch(getUser(localStorage.getItem('authToken')));
        }
    }, [isLoggedIn]);

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
                        {(isLoggedIn && user) ? (
                            <>
                                <Box sx={{ display: 'flex' }}>
                                    <Avatar sx={{ marginX: '10px' }}> {(user.username).charAt(0).toUpperCase()}</Avatar>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant='body1' sx={{ fontWeight: 'bold', cursor: 'pointer', color: 'black' }}>
                                            {(user.name) ? (user.name) : (user.username)}</Typography>
                                        <Typography variant='subtitle2' sx={{ cursor: 'pointer', color: 'black' }} onClick={() => { dispatch(logout()) }}>
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
