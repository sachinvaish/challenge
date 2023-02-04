import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Sidebar from './Sidebar';
import { getSubmissionByID } from '../../redux/services/submissionSlice';
import { getChallengeByID, removeWinner, setFirstWinner, setSecondWinner } from '../../redux/services/challengeSlice';

export default function SubmissionView(props) {

    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [prize, setPrize] = useState(0);
    const { singleSubmission } = useSelector((state) => ({ ...state.SubmissionReducer }));
    const { loading, challenge } = useSelector((state) => ({ ...state.ChallengeReducer }))

    useEffect(() => {
        if(singleSubmission){
            dispatch(getChallengeByID(singleSubmission.challenge_id))
        }
    }, []);

    const setSubmissionWinner = () => {
        const authToken = localStorage.getItem('authToken');
        if (prize === 0) {
            //Remove Prize
            let newChallenge = {
                "id": singleSubmission.challenge_id,
                "first_winner_id": null,
                "second_winner_id": null
            }
            dispatch(removeWinner({ newChallenge, authToken }));
        }
        if (prize === 1) {
            //give user first prize
            let newChallenge = {
                "id": singleSubmission.challenge_id,
                "first_winner_id": singleSubmission._id,
                "second_winner_id": null
            }
            dispatch(setFirstWinner({ newChallenge, authToken }));
        }
        if (prize === 2) {
            //give user 2nd prize
            let newChallenge = {
                "id": singleSubmission.challenge_id,
                "second_winner_id": singleSubmission._id,
                "first_winner_id":null
            }
            dispatch(setSecondWinner({ newChallenge, authToken }));
        }
        // dispatch(getChallengeByID(singleSubmission.challenge_id))
    }

    // console.log('inside Submission VIEW');
    // console.log('id is :',id);
   
    // console.log('single submission', singleSubmission);

    useEffect(() => {
        dispatch(getSubmissionByID(id));
    }, [id]);


    return (
        <Box sx={{ marginTop: 0, padding: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }} >
                <Button variant='outlined' size='small' onClick={() => navigate(-1)}>Back</Button>
                <Box sx={{ display: 'flex' }}>
                    <FormControl sx={{ mx: 1, minWidth: 120 }} size="small">
                        <Select
                            value={prize}
                            onChange={(e) => setPrize(e.target.value)}
                        >
                            <MenuItem value={0}>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>1st Prize</MenuItem>
                            <MenuItem value={2}>2nd Prize</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant='contained' onClick={setSubmissionWinner}>Declare</Button>
                </Box>
            </Box>
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
                        <Sidebar submission={singleSubmission} />
                    </Grid>
                </>)}
            </Grid>
        </Box>
    );
}
