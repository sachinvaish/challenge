import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Sidebar from './Sidebar';
import { getSubmissionByID, SubmissionReducer } from '../../redux/services/submissionSlice';

export default function SubmissionView(props) {

    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [winner, setWinner] = useState(null);
    // console.log('inside Submission VIEW');
    // console.log('id is :',id);
    const { singleSubmission } = useSelector((state) => ({ ...state.SubmissionReducer }));
    // console.log('single submission', singleSubmission);

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
        <Box sx={{ marginTop: 0, padding: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }} >
                <Button variant='outlined' size='small' onClick={() => navigate(-1)}>Back</Button>
                <Box sx={{display:'flex'}}>
                    <FormControl sx={{ mx: 1, minWidth: 120 }} size="small">
                        <Select
                            value={winner}
                            onChange={(e)=>setWinner(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>1st Prize</MenuItem>
                            <MenuItem value={2}>2nd Prize</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant='contained'>Declare</Button>
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
