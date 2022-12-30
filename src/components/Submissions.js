import { Container, Grid, Box } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SubmissionItem from './SubmissionItem';
import {getSubmissions, SubmissionReducer} from '../redux/features/submissionSlice';

export default function Submissions(props) {
    const dispatch = useDispatch();
    const {xs, sm, md, lg} = props;
    const challenge_id = '63748a4dfcc73c064df4c744';
    const {submissions} = useSelector((state)=>({...state.SubmissionReducer}))
    console.log('getting submission',submissions);

    useEffect(() => {
      dispatch(getSubmissions(challenge_id));
    }, [submissions]);

    return (
        <Grid sx={{ display: 'flex', flexWrap: 'wrap' }} >
            {submissions && submissions.map((submission) => {
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
