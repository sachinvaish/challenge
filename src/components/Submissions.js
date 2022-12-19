import { Container, Grid, Box } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import SubmissionItem from './SubmissionItem';

export default function Submissions(props) {
    const {xs, sm, md, lg} = props;

    const submissions = [
        {
            "_id": "1",
            "challenge_id": "63748a4dfcc73c064df44444",
            "user_id": "63748a4dfcc73c064df55555",
            "photo_url": "https://crowwwn-prod.s3.amazonaws.com/uploads/submission/image/3992/thumb_Makeup_AI.png",
            "description": "This is from redux"
        },
        {
            "_id": "2",
            "challenge_id": "63748a4dfcc73c0699999999",
            "user_id": "63748a4dfcc73c064d0000000",
            "photo_url": "https://crowwwn-prod.s3.amazonaws.com/uploads/submission/image/4001/thumb_Mirrora_Present.png",
            "description": "I've made this Submission 2"
        },
        {
            "_id": "3",
            "challenge_id": "63748a4dfcc73c0699999w99",
            "user_id": "63748a4dfcc73c064d0000000",
            "photo_url": "https://crowwwn-prod.s3.amazonaws.com/uploads/submission/image/3999/thumb_E20F62F7-72AE-4463-9BEE-39178318EAD9.jpeg",
            "description": "I've made this Submission 3"
        },
        {
            "_id": "4",
            "challenge_id": "63748a4dfcc73c0699996999",
            "user_id": "63748a4dfcc73c064d0000000",
            "photo_url": "https://crowwwn-prod.s3.amazonaws.com/uploads/submission/image/4002/thumb_Cover-_style_my_hair.pro_3x.jpg",
            "description": "I've made this Submission 4"
        }
    ];

    return (
        <Grid sx={{ display: 'flex', flexWrap: 'wrap' }} >
            {submissions.map((submission) => {
                return (
                    <Grid key={submission._id} item xs={xs} sm={sm} md={md} lg={lg} >
                        <SubmissionItem key={submission._id} submission={submission} />
                    </Grid>
                )
            })}
         </Grid>
        // <Container sx={{backgroundColor:'white', borderRadius:'20px', padding:'10px'}}>
        // <Stack direction='row' fullWidth sx={{ display: 'flex', flexWrap: 'wrap' }} >
        //     {submissions.map((submission)=>{
        //         return <SubmissionItem key={submission._id} submission={submission}  />
        //     })}
        // </Stack>
        // </Container>
    );
}
