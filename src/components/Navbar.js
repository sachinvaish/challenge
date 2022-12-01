import { AppBar, Typography, Toolbar, Tabs, Tab, Box, Button, Container } from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function Navbar() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <AppBar sx={{ backgroundColor: "white", color: "blue", position: 'static' }}>
                <Container>
                    <Toolbar >
                        <Typography  variant='h6' flexGrow={1}>Crowwwn</Typography>
                        <Box flexGrow={1}>
                            <Tabs value={value} onChange={handleChange}>
                                <Tab label="Home" onClick={()=>{navigate("/")}}/>
                                <Tab label="This Week's Challenge" />
                                <Tab label="Explore" />
                            </Tabs>
                        </Box>
                        <Box >
                            <Button variant="outlined" sx={{ m: 1 }}>Login</Button>
                            <Button variant="contained" sx={{ m: 1 }}>Sign up</Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}
