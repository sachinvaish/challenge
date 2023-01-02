import { Box, Grid } from '@mui/material';
import React,{ useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Sidebar from './Sidebar';
import {getSubmissionByID, SubmissionReducer} from '../../redux/features/submissionSlice';

export default function SubmissionView(props) {

    const dispatch = useDispatch();
    const {id} = useParams();
    // console.log('inside Submission VIEW');
    // console.log('id is :',id);
    const {singleSubmission} = useSelector((state)=>({...state.SubmissionReducer}));
    // console.log(singleSubmission);

    useEffect(() => {
        dispatch(getSubmissionByID(id));
    }, [id]);

    const submission = {
        "_id": "4",
        "challenge_id": "63748a4dfcc73c0699996999",
        "user_id": "63748a4dfcc73c064d0000000",
        "photo_url": "https://img.freepik.com/free-vector/travel-app-screens-interface-design_23-2148602411.jpg?w=2000",
        "description": "I've made this Submission 4"
    }

    return (
        <Box sx={{ marginTop: 3, padding: 3 }}>
            <Grid container spacing={2}>
            {singleSubmission && (<>
                <Grid item md={8}>
                    <Box
                        component='img'
                        src={`http://localhost:5000/uploads/submissions/${singleSubmission.photo_url}`}
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
