import { AppBar, Typography, Toolbar, Tabs, Tab, Box } from '@mui/material';
import React from 'react';

export default function Navbar() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <AppBar sx={{ backgroundColor: "white", color: "blue" }}>
                <Toolbar>
                    <Typography variant='h6'>Crowwwn</Typography>
                    <Box>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="Home" />
                            <Tab label="This Week's Challenge" />
                            <Tab label="Explore" />
                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
}
