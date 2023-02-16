import { Box, Button, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Sidebar from './Sidebar';
import { getSubmissionByID, SubmissionReducer } from '../../redux/features/submissionSlice';
import { getChallengeByID } from '../../redux/features/challengeSlice';
import Loader from '../../components/Loader';

export default function SubmissionView() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    // console.log('inside Submission VIEW');
    // console.log('id is :',id);
    const { loading, singleSubmission } = useSelector((state) => ({ ...state.SubmissionReducer }));
    const { challenge } = useSelector((state) => ({ ...state.ChallengeReducer }))
    // console.log('single submission', singleSubmission);

    useEffect(() => {
        dispatch(getSubmissionByID(id));
    }, [id]);

    useEffect(() => {
        if (singleSubmission) {
            dispatch(getChallengeByID(singleSubmission.challenge_id))
        }
    }, []);


    return (
        <Box sx={{ marginTop: 3, padding: 3 }}>
            <Box mb={1}>
                <Button variant='outlined' onClick={()=>{navigate(-1)}}>Back</Button>
            </Box>
            <Grid container spacing={2}>
                {singleSubmission && (<>
                    <Grid item md={8}>
                        {loading ? <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'70vh'}}><Loader /></Box> :
                            <Box
                                component='img'
                                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/submissions/${singleSubmission.photo_url}`}
                                maxWidth='100%'
                                padding={0}
                                sx={{loading:'lazy'}}
                            >
                            </Box>
                        }

                    </Grid>
                    <Grid item md={4}>
                        <Sidebar submission={singleSubmission} />
                    </Grid>
                </>)}
            </Grid>
        </Box>
    );
}
