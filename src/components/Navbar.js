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

    const { loading, user, isLoggedIn } = useSelector((state) => ({ ...state.UserReducer }));


    useEffect(() => {

        if (location === '/home') {
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
                        <Typography fontWeight={'bold'} variant='h4' sx={{cursor:'pointer'}} flexGrow={1} onClick={() => { navigate("/") }}>DigiFinch</Typography>
                        <Box flexGrow={1}>
                            <Tabs value={value} onChange={handleChange}>
                                <Tab label="Home" onClick={() => { navigate("/home") }} />
                                <Tab label="This Week's Challenge" onClick={() => { navigate("/contest") }} />
                                <Tab label="Explore" onClick={() => { navigate("/explore") }}/>
                            </Tabs>
                        </Box>
                        {(isLoggedIn && user) ? (
                            <>
                                <Box sx={{ display: 'flex' }}>
                                    <Avatar sx={{ marginX: '10px' }} src={user.photo_url && `${process.env.REACT_APP_BACKEND_URL}/uploads/profile/${user.photo_url}`}> {(user.username).charAt(0).toUpperCase()}</Avatar>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant='body1' sx={{ fontWeight: 'bold', cursor: 'pointer', color: 'black' }}
                                        onClick={()=>{navigate(`/profile/${user.username}`)}}>
                                            {(user.name) ? (user.name) : (user.username)}</Typography>
                                        <Typography variant='subtitle2' sx={{ cursor: 'pointer', color: 'black' }} onClick={() => { dispatch(logout());  }}>
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
