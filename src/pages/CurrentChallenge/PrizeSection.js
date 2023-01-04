import { Grid, Paper, Typography } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import { Box} from '@mui/system';
import React from 'react';

export default function PrizeSection() {
    return (
        <Box sx={{ marginY: '30px', marginX:'auto', textAlign: 'center', alignItems: 'center', width: '100%', height: '400px' }}>
            <CssBaseline />
            <Grid container margin='auto' width={700} height='100%' >
                <Grid item md={6} >
                    <Paper sx={{ padding:'70px', height: '100%', marginX:'10px' }}>
                        <Box component='img' src='https://avatars.githubusercontent.com/u/25712570?v=4' height='150px' borderRadius='12px' />
                        <Typography fontSize={15}>JUDGE</Typography>
                        <Typography fontSize={22} fontWeight='bold'>Sachin Vaish</Typography>
                        <Typography fontSize={15}>MERN Stack Developer</Typography>
                    </Paper>
                </Grid>
                <Grid item md={6} sx={{display:'flex', flexDirection:'column'}}>
                    <Paper sx={{  padding:'20px', height: '31%', marginBottom:'10px' }}>
                        <Typography variant='h6'>Winner</Typography>
                        <Typography variant='h4'>$1000</Typography>
                    </Paper>
                    <Paper sx={{ padding:'20px', height: '31%', marginY:'auto' }}>
                        <Typography variant='h6'>Runner Up</Typography>
                        <Typography variant='h4'>$1000</Typography>
                    </Paper >
                    <Paper sx={{ padding:'20px', height: '31%', marginTop:'10px'}}>
                        <Typography variant='h6'>Best Feedback</Typography>
                        <Typography variant='h4'>$1000</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
