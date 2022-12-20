import { AppBar, Typography, Toolbar, Tabs, Tab, Box, Button, Container } from '@mui/material';
import React ,{useState} from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/features/userSlice';

export default function Navbar() {
    const [value, setValue] = useState(0);
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const dispatch = useDispatch();
    

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
    },[location]);

    useEffect(()=>{
        const userData = dispatch(getUser()) ;
        setUser(userData);
        console.log(userData);
    },[]);

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
                        <Box >
                            <Button variant="outlined" sx={{ m: 1 }} onClick={()=>{navigate("/login")}} >Login</Button>
                            <Button variant="contained" sx={{ m: 1 }} onClick={()=>{navigate("/signup")}}>Sign up</Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}
