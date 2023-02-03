import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Login from './Login';
import Signup from './Signup';

export default function Auth() {
  const [value, setValue] = useState('login');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { isLoggedIn, error } = useSelector((state) => ({ ...state.UserReducer }));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('in AUTH UseEffect');
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <>
      <Box sx={{
        height: '100vh', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', alignItems: 'center',
        display: 'flex', justifyContent: 'center',
        backgroundImage: `url('https://images.unsplash.com/photo-1506971456216-7b494f54d588?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTh8MTExMjY2MHx8ZW58MHx8fHw%3D&w=1000&q=80')`
      }}>
        <Box sx={{ width: '500px', margin: 'auto', backgroundColor: 'white', padding: 3, borderRadius: '20px' }}>
          <Login />
          {/* <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} >
                <Tab label="Login" value="login" />
                <Tab label="Sign up" value="signup"  width='50%'/> 
              </TabList>
            </Box>
            <TabPanel value="login"><Login setValue={setValue} /></TabPanel>
            <TabPanel value="signup"><Signup setValue={setValue}/></TabPanel> 
          </TabContext> */}
        </Box>
      </Box>
    </>
  )
}
