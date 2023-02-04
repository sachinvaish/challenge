import { Box, Grid } from '@mui/material';
import React,{ useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Sidebar from './Sidebar';
import {getSubmissionByID, SubmissionReducer} from '../../redux/features/submissionSlice';
import { getChallengeByID } from '../../redux/features/challengeSlice';

export default function SubmissionView() {

    const dispatch = useDispatch();
    const {id} = useParams();
    // console.log('inside Submission VIEW');
    // console.log('id is :',id);
    const {singleSubmission} = useSelector((state)=>({...state.SubmissionReducer}));
    const { loading, challenge } = useSelector((state) => ({ ...state.ChallengeReducer }))
    // console.log('single submission', singleSubmission);

    useEffect(() => {
        dispatch(getSubmissionByID(id));
    }, [id]);

    useEffect(() => {
        if(singleSubmission){
            dispatch(getChallengeByID(singleSubmission.challenge_id))
        }
    }, []);

    
    return (
        <Box sx={{ marginTop: 3, padding: 3 }}>
            <Grid container spacing={2}>
            {singleSubmission && (<>
                <Grid item md={8}>
                    <Box
                        component='img'
                        src={`${process.env.REACT_APP_BACKEND_URL}/uploads/submissions/${singleSubmission.photo_url}`}
                        maxWidth='100%'
                        padding={0}
                    >
                    </Box>
                    
                </Grid>
                <Grid item md={4}>
                    <Sidebar submission = {singleSubmission} />
                </Grid>
                </>)}
            </Grid>
        </Box>
    );
}
