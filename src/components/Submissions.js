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

    useEffect(() => {
      dispatch(getSubmissions(challenge_id));
    }, []);

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
