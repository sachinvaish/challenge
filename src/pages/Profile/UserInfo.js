import { Avatar, Box, Divider, Paper, Typography } from '@mui/material'
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function UserInfo() {
    return (
        <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>

            <Avatar sx={{ height: '130px', width: '130px', margin: '20px' }} src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" />
            <Box my={1} sx={{ width: '100%' }} textAlign='center'>
                <Typography variant='h5' fontWeight='bold'>Sachin Vaish</Typography>
                <Typography variant='subtitle1'>UI/UX Designer</Typography>
                <Typography variant='subtitle2'>Ambala, Haryana, India</Typography>
            </Box>

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
