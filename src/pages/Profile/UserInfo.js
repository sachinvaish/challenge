import { Avatar, Box, Button, Divider, Paper, Badge, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useSelector } from 'react-redux';
import { PhotoCamera } from '@mui/icons-material';

export default function UserInfo(props) {

    // const { _id, name, username,
    //     email, photo_url,
    //     portfolio_url,
    //     facebook_url,
    //     instagram_url,
    //     about,
    //     designation,
    //     organization,
    //     location } = props.user;
    const { handleEdit, userInfo } = props;
    // console.log(userInfo);
    const { isLoggedIn, user } = useSelector((state) => ({ ...state.UserReducer }));
    // console.log(user);

    const [profile, setProfile] = useState(null);
    
    useEffect(()=>{
        console.log('user',user);
        console.log('userInfo',userInfo);
        if(userInfo._id === user._id){
            setProfile(user);
        }else{
            setProfile(userInfo);
        }
        
    },[user])

    return (
        <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
            {profile && (<>
            <Avatar sx={{ height: '130px', width: '130px', margin: '20px' }} src={profile.photo_url && `http://localhost:5000/uploads/profile/${profile.photo_url}`} />
            <Box mb={1} sx={{ width: '100%' }} textAlign='center'>
                <Typography variant='h5' fontWeight='bold'>{profile.name}</Typography>
                <Typography variant='subtitle2'>{`@${profile.username}`}</Typography>
                <Typography variant='subtitle1'>{profile.designation}</Typography>
                <Typography variant='subtitle2'>{profile.location}</Typography>
            </Box>
            {(isLoggedIn && ((user._id === profile._id) &&
                <Button variant='outlined' size='small' onClick={handleEdit}>Edit Profile</Button>
                ))}

            <Box my={1} sx={{ width: '100%' }} textAlign='center'>
                <Typography variant='h6' fontWeight='bold'>Awards</Typography>
                <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'space-evenly' }}>
                    <Box>
                        <Typography variant='h5' fontWeight='bold'>4</Typography>
                        <Typography variant='subtitle2'>Winner</Typography>
                    </Box>
                    <Divider orientation="vertical" variant='middle' flexItem />
                    <Box>
                        <Typography variant='h5' fontWeight='bold'>12</Typography>
                        <Typography variant='subtitle2'>Runner up</Typography>
                    </Box>
                    <Divider orientation="vertical" variant='middle' flexItem />
                    <Box>
                        <Typography variant='h5' fontWeight='bold'>32</Typography>
                        <Typography variant='subtitle2'>Feedbacks</Typography>
                    </Box>
                </Box>
            </Box>

            <Box my={1} sx={{ width: '100%' }} textAlign='center'>
                <Typography variant='h6' fontWeight='bold'>Social Links</Typography>
                <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'space-evenly' }}>
                    <FacebookIcon />
                    <LinkedInIcon />
                    <TwitterIcon />
                </Box>
            </Box>

            <Box my={1} sx={{ width: '100%' }} textAlign='center'>
                <Typography variant='h6' fontWeight='bold'>About Me</Typography>
                <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'space-evenly' }}>
                    <Typography align='justify'>
                        {profile.about ? profile.about : 'Nothing to display'}
                    </Typography>
                </Box>
            </Box>

            </>)}
        </Paper>
    )
}
