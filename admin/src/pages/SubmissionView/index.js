import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Sidebar from './Sidebar';
import { getSubmissionByID} from '../../redux/services/submissionSlice';
import { setFirstWinner, setSecondWinner } from '../../redux/services/challengeSlice';

export default function SubmissionView(props) {

    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [prize, setPrize] = useState('');

    const setSubmissionWinner = () => {
        localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmM0ODk1MzRlODgyYzNkYWVkYWUxNSIsImlhdCI6MTY3NDk4ODc1NH0.mkRVETiwv732v15w2ablF3APWZCXQxRPihzTnltr1jg')
        const authToken = localStorage.getItem('authToken');
        if (prize === 1) {
            //give user first prize
            const newChallenge = {
                "id": singleSubmission.challenge_id,
                "first_winner_id": singleSubmission.user_id
            }
            dispatch(setFirstWinner({ newChallenge, authToken }));
        }
        if (prize === 2) {
            //give user 2nd prize
            const newChallenge = {
                "id": singleSubmission.challenge_id,
                "second_winner_id": singleSubmission.user_id
            }
            dispatch(setSecondWinner({ newChallenge, authToken }));
        }
    }

    // console.log('inside Submission VIEW');
    // console.log('id is :',id);
    const { singleSubmission } = useSelector((state) => ({ ...state.SubmissionReducer }));
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
                            <MenuItem value="">
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
                            src={`http://localhost:5000/uploads/submissions/${singleSubmission.photo_url}`}
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
