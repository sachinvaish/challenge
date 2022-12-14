import { Container, Grid, Box } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import SubmissionItem from './SubmissionItem';

export default function Submissions(props) {
    const {xs, sm, md, lg} = props;

    const submissions = useSelector((state) => state.handleSubmissions);

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
