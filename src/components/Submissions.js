import { Container, Grid, Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SubmissionItem from './SubmissionItem';
import {getSubmissions, SubmissionReducer} from '../redux/features/submissionSlice';

export default function Submissions(props) {
    const {xs, sm, md, lg, challenge_id, submissions} = props;
    // const {submissions} = useSelector((state)=>({...state.SubmissionReducer}))

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
    );
}
