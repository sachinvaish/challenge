import React from 'react';
import { AccountCircle, Mail, More, Notifications } from '@mui/icons-material';
import { AppBar, Badge, Box, Grid, IconButton, Menu, Toolbar, Typography } from '@mui/material';

export default function Topbar() {
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
            // sx={{ display: { xs: 'none', md: 'flex' } }}
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
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
            </Box>
        </Toolbar>
        </AppBar>
    );
}
