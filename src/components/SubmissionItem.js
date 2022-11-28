import { Link, Card, CardMedia, Typography, CardHeader, CardActions, Avatar, Button, Box, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import React, { useRef } from 'react';

export default function SubmissionItem() {
  
    return (
        <Card sx={{ width: 350, color: 'black', margin: 1 }}>
            <CardMedia
                component="img"
                height="260"
                image="https://crowwwn-prod.s3.amazonaws.com/uploads/submission/image/3992/thumb_Makeup_AI.png"
                alt="submission"
            />
            <Box sx={{ display: 'flex' }} justifyContent='space-between'>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'primary' }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    title={
                        <Link variant="h6" onClick={()=>{alert('taking you to user profile');}} sx={{cursor:'pointer',textDecoration:'none', color : 'black'}} >
                           Sachin Vaish
                        </Link>
                     }
                    subheader="7 Feedbacks"
                />
                <CardActions>
                <Typography variant='h6'>23</Typography>
                    <IconButton size="small" onClick={()=>{alert('UPVOTE');}}>
                        <ThumbUpIcon />
                    </IconButton>
                </CardActions>
            </Box>
        </Card>
    );
}
