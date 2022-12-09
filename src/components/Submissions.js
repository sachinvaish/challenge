import { Container } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import {useSelector} from 'react-redux';
import SubmissionItem from './SubmissionItem';

export default function Submissions() {

    const submissions=useSelector((state)=>state.handleSubmissions);

    return (
        <Container sx={{marginTop:'-20px'}}>
            <Stack direction='row' sx={{ display: 'flex', flexWrap: 'wrap', justifyContent:'space-between' }} >
                {submissions.map((submission)=>{
                    return <SubmissionItem key={submission._id} submission={submission}  />
                })}
            </Stack>
        </Container>
    );
}
