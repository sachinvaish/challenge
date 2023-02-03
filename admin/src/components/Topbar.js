import React, { useEffect } from 'react';
import { AccountCircle, Mail, More, Notifications } from '@mui/icons-material';
import { AppBar, Avatar, Badge, Box, Grid, IconButton, Menu, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { getUser, logout } from '../redux/services/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Topbar(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoggedIn } = props;

    return (
        <AppBar >
        <Toolbar>
            <Typography
                variant="h6"
                noWrap
                component="div"
            // sx={{ display: { xs: 'none', sm: 'block' } }}
            >
                Crowwwn
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box
            sx={{ display: 'flex' }}
            >
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <Mail />
                    </Badge>
                </IconButton>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <Notifications />
                    </Badge>
                </IconButton>
                {(isLoggedIn && user) && (
                            <>
                                <Box sx={{ display: 'flex' }}>
                                    <Avatar sx={{ marginX: '10px' }} src={user.photo_url && `${process.env.REACT_APP_BACKEND_URL}/uploads/profile/${user.photo_url}`}> {(user.username).charAt(0).toUpperCase()}</Avatar>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant='body1' sx={{ fontWeight: 'bold', cursor: 'pointer'  }}
                                        onClick={()=>{navigate(`/profile/${user._id}`)}}>
                                            {(user.name) ? (user.name) : (user.username)}</Typography>
                                        <Typography variant='subtitle2' sx={{ cursor: 'pointer' }} onClick={() => { dispatch(logout());  }}>
                                            Logout</Typography>
                                    </Box>
                                </Box>
                            </>
                            )
                        }
            </Box>
        </Toolbar>
        </AppBar>
    );
}
