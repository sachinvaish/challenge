import { Box, Grid } from '@mui/material';
import React from 'react';
import Sidebar from './Sidebar';

export default function SubmissionView() {

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
                <Grid item md={8}>
                    <Box
                        component='img'
                        src='https://img.freepik.com/free-vector/travel-app-screens-interface-design_23-2148602411.jpg?w=2000'
                        maxWidth='100%'
                        padding={0}
                    >
                    </Box>
                </Grid>
                <Grid item md={4}>
                    <Sidebar />
                </Grid>
            </Grid>
        </Box>
    );
}
