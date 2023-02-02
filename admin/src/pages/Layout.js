import { AccountCircle, Mail, More, Notifications } from '@mui/icons-material';
import { AppBar, Badge, Box, Grid, IconButton, Menu, Toolbar, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function Layout() {

    const { isLoggedIn, error } = useSelector((state) => ({ ...state.UserReducer }));
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/auth');
        }
    }, [isLoggedIn]);

    return (
        <Box >
            <Topbar />
            <Box mt={8} sx={{ display: 'flex' }}>
                <Sidebar />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: '#EFF1F2', p: 3, height: '800px' }}>
                    <Outlet sx={{ height: '500px' }} />
                </Box>

            </Box>
        </Box>
    );
}
