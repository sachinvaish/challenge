import { Avatar, Box, Button, Divider, Paper, Badge, Typography, Link } from '@mui/material'
import React, { useState, useEffect } from 'react';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { useSelector } from 'react-redux';
import { PhotoCamera } from '@mui/icons-material';
import { useNavigate } from 'react-router';

export default function UserInfo(props) {
    const { handleEdit, userInfo } = props;
    // console.log(userInfo);
    const { isLoggedIn, user } = useSelector((state) => ({ ...state.UserReducer }));
    // console.log(user);
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // console.log('user',user);
        // console.log('userInfo',userInfo);
        if (userInfo && user) {
            if (userInfo._id === user._id)
                setProfile(user);
        } else {
            setProfile(userInfo);
        }

    }, [user])

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
                {(profile.facebook_url || profile.instagram_url || profile.twitter_url || profile.linkedin_url || profile.portfolio_url) &&
                    <Box my={1} sx={{ width: '100%' }} textAlign='center'>
                        <Typography variant='h6' fontWeight='bold'>Social Links</Typography>
                        <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'space-evenly' }}>
                            {profile.facebook_url && <Link href={profile.facebook_url} color='#333333' target='_blank'><FacebookRoundedIcon /></Link>}
                            {profile.instagram_url && <Link href={profile.instagram_url} color='#333333' target='_blank'><InstagramIcon /></Link>}
                            {profile.twitter_url && <Link href={profile.twitter_url} color='#333333' target='_blank'><TwitterIcon /></Link>}
                            {profile.linkedin_url && <Link href={profile.linkedin_url} color='#333333' target='_blank'><LinkedInIcon /></Link>}
                        </Box>
                        {profile.portfolio_url && <Link href={profile.portfolio_url} color='#39D30D' underline='none' target='_blank'>
                            <Typography variant='subtitle1' fontWeight='bold'>See Portfolio</Typography>
                        </Link>}
                    </Box>
                }

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
