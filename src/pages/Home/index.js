import { Box, Container, Grid, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Submissions from '../../components/Submissions';
import Header from './Header';
import empty from '../../assets/empty.png';
import { getSubmissions } from '../../redux/features/submissionSlice';
import { getLastChallenge } from '../../redux/features/challengeSlice';
import { Outlet, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function Home() {
    const [error,setError]=useState(null);
    const dispatch = useDispatch();
    const {submissions} = useSelector((state)=>({...state.SubmissionReducer}));
    const {lastChallenge}= useSelector((state)=>({...state.ChallengeReducer}))
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getLastChallenge());
      }, []);

      useEffect(()=>{
        if(lastChallenge){
            if(Object.hasOwn(lastChallenge, '_id')){
                dispatch(getSubmissions(lastChallenge._id));
            }else{
                // toast.error(lastChallenge.message);
                setError(lastChallenge.message);
            }
        }
      },[lastChallenge])

    return (
        <Container >
            {/* <Outlet/> */}
            {!error ? (lastChallenge && <Header challenge={lastChallenge}/>) :
                <Box sx={{width:'500px', height:'75vh'}} textAlign='center' py={'15%'} m={'auto'}>
                    <Typography variant='h3' fontWeight='bold'>Sorry!!!</Typography>
                    <Typography variant='h5'>{error}</Typography>
                    <Typography variant='h6'>Stay tuned...</Typography>
                    <Button variant='contained' onClick={()=>{navigate('/explore')}}>Explore past challenges</Button>
                </Box>
            }
            {(submissions && submissions.length > 0) && (<>
            <Box sx={{ backgroundColor: 'white', borderRadius: '20px', padding: '10px' }}>
                <Grid container>
                    <Submissions sm={12} md={6} lg={4} challenge={lastChallenge} submissions={submissions} />
                </Grid>
            </Box>
            </>)}
            {(submissions && submissions.length < 1) && <Typography textAlign='center' p={10} variant='h5'>No Submissions to Display</Typography>}
        </Container>
    );
}