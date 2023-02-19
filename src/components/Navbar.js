import { AppBar, Typography, Toolbar, Tabs, Tab, Box, Button, Container, Avatar, Menu, MenuItem, Chip } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, getUser } from '../redux/features/userSlice';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
    const [value, setValue] = useState(0);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const dispatch = useDispatch();
    const menuOpen = Boolean(menuAnchor);

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
        if (localStorage.getItem('authToken')) {
            dispatch(getUser(localStorage.getItem('authToken')));
        }
    }, [isLoggedIn]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleMenu = (e) => {
        setMenuAnchor(e.currentTarget);
    }

    const closeMenu = () => {
        setMenuAnchor(false)
    }

    return (
        <>
            <AppBar sx={{ backgroundColor: "white", color: "blue", position: 'sticky' }}>
                <Container>
                    <Toolbar >
                        <Typography fontWeight={'bold'} variant='h5' sx={{ cursor: 'pointer' }} flexGrow={1} onClick={() => { navigate("/") }}>DigiFinch <Chip label='Demo' color='primary' /> </Typography>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }} flexGrow={1}>
                            <Box flexGrow={1}>
                                <Tabs value={value} defaultValue={null} onChange={handleChange} >
                                    <Tab label="Home" onClick={() => { navigate("/home") }} />
                                    <Tab label="This Week's Challenge" onClick={() => { navigate("/contest") }} />
                                    <Tab label="Explore" onClick={() => { navigate("/explore") }} />
                                </Tabs>
                            </Box>
                            {(isLoggedIn && user) ? (
                                <>
                                    <Box sx={{ display: 'flex' }}>
                                        <Avatar sx={{ marginX: '10px' }} src={user.photo_url && `${process.env.REACT_APP_BACKEND_URL}/uploads/profile/${user.photo_url}`}> {(user.username).charAt(0).toUpperCase()}</Avatar>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography variant='body1' sx={{ fontWeight: 'bold', cursor: 'pointer', color: 'black' }}
                                                onClick={() => { navigate(`/profile/${user.username}`) }}>
                                                {(user.name) ? (user.name) : (user.username)}</Typography>
                                            <Typography variant='subtitle2' sx={{ cursor: 'pointer', color: 'black' }} onClick={() => { dispatch(logout()); }}>
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
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems:'center' }}>
                        {(isLoggedIn && user) && <Avatar sx={{ marginX: '10px' }} src={user.photo_url && `${process.env.REACT_APP_BACKEND_URL}/uploads/profile/${user.photo_url}`}> {(user.username).charAt(0).toUpperCase()}</Avatar>}
                            <MenuIcon onClick={handleMenu} sx={{cursor:'pointer'}}/>
                            <Menu open={menuOpen} onClose={closeMenu} anchorEl={menuAnchor} anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}>
                                <MenuItem onClick={() => { closeMenu(); navigate("/home"); }}>Home</MenuItem>
                                <MenuItem onClick={() => { closeMenu(); navigate("/contest"); }}>This Week's Challenge</MenuItem>
                                <MenuItem onClick={() => { closeMenu(); navigate("/explore"); }}>Explore</MenuItem>
                                {(isLoggedIn && user) && <MenuItem onClick={() => { closeMenu(); navigate(`/profile/${user.username}`) }}>My Profile</MenuItem>}
                                {(isLoggedIn && user) && <MenuItem onClick={() => { closeMenu(); dispatch(logout()); }}>Logout</MenuItem>}
                                {!isLoggedIn && <MenuItem onClick={() => { closeMenu(); navigate("/login") }}>Login</MenuItem>}
                                {!isLoggedIn && <MenuItem onClick={() => { closeMenu(); navigate("/signup") }}>Signup</MenuItem>}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}
