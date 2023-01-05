import { Avatar, Box, Button, Divider, Paper, Typography } from '@mui/material'
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function UserInfo(props) {

    console.log(props);
    const {_id, name, username,
        email, photo_url,
        portfolio_url,
        facebook_url,
        instagram_url,
        about,
        designation,
        organization,
        location} = props.user;

    return (
        <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>

            <Avatar sx={{ height: '130px', width: '130px', margin: '20px' }} src="https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg" />
            <Box my={1} sx={{ width: '100%' }} textAlign='center'>
                <Typography variant='h5' fontWeight='bold'>{name}</Typography>
                <Typography variant='subtitle2'>{`@${username}`}</Typography>
                <Typography variant='subtitle1'>UI/UX Designer</Typography>
                <Typography variant='subtitle2'>Ambala, Haryana, India</Typography>
            </Box>
            <Button variant='contained' size='small'>Edit Profile</Button>

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
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam aperiam voluptates ducimus rem magni perspiciatis, earum, ipsa excepturi ad repudiandae ex porro, eveniet incidunt. Eveniet ipsam iusto odit officiis dolor quos deleniti suscipit fuga!
                    </Typography>
                </Box>
            </Box>

        </Paper>
    )
}
